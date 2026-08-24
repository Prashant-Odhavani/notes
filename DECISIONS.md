# DECISIONS.md

Architectural and editorial decisions for this handbook, with the reasoning. Append new entries;
do not rewrite history. If a decision is reversed, add a new entry that supersedes the old one.

---

### D-001 — Static HTML, no build step required to read
**Decision:** Plain HTML pages opened directly from disk (`file://`). No framework, no bundler,
no server, no CDN.
**Why:** The handbook must still work in five years on any machine, offline, with no toolchain.
Anything requiring `npm install` to read is a liability for a long-term personal reference.
**Consequence:** No `fetch()` — file:// blocks it. Anything that would normally be JSON is emitted
as a `.js` file assigning to a global (see D-003).

### D-002 — One shared stylesheet and one shared script, zero per-page CSS/JS
**Decision:** All presentation lives in `assets/handbook.css`; all behaviour in `assets/handbook.js`.
**Why:** 177 pages with inline styles would drift within a week. One file means a styling fix
applies everywhere instantly.
**Consequence:** Pages contain only content markup. New visual elements require a new CSS class,
not inline styles.

### D-003 — Navigation is generated from `assets/nav-data.js`
**Decision:** Sidebar, breadcrumbs, prev/next, home-page grid and search all read one structure file.
**Why:** Hand-written navigation in 177 files cannot stay consistent, and reordering sections would
mean editing every page. This also gives prev/next for free across section boundaries.
**Consequence:** A page must be declared in `nav-data.js` or it is invisible to navigation.
Each page declares its identity with `data-page` / `data-root` on `<body>`.

### D-004 — Page completion state is derived from disk, not hand-tracked
**Decision:** `tools/build-index.mjs` scans the tree and writes `assets/search-index.js`; the nav
greys out any declared page missing from that index.
**Why:** A hand-maintained `done: true` flag would rot. Deriving it means the handbook always tells
the truth about its own completeness, which matters for multi-session work.
**Consequence:** Run `node tools/build-index.mjs` after every batch of pages.

