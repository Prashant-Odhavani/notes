# CONTENT_MAP.md

Which page **owns** which concept. Before explaining something, check here: if another page owns it,
link to it instead of re-explaining (see `DECISIONS.md` D-009). Update as pages are written.

Sections are listed in **learning-path order** — the same order as `assets/nav-data.js`.
Format: `path | owns: concepts explained in full here`

---

## Infrastructure

- `index.html` — home, learning path, conventions, study routes | owns: how to use the handbook, label legend.
- `assets/nav-data.js` — parts + sections + pages. Structural source of truth.
- `assets/handbook.css` / `assets/handbook.js` — all styling and runtime behaviour.
- `tools/build-index.mjs` — search index, link checking, completion reporting.
- `tools/check-highlight.mjs` — runs the real highlighter over every code block; asserts no content loss.
- `tools/serve.mjs` — local preview server (optional; pages work from `file://` too).

---

# Part 1 — C# Language Foundations

## 01 — C# Fundamentals
_Not yet written._ Will own: value vs reference types, stack vs heap, boxing, structs, records, enums,
nullable reference types, generics, delegates, events, lambdas, extension methods, iterators,
pattern matching, C# 8–13 feature history.

## 02 — Object-Oriented Programming
- `02-oop/index.html` | owns: why OOP is interviewed, four-pillar summary table, OOP vs FP position,
  the kitchen analogy, where OOP sits in the learning path.
- `02-oop/fundamentals.html` | owns: encapsulation/invariants (cash-machine analogy), abstraction
  (car-pedals analogy), inheritance vs substitutability (payment-card analogy), abstract class vs
  interface table, overloading vs overriding, `virtual`/`override`/`new`, virtual dispatch and `sealed`,
  constructor virtual-call trap.
- `02-oop/advanced.html` | owns: composition over inheritance (decorator example + hiring analogy),
  association/aggregation/composition, coupling taxonomy, cohesion (kitchen-drawer analogy), LSP in
  practice, immutability, object lifetime, Law of Demeter, anaemic domain model debate.

## 03 — SOLID
- `03-solid/index.html` | owns: all five principles with an analogy and mental model each, bad/good C#,
  the interaction table, DIP vs DI vs IoC distinction, when NOT to apply SOLID.
  **This is the reference page for the house style.**

## 04 — LINQ
_Not yet written._ Will own: `IEnumerable` vs `IQueryable`, deferred vs immediate execution, expression
trees, operators, LINQ providers, query translation, N+1, client evaluation.

## 05 — C# Advanced: Memory, Async & Concurrency
_Not yet written._ Will own: GC generations, LOH, `IDisposable`, finalizers, `Span<T>`, pooling, leaks;
async state machines, `SynchronizationContext`, `ValueTask`, deadlocks, cancellation; threads, thread
pool, locks, `SemaphoreSlim`, concurrent collections, channels; reflection, source generators, benchmarking.

---

# Part 2 — .NET Platform & Web APIs

## 06 — .NET Platform Fundamentals
_Not yet written._ Will own: CLR, JIT, AOT, target frameworks, CLI, NuGet, project system; generic host,
DI lifetimes, captive dependencies, scopes; configuration providers, options pattern, structured logging.

## 07 — ASP.NET Core
_Not yet written._ Will own: middleware pipeline and ordering, endpoint routing, controllers vs minimal
APIs, model binding, validation, filters, authn/authz, JWT/cookies, CORS, background services, Kestrel,
`HttpClientFactory`, Polly, rate limiting, health checks, versioning, OpenAPI, `ProblemDetails`.

## 08 — HTTP & Web API Design
_Not yet written._ Will own: methods and status codes, headers, caching and ETags, HTTP/1.1 vs 2 vs 3,
REST constraints, versioning strategies, pagination/filtering, error shapes, OAuth 2.0, OIDC, CSRF,
idempotency keys, webhook design.

