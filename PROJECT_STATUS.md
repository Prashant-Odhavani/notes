# PROJECT_STATUS.md

**Project:** .NET Developer Interview Handbook (local, static HTML)
**Target reader:** .NET developer with ~7 years experience preparing for mid-to-senior interviews.
**Root:** `F:\software-interview-handbook`

> This file is the source of truth for progress. Do not rely on conversation history.
> Verify reality with `node tools/build-index.mjs` before trusting the table below.

---

## ⚠ Two rules that govern everything

**1. Section order is the learning path.** `assets/nav-data.js` orders sections so the handbook reads
front-to-back as a journey: C# → OOP → SOLID → LINQ → advanced C# → .NET platform → ASP.NET Core →
databases → EF Core → testing → architecture → cloud/DevOps → front-end → interview prep.
**No page may require a concept from a later section.** See `DECISIONS.md` D-018.

**2. Explain simply, then go deep.** Every important concept opens with an **In simple terms** block
and, where it helps, a **Think of it this way** analogy — *before* any formal definition. Technical
depth is unchanged; only the on-ramp differs. See `DECISIONS.md` D-019 and `STYLE_GUIDE.md` §3.

Reference pages written to this standard: `03-solid/index.html` (best example), `02-oop/*`,
`19-architecture/distributed-data.html`. **Read one before writing a new page.**
Targets: average paragraph ≈ 30–40 words, no paragraph over ~90 words.

---

## How to resume work (read this first)

1. Read `STYLE_GUIDE.md` and `DECISIONS.md`.
2. Run `node tools/build-index.mjs` — prints missing pages and any broken links. That output beats
   this file if they disagree.
3. Run `node tools/check-highlight.mjs` — must report **0 problems**.
4. Pick the next unfinished section **in numeric order** (that is the learning path).
5. Check `CONTENT_MAP.md` first so you don't re-explain a concept another page owns.
6. After each batch: re-run both tools, then update this file and `CONTENT_MAP.md`.

Structure is declared in `assets/nav-data.js`. **Add a page there before creating the file** —
navigation, prev/next, breadcrumbs and the home page grid are all generated from it.

---

## Status

Legend: ✅ complete · 🟡 in progress · ⬜ not started

### Part 1 — C# Language Foundations
| # | Section | Pages | Status |
|---|---------|-------|--------|
| 01 | C# Fundamentals | 4 | ✅ |
| 02 | Object-Oriented Programming | 3 | ✅ |
| 03 | SOLID Principles | 1 | ✅ |
| 04 | LINQ | 2 | ✅ |
| 05 | C# Advanced: Memory, Async & Concurrency | 5 | ✅ |

### Part 2 — .NET Platform & Web APIs
| # | Section | Pages | Status |
|---|---------|-------|--------|
| 06 | .NET Platform Fundamentals | 4 | ✅ |
| 07 | ASP.NET Core | 7 | ✅ |
| 08 | HTTP & Web API Design | 5 | ✅ |
| 09 | .NET Framework & Modernization | 1 | ✅ |

### Part 3 — Data Access & Databases
| # | Section | Pages | Status |
|---|---------|-------|--------|
| 10 | SQL & Azure SQL | 10 | ✅ |
| 11 | Entity Framework Core | 6 | ✅ |
| 12 | PostgreSQL | 6 | ✅ |
| 13 | MongoDB | 5 | ✅ |
| 14 | Azure Cosmos DB | 6 | ✅ |
| 15 | DynamoDB | 4 | ✅ |
| 16 | Redis & Caching | 5 | ✅ |

### Part 4 — Testing & Quality
| # | Section | Pages | Status |
|---|---------|-------|--------|
| 17 | Testing | 4 | ✅ |

