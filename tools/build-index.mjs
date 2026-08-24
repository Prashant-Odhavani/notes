/* ==========================================================================
   build-index.mjs
   Run from the handbook root:   node tools/build-index.mjs

   1. Scans every *.html page, extracting <title>, h2/h3 headings and the
      <meta name="keywords"> content.
   2. Writes assets/search-index.js  ->  window.HB_PAGES
      (this is what makes client-side search work over file:// with no fetch)
   3. Validates the site: pages declared in nav-data.js but missing on disk,
      files on disk not declared in nav-data.js, and broken internal links.

   Exit code is always 0 - the report is advisory, printed to stdout.
   ========================================================================== */
import { readdirSync, statSync, readFileSync, writeFileSync } from "node:fs";
import { join, relative, resolve, dirname, posix } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = resolve(fileURLToPath(new URL("../", import.meta.url)));
const SKIP = new Set(["assets", "tools", ".git", "node_modules"]);

function walk(dir, out = []) {
  for (const name of readdirSync(dir)) {
    if (SKIP.has(name)) continue;
    const full = join(dir, name);
    if (statSync(full).isDirectory()) walk(full, out);
    else if (name.endsWith(".html")) out.push(full);
  }
  return out;
}

const strip = (s) =>
  s.replace(/<[^>]*>/g, "")
   .replace(/&amp;/g, "&").replace(/&lt;/g, "<").replace(/&gt;/g, ">")
   .replace(/&quot;/g, '"').replace(/&#39;/g, "'").replace(/&nbsp;/g, " ")
   .replace(/\s+/g, " ").trim();

// ---- declared pages come first: needed to classify link targets ----
const navSrc0 = readFileSync(join(ROOT, "assets", "nav-data.js"), "utf8");
const declared = new Set(["index.html"]);
{
  // Section ids always look like NN-name. Requiring that stops this regex
  // latching onto the `parts` array (id: "lang", id: "data", ...) and
  // mis-attributing a section's pages to a part.
  const secRe = /id:\s*"(\d\d-[^"]+)"[\s\S]*?pages:\s*\[([\s\S]*?)\n\s{6}\]/g;
  let s;
  while ((s = secRe.exec(navSrc0))) {
    const id = s[1];
    const fRe = /file:\s*"([^"]+)"/g;
    let f;
    while ((f = fRe.exec(s[2]))) declared.add(posix.join(id, f[1]));
  }
}

const files = walk(ROOT).sort();
const pages = {};
const linkProblems = [];   // href points at nothing we know about
const pendingLinks = [];   // href points at a declared page not yet written
const textProblems = [];   // authoring slips that render as literal junk
const anchorsByPage = {};  // page -> Set of ids defined on it
const sameFragLinks = [];  // [fromPage, toPage, fragment] - checked after all pages scanned
const anchorProblems = []; // href#fragment points at an id that doesn't exist
const structureProblems = []; // div imbalance, wrong nesting - breaks layout silently
const onDisk = new Set();