## 09 — .NET Framework & Modernization
_Not yet written._ Will own: CLR/AppDomains/GAC, IIS pipeline, ASP.NET MVC/Web API, WCF,
.NET Framework vs modern .NET, migration strategy.

---

# Part 3 — Data Access & Databases

## 10 — SQL & Azure SQL
- `10-sql/index.html` | owns: how SQL is interviewed, what to prioritise, the "how many pages does it
  read?" mental model.
- Remaining 9 pages not yet written. Will own: keys/constraints/normalization, indexing (clustered,
  covering, column order), joins/CTEs/window functions/pagination, ACID and isolation levels, locking
  and deadlocks, stored procedures/views/triggers, execution plans and SARGability, partitioning and
  replication, Azure SQL tiers and HA, worked interview problems.

## 11 — Entity Framework Core
_Not yet written._ Will own: `DbContext` lifetime, change tracking, entity states, fluent mapping,
migrations, loading strategies, split queries, `SaveChanges` semantics, optimistic concurrency,
N+1 and cartesian explosion, compiled queries.

## 12 — PostgreSQL
_Not yet written._ Will own: types/JSONB/arrays, GIN/GiST/BRIN indexes, MVCC and snapshots,
`EXPLAIN ANALYZE`, autovacuum and bloat, partitioning, replication, connection pooling.

## 13 — MongoDB
_Not yet written._ Will own: BSON, embedding vs referencing, schema patterns, compound/multikey/text/TTL
indexes, aggregation pipeline, replica sets and elections, write/read concern, sharding, change streams.

## 14 — Azure Cosmos DB
_Not yet written._ Will own: logical vs physical partitions, partition key choice, RU/s and autoscale,
five consistency levels, indexing policy, point reads vs cross-partition queries, change feed,
multi-region writes, conflict resolution, cost control, Cosmos vs MongoDB vs DynamoDB.

## 15 — DynamoDB
_Not yet written._ Will own: partition/sort keys, query vs scan, GSI/LSI, single-table design,
on-demand vs provisioned, hot partitions, streams, TTL, global tables.

## 16 — Redis & Caching
_Not yet written._ Will own: single-threaded model, data types, cache-aside and write-through,
TTL strategy, cache stampede, distributed locks and the Redlock debate, rate limiting, RDB/AOF,
eviction policies, cluster, hot keys.

---

# Part 4 — Testing & Quality

## 17 — Testing
_Not yet written._ Will own: test pyramid, AAA, mocks vs stubs vs fakes, when mocking harms, xUnit/NUnit,
Moq/NSubstitute, async testing, `WebApplicationFactory`, Testcontainers, contract tests, coverage,
mutation testing, flaky tests.

---

# Part 5 — Architecture & Distributed Systems

## 18 — Design Patterns
- `18-design-patterns/index.html` | owns: what patterns are for, patterns already in .NET, language
  features that replace patterns, problem→pattern lookup table.
- `creational.html` | owns: Factory Method (+ self-selecting implementations, keyed services),
  Abstract Factory, Builder, Singleton (thread safety, DI vs static, captive dependency), Prototype
  (shallow vs deep copy).
- `structural.html` | owns: Adapter (three translation jobs incl. exceptions), Decorator (+ ordering
  rules, registration), Proxy (+ decorator vs proxy table), Facade, Composite (+ N+1 trap), Bridge.
- `behavioral.html` | owns: Strategy, Observer (+ domain event dispatch timing, lapsed listener),
  Command, Chain of Responsibility (middleware), Template Method, State (transition table), Mediator.
- `enterprise.html` | owns: Repository (+ the "do you need it with EF Core?" debate), Unit of Work,
  Specification, DI as a pattern, CQRS (cheap version first), Event Sourcing (+ GDPR/crypto-shredding).

