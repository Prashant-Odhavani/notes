# STYLE_GUIDE.md

Rules for writing pages in this handbook. **Read this before writing or editing any page.**

---

## 0. The goal (this drives everything else)

This is an **interview preparation handbook**, not technical documentation.

Optimise every page for:

> **Understand quickly → remember easily → explain confidently out loud.**

Depth stays. Only the *delivery* changes. The target feeling is:

> "An experienced engineer is explaining this to me on a whiteboard."

Not:

> "Official documentation is describing this to me."

---

## 1. Writing style

**Plain, direct, professional English. Short sentences.**

| Don't write | Write |
|---|---|
| "Polymorphism facilitates the provision of a unified interface through which heterogeneous implementations may be manipulated." | "Polymorphism lets you use different implementations through the same interface. The caller doesn't need to know which class it actually got." |
| "The implementation leverages inversion of control through constructor-based dependency injection." | "The class receives its dependencies through the constructor. That's dependency injection." |
| "Consideration should be given to performance implications." | "Calling `.ToList()` too early loads every row into memory before the filter runs." |

Rules:

- One idea per paragraph. If a paragraph has two ideas, split it.
- Max ~3 sentences per paragraph in explanatory text.
- Prefer bullets, numbered steps, and small tables over long prose.
- Use natural teaching phrases where they fit — but don't force them into every section:
  *"The main idea is…", "Why do we need this?", "Think of it this way…", "In a real application…",
  "A common mistake is…", "This becomes a problem when…", "The trade-off is…",
  "In an interview, mention…"*
- No filler, no buzzwords, no "in today's fast-paced world".
- Give a number, a limit or a named failure instead of an adjective.

**Simple language ≠ shallow content.** Explain internals, failure modes, trade-offs, performance,
security and scale — just explain them simply.

---

## 2. Order of explanation

Follow this order whenever it fits. Never open with advanced terminology.

1. Simple explanation (what it is, in one or two sentences)
2. Why it exists / what problem it solves
3. How it works
4. **Small example, early**
5. Explanation of the example
6. Real-world usage
7. Important details
8. Common mistakes
9. Advanced considerations
10. Interview perspective

**Show an example early.** Do not write four paragraphs before the first snippet. Pattern:

```text
Simple explanation → small example → explain it → real-world example → advanced details
```

---

## 3. Explain it simply first

Two blocks come **before** any jargon on an important concept. Lead with these, then go deep.

```html
<!-- The plain-English version. Use on every genuinely important concept. -->
<div class="simple">
  <span class="sm-label">In simple terms</span>
  <p>The object <strong>protects its own rules</strong>. Nobody outside can put it into a bad state.</p>
</div>

<!-- An analogy. Use where it genuinely helps recall - not everywhere. -->
<div class="analogy">
  <span class="an-label">Think of it this way</span>
  <p>A cash machine. You can withdraw and check your balance, but you can't reach in and set the
     balance to a million.</p>
</div>
```

Rules for analogies:

- It must map onto the *mechanism*, not just the vibe. A bad analogy is worse than none.
- One or two per page. If every concept has one, none of them stick.
- Keep it to 1–3 short sentences, then get back to the code.

**Order for an important concept:**

> `In simple terms` → *why it exists / what pain it solves* → `Think of it this way` →
> small example → how it works → common mistakes → interview angle

Do **not** open with a formal definition. Lead with the problem the reader has actually felt.

---

## 4. Memory blocks

Use these for genuinely important concepts. **Do not put them on every subsection** — they lose
their meaning if everything is boxed.