### Part 5 — Architecture & Distributed Systems
| # | Section | Pages | Status |
|---|---------|-------|--------|
| 18 | Design Patterns | 5 | ✅ (upgraded — see D-023) |
| 19 | Architecture & Integration | 7 | ✅ |
| 20 | Microservices | 6 | ✅ |
| 21 | Messaging & Pub/Sub | 1 | ✅ |
| 22 | Kafka | 4 | ✅ |
| 23 | Multi-Tenant SaaS | 5 | ✅ |

### Part 6 — Cloud, DevOps & Delivery
| # | Section | Pages | Status |
|---|---------|-------|--------|
| 24 | Azure Cloud | 12 | ✅ |
| 25 | Docker & Kubernetes | 4 | ✅ |
| 26 | Infrastructure as Code | 4 | ✅ |
| 27 | Git & Source Control | 1 | ✅ |
| 28 | GitHub Actions & CI/CD | 1 | ✅ |
| 29 | Software Delivery Lifecycle | 9 | ✅ |

### Part 7 — Front-End for .NET Developers
| # | Section | Pages | Status |
|---|---------|-------|--------|
| 30 | HTML, CSS & JavaScript | 5 | ✅ |
| 31 | Angular | 5 | ✅ |
| 32 | React | 5 | ✅ |

### Part 8 — AI-Assisted Development
| # | Section | Pages | Status |
|---|---------|-------|--------|
| 33 | AI-Assisted Development | 1 | ✅ |
| 34 | Model Context Protocol | 1 | ✅ |

### Part 9 — Interview Preparation
| # | Section | Pages | Status |
|---|---------|-------|--------|
| 35 | Scaling Scenarios | 7 | ✅ |
| 36 | System Design Exercises | 11 | ✅ |
| 37 | Final Interview Prep | 8 | ✅ |

**Total declared pages: 181** (180 topic pages + home).

---

## Current position