## 19 — Architecture & Integration
- `19-architecture/index.html` | owns: what architecture decides, the fewer-vs-more-pieces trade-off
  table, what changes when you cross a network, how to choose an architecture.
- `application-architecture.html` | owns: layered/N-tier and its flaw, Clean vs Hexagonal vs Onion
  (same idea), the .NET project-reference structure, Vertical Slice, Modular Monolith (+ enforcement).
- `ddd.html` | owns: strategic vs tactical DDD, ubiquitous language, bounded contexts, context
  relationships, anti-corruption layer, entity vs value object, aggregates as consistency boundaries,
  the four aggregate rules, cross-aggregate rules, domain vs integration events.
- `event-driven.html` | owns: commands vs events, thin vs fat events, choreography vs orchestration,
  the real costs of event-driven, event design rules, when not to use it.
- `integration-patterns.html` | owns: four communication styles, async request/reply (202 + status URL),
  API gateway (and what it must never do), BFF, queue-based load levelling, competing consumers,
  claim check, strangler fig.
- `resilience-patterns.html` | owns: the cascade mechanism, timeout, retry (+ retry storms),
  circuit breaker (three states, misconfiguration), bulkhead, rate limiting vs load shedding, fallback.
- `distributed-data.html` | owns: the dual-write bug, outbox pattern (+ operations), idempotency,
  inbox pattern, idempotency keys, sagas and compensation, why 2PC is avoided, eventual consistency
  as a product decision, dead-letter queues.

## 20 — Microservices
_Not yet written._ Will own: finding boundaries, database-per-service, REST vs gRPC vs messaging,
service discovery, distributed tracing, deployment and versioning, testing strategy, strangler
migration, when NOT to split.

## 21 — Messaging & Pub/Sub
_Not yet written._ Will own: queue vs topic semantics, fan-out, delivery guarantees, retry and DLQ
mechanics, ordering, idempotent consumers.

## 22 — Kafka
_Not yet written._ Will own: brokers/topics/partitions, replication and ISR, consumer groups and
offsets, delivery semantics, idempotent producer and transactions, rebalancing, lag, retention and
compaction, Kafka vs Event Hubs vs Service Bus.

## 23 — Multi-Tenant SaaS
_Not yet written._ Will own: isolation models, tenant resolution and context propagation, tenant-aware
data access, RBAC, cross-tenant leak prevention, noisy neighbours, per-tenant scaling, onboarding,
metering and billing, tenant migration.

---

# Part 6 — Cloud, DevOps & Delivery

## 24 — Azure Cloud
_Not yet written._ Will own: App Service, Functions, AKS, API Management, Service Bus, Event Hubs,
Event Grid, Storage, App Configuration/Key Vault, Application Insights, plus the service comparison
decision tables.

## 25 — Docker & Kubernetes
_Not yet written._ Will own: images and layers, Dockerfiles, multi-stage builds, volumes/networks,
container security, pods/deployments/services/ingress, config and secrets, HPA, probes, rollouts,
Docker vs VM, Docker vs Kubernetes.

## 26 — Infrastructure as Code
_Not yet written._ Will own: declarative vs imperative, state and drift, modules, Terraform
(providers/state/backends/workspaces), Bicep and ARM, Terraform vs Bicep vs ARM.

## 27 — Git & Source Control
_Not yet written._ Will own: the object model, merge vs rebase, cherry-pick, reset vs revert, stash,
conflict resolution, GitFlow vs trunk-based, branch protection, recovery scenarios.

## 28 — GitHub Actions & CI/CD
_Not yet written._ Will own: workflows/events/jobs/steps, runners, secrets and environments, approvals,
caching, matrix builds, reusable workflows, OIDC to Azure, deployment strategies.

## 29 — Software Delivery Lifecycle
- `29-sdlc/index.html` | owns: what a senior contributes per stage, defect-cost economics, feedback-loop
  principle.