```html
<!-- The one sentence to carry into the interview room. Max 1-2 per page. -->
<div class="remember">
  <span class="r-label">Remember this</span>
  <p>DI means: don't create your dependencies yourself — receive them from outside.</p>
  <p>Optional second line: a short clarifier in muted text.</p>
</div>

<!-- Lighter one-line summary, good at the top of a concept -->
<div class="oneline"><b>One line:</b> An index is a sorted lookup structure that trades write speed and storage for read speed.</div>

<!-- 3-7 genuinely important points. Usually once per page, near the end of a big section. -->
<div class="takeaways">
  <span class="t-label">Key takeaways</span>
  <ul><li>…</li></ul>
</div>
```

`.quickrev` at the top of each page stays — it is the page-level revision summary (5–9 bullets).

---

## 5. Interview answers

Two places interview material appears.

**(a) Inline, inside a concept** — how you'd actually say it:

```html
<div class="say-it">
  <span class="s-label">How I'd explain this in an interview</span>
  <p>"I'd use Redis when I need fast access to data that's read a lot…"</p>
</div>
```

Write it as **speech**. Contractions are fine. It must not sound memorised. Short sentences.
2–4 short paragraphs maximum.

**(b) The Q&A section** at the bottom of the page:

```html
<details class="qa">
  <summary>Question as an interviewer would actually ask it</summary>
  <div class="qa-body">
    <div class="say-it">
      <span class="s-label">How I'd answer</span>
      <p>…spoken-style answer, short paragraphs…</p>
    </div>
    <h5>What they're really checking</h5>
    <ul>…</ul>
    <h5>Weak answers</h5>
    <ul><li><span class="redflag">Red flag:</span> …</li></ul>
    <div class="followups">
      <div class="note-title">Likely follow-ups</div>
      <ul>…</ul>
    </div>
  </div>
</details>
```

Group questions under `<h3>`: Basic / Intermediate / Advanced / Scenario / Design.
**No one-line answers.** But no five-paragraph essays either — break them up.

---

## 6. Labels

Two independent axes. Put them inline in the heading.

**Difficulty** (from the original brief):

```html
<span class="lvl lvl-b">🟢 Beginner</span>
<span class="lvl lvl-i">🟡 Intermediate</span>
<span class="lvl lvl-a">🔴 Advanced</span>
```

**Importance** — be honest, do not mark everything must-know:

```html
<span class="pill pill-must">🔥 Must know</span>      <!-- you will be asked this -->
<span class="pill pill-senior">⭐ Senior-level</span>  <!-- shows real experience -->
<span class="pill pill-good">💡 Good to know</span>    <!-- nice, not critical -->
```

Rough budget per page: 1–3 "Must know", 1–3 "Senior-level", the rest unlabelled or "Good to know".

---

## 7. Code

Keep examples **small**. Don't introduce five classes to show one idea.

```html
<pre data-label="csharp — what this snippet shows"><code class="language-csharp">…</code></pre>
<pre data-label="csharp — bad: loads every row into memory" class="code-bad"><code class="language-csharp">…</code></pre>
<pre data-label="csharp — fixed" class="code-good"><code class="language-csharp">…</code></pre>
```

- Escape `<`, `>`, `&` as `&lt;` `&gt;` `&amp;` (generics need this constantly).
- Languages: `csharp`, `sql`, `js`, `ts`, `json`, `yaml`, `bash`, `hcl`, `bicep`, `http`, `kql`.
  Use `data-nohl` on `<code>` for plain text or diagrams.
- **Always explain the snippet after it** — what happens, why it's written that way, what problem it
  solves, what the interviewer may ask next.
- Bad→good pairs must name the *specific* failure, not "this is messy".

---

## 8. Common mistakes

Must be concrete and diagnosable.

| Don't write | Write |
|---|---|
| "Consider performance carefully." | "Calling `.ToList()` before `.Where()` loads the whole table into memory, then filters in C#." |
| "Improper use of async can cause issues." | "`.Result` on an async call inside ASP.NET Core deadlocks the request thread." |

Use the callout:

```html
<div class="note warn"><div class="note-title">Common mistake</div>…</div>
<div class="note danger"><div class="note-title">Production trap</div>…</div>
<div class="note tip"><div class="note-title">Best practice</div>…</div>
<div class="note senior"><div class="note-title">Senior signal</div>…</div>
<div class="note info"><div class="note-title">Note</div>…</div>
<div class="note compare"><div class="note-title">Trade-off</div>…</div>
```

---

## 9. Comparisons

Simple table, then **one plain-English paragraph** saying which to pick and when.
A table with no verdict is a data dump.

Extra helpers:

```html
<ol class="steps"><li>…</li></ol>                     <!-- numbered walkthrough -->
<div class="vs-grid">
  <div class="bad"><span class="vs-label">Don't say</span><p>…</p></div>
  <div class="good"><span class="vs-label">Say instead</span><p>…</p></div>
</div>
```

---

## 10. Page template

```html
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>PAGE TITLE — SECTION</title>
<meta name="description" content="One sentence.">
<meta name="keywords" content="lowercase search terms">
<link rel="stylesheet" href="../assets/handbook.css">
</head>
<body data-page="NN-section/page.html" data-root="..">

<div class="hb-layout">
<main class="hb-main">
<article class="hb-article">

  <header class="hb-pagehead">
    <h1>Page Title</h1>
    <p class="subtitle">One or two plain sentences on what this covers.</p>
    <div class="meta">
      <span class="lvl lvl-i">🟡 Intermediate</span>
      <span class="pill pill-must">🔥 Must know</span>
    </div>
  </header>

  <div class="quickrev">
    <div class="note-title">Quick revision</div>
    <ul><li>…5–9 bullets you must be able to say out loud…</li></ul>
  </div>

  <h2 id="stable-id">Section</h2>
  …

</article>
</main>
</div>

<script src="../assets/nav-data.js"></script>
<script src="../assets/search-index.js"></script>
<script src="../assets/handbook.js"></script>
</body>
</html>
```

- `data-root` is `..` for topic pages, `.` for the root `index.html`.
- Header, sidebar, breadcrumbs, TOC, prev/next and footer are generated by `handbook.js`. Don't write them.
- No `<style>` blocks. New visuals get a class in `handbook.css`.
- Write explicit stable `id`s on every `<h2>` so cross-page anchors don't break.

---

## 11. Respect the learning path

Section order in `assets/nav-data.js` **is** the learning path (see DECISIONS D-018). When writing a page:

- Never require a concept from a **later** section. If you must mention one, link forward and give a
  one-sentence gloss so the reader isn't blocked.
- Freely assume anything from an **earlier** section, and link back rather than re-explaining.
- Section index pages should include a short "where this sits in the learning path" note saying what
  came before and what comes next.

---

## 12. Don't repeat yourself across pages

One page **owns** each concept; others link to it. `CONTENT_MAP.md` records ownership.
Link the first substantive mention only.

---

## 13. After writing

```bash
node tools/build-index.mjs
```

Fix anything under "BROKEN INTERNAL LINKS", then:

```bash
node tools/check-highlight.mjs
```

This runs the real highlighter over every code block and verifies that stripping the tags returns
the original source. **It must report 0 problems.** Then update `PROJECT_STATUS.md` and
`CONTENT_MAP.md`.

---

## 14. Quick self-check before finishing a page

- [ ] Does the concept open with **In simple terms**, before any jargon?
- [ ] Is there an analogy where one genuinely helps?
- [ ] Does it avoid requiring anything from a later section?
- [ ] Could I read this at 11pm the night before an interview and follow it?
- [ ] Does the first example appear early, not after four paragraphs?
- [ ] Are the paragraphs short?
- [ ] Is there at least one "Remember this" or "One line" for the core idea?
- [ ] Do the interview answers sound like speech, not prose?
- [ ] Are the common mistakes specific enough to recognise in real code?
- [ ] Is the depth still there — internals, trade-offs, failure modes, production behaviour?
- [ ] Have I avoided labelling everything "Must know"?
