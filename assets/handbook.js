/* ==========================================================================
   handbook.js - shared runtime for every page.
   Builds: header, sidebar nav, breadcrumbs, TOC, prev/next, search, theme,
   copy buttons, heading anchors and lightweight syntax highlighting.

   A page only needs:
     <body data-page="02-oop/fundamentals.html" data-root="..">
       <div class="hb-article"> ...content... </div>
   Everything else is generated here so structure stays consistent.
   ========================================================================== */
(function () {
  "use strict";

  var NAV  = window.HB_NAV || { sections: [] };
  var IDX  = window.HB_PAGES || null;          // built by tools/build-index.mjs
  var body = document.body;
  var PAGE = body.getAttribute("data-page") || "index.html";
  var ROOT = body.getAttribute("data-root") || ".";

  function url(p) { return ROOT + "/" + p; }
  function esc(s) { return String(s).replace(/[&<>"]/g, function (c) { return ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[c]; }); }
  // Titles and descriptions in nav-data.js are author-written HTML (they contain
  // entities like &amp; and &lt;T&gt;). They must NOT be escaped again.
  function navHtml(s) { return s == null ? "" : String(s); }
  function exists(key) { return IDX ? Object.prototype.hasOwnProperty.call(IDX, key) : true; }

  /* ---------- flatten structure ---------- */
  var FLAT = [{ key: "index.html", title: "Handbook Home", section: null }];
  NAV.sections.forEach(function (s) {
    s.pages.forEach(function (p) {
      FLAT.push({ key: s.id + "/" + p.file, title: p.title, desc: p.desc, section: s });
    });
  });
  var here = FLAT.findIndex(function (e) { return e.key === PAGE; });
  var current = here >= 0 ? FLAT[here] : null;

  /* ================= theme ================= */
  var THEME_KEY = "hb-theme";
  function applyTheme(t) {
    document.documentElement.setAttribute("data-theme", t);
    try { localStorage.setItem(THEME_KEY, t); } catch (e) {}
    var b = document.getElementById("hb-theme-toggle");
    if (b) { b.textContent = t === "dark" ? "\u2600" : "\u263D"; b.title = t === "dark" ? "Switch to light theme" : "Switch to dark theme"; }
  }

  /* ================= header ================= */
  function buildHeader() {
    var h = document.createElement("header");
    h.className = "hb-header";
    h.innerHTML =
      '<button class="hb-iconbtn" id="hb-menu-toggle" aria-label="Toggle navigation">\u2630</button>' +
      '<a class="hb-brand" href="' + url("index.html") + '">' +
        '<span class="mark">SE</span>' +
        '<span class="brand-long">' + esc(NAV.title || "Handbook") + '</span>' +
        '<span class="brand-short">' + esc(NAV.short || "Handbook") + '</span>' +
      '</a>' +
      '<div class="hb-search-wrap">' +
        '<span class="hb-search-icon">\u2315</span>' +
        '<input id="hb-search" type="search" placeholder="Search the handbook..." autocomplete="off" spellcheck="false" aria-label="Search">' +
        '<kbd>/</kbd>' +
        '<div class="hb-search-results" id="hb-search-results"></div>' +
      '</div>' +
      '<button class="hb-iconbtn" id="hb-theme-toggle" aria-label="Toggle theme">\u263D</button>';
    body.insertBefore(h, body.firstChild);
  }

  /* ================= sidebar ================= */
  function buildSidebar() {
    var nav = document.createElement("nav");
    nav.className = "hb-sidebar";
    nav.setAttribute("aria-label", "Handbook sections");

    // Build a section-id -> part lookup so headings can be emitted in order.
    var partOf = {};
    (NAV.parts || []).forEach(function (pt) {
      (pt.sections || []).forEach(function (id) { partOf[id] = pt; });
    });
    var lastPart = null;

    var html = '<ol>';
    NAV.sections.forEach(function (s) {
      var pt = partOf[s.id];
      if (pt && pt !== lastPart) {
        html += '<li class="nav-part">' + navHtml(pt.title) + '</li>';
        lastPart = pt;
      }
      var isCurrent = current && current.section && current.section.id === s.id;
      html += '<li class="nav-sec' + (isCurrent ? " current open" : "") + '" data-sec="' + s.id + '">' +
        '<button class="nav-sec-head" type="button" aria-expanded="' + (isCurrent ? "true" : "false") + '">' +
          '<span class="num">' + navHtml(s.num) + '</span>' +
          '<span class="lbl">' + navHtml(s.title) + '</span>' +
          '<span class="caret">\u25B6</span>' +
        '</button><ul class="nav-children">';
      s.pages.forEach(function (p) {
        var key = s.id + "/" + p.file;
        var active = key === PAGE ? ' class="active"' : "";
        if (exists(key)) {
          html += '<li><a href="' + url(key) + '"' + active + '>' + navHtml(p.title) + '</a></li>';
        } else {
          html += '<li><a href="' + url(key) + '" style="opacity:.45" title="Not written yet">' + navHtml(p.title) + ' \u00B7 planned</a></li>';
        }
      });
      html += '</ul></li>';
    });
    html += '</ol>';
    nav.innerHTML = html;

    var backdrop = document.createElement("div");
    backdrop.className = "hb-sidebar-backdrop";

    var layout = document.querySelector(".hb-layout");
    layout.insertBefore(nav, layout.firstChild);
    body.appendChild(backdrop);

    nav.addEventListener("click", function (e) {
      var head = e.target.closest(".nav-sec-head");
      if (!head) return;
      var li = head.parentElement;
      li.classList.toggle("open");
      head.setAttribute("aria-expanded", li.classList.contains("open") ? "true" : "false");
    });
    backdrop.addEventListener("click", function () { body.classList.remove("nav-open"); });

    var active = nav.querySelector(".nav-children a.active");
    if (active) { var t = active.offsetTop - 180; if (t > 0) nav.scrollTop = t; }
  }

  /* ================= breadcrumbs + page head meta ================= */
  function buildCrumbs() {
    var art = document.querySelector(".hb-article");
    if (!art) return;
    var parts = ['<a href="' + url("index.html") + '">Handbook</a>'];
    if (current && current.section) {
      var s = current.section;
      var secKey = s.id + "/index.html";
      parts.push('<span class="sep">\u203A</span>');
      if (PAGE === secKey) {
        parts.push("<span>" + navHtml(s.num + ". " + s.title) + "</span>");
      } else {
        parts.push('<a href="' + url(secKey) + '">' + navHtml(s.num + ". " + s.title) + "</a>");
        parts.push('<span class="sep">\u203A</span><span>' + navHtml(current.title) + "</span>");
      }
    }
    var div = document.createElement("div");
    div.className = "hb-crumbs";
    div.innerHTML = parts.join(" ");
    art.insertBefore(div, art.firstChild);
  }

  /* ================= TOC ================= */
  function slug(text, used) {
    var base = text.toLowerCase().replace(/[^\w\s-]/g, "").trim().replace(/\s+/g, "-").slice(0, 60) || "section";
    var s = base, i = 2;
    while (used[s]) { s = base + "-" + i++; }
    used[s] = true;
    return s;
  }
  function buildToc() {
    var art = document.querySelector(".hb-article");
    if (!art) return;
    var heads = art.querySelectorAll("h2, h3");
    var used = {}, items = [];
    Array.prototype.forEach.call(heads, function (h) {
      if (h.closest(".hb-pagehead")) return;
      if (!h.id) h.id = slug(h.textContent, used); else used[h.id] = true;
      var label = h.textContent.replace(/\s*[\u2B50\uD83D\uDFE2\uD83D\uDFE1\uD83D\uDD34].*$/, "").trim();
      var clone = h.cloneNode(true);
      Array.prototype.forEach.call(clone.querySelectorAll(".lvl,.pill"), function (n) { n.remove(); });
      label = clone.textContent.trim();
      items.push({ id: h.id, label: label, level: h.tagName === "H2" ? 2 : 3 });
      var a = document.createElement("a");
      a.className = "anchor"; a.href = "#" + h.id; a.textContent = "#";
      a.setAttribute("aria-label", "Link to this section");
      h.appendChild(a);
    });
    if (!items.length) return;

    var aside = document.createElement("aside");
    aside.className = "hb-toc";
    aside.innerHTML = '<h2>On this page</h2><ul>' + items.map(function (i) {
      return '<li><a class="' + (i.level === 3 ? "h3" : "h2") + '" href="#' + i.id + '">' + esc(i.label) + "</a></li>";
    }).join("") + "</ul>";
    document.querySelector(".hb-layout").appendChild(aside);

    var links = aside.querySelectorAll("a");
    var map = {};
    Array.prototype.forEach.call(links, function (a) { map[a.getAttribute("href").slice(1)] = a; });
    var obs = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (!en.isIntersecting) return;
        Array.prototype.forEach.call(links, function (a) { a.classList.remove("active"); });
        var a = map[en.target.id];
        if (a) a.classList.add("active");
      });
    }, { rootMargin: "-70px 0px -75% 0px", threshold: 0 });
    Array.prototype.forEach.call(heads, function (h) { if (h.id) obs.observe(h); });
  }

  /* ================= prev / next ================= */
  function buildPager() {
    var art = document.querySelector(".hb-article");
    if (!art || here < 0) return;
    var prev = here > 0 ? FLAT[here - 1] : null;
    var next = here < FLAT.length - 1 ? FLAT[here + 1] : null;
    if (!prev && !next) return;
    var nav = document.createElement("nav");
    nav.className = "hb-pager";
    var html = "";
    if (prev) html += '<a class="prev" href="' + url(prev.key) + '"><div class="dir">\u2190 Previous</div><div class="ttl">' + navHtml(prev.title) + "</div>" +
      (prev.section ? '<div style="font-size:12px;color:var(--text-faint)">' + navHtml(prev.section.title) + "</div>" : "") + "</a>";
    if (next) html += '<a class="next" href="' + url(next.key) + '"><div class="dir">Next \u2192</div><div class="ttl">' + navHtml(next.title) + "</div>" +
      (next.section ? '<div style="font-size:12px;color:var(--text-faint)">' + navHtml(next.section.title) + "</div>" : "") + "</a>";
    nav.innerHTML = html;
    art.appendChild(nav);

    var f = document.createElement("footer");
    f.className = "hb-footer";
    f.innerHTML = '<span>Software Engineering Interview Handbook</span>' +
      '<span>\u00B7</span><a href="' + url("index.html") + '">Index</a>' +
      '<span>\u00B7</span><a href="' + url("35-final-prep/index.html") + '">Final prep</a>' +
      '<span style="margin-left:auto">Press <code>/</code> to search</span>';
    art.appendChild(f);
  }

  /* ================= search ================= */
  function buildSearch() {
    var input = document.getElementById("hb-search");
    var out = document.getElementById("hb-search-results");
    if (!input) return;

    var docs = [];
    FLAT.forEach(function (e) {
      if (!exists(e.key) && e.key !== "index.html") return;
      var meta = IDX ? IDX[e.key] : null;
      docs.push({
        key: e.key,
        title: e.title,
        section: e.section ? e.section.num + ". " + e.section.title : "Home",
        haystack: ((e.title || "") + " " + (e.desc || "") + " " + (e.section ? e.section.title : "") + " " +
          (meta && meta.h ? meta.h.join(" ") : "") + " " + (meta && meta.k ? meta.k : "")).toLowerCase(),
        headings: meta && meta.h ? meta.h : []
      });
    });

    var sel = -1, results = [];
    function render(q) {
      if (!q) { out.classList.remove("open"); out.innerHTML = ""; return; }
      var terms = q.toLowerCase().split(/\s+/).filter(Boolean);
      results = docs.map(function (d) {
        var score = 0, ok = true;
        terms.forEach(function (t) {
          if (d.title.toLowerCase().indexOf(t) >= 0) score += 12;
          if (d.section.toLowerCase().indexOf(t) >= 0) score += 4;
          var n = d.haystack.split(t).length - 1;
          if (n === 0) ok = false; else score += Math.min(n, 6);
        });
        var hit = null;
        if (ok) {
          for (var i = 0; i < d.headings.length; i++) {
            if (terms.every(function (t) { return d.headings[i].toLowerCase().indexOf(t) >= 0; })) { hit = d.headings[i]; score += 8; break; }
          }
        }
        return ok ? { d: d, score: score, hit: hit } : null;
      }).filter(Boolean).sort(function (a, b) { return b.score - a.score; }).slice(0, 12);

      if (!results.length) { out.innerHTML = '<div class="r-empty">No matches for &ldquo;' + esc(q) + '&rdquo;</div>'; out.classList.add("open"); return; }
      out.innerHTML = results.map(function (r, i) {
        return '<a href="' + url(r.d.key) + '" data-i="' + i + '">' +
          '<div class="r-title">' + navHtml(r.d.title) + (r.hit ? ' <span style="font-weight:400;color:var(--text-muted)">\u2013 ' + esc(r.hit) + "</span>" : "") + "</div>" +
          '<div class="r-path">' + navHtml(r.d.section) + "</div></a>";
      }).join("");
      out.classList.add("open");
      sel = -1;
    }

    input.addEventListener("input", function () { render(input.value.trim()); });
    input.addEventListener("focus", function () { if (input.value.trim()) render(input.value.trim()); });
    input.addEventListener("keydown", function (e) {
      var links = out.querySelectorAll("a");
      if (e.key === "ArrowDown" || e.key === "ArrowUp") {
        e.preventDefault();
        if (!links.length) return;
        sel = e.key === "ArrowDown" ? (sel + 1) % links.length : (sel - 1 + links.length) % links.length;
        Array.prototype.forEach.call(links, function (a, i) { a.classList.toggle("active", i === sel); });
        links[sel].scrollIntoView({ block: "nearest" });
      } else if (e.key === "Enter") {
        if (sel >= 0 && links[sel]) { e.preventDefault(); location.href = links[sel].href; }
        else if (links.length) { e.preventDefault(); location.href = links[0].href; }
      } else if (e.key === "Escape") { input.blur(); out.classList.remove("open"); }
    });
    document.addEventListener("click", function (e) {
      if (!e.target.closest(".hb-search-wrap")) out.classList.remove("open");
    });
    document.addEventListener("keydown", function (e) {
      var tag = (e.target.tagName || "").toLowerCase();
      if (e.key === "/" && tag !== "input" && tag !== "textarea") { e.preventDefault(); input.focus(); input.select(); }
    });
  }

  /* ================= syntax highlighting =================
     Deliberately small and regex-based: no external dependency, works offline
     from file://. Good enough for reading code, not a real parser.          */
  var KW = {
    csharp: "abstract as async await base bool break byte case catch char checked class const continue decimal default delegate do double dynamic else enum event explicit extern false finally fixed float for foreach get global goto if implicit in init int interface internal is lock long namespace new null object operator out override params partial private protected public readonly record ref required return sbyte sealed set short sizeof stackalloc static string struct switch this throw true try typeof uint ulong unchecked unsafe ushort using var virtual void volatile when where while with yield nameof file scoped",
    sql: "add all alter and any as asc begin between by cascade case cast check clustered collate column commit constraint create cross cursor database declare default delete desc distinct drop else end exec execute exists fetch first for foreign from full function go group having identity if in index inner insert intersect into is join key left like limit merge no nocount not null nulls offset on option or order outer over partition primary procedure raiserror references replace return rollback row rows select set some table then top transaction trigger truncate union unique update use values view when where while with output nvarchar varchar int bigint datetime2 decimal bit uniqueidentifier",
    js: "as async await break case catch class const continue debugger default delete do else export extends false finally for from function get if import in instanceof let new null of return set static super switch this throw true try typeof undefined var void while with yield",
    ts: "any as async await boolean break case catch class const constructor continue declare default delete do else enum export extends false finally for from function get if implements import in instanceof interface let new null number of private protected public readonly return set static string super switch this throw true try type typeof undefined var void while yield",
    yaml: "", bash: "", json: "", http: "", hcl: "resource variable provider module output data locals terraform for_each count depends_on true false null var local", bicep: "param var resource module output targetScope existing if for in true false null new"
  };
  KW.cs = KW.csharp; KW.javascript = KW.js; KW.typescript = KW.ts; KW.tsql = KW.sql; KW.psql = KW.sql;
  KW.jsx = KW.js; KW.razor = KW.csharp; KW.terraform = KW.hcl; KW.kql = KW.sql;
  // Languages with no keyword list of their own. Without an explicit entry
  // highlight() falls back to the C# list, which colours words like `for`,
  // `in`, `is` and `case` inside ASCII diagrams and markup - visually wrong
  // and actively misleading in a `text` block. Empty string = no keywords.
  KW.text = ""; KW.plain = ""; KW.xml = ""; KW.html = ""; KW.css = "";
  KW.proto = ""; KW.diff = ""; KW.features = ""; KW.change = ""; KW.agnostic = "";

  function highlight(code, lang) {
    lang = (lang || "").toLowerCase();
    var kwList = KW[lang];
    if (kwList === undefined) kwList = KW.csharp;
    var kw = kwList ? new RegExp("\\b(" + kwList.trim().split(/\s+/).join("|") + ")\\b", "g") : null;

    var tokens = [];
    // A placeholder must contain NO digits and NO word characters. The number,
    // keyword and type regexes further down would otherwise match inside it,
    // wrap part of it in a span, and break the restore step - which leaked raw
    // markup such as class="tok-n">0 into rendered code blocks.
    // A single Private Use Area character is inert for every regex used here.
    var PH = 0xe000;
    function stash(cls, text) {
      tokens.push('<span class="tok-' + cls + '">' + text + '</span>');
      return String.fromCharCode(PH + tokens.length - 1);
    }

    var s = esc(code);

    if (lang === "yaml" || lang === "bash" || lang === "sh" || lang === "dockerfile" || lang === "ini" || lang === "toml") {
      s = s.replace(/#.*$/gm, function (m) { return stash("c", m); });
    } else if (lang === "sql" || lang === "tsql" || lang === "psql") {
      s = s.replace(/--.*$/gm, function (m) { return stash("c", m); });
      s = s.replace(/\/\*[\s\S]*?\*\//g, function (m) { return stash("c", m); });
    } else {
      s = s.replace(/\/\/.*$/gm, function (m) { return stash("c", m); });
      s = s.replace(/\/\*[\s\S]*?\*\//g, function (m) { return stash("c", m); });
    }

    s = s.replace(/@?&quot;(?:[^&]|&(?!quot;))*?&quot;/g, function (m) { return stash("s", m); });
    s = s.replace(/&#39;(?:[^&]|&(?!#39;))*?&#39;/g, function (m) { return stash("s", m); });
    s = s.replace(/'(?:\\.|[^'\\])*'/g, function (m) { return stash("s", m); });
    s = s.replace(/`(?:\\.|[^`\\])*`/g, function (m) { return stash("s", m); });

    if (lang === "csharp" || lang === "cs" || lang === "razor") {
      s = s.replace(/^\s*\[[A-Z][\w.]*(?:\([^\)\n]*\))?\]/gm, function (m) { return stash("a", m); });
    }
    // EVERY emitted span goes through stash(). Nothing below may ever see the
    // markup produced above it - otherwise later patterns match inside earlier
    // output. (The C# keyword list contains "class", which used to match the
    // word `class` inside a `<span class="tok-n">` this function had just
    // emitted, corrupting the block.)
    if (lang === "yaml") {
      s = s.replace(/^(\s*-?\s*)([\w.\-]+)(:)/gm, function (m, a, b, c) { return a + stash("t", b) + c; });
    }
    if (lang === "json") {
      s = s.replace(/(&quot;[^&]*?&quot;)(\s*:)/g, function (m, a, b) { return stash("t", a) + b; });
    }

    s = s.replace(/\b(0x[0-9a-fA-F]+|\d[\d_]*\.?\d*(?:[eE][+-]?\d+)?[fdmLul]{0,2})\b/g,
      function (m) { return stash("n", m); });
    if (kw) s = s.replace(kw, function (m) { return stash("k", m); });
    if (lang !== "sql" && lang !== "yaml" && lang !== "json" && lang !== "bash") {
      s = s.replace(/\b([A-Z][A-Za-z0-9_]{2,})\b/g, function (m) { return stash("t", m); });
      s = s.replace(/\b([a-zA-Z_]\w*)(\s*\()/g, function (m, n, p) {
        if (n === "if" || n === "for" || n === "foreach" || n === "while" || n === "switch" || n === "catch" || n === "lock" || n === "using" || n === "return") return m;
        return stash("f", n) + p;
      });
    }

    // Restore must LOOP: a stashed token can itself contain a placeholder.
    // Example: strings are stashed first, so the C# attribute pattern
    // `[Audited("Financial")]` stashes `[Audited(<placeholder>)]` - one pass
    // would leave the inner placeholder unresolved and leak it into the output.
    var phRe = new RegExp("[\\uE000-\\uF8FF]", "g");
    for (var pass = 0; pass < 10 && phRe.test(s); pass++) {
      phRe.lastIndex = 0;
      s = s.replace(phRe, function (m) { return tokens[m.charCodeAt(0) - PH]; });
      phRe.lastIndex = 0;
    }
    return s;
  }

  function decorateCode() {
    Array.prototype.forEach.call(document.querySelectorAll("pre > code"), function (code) {
      var pre = code.parentElement;
      var lang = (code.className.match(/language-([\w+#-]+)/) || [])[1] || "";
      if (!code.hasAttribute("data-nohl")) code.innerHTML = highlight(code.textContent, lang);

      var label = pre.getAttribute("data-label") || lang || "code";
      var head = document.createElement("div");
      head.className = "code-head";
      head.innerHTML = "<span>" + esc(label) + '</span><button class="copy" type="button">Copy</button>';
      pre.insertBefore(head, code);
      head.querySelector(".copy").addEventListener("click", function (e) {
        var btn = e.currentTarget;
        var text = code.textContent;
        var done = function () { btn.textContent = "Copied"; setTimeout(function () { btn.textContent = "Copy"; }, 1400); };
        if (navigator.clipboard && navigator.clipboard.writeText) { navigator.clipboard.writeText(text).then(done, done); }
        else {
          var ta = document.createElement("textarea");
          ta.value = text; document.body.appendChild(ta); ta.select();
          try { document.execCommand("copy"); } catch (err) {}
          document.body.removeChild(ta); done();
        }
      });
    });
  }

  /* ================= section index grid =================
     A section index page can drop <div class="card-grid" data-section-index></div>
     and the list of its sibling pages is rendered here, always in sync with nav. */
  function buildSectionIndex() {
    var host = document.querySelector("[data-section-index]");
    if (!host || !current || !current.section) return;
    var s = current.section;
    host.innerHTML = s.pages.filter(function (p) { return p.file !== "index.html"; }).map(function (p, i) {
      var key = s.id + "/" + p.file;
      var live = exists(key);
      return '<a class="card" href="' + url(key) + '"' + (live ? "" : ' style="opacity:.55"') + '>' +
        '<div class="card-num">' + s.num + "." + (i + 1) + "</div>" +
        '<div class="card-title">' + navHtml(p.title) + "</div>" +
        (p.desc ? '<p class="card-desc">' + navHtml(p.desc) + "</p>" : "") +
        (live ? "" : '<div class="card-tags"><span class="pill pill-neutral">planned</span></div>') +
        "</a>";
    }).join("");
  }

  /* ================= misc ================= */
  function buildTopButton() {
    var b = document.createElement("button");
    b.id = "hb-top"; b.type = "button"; b.setAttribute("aria-label", "Back to top"); b.textContent = "\u2191";
    body.appendChild(b);
    b.addEventListener("click", function () { window.scrollTo({ top: 0, behavior: "smooth" }); });
    window.addEventListener("scroll", function () { b.classList.toggle("show", window.scrollY > 700); }, { passive: true });
  }

  function wireHeader() {
    document.getElementById("hb-menu-toggle").addEventListener("click", function () { body.classList.toggle("nav-open"); });
    document.getElementById("hb-theme-toggle").addEventListener("click", function () {
      applyTheme(document.documentElement.getAttribute("data-theme") === "dark" ? "light" : "dark");
    });
  }

  /* ================= boot ================= */
  function init() {
    var saved;
    try { saved = localStorage.getItem(THEME_KEY); } catch (e) {}
    applyTheme(saved || (window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"));

    if (current && !document.title) document.title = current.title;
    buildHeader();
    wireHeader();
    buildSidebar();
    buildCrumbs();
    buildSectionIndex();
    decorateCode();
    buildToc();
    buildPager();
    buildSearch();
    buildTopButton();
    applyTheme(document.documentElement.getAttribute("data-theme"));
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
  else init();
})();