- `requirements.html` | owns: elicitation techniques, functional vs non-functional, the NFR checklist,
  acceptance criteria, INVEST, ambiguity tells, state-transition analysis, scope creep handling.
- `estimation-planning.html` | owns: cone of uncertainty, estimation techniques, story points vs hours,
  work splitting, Little's Law, flow metrics, communicating estimates honestly.
- `architecture-design.html` | owns: one-way vs two-way doors, design-doc skeleton, ADR format,
  trade-off axes, the over-engineering counter-test, spikes, design review.
- `development.html` | owns: PR size effects, the review checklist, review communication, Definition of
  Done, what to automate instead of reviewing.
- `testing.html` | owns: shift-left ladder, test strategy as an artefact, quality gates, environments and
  test data, non-functional test types, who owns quality.
- `cicd-deployment.html` | owns: CI vs CD vs continuous deployment, build-once/promote-many, deployment
  strategies, feature flags, expand-and-contract migrations, rollback strategy, DORA metrics.
- `operations.html` | owns: monitoring vs observability, RED/USE, cardinality, SLI/SLO/SLA/error budget,
  alerting rules, incident roles and response order, severity levels, postmortems, sustainable on-call.
- `process.html` | owns: Scrum vs Kanban, making ceremonies useful, DevOps as an ownership model,
  technical debt taxonomy and funding, refactoring discipline, documentation types.

---

# Part 7 — Front-End for .NET Developers

## 30 — HTML, CSS & JavaScript
_Not yet written._ Will own: semantic HTML, accessibility, box model, flexbox/grid, specificity,
closures, `this`, prototypes, promises, the event loop and microtasks, modules, jQuery legacy and migration.

## 31 — Angular
_Not yet written._ Will own: components/templates/directives/pipes, DI, standalone components, RxJS,
signals, change detection and OnPush, reactive forms, guards, interceptors, lazy loading, performance.

## 32 — React
_Not yet written._ Will own: JSX, props/state, hooks and their rules, context, refs, reconciliation and
the virtual DOM, memoization, concurrent React, state management options, error boundaries, XSS.

---

# Part 8 — AI-Assisted Development

## 33 — AI-Assisted Development
_Not yet written._ Will own: context management, repo understanding, code generation and review,
hallucination management, verification discipline, agentic workflows, enterprise privacy, Claude vs Cursor.

## 34 — Model Context Protocol
_Not yet written._ Will own: MCP architecture, client/server model, tools/resources/prompts, transports,
authentication, tool design, permission boundaries, security risks, custom servers.

---

# Part 9 — Interview Preparation

## 35 — Scaling Scenarios
_Not yet written._ Will own: the diagnosis method, then API/database/distributed/caching/SaaS/Azure
scenarios — each with how to identify the bottleneck, metrics to inspect, immediate mitigation,
long-term fix, trade-offs and what the interviewer expects.

## 36 — System Design Exercises
_Not yet written._ Will own: how to run a design interview, plus nine full designs.

## 37 — Final Interview Prep
_Not yet written._ Will own: rapid revision, top questions, senior-level questions, architecture
questions, troubleshooting scenarios, behavioural + technical, red flags.

---

## Deliberate cross-page boundaries

The pairs most likely to be duplicated. Owner listed first.

| Concept | Owner | Others link to it |
|---|---|---|
| Idempotency, outbox, saga | `19-architecture/distributed-data.html` | 20-microservices, 21-messaging, 22-kafka, 29-sdlc, 36-system-design |
| Retry / circuit breaker / timeout | `19-architecture/resilience-patterns.html` | 07-aspnet-core, 18-design-patterns/structural, 35-scaling-scenarios |
| Decorator pattern | `18-design-patterns/structural.html` | 02-oop/advanced, 19-architecture |
| Aggregates, bounded contexts | `19-architecture/ddd.html` | 02-oop/advanced, 20-microservices |
| DI lifetimes & captive dependency | `06-dotnet-platform/hosting-di-config.html` | 02-oop/advanced, 18-design-patterns/creational |
| DIP vs DI vs IoC | `03-solid/index.html` | 18-design-patterns/enterprise, 19-architecture |
| Expand-and-contract migrations | `29-sdlc/cicd-deployment.html` | 10-sql, 11-ef-core |
| Isolation levels & locking | `10-sql/transactions.html` | 11-ef-core, 12-postgresql, 35-scaling-scenarios |
| Test doubles & mocking limits | `17-testing/fundamentals.html` | 29-sdlc/testing |
| Eventual consistency | `19-architecture/distributed-data.html` | 14-cosmos-db, 18-design-patterns/enterprise, 20-microservices |

