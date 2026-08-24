/* ==========================================================================
   check-highlight.mjs
   Runs the real highlighter from assets/handbook.js over EVERY code block in
   EVERY page, and reports blocks where the output leaks raw markup or loses
   content. Catches the class of bug where a placeholder gets mangled.

       node tools/check-highlight.mjs
   ========================================================================== */
import { readdirSync, statSync, readFileSync } from "node:fs";
import { join, relative, resolve } from "node:path";
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

// ---- load the real highlight() out of handbook.js ----
const src = readFileSync(join(ROOT, "assets", "handbook.js"), "utf8");
const fnSrc = src.match(/function highlight\(code, lang\) \{[\s\S]*?\n  \}/)[0];
const kwSrc = src.match(/var KW = \{[\s\S]*?\n  \};/)[0];
const alSrc = src.match(/KW\.cs = KW\.csharp;[\s\S]*?KW\.kql = KW\.sql;/)[0];

const esc = (s) =>
  String(s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));

const highlight = new Function("esc", `${kwSrc}\n${alSrc}\n${fnSrc}\nreturn highlight;`)(esc);

const unesc = (s) =>
  s.replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&quot;/g, '"')
   .replace(/&#39;/g, "'").replace(/&amp;/g, "&");

const stripTags = (s) => s.replace(/<[^>]*>/g, "");

let blocks = 0;
const problems = [];

for (const file of walk(ROOT).sort()) {
  const key = relative(ROOT, file).split("\\").join("/");
  const html = readFileSync(file, "utf8");

  // literal leaked markup baked into the source file
  const literal = html.match(/class="tok-[a-z]">[^<\s]/g);
  if (literal) problems.push({ key, kind: "literal markup in SOURCE", detail: literal.slice(0, 3).join(" | ") });

  const re = /<pre([^>]*)><code([^>]*)>([\s\S]*?)<\/code><\/pre>/g;
  let m;
  while ((m = re.exec(html))) {
    blocks++;
    const codeAttrs = m[2];
    if (/data-nohl/.test(codeAttrs)) continue;

    const lang = (codeAttrs.match(/language-([\w+#-]+)/) || [, ""])[1];
    const raw = unesc(m[3]);
    const out = highlight(raw, lang);

    // 1. markup nested inside a tag: `<span <span ...>class="tok-n">`
    //    Detected by an unbalanced '<' before the next '>'.
    if (/<[^>]*</.test(out)) {
      problems.push({ key, kind: "nested markup", detail: (out.match(/.{0,30}<[^>]*<.{0,30}/) || [""])[0] });
    }
    // 2. stray Private Use Area placeholder left unrestored
    if (/[\uE000-\uF8FF]/.test(out)) {
      problems.push({ key, kind: "unrestored placeholder", detail: lang });
    }
    // 3. content loss: visible text must survive highlighting unchanged
    const before = raw.replace(/\s+/g, "");
    const after = unesc(stripTags(out)).replace(/\s+/g, "");
    if (before !== after) {
      let i = 0;
      while (i < before.length && before[i] === after[i]) i++;
      problems.push({
        key, kind: "content changed",
        detail: `lang=${lang || "?"} at char ${i}: expected ${JSON.stringify(before.slice(i, i + 30))} got ${JSON.stringify(after.slice(i, i + 30))}`
      });
    }
  }
}

console.log("--------------------------------------------------------------");
console.log(`code blocks checked : ${blocks}`);
console.log(`problems            : ${problems.length}`);
console.log("--------------------------------------------------------------");
for (const p of problems) console.log(`\n  ${p.kind}\n    ${p.key}\n    ${p.detail}`);
if (!problems.length) console.log("\nAll code blocks highlight cleanly with no content loss.\n");