- **Complete:** infrastructure (CSS, runtime JS, nav data, build + highlight checkers, home page),
  and sections **01** (C# Fundamentals), **02** (OOP), **03** (SOLID), **04** (LINQ), **05** (Advanced C#), **06** (.NET Platform), **07** (ASP.NET Core), **08** (HTTP/APIs), **09** (.NET Framework), **18** (Design Patterns), **19** (Architecture), **29** (SDLC).
- **Partial:** section **10** (SQL) — index page only.
- **Parts 1 and 2 are complete** (sections 01-09, 32 pages).
- **Section 10 (SQL & Azure SQL) is complete** — 10 pages, the largest single section in the handbook.
- **Sections 10 (SQL, 10 pages), 11 (EF Core, 6 pages) and 12 (PostgreSQL, 6 pages) are complete.**
- Section 12 is written as **differences from SQL Server** rather than SQL from scratch, since the SQL section already covers the shared fundamentals. Key differentiators: MVCC/vacuum, heap storage, GIN/BRIN, SSI serializable, process-per-connection pooling.
- **Section 13 (MongoDB, 5 pages) is complete.** Written around document modelling as the thing that determines everything else; ESR for indexes; change streams as the built-in outbox.
- **Section 14 (Cosmos DB, 6 pages) is complete.** Organised around the two irreversible decisions (partition key, throughput model) since everything else follows from them. Key differentiators covered: RU economics, hierarchical partition keys, the five consistency levels and session-token propagation, change feed as built-in outbox.
- **Section 15 (DynamoDB, 4 pages) is complete.** Framed around the reversed design process (access patterns first, because the key structure *is* the query capability) rather than presenting single-table design as the headline. Covers the filter-expressions-don't-reduce-cost trap, sparse indexes for the "query by status" problem, GSI throttling propagating to base-table writes, and `ClientRequestToken` transaction idempotency.
- **PART 3 (Data Access & Databases) IS COMPLETE** — sections 10-16, 42 pages. SQL, EF Core, PostgreSQL, MongoDB, Cosmos DB, DynamoDB, Redis.
- **Parts 1, 2 and 3 are complete** (sections 01-16, 64 content pages + home).
### USER-DIRECTED ORDER CHANGE (this session)

The user re-prioritised the remaining parts. Follow this order, not the numeric one:

1. **Part 7 (Front-End)** — ✅ **COMPLETE**, sections 30-32, 15 pages.
2. **Part 5 (Architecture & Distributed Systems)** — IN PROGRESS. Two jobs:
   - **(a) Upgrade section 18 (Design Patterns) first.** The user explicitly asked for the important patterns
     (Factory, Strategy, CQRS, Singleton, Mediator) to be explained "with proper example". Audit found all
     patterns present but at ~1/3 the depth of recent pages, and **critically missing the "before" code** —
     Strategy jumps straight to the interface without showing the `switch` it replaces. Each named pattern
     needs: problem statement -> naive code -> pattern applied -> .NET DI wiring -> where it appears in the
     framework itself -> when NOT to use it.
   - **PART 5 IS COMPLETE.** Pattern upgrade done (Factory, Singleton, Strategy, Mediator, CQRS rewritten
     with before/after treatment — see D-023). Sections 20 Microservices, 21 Messaging, 22 Kafka and
     23 Multi-Tenant SaaS all written.
3. **Part 4 (Testing, 4 pages) is COMPLETE.**
4. **Part 6 — Cloud, DevOps & Delivery** — IN PROGRESS.
   - **Section 24 (Azure Cloud) is COMPLETE** — 12 pages. Order written: index, comparisons, service-bus,
     functions, app-service, application-insights, config-secrets, event-hubs, event-grid, storage,
     api-management, aks.
   - **Section 29 (SDLC) was already complete** — 9 pages, written in an earlier session.
   - **Section 25 (Docker & Kubernetes) is COMPLETE** — 4 pages: index, docker, kubernetes, production.
   - **Section 26 (Infrastructure as Code) is COMPLETE** — 4 pages: index, terraform, bicep-arm, practices.
   - **Section 27 (Git) is COMPLETE** — 1 page, written around the object model so that merge/rebase,
     recovery and history rewriting all follow from "commits are immutable content-addressed snapshots".
   - **Section 28 (GitHub Actions) is COMPLETE** — 1 page. Leads on build-once-deploy-the-artefact and
     OIDC federated on the environment; carries a full supply-chain security question (script
     injection, `pull_request_target`, mutable action tags, non-ephemeral self-hosted runners).
   - **PART 6 IS COMPLETE** — sections 24-29, 31 pages. 153 pages on disk, 84.5%.
5. **PART 8 IS COMPLETE** — sections 33-34, 2 pages.
   - **33 AI-Assisted Development:** framed around *verifiability* rather than difficulty ("if this is
     wrong, will I find out?"), confident-wrongness as the failure mode, and reviewing generated code
     *harder* because you have no mental model from writing it. Calibrated on productivity claims.
   - **34 MCP:** N×M → N+M framing, the three primitives distinguished by *who controls invocation*,
     both transports, and a full security treatment — prompt injection bounded by server-side
     authorisation, identity from the session never a parameter, prompt-level defences are advisory.
6. **NEXT: Part 9 — Interview Preparation** (26 pages, the last part):
   - 35 Scaling Scenarios (7 pages) — COMPLETE. index.html carries the six-step diagnosis method and
     the ten recurring failure patterns; the six scenario pages reference back to it rather than
     repeating the method.
   - 36 System Design Exercises (11 pages) — COMPLETE. index + method, then nine worked designs.
     Each design is driven by a DIFFERENT consistency requirement on purpose, so the set demonstrates
     matching architecture to requirements rather than one remembered pattern.
   - 37 Final Interview Prep (8 pages) — COMPLETE.

## THE HANDBOOK IS COMPLETE — 181 / 181 pages, 100%

All nine parts, all 37 sections, 1,803 indexed headings, 4.89 MB of HTML, 846 code blocks.
All six validators clean: links, anchors, structure, prose slips, control characters, page
boilerplate — plus the separate highlighter round-trip check.

### If work resumes on this project

There is no remaining scope from the original specification. Anything further is refinement, and
the highest-value options are, in order:

1. **Read the earliest sections against the later standard.** Sections 01-09 were written before
   several conventions settled — in particular before the "state the mechanism, then the production
   consequence" framing became explicit, and before `.quickrev` blocks were used
   consistently. They are correct but thinner than Parts 5-9.
2. **Verify version-sensitive claims.** Anything naming a specific limit, default or tier — Azure
   service limits, EF Core behaviour, Functions plans, APIM tier features — was accurate when written
   and Azure moves. The pages state versions where it matters; a periodic pass is worthwhile.
3. **Cross-link density.** Later parts reference earlier ones heavily; the reverse is rarer. Adding
   forward references from fundamentals into the scenario and design pages would help the
   learning-path reading order.
4. **A print or single-file export**, if offline reading on paper is ever wanted. The nav is generated
   from `assets/nav-data.js`, so a concatenating build script is straightforward.

### What NOT to change without reading DECISIONS.md first

- **Page ordering** is a hard architectural constraint (learning path, beginner to advanced). The nav,
   the index and the section indexes all derive from `assets/nav-data.js`.
- **The validators.** Every check exists because a real defect got through — see D-022, D-024, D-025,
   D-027. Each was verified by reintroducing the bug before restoring. Do not relax a check to make a
   page pass; fix the page.
- **The highlighter.** It uses a Private Use Area placeholder technique that is easy to break subtly —
   see the comments in `assets/handbook.js` and run `tools/check-highlight.mjs` after
   any change to it.
   155 pages on disk, 85.6%.
   Then Part 8 (33-34 AI, 2 pages), then Part 9 (35-37 Interview prep, 26 pages).

### Part 4 position worth preserving

The testing section takes a deliberate stance that later parts should not contradict:
- **False positives (brittle tests) are the bigger problem than false negatives.** A suite that breaks on
  every refactor prevents the thing it was written to enable.
- **Mock at boundaries, not at class edges.** Over-mocking means the logic is never tested — only the
  wiring. This is named as the most consequential .NET testing mistake.
- **Weight toward integration tests in .NET**, because the failures that reach production are integration
  failures (SQL translation, DI registration, serialisation, migrations) which mocked unit tests cannot
  catch by construction.
- **Never EF Core's in-memory provider** for query/constraint testing — Testcontainers with real
  `MigrateAsync()`.
- **Coverage is a diagnostic, never a target.** Mutation testing (Stryker.NET) measures what coverage can't.
- **`async void` tests silently pass** — enable xUnit1001 as an error.

### Part 6 threads worth reinforcing later (section 24 Azure)

- **Managed identity is the answer to almost every credential question.** No secret exists, so it cannot be
  committed, leaked or rotated. Reinforced on config-secrets and used again on aks (workload identity) and
  api-management (`authentication-managed-identity`).
- **Caching versus rotation is a real tension, not a mistake.** Key Vault is throttled so secrets must be
  cached at startup; caching is exactly what makes rotation not take effect. Resolution is a bounded refresh
  interval plus two valid credentials during overlap — the same expand-and-contract shape as schema change.
- **Health checks and probes can cause the outage they were meant to prevent.** A check that fails on a shared
  dependency removes every instance at once. Stated on app-service (health check) and aks (liveness probe) in
  the same terms deliberately.
- **The aggregate limit is never the one you hit.** Per-blob storage limits, per-partition Event Hubs
  throughput, per-key rate limits. Same shape as hot partitions in Part 3.
- **Hot keys cannot be fixed by adding capacity** — stated again for Event Hubs partitions, matching the
  DynamoDB/Cosmos/Kafka treatment.
- **At-least-once + idempotent consumer = exactly-once effect.** Restated for Event Hubs checkpointing and
  Event Grid delivery, tied back to Kafka offsets and HTTP idempotency keys.
- **One atomic conditional write is the universal coordination primitive.** Blob ETag `IfMatch` / `IfNoneMatch` explicitly linked to DynamoDB
  condition expressions, Cosmos `_etag`, Redis `SET NX`, SQL `rowversion`.
- **Structural enforcement over procedural.** Security policies at APIM global/product scope so new APIs
  inherit them; `ValidateOnStart()` so misconfiguration fails deployment;
  the `CriticalAddonsOnly` taint so system pods can't be starved. Continues the Part 5 thread.
- **Redundancy is not backup**, and immutability policies are the only defence against a compromised admin.
- **Choose the simplest thing that meets the requirement.** Container Apps before AKS; app settings + Key
  Vault before App Configuration; Storage Queues before Service Bus; no APIM for a single internal API.
  Stated as the senior instinct on each page rather than once.
- **Defaults that silently lose data:** Event Grid dead-lettering off; auto-inflate never scaling down;
  a missing `<base />` dropping inherited APIM policy; system-assigned identity dying
  with the resource.

### Part 6 threads (sections 25 containers, 26 IaC)

- **Structural enforcement over procedural** is now the spine of Part 6. Concrete instances:
  a test stage in the Dockerfile so a broken image cannot be built; `CriticalAddonsOnly` so
  system pods cannot be starved; `LimitRange` so an unspecified pod still gets sane defaults;
  Azure Policy in deny mode because CI only sees what goes through CI; read-only portal access so IaC
  is not merely advisory.
- **Probes and health checks can cause the outage they were meant to prevent.** Stated three times in
  the same terms deliberately — App Service health check (24), AKS liveness probe (24), Kubernetes
  liveness probe (25). A check that fails on a shared dependency removes every instance at once.
- **The .NET runtime is container-aware, and the memory limit is an INPUT not just a ceiling.** The GC
  sizes its heap from the cgroup limit, so a tight limit means aggressive collection, higher CPU and
  possibly an OOM anyway. Raising the limit can reduce CPU. Reinforced on aks.html and production.html.
- **CPU throttling hides from the metric everyone checks.** Per-100ms enforcement means average CPU
  looks low while latency is terrible. Paired with thread-pool starvation as the two container-specific
  causes of "slow but CPU is fine".
- **Graceful shutdown is a distributed problem, not a process one.** Endpoint removal races SIGTERM, so
  a `preStop` sleep is the correct fix. This is the same shape as the App Service slot-swap
  warm-up: the rest of the system has to stop pointing at you first.
- **Layers/state are additive and unforgiving.** A deleted secret is still in the Docker layer; a
  Terraform state file holds secrets in plaintext; `@secure()` only hides values from
  deployment history. All three resolve to the same advice: do not have the secret.
- **Index-based identity is a bug.** Terraform `count` re-indexes and destroys; contrast with
`for_each` keys. Same family as "empty page ≠ end of data" from Part 3 — do not derive identity
  from position.
- **The reviewed artefact must be the executed artefact.** Apply the saved plan, not a fresh one. Same
  reasoning as deploying an image digest rather than rebuilding from a commit.
- **Plan for the emergency instead of forbidding it.** PIM break-glass with alerting and mandatory
  reconciliation. Stated as the mature position on both index.html and practices.html because
  "manual changes are not allowed" reliably produces undocumented manual changes.
- **Choose the simplest thing that meets the requirement** continues: Container Apps before AKS,
  separate .tf files before modules, incremental mode before complete mode, Storage Queues before
  Service Bus.
- **Structural vs capacity parity** across environments — a distinction worth reusing in Part 9
  system-design answers: same resource types and identity model, different SKUs.

### Part 6 threads (27 Git, 28 GitHub Actions)

- **The reviewed/tested artefact must be the executed artefact.** Now stated three times in Part 6 in
  deliberately parallel language: deploy an image digest not a rebuild (25), apply the saved Terraform
  plan not a fresh one (26), build once and deploy that artefact (28). Part 9 system-design answers
  should reuse this phrasing.
- **Identity must not come from position.** Git commits are content-addressed, which is *why* rebase
  cannot move a commit; Terraform `count` re-indexing destroys resources. Same family as
  "empty page ≠ end of data" from Part 3.
- **CI is a privileged execution environment with less scrutiny than production.** A change to a
  workflow file is a privilege change. This is the framing for the section 28 advanced question and is
  worth reusing if Part 9 covers a security-design scenario.
- **Structural enforcement over procedural** completes across Part 6: branch protection instead of
  asking people not to force-push; CI checks because local git hooks are per-machine and skippable;
  GitHub environments because an approval enforced by the platform is not a convention; OIDC federated
  on the environment so the approval gate and the credential are one control.
- **A secret in history is compromised — rotate, don't delete.** Stated identically on 24 (config),
  25 (Docker layers are additive), 26 (Terraform state is plaintext) and 27 (git history). Every one
  resolves to "the best position is having no secret".
- **Never cancel a deploy; queue it.** Partial rollouts and half-applied migrations are worse than a
  wasted minute. Pairs with the graceful-shutdown thread from section 25.
- **A check that never fires is worse than no check.** Path filters silently blocking required checks,
  a gate job that reports success on failure, a drift job that fails quietly, a dead-letter container
  nobody monitors. Same discipline as the validator work in D-022/024/025.

### Part 8 threads (33 AI tools, 34 MCP)

- **The enforcement must live where the untrusted caller cannot reach it.** MCP's central rule —
  identity from the authenticated session, never from a model-supplied parameter — is the same rule as
  never trusting a client-supplied tenant id in a web API, and as locking an APIM backend so the
  gateway cannot be bypassed. Prompt-level defences are advisory in exactly the way client-side
  validation is.
- **Verifiability, not difficulty, decides what to delegate.** "If this is subtly wrong, will I find
  out?" A complex EF Core query is a good candidate (readable SQL, execution plan); a three-line
  business rule is a poor one. Reusable framing for Part 9 answers about risk.
- **A control that depends on attention is not a control.** Part 8 lands this from a new angle:
  analyzers and architecture tests catch a missing tenant filter regardless of who or what wrote the
  code, where a reviewer may not. Continues the structural-not-procedural thread from Parts 5 and 6.
- **Confident wrongness has no uncertainty signal**, which is what makes it worse than a human making
  the same mistake. Named categories to distrust: concurrency, security boundaries, domain invariants,
  recently-changed APIs.
- **Tool/API descriptions are contracts read at decision time.** The MCP point about descriptions being
  the interface generalises: an error response the caller can act on beats a bare failure — same
  instinct as the HTTP error-design material in Part 2.
- **Ask whether it needs to be the interesting thing at all.** "Would a script be better than an MCP
  server?" is the same judgement as Container Apps before AKS and no APIM for a single internal API.

### Part 5 threads worth reinforcing later

- **Slow is worse than dead** — a slow dependency exhausts threads and cascades; a dead one fails fast. Drives
  timeouts being mandatory, and the circuit breaker's real job being to protect the *caller*.
- **Compensation is not rollback** — it is a new business action leaving a trace, which is why irreversible
  steps go last in a saga.
- **At-least-once + idempotency = exactly-once effect.** Stated for messaging, Kafka and sagas. The dedupe
  record must commit in the *same* transaction as the work, or duplicates become lost work.
- **Structural not procedural enforcement** — module boundaries via architecture tests, tenant isolation via
  query filters + RLS. "Developers will remember" always fails.
- **Ordering vs availability** is a genuine trade with no free option: a poison message either blocks its
  partition or breaks ordering for its key. State-based messages (not deltas) dissolve the problem.
- **Runtime resolution from a catalogue** is what makes per-tenant models changeable; one connection string in
  config makes the hybrid impossible.

- **Parts 1, 2, 3 and 7 are complete** (sections 01-16 and 30-32, 79 content pages + home).

### Part 7 threads worth reinforcing later

- **Closures capture variables, not values** — one concept explaining the `var` loop puzzle, React stale
  closures in effects, and closure-based memory leaks. Cross-linked, not repeated.
- **Reference comparison** — Angular `OnPush` and React state both skip updates when a mutated object keeps
  its identity. Same constraint, two frameworks.
- **Client validation is UX, server validation is the control** — stated on the HTML forms page, Angular forms,
  React forms. Same shape as DB constraints vs app validation from Part 3.
- **Virtualise or page rather than memoise** — DOM node count costs are non-framework, so the fix is fewer
  nodes. Stated in both Angular and React performance pages.

### Cross-database threads deliberately established in Part 3

These recur across sections and are cross-linked rather than repeated. Preserve them when writing later parts:

- **The atomic-conditional-write pattern** appears as SQL `UPDATE ... WHERE stock >= @qty`, Postgres
  `ON CONFLICT`, Cosmos ETag, DynamoDB `ConditionExpression`, Redis `SET NX`. Same shape, five stores —
  and it is also the idempotency-key primitive from section 08.
- **Hot partition / hot key** in Cosmos, DynamoDB, Redis cluster and SQL Server. Always: adding capacity does
  not fix skew, because you cannot split a single key.
- **Co-location vs distribution** — Cosmos partition key, DynamoDB single-table design, Redis hash tags. All
  the same trade: atomicity and multi-key operations versus even spread.
- **Change feed / Streams / CDC as built-in outbox** — Cosmos change feed, DynamoDB Streams, Mongo change
  streams, SQL CDC. Removes the dual-write problem; all are at-least-once so handlers must be idempotent.
- **Empty page != end of data** — Cosmos continuation tokens, DynamoDB `LastEvaluatedKey`. Same bug class.
- **Part 1 (C# Language Foundations) is now complete.**
- Run `node tools/build-index.mjs` for the authoritative count at any moment.

---

## Recent structural work (do not redo)

- **Renumbering migration.** Folders were physically renamed into learning-path order and every
  cross-link rewritten. Old numbers (`01-sdlc`, `12-csharp`, `14-dotnet-aspnetcore`, …) no longer exist.
  `12-csharp` was split into `01-csharp-fundamentals` + `05-csharp-advanced`;
  `14-dotnet-aspnetcore` was split into `06-dotnet-platform` + `07-aspnet-core`.
- **Highlighter bug fixed** (D-017). Two bugs leaked raw markup like `class="tok-n">0` into code blocks.
  `tools/check-highlight.mjs` now guards against regressions — run it after any highlighter change.
- **Style upgrade** (D-019). `.simple` / `.analogy` blocks added; SOLID and OOP pages rewritten to lead
  with plain English and analogies.

---

## Known gaps / to verify

- Azure service limits, tier names and pricing (24, 14, 10) — these change frequently. Written to
  explain mechanism first; exact numbers marked "verify".
- Cosmos DB / DynamoDB feature parity claims (14, 15).
- Angular and React version-specific behaviour (31, 32) — signals and concurrent React move fast.
- AI tooling and MCP (33, 34) — fastest-moving area; expect annual rewrites.
- Sections 02/03/18/19/29 predate the `.simple`/`.analogy` convention in places. SOLID and OOP have been
  brought up to standard; 18/19/29 have the plain-English style but few analogies. Add them opportunistically
  when touching those pages — do not do a dedicated pass.

## Maintenance notes

- Search index is generated: never hand-edit `assets/search-index.js`.
- Titles and descriptions in `nav-data.js` are **author-written HTML** (they contain `&amp;`, `&lt;T&gt;`).
  `handbook.js` renders them with `navHtml()`, not `esc()`. Don't re-escape them.
- Treat a non-empty "BROKEN INTERNAL LINKS" list, or any `check-highlight` problem, as a build failure.