### D-005 — Search is client-side over titles, headings and keywords
**Decision:** Index page titles, all `h2/h3/h4` text and a per-page `<meta name="keywords">`.
Not full text.
**Why:** Full-text indexing of a multi-megabyte handbook would produce a large index file and slow
first paint, for little benefit — revision search is "which page covers X", not "find this phrase".
**Consequence:** Headings must be descriptive and search-friendly ("Why async/await deadlocks in
ASP.NET", not "Gotchas"). Add non-obvious synonyms to the page's `keywords` meta.

### D-006 — Own the syntax highlighter
**Decision:** A ~90-line regex highlighter inside `handbook.js` rather than Prism/highlight.js.
**Why:** Keeps the handbook dependency-free and offline (D-001), and 95% of the value is
keywords/strings/comments/types being visually distinct. A real parser is not worth the weight here.
**Consequence:** Highlighting is approximate. Accept minor mis-colouring; use `data-nohl` for
diagrams and plain text where it would be distracting.

### D-007 — C# and modern .NET are the default; other stacks appear where the topic demands
**Decision:** Backend examples in C# 12/13 on .NET 8/9 unless the topic is inherently another stack
(SQL, Terraform, Kubernetes YAML, Angular/TypeScript, React/JS).
**Why:** Matches the reader's background, so examples double as revision of idiomatic code.

### D-008 — Depth over coverage inside a page; coverage guaranteed by structure
**Decision:** Every page must answer: what/why/how it works/when not to/trade-offs/failure modes/
production behaviour/interview angle. Where a subtopic cannot support that depth, it is merged into
a neighbouring page rather than given a thin page of its own.
**Why:** The brief explicitly rejects shallow notes. Thin pages also make navigation noisier.

### D-009 — Each concept is owned by exactly one page
**Decision:** `CONTENT_MAP.md` records the owning page for every significant concept. Other pages
link to it instead of re-explaining.
**Why:** Avoids the repetition failure mode called out in the brief, and keeps the handbook
maintainable — one place to fix when understanding improves.
**Consequence:** Cross-links are load-bearing. `build-index.mjs` link-checks them.

### D-010 — Interview answers are written as speech, not bullet lists
**Decision:** "Strong answer" sections are 2–5 paragraphs of what a senior would actually say,
followed by what the interviewer is testing, weak answers, and follow-ups.
**Why:** The failure mode being avoided is memorising keyword lists that collapse under one
follow-up question. Reading a real answer trains the shape of a good response.

### D-011 — Questions are collapsed by default (`<details>`)
**Decision:** Questions render as clickable summaries with hidden answers.
**Why:** Enables the primary revision loop: read question → answer aloud → check. Also keeps
question-heavy pages scannable. Print CSS force-expands them.

### D-012 — Level markers are per-heading, not per-page
**Decision:** 🟢/🟡/🔴 equivalents (`lvl-b`/`lvl-i`/`lvl-a`) attach to individual headings.
**Why:** Real topics mix levels — Redis data types are beginner, cluster failover is advanced.
A page-level badge would be uselessly coarse.

### D-013 — Cloud numbers are treated as perishable
**Decision:** Explain mechanisms and orders of magnitude; mark specific quotas, SKU names and prices
as needing verification; state the version/date context for anything volatile.
**Why:** The brief forbids presenting outdated behaviour as current. Mechanisms age far better than
limits, and interviewers care about mechanism.

### D-014 — Sections are numbered folders matching the brief's topic order
**Decision:** `01-sdlc` … `35-final-prep`, preserving the requested ordering.
**Why:** Predictable URLs, sorted directory listings, and a 1:1 map to the original topic list so
coverage can be audited quickly.

### D-015 — Learning-optimised writing style (supersedes the tone rules in D-008/D-010)
**Decision:** The handbook is written as an experienced engineer explaining a concept on a whiteboard,
not as technical documentation. Plain English, short sentences, one idea per paragraph, examples
early, memory blocks (`.remember`, `.oneline`, `.takeaways`) for core concepts, and interview answers
written as speech (`.say-it`) rather than prose.
**Why:** The first sections were technically solid but dense and formal, which made them slow to read
and hard to recall under interview pressure. The reader's goal is *understand fast → remember →
say it out loud*, not *reference lookup*.
**Consequence:** Technical depth is unchanged — internals, trade-offs, failure modes and production
behaviour all stay. Only the delivery changed. `STYLE_GUIDE.md` is the authority; sections 01–04 were
rewritten to this style and serve as the reference examples for all later sections.

### D-016 — Three importance levels instead of two
**Decision:** Importance pills are 🔥 Must know / ⭐ Senior-level / 💡 Good to know, and difficulty
badges carry the 🟢🟡🔴 emoji inline.
**Why:** Marking everything "must know" destroys the signal. An explicit "good to know" tier lets the
reader triage what to memorise versus what to merely recognise. Emoji make the badges scannable when
skimming a page quickly.

### D-017 — The highlighter must never re-scan its own output
**Decision:** Every token the syntax highlighter emits is replaced by a single Private Use Area
placeholder character, restored only at the very end. No highlighting pass may see markup produced
by an earlier pass.
**Why:** Two real bugs shipped because of this. (1) The old placeholder embedded the token index as
a *digit*, so the number regex matched inside the placeholder and destroyed it. (2) The C# keyword
list contains `class`, which matched the word `class` inside a `<span class="tok-n">` the
highlighter had just emitted. Both leaked raw text such as `class="tok-n">0` into rendered code.
**Consequence:** Placeholders must contain no digits and no word characters.
`tools/check-highlight.mjs` runs the real highlighter over every code block in every page and
asserts that stripping the tags returns the original source exactly. Run it after any highlighter
change, and treat a non-zero problem count as a build failure.

### D-018 — Section order is a .NET learning path, not the original topic list
**Decision:** Sections are ordered and renumbered so the handbook reads front-to-back as a learning
journey for a .NET developer, grouped into nine visible Parts:
C# fundamentals → OOP → SOLID → LINQ → advanced C# → .NET platform → ASP.NET Core → HTTP/APIs →
.NET Framework → SQL → EF Core → other databases → Redis → testing → design patterns → architecture →
microservices → messaging → SaaS → Azure → containers → IaC → Git → CI/CD → SDLC → front-end →
AI tooling → scaling → system design → final prep.
**Why:** The original numbering followed the order topics were requested, which meant databases sat
before C#, and advanced concepts appeared before their prerequisites. A reader working through it had
to jump between unrelated technologies.
**Consequence:** Folders were physically renamed and every cross-link rewritten. `nav-data.js` gained a
`parts` array which drives the sidebar headings and the home page grouping. **No page may depend on a
concept from a later section** — link forward with a one-line gloss instead. Reordering again means
another folder migration, so treat the order as settled.

### D-019 — Lead with plain English and an analogy, not a definition
**Decision:** Important concepts open with a `.simple` ("In simple terms") block and, where it genuinely
aids recall, an `.analogy` ("Think of it this way") block — before any formal definition or jargon.
**Why:** The material was accurate but hard to *remember*. Formal definitions are the easiest thing to
read and the hardest thing to recall under interview pressure. Leading with the pain the reader has
actually felt, then a concrete image, makes the technical depth stick.
**Consequence:** Analogies must map onto the real mechanism — a loose analogy is worse than none. Cap
them at one or two per page or they stop landing. Depth is unchanged; only the on-ramp is different.

### D-020 — Placeholder restore must loop
**Decision:** The highlighter's restore step iterates (bounded to 10 passes) until no placeholder
characters remain, rather than doing a single pass.
**Why:** A stashed token can itself contain a placeholder. Strings are stashed before attributes, so
the C# attribute pattern applied to `[Audited("Financial")]` stashes `[Audited(<placeholder>)]`. A
single-pass restore left the inner placeholder in the output — caught by `tools/check-highlight.mjs`
on the section 05 attributes example, not by eye.
**Consequence:** `check-highlight.mjs` is doing real work; keep running it after every batch of pages.

### D-021 — build-index.mjs also checks prose for authoring slips
**Decision:** `tools/build-index.mjs` now scans every page's prose for rendering-visible authoring
mistakes — backslash-escaped quotes, double-escaped entities, stray `undefined` / `[object Object]` /
`NaN`. `<pre>` blocks are blanked out first (line numbers preserved) so legitimately escaped code
samples don't trigger it.
**Why:** Writing `<code>SELECT \"OrderNumber\"</code>` inside prose is an easy slip when the sentence
is about quoting, and it renders as literal backslashes. On first run the check found five real
instances across sections 06, 08 and 12 that had already shipped and were invisible to me while
writing. The `<pre>` exclusion is required: `var json = "{\"name\": \"Ada\"}"` is correct C#.
**Consequence:** Two validators now cover different failure classes — `check-highlight.mjs` for code
blocks, `build-index.mjs` for links plus prose. Run both after every batch. The `undefined` pattern is
deliberately narrow (`>undefined<`, `= undefined`, `undefined</`) because "behaviour is undefined" is
legitimate prose that appears on six pages.

### D-022 — build-index.mjs validates `#anchor` fragments too
**Decision:** Every `href="page.html#fragment"` is checked against the set of `id="..."` attributes
actually present on the target page. Forward links to unwritten pages are skipped, same as the file
check.
**Why:** The link check only verified that the *file* existed, so a wrong fragment was completely
silent — the link works, it just lands at the top of the page instead of the section. On first run
this found five broken anchors written over several sessions: `reliability.html#idempotency` (actual
id `idempotency-keys`) referenced from three different pages, `auth-security.html#jwt` (actual
`jwt-structure`), and `http-protocol.html#put-patch` (actual `put-vs-patch`). The pattern is always
the same — I linked to the section by the name I remembered rather than the id I wrote.
**Consequence:** Cross-page linking is now safe to do liberally, which matters because the learning
path depends on later pages referring back rather than repeating. `build-index.mjs` now reports three
independent things: links, anchors, prose slips.

### D-023 — Pattern pages lead with the code the pattern replaces
**Decision:** For the high-value patterns, the section order is: *In simple terms* -> analogy -> **the naive
code, with a table of what is specifically wrong with it** -> the pattern applied -> .NET DI wiring ->
when NOT to use it. Applied to Factory, Singleton (creational), Strategy, Mediator (behavioral) and
CQRS (enterprise) after the user asked for these to be explained "with proper example".
**Why:** The pages previously opened with the finished pattern — Strategy jumped straight to
`IDiscountPolicy` without showing the `switch` it replaces. That teaches the shape without the motivation,
so a reader can reproduce the pattern but cannot judge when it is warranted. Showing the growing switch,
and naming its four concrete problems (duplicated rule, accumulated dependencies, untestable in isolation,
grows without limit), makes the trade-off assessable.
**Consequence:** These five patterns roughly doubled in length (creational 21->33KB, behavioral 24->39KB,
enterprise 27->36KB). Each now also states explicitly when *not* to apply it — Strategy loses to a
three-case switch, Mediator loses in a three-endpoint service. `structural.html` was left at its original
depth since those patterns were not named and are less commonly asked.
**Also encoded:** the .NET-specific point that idiomatic code often *is* the pattern — constructor
injection is Strategy, `DbSet` is Repository, `DbContext` is Unit of Work, middleware is Chain of
Responsibility. Recognising a pattern in idiomatic code scores better than reciting the GoF diagram.

### D-024 — build-index.mjs also validates HTML structure
**Decision:** Two structural checks added: `<div>` open/close balance per page, and — inside each
`<details class="qa">` — that `.qa-body` opens before `.say-it`.
**Why:** While writing `22-kafka/operations.html` I put the `.say-it` block *outside* `.qa-body`, so the
answer rendered without its container styling. Nothing caught it: the link, anchor, prose and highlight
checks all passed, because the HTML was well-formed and every file existed. A div imbalance is worse —
the layout uses nested flex divs for the sidebar and article, so one unclosed div silently breaks the
whole page.
**Consequence:** `build-index.mjs` now reports five independent things: links, anchors, structure, prose
slips, and completion. Verified the check fires by reintroducing the bug before restoring the file —
same discipline as D-022, since a check that never fires is worse than no check.

### D-025 — build-index.mjs rejects literal control characters
**Decision:** A fifth text check scans the **whole file, including `<pre>` blocks**, for control
characters other than tab, LF and CR. Any hit is reported with its code point and line.
**Why:** A `grep` across the repo reported `16-redis/caching-patterns.html` as a *binary file*. It
contained a real NUL byte at offset 15458, inside a C# sample: the source text `"\0null"` —
a NUL-prefixed cache sentinel — had been written as an **actual NUL byte** instead of the two-character
escape sequence. Consequences: the file was binary to grep and diff tooling, so it was silently excluded
from content searches, and the code sample rendered with the marker missing, making the snippet wrong.
None of the existing four checks could catch it — the HTML was well-formed, every link resolved, and the
highlighter round-tripped it faithfully *because* it round-trips byte-for-byte.
**Consequence:** This check runs against raw HTML rather than prose, since the defect appeared inside a
code block, where the other text checks deliberately do not look. A full-repo sweep found no other
occurrence. Verified the check fires by reintroducing the NUL byte and confirming the report, then
restoring — same discipline as D-022 and D-024.
**Related:** while adding it I first wrote the character class with literal control bytes rather than
`\\x00`-style escapes, which put six of them into the validator itself. Worth noting because it is
the same class of mistake the check exists to catch.

### D-026 — languages without a keyword list get an empty one, not the C# fallback
**Decision:** `KW.text`, `KW.xml`, `KW.html`, `KW.css` and a few one-off labels are now
explicitly `""` in the highlighter.
**Why:** `highlight()` falls back to `KW.csharp` when a language has no entry. So all 54
`language-text` blocks — mostly ASCII diagrams of request flows, partition layouts and deployment
sequences — were having words like `for`, `in`, `is`, `case` and `new` coloured as
C# keywords. Visually noisy, and actively misleading in a diagram where those words are prose.
`language-html` and `language-xml` had the same problem.
**Consequence:** A one-line change improving 54 existing blocks plus everything written since. Verified by
loading the real `highlight()` out of `handbook.js` and asserting a text block now produces zero
`tok-k` spans while a C# block still produces three. All 797 code blocks still pass
`check-highlight.mjs` with no content loss.

### D-027 — build-index.mjs validates the page boilerplate
**Decision:** Three assertions per page: the `<html>` tag is exactly `<html lang="en">`,
`data-page` equals the file's own path, and `data-root` matches the file's directory depth.
**Why:** I typed `lang="one"` while writing `36-system-design/method.html`. Harmless in that
instance, but it exposed that **the three most load-bearing attributes on every page were unverified**, and
all three fail *silently*:
- `data-root` builds every navigation and asset href at runtime. Wrong value = every nav link on the
  page 404s, with no error anywhere.
- `data-page` drives sidebar highlighting and prev/next. Wrong value = navigation points somewhere else.
- `lang` is an accessibility attribute no functional test would ever exercise.

None of the existing checks could catch any of them: the HTML is well-formed, every link resolves (the
checker resolves hrefs from the file's real path, not from `data-root`), and the highlighter is
unaffected.
**Consequence:** Ran clean across all 164 pages on first execution, so this is a regression guard rather
than a bug hunt — which is the point, since the failure mode is a page that looks fine and has broken
navigation. Verified all three arms fire by reintroducing each defect and confirming the report, then
restoring from a backup copy — same discipline as D-022, D-024 and D-025.
**Note:** `data-root` is derived as `"."` at depth 0 and `".."` repeated per directory
level, so the check keeps working if the handbook ever gains a deeper directory.


### D-028 — the handbook is complete at 181 pages
**Decision:** All nine parts, 37 sections, 181 pages written. No remaining scope from the original
specification.
**Final state:** 1,803 indexed headings, 4.89 MB of HTML, 846 code blocks. Six validators clean —
links, anchors, HTML structure, prose slips, control characters, page boilerplate — plus the separate
highlighter round-trip check that asserts stripping tags returns each code block byte-for-byte.
**Order written:** Parts 1-3 (fundamentals, data), then Part 4 (testing), then — following the user's
mid-project reprioritisation — Part 7 (front-end), Part 5 (architecture, with the named design patterns
rewritten to lead with the code they replace), Part 6 (cloud and delivery), Part 8 (AI and MCP), and
finally Part 9 (interview preparation). Part 9 was written last deliberately: it synthesises the
threads recorded in PROJECT_STATUS.md after each preceding part, so writing it earlier would have
meant inventing cross-references rather than collecting them.
**The convention that held throughout:** state the mechanism, then the production consequence. A fact
is recall; a consequence is understanding. Every `.say-it` block is written to be spoken aloud in
roughly the order you would say it, which is why `37-final-prep/index.html` frames them as scripts
to practise rather than text to memorise.