---

## Concept owners added in Parts 6-9

Completing the table above for the parts written last. Owner listed first; the others reference it
rather than restating it.

| Concept | Owner | Others link to it |
|---|---|---|
| Managed identity, no-secret credentials | `24-azure/config-secrets.html` | 24-azure/aks, 24-azure/api-management, 26-iac/practices, 28-github-actions |
| Hot partition / hot key (the shared physics) | `14-cosmos-db/fundamentals.html` | 15-dynamodb, 22-kafka, 24-azure/event-hubs, 35-scaling-scenarios/database, 35-scaling-scenarios/caching |
| Requests, limits, QoS, probes | `25-docker-kubernetes/production.html` | 24-azure/aks, 35-scaling-scenarios/cloud |
| Graceful shutdown / preStop race | `25-docker-kubernetes/production.html` | 24-azure/app-service (slot warm-up analogue), 35-scaling-scenarios/cloud |
| .NET GC behaviour inside a container | `25-docker-kubernetes/production.html` | 24-azure/aks, 35-scaling-scenarios/api, 37-final-prep/troubleshooting |
| Terraform state, drift, plan discipline | `26-iac/terraform.html` and `26-iac/practices.html` | 26-iac/index, 28-github-actions |
| OIDC federation for CI | `28-github-actions/index.html` | 26-iac/practices |
| Git object model, merge vs rebase | `27-git/index.html` | 29-sdlc/development |
| Prompt injection, tool authorisation | `34-mcp/index.html` | 33-ai-tools |
| Six-step production diagnosis method | `35-scaling-scenarios/index.html` | all six 35-* scenario pages, 37-final-prep/troubleshooting |
| Ten recurring failure patterns | `35-scaling-scenarios/index.html` | 35-* pages, 36-system-design, 37-final-prep/rapid-revision |
| Design-interview method and scoring | `36-system-design/method.html` | all nine 36-* designs, 37-final-prep/architecture-questions |
| Atomic conditional write as the universal primitive | `36-system-design/booking.html` | 35-scaling-scenarios/distributed, 36-system-design/payments, 36-system-design/background-jobs, 37-final-prep/* |
| Tenant isolation enforced structurally | `23-multi-tenant-saas/tenant-context.html` | 36-system-design/multi-tenant-saas, 35-scaling-scenarios/saas, 35-scaling-scenarios/caching |

## Where Part 9 deliberately repeats

Part 9 is revision material, so it restates rather than links in three places. This is intentional and
should not be "fixed":

- `37-final-prep/rapid-revision.html` compresses the whole handbook into one page. Every line is a
  restatement by design — it exists to be read in one sitting the morning of an interview.
- `37-final-prep/top-questions.html` and `37-final-prep/senior-questions.html` re-answer
  questions that also appear on their topic pages, because a candidate revising will not navigate to
  nine sections to rehearse ten answers.
- `37-final-prep/troubleshooting.html` re-runs scenarios from section 35 in condensed spoken form.
  Section 35 teaches the diagnosis; Part 9 rehearses saying it.

The rule applied: **Parts 1-8 own concepts and must not duplicate each other. Part 9 is allowed to
restate anything, because rehearsal is its purpose.**