// Authoring slips that render as literal junk in the browser.
// Checked against prose only - <pre> blocks are stripped first, because
// backslash-escaped quotes are legitimate inside C#/JSON code samples.
const TEXT_CHECKS = [
  [/\\"/, 'backslash-escaped quote (\\") in prose - renders literally'],
  [/&amp;(amp|lt|gt|quot|#\d+);/, "double-escaped HTML entity"],
  // Unterminated close tag at end of line: "</h3" with no ">". Renders as visible text.
  [/<\/[a-zA-Z][a-zA-Z0-9]*\s*$/, "unterminated closing tag (missing '>')"],
  // Unterminated open tag likewise
  [/<[a-zA-Z][a-zA-Z0-9]*(\s+[a-zA-Z-]+="[^"]*")*\s*$/, "unterminated opening tag (missing '>')"],
];

// Checks for JS/.NET values that leaked in from string interpolation.
// These run against prose with inline <code> spans ALSO stripped, because
// pages about JavaScript legitimately discuss `undefined` and `NaN` as values -
// a genuine leak appears as bare prose text, never inside <code>.
const VALUE_LEAK_CHECKS = [
  [/(?:>\s*undefined\s*<|[=:]\s*undefined\b|\bundefined\s*<\/)/, 'stray "undefined" value'],
  [/\[object Object\]/, '"[object Object]" - a stringified object leaked in'],
  [/\bNaN\b/, 'stray "NaN"'],
];

// Remove code samples so prose checks don't fire on legitimate escaped code.
const proseOnly = (html) =>
  html.replace(/<pre[\s\S]*?<\/pre>/gi, (m) => m.replace(/[^\n]/g, " "));

// Additionally blank inline <code>...</code> content, for the value-leak checks.
const proseNoCode = (html) =>
  proseOnly(html).replace(/<code[\s\S]*?<\/code>/gi, (m) => m.replace(/[^\n]/g, " "));

for (const file of files) {
  const key = relative(ROOT, file).split("\\").join("/");
  onDisk.add(key);
  const html = readFileSync(file, "utf8");

  const title = strip((html.match(/<title>([\s\S]*?)<\/title>/i) || [, key])[1])
    .replace(/\s*[|\u2014-]\s*Software Engineering Interview Handbook\s*$/i, "");

  const headings = [];
  const hRe = /<h([234])\b[^>]*>([\s\S]*?)<\/h\1>/gi;
  let m;
  while ((m = hRe.exec(html))) {
    const t = strip(m[2].replace(/<a class="anchor"[\s\S]*?<\/a>/gi, ""));
    if (t && t.length < 120) headings.push(t);
  }

  const kw = strip((html.match(/<meta\s+name="keywords"\s+content="([^"]*)"/i) || [, ""])[1]);

  pages[key] = { t: title, h: headings.slice(0, 80), k: kw };

  // ---- record this page's anchors, for the cross-page anchor check below ----
  anchorsByPage[key] = new Set(
    [...html.matchAll(/\sid="([^"]+)"/gi)].map((x) => x[1])
  );

  // ---- link check ----
  const base = dirname(file);
  const aRe = /href="([^"#?]*)(?:#([^"?]*))?(?:\?[^"]*)?"/gi;
  let a;
  while ((a = aRe.exec(html))) {
    const href = a[1];
    const frag = a[2];
    // skip absolute schemes and hrefs built by inline JS (contain " + " or ${ })
    if (/^(https?:|mailto:|tel:|javascript:|data:)/i.test(href || "")) continue;
    if ((href || "").includes("+") || (href || "").includes("${")) continue;

    // same-page fragment link (href is empty, only #anchor)
    if (!href) {
      if (frag) sameFragLinks.push([key, key, frag]);
      continue;
    }

    const target = resolve(base, href);
    try {
      statSync(target);
      // File exists - queue the fragment for checking once every page is scanned
      if (frag) {
        sameFragLinks.push([key, relative(ROOT, target).split("\\").join("/"), frag]);
      }
    } catch {
      const rel = relative(ROOT, target).split("\\").join("/");
      if (declared.has(rel)) pendingLinks.push(rel);
      else linkProblems.push(`${key}  ->  ${href}`);
    }
  }

  // ---- authoring-slip check (prose only; <pre> blanked, line numbers preserved) ----
  const lines = proseOnly(html).split("\n");
  for (const [re, label] of TEXT_CHECKS) {
    for (let i = 0; i < lines.length; i++) {
      if (re.test(lines[i])) {
        textProblems.push(`${key}:${i + 1}  ${label}`);
        break; // one report per file per check is enough to act on
      }
    }
  }

  // ---- control-character check (WHOLE file, including <pre>) ----
  // A literal control byte in the source is always a defect: it makes the file
  // binary to grep/diff tooling and renders as nothing (or a replacement glyph)
  // in the browser. Found for real as a NUL byte inside a C# sample where the
  // source text "\0null" was meant - the escape sequence had been written as an
  // actual NUL. Tab (\t), LF (\n) and CR (\r) are legitimate and excluded.
  const CONTROL_RE = /[\x00-\x08\x0B\x0C\x0E-\x1F]/;
  const rawLines = html.split("\n");
  for (let i = 0; i < rawLines.length; i++) {
    const hit = rawLines[i].match(CONTROL_RE);
    if (hit) {
      const code = hit[0].charCodeAt(0).toString(16).padStart(4, "0");
      textProblems.push(`${key}:${i + 1}  literal control character U+${code.toUpperCase()} in source`);
      break;
    }
  }

  // ---- page boilerplate check ----
  // These four attributes are load-bearing and fail SILENTLY when wrong:
  // data-page drives nav highlighting, data-root builds every nav href, and a
  // wrong lang is an accessibility defect no test would catch. Caught a real
  // typo: lang="one" instead of lang="en".
  if (!/<html lang="en">/.test(html)) {
    textProblems.push(`${key}  <html> tag is not exactly '<html lang="en">'`);
  }
  const dataPage = (html.match(/<body[^>]*\sdata-page="([^"]*)"/) || [])[1];
  if (dataPage === undefined) {
    textProblems.push(`${key}  <body> has no data-page attribute`);
  } else if (dataPage !== key) {
    textProblems.push(`${key}  data-page="${dataPage}" does not match the file's own path`);
  }
  const depth = key.split("/").length - 1;
  const expectedRoot = depth === 0 ? "." : Array(depth).fill("..").join("/");
  const dataRoot = (html.match(/<body[^>]*\sdata-root="([^"]*)"/) || [])[1];
  if (dataRoot === undefined) {
    textProblems.push(`${key}  <body> has no data-root attribute`);
  } else if (dataRoot !== expectedRoot) {
    textProblems.push(`${key}  data-root="${dataRoot}" should be "${expectedRoot}" at this depth`);
  }

  // ---- value-leak check (also blanks inline <code>, see VALUE_LEAK_CHECKS) ----
  const bareLines = proseNoCode(html).split("\n");
  for (const [re, label] of VALUE_LEAK_CHECKS) {
    for (let i = 0; i < bareLines.length; i++) {
      if (re.test(bareLines[i])) {
        textProblems.push(`${key}:${i + 1}  ${label}`);
        break;
      }
    }
  }

  // ---- structural checks ----
  // 1. <div> balance. An unclosed div silently breaks the whole page layout
  //    because the sidebar/article flex containers are divs too.
  const body = html.slice(html.indexOf("<body"));
  const opens = (body.match(/<div\b/gi) || []).length;
  const closes = (body.match(/<\/div>/gi) || []).length;
  if (opens !== closes) {
    structureProblems.push(
      `${key}  <div> balance: ${opens} open vs ${closes} close (diff ${opens - closes})`
    );
  }

  // 2. Inside each <details class="qa">, .qa-body must open before .say-it.
  //    Getting this backwards renders the answer outside the styled body.
  const qaBlocks = body.match(/<details class="qa">[\s\S]*?<\/details>/gi) || [];
  qaBlocks.forEach((block, i) => {
    const bodyAt = block.indexOf('class="qa-body"');
    const sayAt = block.indexOf('class="say-it"');
    if (sayAt !== -1 && (bodyAt === -1 || sayAt < bodyAt)) {
      structureProblems.push(`${key}  qa #${i + 1}: .say-it is outside .qa-body`);
    }
  });
}

writeFileSync(
  join(ROOT, "assets", "search-index.js"),
  "/* GENERATED by tools/build-index.mjs - do not edit by hand. */\nwindow.HB_PAGES = " +
    JSON.stringify(pages, null, 0) + ";\n",
  "utf8"
);

const missing = [...declared].filter((k) => !onDisk.has(k)).sort();
const orphans = [...onDisk].filter((k) => !declared.has(k)).sort();

const totalHeadings = Object.values(pages).reduce((n, p) => n + p.h.length, 0);
const bytes = files.reduce((n, f) => n + statSync(f).size, 0);

console.log("--------------------------------------------------------------");
console.log(`pages on disk      : ${files.length}`);
console.log(`pages declared     : ${declared.size}`);
console.log(`headings indexed   : ${totalHeadings}`);
console.log(`html size          : ${(bytes / 1024 / 1024).toFixed(2)} MB`);
console.log(`completion         : ${((onDisk.size / declared.size) * 100).toFixed(1)}%`);
console.log("--------------------------------------------------------------");
const showMissing = process.argv.includes("--missing");
if (missing.length) {
  console.log(`\nNOT YET WRITTEN (${missing.length})${showMissing ? ":" : " - run with --missing to list"}`);
  if (showMissing) missing.forEach((k) => console.log("  - " + k));
}
if (orphans.length) { console.log(`\nON DISK BUT NOT IN nav-data.js (${orphans.length}):`); orphans.forEach((k) => console.log("  ! " + k)); }
if (pendingLinks.length) {
  const counts = {};
  pendingLinks.forEach((k) => { counts[k] = (counts[k] || 0) + 1; });
  const top = Object.entries(counts).sort((a, b) => b[1] - a[1]);
  console.log(`\nFORWARD LINKS to pages not yet written (${pendingLinks.length} links, ${top.length} targets) - these resolve once written:`);
  top.slice(0, 12).forEach(([k, n]) => console.log(`  ~ ${k}  (${n})`));
  if (top.length > 12) console.log(`  ... and ${top.length - 12} more targets`);
}
if (linkProblems.length) { console.log(`\nBROKEN INTERNAL LINKS (${linkProblems.length}) - FIX THESE:`); linkProblems.forEach((k) => console.log("  x " + k)); }
else console.log("\nNo broken links (every href resolves or points at a declared page).");

// ---- anchor check: every #fragment must match an id on the target page ----
for (const [from, to, frag] of sameFragLinks) {
  const ids = anchorsByPage[to];
  if (!ids) continue;                 // target not written yet - forward link
  if (!ids.has(frag)) anchorProblems.push(`${from}  ->  ${to}#${frag}`);
}
if (anchorProblems.length) {
  console.log(`\nBROKEN ANCHORS (${anchorProblems.length}) - FIX THESE:`);
  anchorProblems.forEach((k) => console.log("  x " + k));
} else console.log("No broken anchors (every #fragment matches an id on its target page).");

if (structureProblems.length) {
  console.log(`
STRUCTURE PROBLEMS (${structureProblems.length}) - FIX THESE:`);
  structureProblems.forEach((k) => console.log("  x " + k));
} else console.log("No structure problems (div balance and qa nesting are correct).");

if (textProblems.length) {
  console.log(`\nTEXT PROBLEMS (${textProblems.length}) - FIX THESE:`);
  textProblems.forEach((k) => console.log("  x " + k));
} else console.log("No text problems (no escaped quotes, double entities or stray 'undefined').");
console.log("");
