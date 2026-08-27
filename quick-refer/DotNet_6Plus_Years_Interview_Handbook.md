# .NET Developer (6+ Years) Interview Handbook

## Purpose
A practical interviewer guide for evaluating a **6+ years experienced .NET developer** across core language knowledge, architecture, databases, cloud, frontend, AI-assisted development, and testing.

## How to use this handbook
- Ask the question first without showing the answer.
- Let the candidate explain their reasoning and ask follow-up questions.
- Use the expected-answer notes as a benchmark, not as a script.
- Strong senior candidates should explain **trade-offs, failure modes, production experience, and why they chose an approach**.
- Do not score only terminology or memorized definitions.

## Suggested scoring
Score each question from **0 to 3**:
- **0 – No knowledge:** Incorrect or cannot explain.
- **1 – Basic:** Knows the definition but lacks practical depth.
- **2 – Good:** Correct explanation with practical understanding.
- **3 – Strong:** Explains trade-offs, edge cases, production implications, and gives relevant examples.

Suggested interpretation:
- **0–35%:** Major skill gaps.
- **36–55%:** Basic/intermediate developer; may need significant guidance.
- **56–70%:** Solid developer.
- **71–85%:** Strong 6+ year developer.
- **86%+:** Very strong; validate architecture, leadership, and real production ownership.

---

## OOPs

### 1. [Basic] What are the four pillars of OOP?

**Expected answer / interviewer notes:** Encapsulation, abstraction, inheritance, and polymorphism. Candidate should distinguish their purpose, not just define them.

### 2. [Basic] What is the difference between abstraction and encapsulation?

**Expected answer / interviewer notes:** Abstraction hides unnecessary complexity; encapsulation protects and controls object state.

### 3. [Basic] What is inheritance?

**Expected answer / interviewer notes:** A derived class reuses/extends a base class. Discuss when composition is preferable.

### 4. [Basic] What is polymorphism?

**Expected answer / interviewer notes:** Same interface/member can produce different behavior. Compile-time: overloads; runtime: overriding/virtual dispatch.

### 5. [Basic] What is the difference between method overloading and overriding?

**Expected answer / interviewer notes:** Overloading changes signature at compile time; overriding replaces virtual/abstract behavior at runtime.

### 6. [Basic] What is an interface versus an abstract class?

**Expected answer / interviewer notes:** Interface defines a contract; abstract class can share state and implementation. Modern C# interfaces can have default members, but use carefully.

### 7. [Intermediate] What is composition over inheritance?

**Expected answer / interviewer notes:** Prefer assembling behavior from collaborating objects when an 'is-a' relationship is weak or inheritance causes tight coupling.

### 8. [Intermediate] Explain virtual, abstract, and sealed members/classes.

**Expected answer / interviewer notes:** virtual allows overriding; abstract requires implementation; sealed prevents inheritance or further overriding.

### 9. [Intermediate] What is a base-class fragility problem?

**Expected answer / interviewer notes:** Changes in a base class can unexpectedly break derived classes because they depend on implementation details.

### 10. [Intermediate] How do access modifiers support encapsulation?

**Expected answer / interviewer notes:** Expose the minimum API. private protects internals; protected shares with derived classes; internal scopes to assembly; public is the external contract.

### 11. [Intermediate] What is object slicing and does it occur in C#?

**Expected answer / interviewer notes:** Classic value-copy slicing is mainly a C++ issue. In C#, reference objects retain runtime type; value conversions can still lose accessible members.

### 12. [Intermediate] What is the difference between association, aggregation, and composition?

**Expected answer / interviewer notes:** Association is a relationship; aggregation is weak ownership; composition implies stronger lifecycle ownership.

### 13. [Intermediate] What is the Liskov Substitution Principle from an OOP perspective?

**Expected answer / interviewer notes:** A subtype should work wherever its base type is expected without breaking expected behavior.

### 14. [Advanced] How would you model a domain with behavior rather than an anemic model?

**Expected answer / interviewer notes:** Keep business rules close to domain objects, enforce invariants, and avoid turning entities into data bags with all logic in services.

**Good follow-up:** Ask for a real project example, trade-off, or failure scenario.

### 15. [Advanced] When is inheritance a bad choice?

**Expected answer / interviewer notes:** When hierarchy is unstable, behavior varies independently, or subclasses violate substitutability. Prefer composition/strategy.

**Good follow-up:** Ask for a real project example, trade-off, or failure scenario.

### 16. [Advanced] Explain covariance and contravariance conceptually.

**Expected answer / interviewer notes:** Covariance lets a more derived type be used in output positions; contravariance lets a less derived/general type be used in input positions.

**Good follow-up:** Ask for a real project example, trade-off, or failure scenario.

### 17. [Advanced] How can poor OOP design affect testability?

**Expected answer / interviewer notes:** Hidden dependencies, static state, deep inheritance, and concrete coupling make isolation and mocking difficult.

**Good follow-up:** Ask for a real project example, trade-off, or failure scenario.

### 18. [Advanced] How would you refactor a large switch statement based on type/provider?

**Expected answer / interviewer notes:** Consider Strategy, polymorphism, or a registry/factory when behavior varies by type.

**Good follow-up:** Ask for a real project example, trade-off, or failure scenario.

### 19. [Advanced] What is the tell-don't-ask principle?

**Expected answer / interviewer notes:** Ask an object to perform behavior instead of extracting internal state and implementing its rules elsewhere.

**Good follow-up:** Ask for a real project example, trade-off, or failure scenario.

### 20. [Advanced] Design a payment abstraction supporting multiple providers.

**Expected answer / interviewer notes:** Define a stable contract, provider-specific strategies/adapters, explicit result/error models, and dependency injection.

**Good follow-up:** Ask for a real project example, trade-off, or failure scenario.

---

## SOLID

### 1. [Basic] Name the SOLID principles.

**Expected answer / interviewer notes:** Single Responsibility, Open/Closed, Liskov Substitution, Interface Segregation, Dependency Inversion.

### 2. [Basic] Explain Single Responsibility Principle.

**Expected answer / interviewer notes:** A class should have one reason to change; responsibility means cohesive purpose, not necessarily one method.

### 3. [Basic] Explain Open/Closed Principle.

**Expected answer / interviewer notes:** Software should be open to extension and closed to unnecessary modification; use abstractions where variation is expected.

### 4. [Basic] Explain Dependency Inversion Principle.

**Expected answer / interviewer notes:** High-level policy should not depend directly on low-level details; both depend on abstractions.

### 5. [Basic] Explain Interface Segregation Principle.

**Expected answer / interviewer notes:** Clients should not depend on methods they do not need. Prefer focused contracts.

### 6. [Intermediate] Give a real violation of SRP in an ASP.NET Core service.

**Expected answer / interviewer notes:** A service that validates input, queries DB, sends email, logs, formats PDFs, and contains business rules has multiple reasons to change.

### 7. [Intermediate] How can OCP be overused?

**Expected answer / interviewer notes:** Creating abstractions for every class causes needless complexity. Apply where variability is real or likely.

### 8. [Intermediate] Give an LSP violation example.

**Expected answer / interviewer notes:** A subtype that throws NotSupportedException for behavior required by the base contract may not be substitutable.

### 9. [Intermediate] What is dependency injection and how does it relate to DIP?

**Expected answer / interviewer notes:** DI is a technique for supplying dependencies; DIP is the design principle that drives dependency direction.

### 10. [Intermediate] What is a good interface size?

**Expected answer / interviewer notes:** It should represent a cohesive client need; avoid arbitrary rules such as a fixed number of methods.

### 11. [Intermediate] How would you refactor a service depending on five repositories?

**Expected answer / interviewer notes:** First check cohesion; group related operations behind a meaningful domain/application abstraction rather than merely wrapping dependencies.

### 12. [Intermediate] Does using interfaces everywhere automatically mean SOLID?

**Expected answer / interviewer notes:** No. Unnecessary abstractions can obscure design and add maintenance cost.

### 13. [Intermediate] How do SOLID principles improve testing?

**Expected answer / interviewer notes:** Focused responsibilities and dependency boundaries make behavior easier to isolate and verify.

### 14. [Advanced] How would you apply SOLID in a legacy codebase without a large rewrite?

**Expected answer / interviewer notes:** Create seams around changed areas, add tests, extract dependencies incrementally, and avoid broad speculative refactoring.

**Good follow-up:** Ask for a real project example, trade-off, or failure scenario.

### 15. [Advanced] Explain DIP with infrastructure such as MongoDB or SQL.

**Expected answer / interviewer notes:** Application/domain code should depend on repository or port abstractions; infrastructure implements them at the boundary.

**Good follow-up:** Ask for a real project example, trade-off, or failure scenario.

### 16. [Advanced] When should an interface live next to its implementation versus the consuming layer?

**Expected answer / interviewer notes:** Place abstractions according to ownership of the contract; often the consumer/application owns the port.

**Good follow-up:** Ask for a real project example, trade-off, or failure scenario.

### 17. [Advanced] How can excessive DI become a design smell?

**Expected answer / interviewer notes:** Very long constructor dependency lists often indicate low cohesion or a god service.

**Good follow-up:** Ask for a real project example, trade-off, or failure scenario.

### 18. [Advanced] How do SOLID and Clean Architecture differ?

**Expected answer / interviewer notes:** SOLID are design principles; Clean Architecture is a broader architectural approach that can use SOLID.

**Good follow-up:** Ask for a real project example, trade-off, or failure scenario.

### 19. [Advanced] How would you design an extensible notification system?

**Expected answer / interviewer notes:** Define focused contracts, channel strategies/adapters, application orchestration, explicit policies, and avoid coupling domain logic to vendor SDKs.

**Good follow-up:** Ask for a real project example, trade-off, or failure scenario.

### 20. [Advanced] What trade-off should a senior developer discuss when applying SOLID?

**Expected answer / interviewer notes:** Balance flexibility against complexity. Prefer the simplest design that supports known and plausible variation.

**Good follow-up:** Ask for a real project example, trade-off, or failure scenario.

---

## SQL

### 1. [Basic] What is the difference between INNER JOIN and LEFT JOIN?

**Expected answer / interviewer notes:** INNER returns matching rows only; LEFT returns all left rows plus matching right rows or NULLs.

### 2. [Basic] What is a primary key?

**Expected answer / interviewer notes:** A unique, non-null identifier for a row; implementation and physical clustering depend on database design.

### 3. [Basic] What is the difference between WHERE and HAVING?

**Expected answer / interviewer notes:** WHERE filters rows before grouping; HAVING filters groups after aggregation.

### 4. [Basic] What is normalization?

**Expected answer / interviewer notes:** Organizing data to reduce redundancy and update anomalies. Denormalization can be intentional for performance/read models.

### 5. [Basic] What is an index?

**Expected answer / interviewer notes:** A data structure that can speed lookups/sorts but adds storage and write maintenance.

### 6. [Basic] Explain clustered and nonclustered indexes in SQL Server.

**Expected answer / interviewer notes:** A clustered index defines row storage order at the leaf level; a nonclustered index stores keys plus row locators/included data.

### 7. [Intermediate] What causes a query to scan instead of seek?

**Expected answer / interviewer notes:** Nonselective predicates, missing/unsuitable indexes, functions/conversions on indexed columns, stale statistics, or optimizer cost decisions.

### 8. [Intermediate] What is a covering index?

**Expected answer / interviewer notes:** An index containing all columns needed by a query, avoiding extra key lookups when beneficial.

### 9. [Intermediate] What is a composite index and why does column order matter?

**Expected answer / interviewer notes:** Multi-column index; leading key order strongly affects which predicates/orderings it efficiently supports.

### 10. [Intermediate] Explain execution plans.

**Expected answer / interviewer notes:** They show operators and estimated/actual work used to execute a query. Use them to identify scans, lookups, joins, spills, and estimate issues.

### 11. [Intermediate] What are ACID properties?

**Expected answer / interviewer notes:** Atomicity, Consistency, Isolation, Durability.

### 12. [Intermediate] Explain transaction isolation levels.

**Expected answer / interviewer notes:** They control visibility/concurrency anomalies such as dirty reads, nonrepeatable reads, and phantoms.

### 13. [Intermediate] What is a deadlock and how do you reduce it?

**Expected answer / interviewer notes:** Transactions wait cyclically for locks. Keep transactions short, access resources consistently, index well, and retry deadlock victims when appropriate.

### 14. [Intermediate] CTE versus temp table versus table variable?

**Expected answer / interviewer notes:** CTE is mainly query syntax; temp tables materialize and can be indexed/statistics-aware; table variables have different optimizer/statistics behavior and are suited to specific cases.

### 15. [Advanced] How would you investigate a slow production query?

**Expected answer / interviewer notes:** Capture query/plan and parameters, compare estimated vs actual rows, check indexes/statistics/waits/blocking, then validate changes with realistic load.

**Good follow-up:** Ask for a real project example, trade-off, or failure scenario.

### 16. [Advanced] What is parameter sniffing?

**Expected answer / interviewer notes:** A cached plan optimized for one parameter set performs poorly for another. Solutions depend on evidence: Query Store, recompilation, hints, query changes, or plan strategies.

**Good follow-up:** Ask for a real project example, trade-off, or failure scenario.

### 17. [Advanced] Explain optimistic versus pessimistic concurrency.

**Expected answer / interviewer notes:** Optimistic detects conflicts at update time using versions/tokens; pessimistic locks earlier to prevent conflicts.

**Good follow-up:** Ask for a real project example, trade-off, or failure scenario.

### 18. [Advanced] What is index fragmentation and when should you care?

**Expected answer / interviewer notes:** Physical page disorder/free space can matter, but maintenance should be driven by workload and measured impact, not automatic blanket rebuilds.

**Good follow-up:** Ask for a real project example, trade-off, or failure scenario.

### 19. [Advanced] How would you design pagination for millions of rows?

**Expected answer / interviewer notes:** Avoid large OFFSET for deep pages; use keyset/seek pagination with a stable indexed sort key when appropriate.

**Good follow-up:** Ask for a real project example, trade-off, or failure scenario.

### 20. [Advanced] What should you check before adding an index?

**Expected answer / interviewer notes:** Query patterns, selectivity, existing indexes, write overhead, storage, key width, included columns, and actual plan evidence.

**Good follow-up:** Ask for a real project example, trade-off, or failure scenario.

---

## C#

### 1. [Basic] What is the difference between value types and reference types?

**Expected answer / interviewer notes:** Value types contain their data; reference types hold references to objects. Avoid oversimplifying this as merely stack vs heap.

### 2. [Basic] What is boxing and unboxing?

**Expected answer / interviewer notes:** Boxing converts a value type to object/interface representation; unboxing extracts it with type requirements and can add allocations.

### 3. [Basic] What is the difference between string and StringBuilder?

**Expected answer / interviewer notes:** string is immutable; StringBuilder is useful for repeated mutable concatenation, especially in loops.

### 4. [Basic] What is the difference between const and readonly?

**Expected answer / interviewer notes:** const is compile-time constant; readonly is assigned at declaration/constructor and fixed per instance/type afterward.

### 5. [Basic] Explain ref, out, and in.

**Expected answer / interviewer notes:** ref passes by reference read/write; out requires assignment by callee; in passes by readonly reference.

### 6. [Basic] What are nullable reference types?

**Expected answer / interviewer notes:** Compiler-supported annotations and flow analysis to reduce null-related bugs; warnings do not change runtime null behavior.

### 7. [Intermediate] What is async/await?

**Expected answer / interviewer notes:** Language support for asynchronous continuations over awaitable operations; it does not automatically create a new thread.

### 8. [Intermediate] Task versus Thread?

**Expected answer / interviewer notes:** Task represents an operation/future and may use async I/O or scheduling; Thread is an OS execution thread.

### 9. [Intermediate] What is ConfigureAwait and when does it matter?

**Expected answer / interviewer notes:** Controls context capture for an await. It matters most where synchronization contexts exist; ASP.NET Core generally has no request synchronization context.

### 10. [Intermediate] IEnumerable versus IQueryable?

**Expected answer / interviewer notes:** IEnumerable executes in memory; IQueryable builds provider-translatable expressions and may execute remotely.

### 11. [Intermediate] What is deferred execution?

**Expected answer / interviewer notes:** Some sequences are evaluated when enumerated, so data/side effects can change between query creation and enumeration.

### 12. [Intermediate] Explain IDisposable and using.

**Expected answer / interviewer notes:** Dispose releases deterministic resources; using/using declaration ensures disposal even when exceptions occur.

### 13. [Intermediate] What are delegates, events, and Func/Action?

**Expected answer / interviewer notes:** Delegates represent callable methods; events restrict invocation to the publisher; Func/Action are common delegate types.

### 14. [Advanced] Explain garbage collection generations.

**Expected answer / interviewer notes:** Generational GC optimizes short-lived objects; Gen 0 is collected most often, older objects promote, and large/pinned allocations have special considerations.

**Good follow-up:** Ask for a real project example, trade-off, or failure scenario.

### 15. [Advanced] What can cause memory leaks in managed .NET?

**Expected answer / interviewer notes:** Objects remain reachable: event subscriptions, static caches, long-lived collections, captured references, or undisposed unmanaged resources.

**Good follow-up:** Ask for a real project example, trade-off, or failure scenario.

### 16. [Advanced] Task.WhenAll versus Parallel.ForEachAsync?

**Expected answer / interviewer notes:** WhenAll awaits a known set of tasks; Parallel.ForEachAsync controls parallel iteration. Choose based on workload, concurrency, and backpressure.

**Good follow-up:** Ask for a real project example, trade-off, or failure scenario.

### 17. [Advanced] Explain CancellationToken best practices.

**Expected answer / interviewer notes:** Accept and propagate it through cancellable operations, check it at meaningful boundaries, and do not treat cancellation as ordinary failure.

**Good follow-up:** Ask for a real project example, trade-off, or failure scenario.

### 18. [Advanced] When would you use Span<T> or Memory<T>?

**Expected answer / interviewer notes:** For high-performance slicing/processing and reducing allocations; Span is stack-only/ref struct, while Memory can cross async boundaries.

**Good follow-up:** Ask for a real project example, trade-off, or failure scenario.

### 19. [Advanced] What are records and when are they useful?

**Expected answer / interviewer notes:** Reference/value record types emphasize value-like semantics and concise immutable data models; avoid blindly using them for mutable tracked entities.

**Good follow-up:** Ask for a real project example, trade-off, or failure scenario.

### 20. [Advanced] How would you diagnose excessive allocations?

**Expected answer / interviewer notes:** Measure with profiling/counters, identify allocation hot paths, then reduce unnecessary materialization, boxing, closures, strings, and temporary collections.

**Good follow-up:** Ask for a real project example, trade-off, or failure scenario.

---

## LINQ

### 1. [Basic] What is LINQ?

**Expected answer / interviewer notes:** A unified query syntax/API for objects and query providers such as EF.

### 2. [Basic] Where versus Select?

**Expected answer / interviewer notes:** Where filters elements; Select projects/transforms them.

### 3. [Basic] Select versus SelectMany?

**Expected answer / interviewer notes:** Select returns one result per source item; SelectMany flattens nested sequences.

### 4. [Basic] First, FirstOrDefault, Single, and SingleOrDefault?

**Expected answer / interviewer notes:** First requires at least one; Single requires exactly one; Default variants return default when none, while Single still throws for multiple.

### 5. [Basic] OrderBy versus ThenBy?

**Expected answer / interviewer notes:** OrderBy starts primary ordering; ThenBy adds secondary ordering.

### 6. [Basic] What does GroupBy do?

**Expected answer / interviewer notes:** Groups elements by a key and returns grouping sequences.

### 7. [Intermediate] Explain deferred execution in LINQ.

**Expected answer / interviewer notes:** Query operators may execute on enumeration, which can repeat work or observe changed data.

### 8. [Intermediate] What causes multiple enumeration problems?

**Expected answer / interviewer notes:** Repeatedly enumerating an expensive/lazy sequence can rerun queries or side effects; materialize deliberately when needed.

### 9. [Intermediate] IEnumerable versus IQueryable in LINQ usage?

**Expected answer / interviewer notes:** IQueryable allows provider translation; unsupported expressions can fail or force undesirable client-side behavior depending on provider/version.

### 10. [Intermediate] Any versus Count > 0?

**Expected answer / interviewer notes:** Any usually expresses existence and can stop early; Count may enumerate/count unless provider optimizes it.

### 11. [Intermediate] What is the difference between ToList and ToArray?

**Expected answer / interviewer notes:** Both materialize; choose based on required API/semantics. The key concern is deliberate materialization.

### 12. [Intermediate] How do joins work in LINQ?

**Expected answer / interviewer notes:** Join performs inner join; GroupJoin supports grouped/left-join patterns; provider translation may differ.

### 13. [Intermediate] What is expression tree versus delegate?

**Expected answer / interviewer notes:** A delegate executes code; an expression tree represents code structure so providers can inspect/translate it.

### 14. [Advanced] Why can an EF LINQ query fail even though it works with List<T>?

**Expected answer / interviewer notes:** The expression must be translated by the database provider; arbitrary .NET methods may not translate.

**Good follow-up:** Ask for a real project example, trade-off, or failure scenario.

### 15. [Advanced] How would you avoid N+1 queries?

**Expected answer / interviewer notes:** Inspect generated queries; use projection, joins/includes appropriately, batching, or explicit loading based on actual access needs.

**Good follow-up:** Ask for a real project example, trade-off, or failure scenario.

### 16. [Advanced] How do you optimize a LINQ pipeline?

**Expected answer / interviewer notes:** Avoid unnecessary materialization, repeated enumeration, expensive nested operations, and use dictionaries/lookups when algorithmically appropriate.

**Good follow-up:** Ask for a real project example, trade-off, or failure scenario.

### 17. [Advanced] What is AsEnumerable used for?

**Expected answer / interviewer notes:** It switches subsequent operations to LINQ-to-Objects; use intentionally because it may pull data locally.

**Good follow-up:** Ask for a real project example, trade-off, or failure scenario.

### 18. [Advanced] Explain deferred execution risks with closures.

**Expected answer / interviewer notes:** A query can capture mutable variables and evaluate later, producing values different from those expected when the query was created.

**Good follow-up:** Ask for a real project example, trade-off, or failure scenario.

### 19. [Advanced] When should you use compiled queries?

**Expected answer / interviewer notes:** For demonstrated hot paths where query compilation overhead matters; measure first.

**Good follow-up:** Ask for a real project example, trade-off, or failure scenario.

### 20. [Advanced] How would you review a complex LINQ query?

**Expected answer / interviewer notes:** Check correctness first, then translation, enumeration/materialization points, generated SQL, null semantics, and algorithmic complexity.

**Good follow-up:** Ask for a real project example, trade-off, or failure scenario.

---

## .NET Core

### 1. [Basic] What are .NET and ASP.NET Core?

**Expected answer / interviewer notes:** Modern .NET is the runtime/platform; ASP.NET Core is the web framework for HTTP applications.

### 2. [Basic] Explain dependency injection lifetimes.

**Expected answer / interviewer notes:** Transient creates per resolution; scoped is typically per request/scope; singleton lives for application lifetime.

### 3. [Basic] What is middleware?

**Expected answer / interviewer notes:** Components forming an HTTP pipeline that can handle requests before/after the next component.

### 4. [Basic] How does configuration work?

**Expected answer / interviewer notes:** Configuration is built from providers such as JSON, environment variables, secrets, and command line, with later providers overriding earlier values.

### 5. [Basic] What is appsettings.json versus environment variables?

**Expected answer / interviewer notes:** Both are configuration providers; environment variables are commonly used for environment/container deployment overrides and secrets references.

### 6. [Basic] What is Kestrel?

**Expected answer / interviewer notes:** ASP.NET Core's cross-platform web server, often used directly or behind a reverse proxy.

### 7. [Intermediate] Why does middleware order matter?

**Expected answer / interviewer notes:** Pipeline execution order determines authentication, authorization, routing, exception handling, endpoints, and response behavior.

### 8. [Intermediate] What is IServiceScopeFactory useful for?

**Expected answer / interviewer notes:** Creating explicit scopes in singleton/background services to resolve scoped dependencies safely.

### 9. [Intermediate] What is IHostedService/BackgroundService?

**Expected answer / interviewer notes:** Infrastructure for long-running background work managed by the host lifecycle.

### 10. [Intermediate] How do you handle global exceptions?

**Expected answer / interviewer notes:** Use centralized exception handling/middleware, map known failures to appropriate status codes, log context, and avoid leaking internals.

### 11. [Intermediate] What are health checks?

**Expected answer / interviewer notes:** Endpoints reporting application/dependency health, often used by orchestrators/load balancers.

### 12. [Intermediate] Explain options pattern.

**Expected answer / interviewer notes:** Bind configuration to typed options and validate/use IOptions, IOptionsSnapshot, or IOptionsMonitor depending on lifetime/change requirements.

### 13. [Intermediate] What is authentication versus authorization?

**Expected answer / interviewer notes:** Authentication establishes identity; authorization decides whether that identity can perform an action.

### 14. [Advanced] What is the captive dependency problem?

**Expected answer / interviewer notes:** A longer-lived service, often singleton, captures a shorter-lived dependency such as scoped service, causing invalid lifetime behavior or stale state.

**Good follow-up:** Ask for a real project example, trade-off, or failure scenario.

### 15. [Advanced] How would you design a resilient background processor?

**Expected answer / interviewer notes:** Bounded concurrency, cancellation, retry with classification/backoff, idempotency, observability, durable state/queue when required.

**Good follow-up:** Ask for a real project example, trade-off, or failure scenario.

### 16. [Advanced] How do you prevent thread-pool starvation?

**Expected answer / interviewer notes:** Avoid blocking async code with .Result/Wait, reduce long synchronous blocking, use true async I/O, and bound concurrency.

**Good follow-up:** Ask for a real project example, trade-off, or failure scenario.

### 17. [Advanced] How would you approach API versioning?

**Expected answer / interviewer notes:** Choose a consistent strategy, define compatibility/deprecation policy, and avoid unnecessary versions for additive changes.

**Good follow-up:** Ask for a real project example, trade-off, or failure scenario.

### 18. [Advanced] What are minimal APIs versus controllers?

**Expected answer / interviewer notes:** Both can build APIs; minimal APIs are concise, controllers offer conventional organization and features. Choose based on complexity/team consistency.

**Good follow-up:** Ask for a real project example, trade-off, or failure scenario.

### 19. [Advanced] How would you secure application secrets?

**Expected answer / interviewer notes:** Never hardcode; use managed identity/workload identity and a secret store, least privilege, rotation, and environment-specific access.

**Good follow-up:** Ask for a real project example, trade-off, or failure scenario.

### 20. [Advanced] What production diagnostics would you enable?

**Expected answer / interviewer notes:** Structured logs, traces, metrics, correlation IDs, health checks, dependency telemetry, dashboards, alerts, and safe diagnostic access.

**Good follow-up:** Ask for a real project example, trade-off, or failure scenario.

---

## Microservices

### 1. [Basic] What is a microservice architecture?

**Expected answer / interviewer notes:** An approach where independently deployable services own bounded capabilities and communicate over network contracts.

### 2. [Basic] Monolith versus microservices?

**Expected answer / interviewer notes:** Monolith is simpler operationally and often the best start; microservices trade development boundaries for distributed-system complexity.

### 3. [Basic] What is synchronous versus asynchronous communication?

**Expected answer / interviewer notes:** Synchronous calls wait for a response; asynchronous messaging decouples producers and consumers.

### 4. [Basic] What is an API gateway?

**Expected answer / interviewer notes:** A boundary that can route, aggregate, secure, and apply cross-cutting policies for clients.

### 5. [Basic] Should every service have its own database?

**Expected answer / interviewer notes:** Ideally each service owns its data boundary; physical database/server sharing may exist, but direct cross-service table coupling should be avoided.

### 6. [Intermediate] What is eventual consistency?

**Expected answer / interviewer notes:** Different services may temporarily observe different states until asynchronous propagation/convergence completes.

### 7. [Intermediate] What is idempotency?

**Expected answer / interviewer notes:** Repeating an operation produces the same intended effect; essential for retries and at-least-once delivery.

### 8. [Intermediate] What is the outbox pattern?

**Expected answer / interviewer notes:** Persist business data and pending integration events atomically, then publish reliably afterward.

### 9. [Intermediate] What is a saga?

**Expected answer / interviewer notes:** A distributed workflow composed of local transactions with compensating actions or orchestration/choreography.

### 10. [Intermediate] How do you handle duplicate messages?

**Expected answer / interviewer notes:** Assume duplicates can occur; use idempotency keys, inbox/deduplication records, and safe business operations.

### 11. [Intermediate] What is service discovery?

**Expected answer / interviewer notes:** A mechanism to locate service instances dynamically, often provided by platform/orchestrator/DNS.

### 12. [Intermediate] What is a circuit breaker?

**Expected answer / interviewer notes:** Stops repeated calls to an unhealthy dependency temporarily and allows controlled recovery.

### 13. [Intermediate] Why are distributed transactions usually avoided?

**Expected answer / interviewer notes:** They increase coupling and availability/operational complexity; use local transactions and consistency patterns where appropriate.

### 14. [Advanced] How would you design reliable order events?

**Expected answer / interviewer notes:** Transactional state change plus outbox, durable publishing, consumer idempotency, schema/version strategy, retries, DLQ, and observability.

**Good follow-up:** Ask for a real project example, trade-off, or failure scenario.

### 15. [Advanced] How do you trace a request across services?

**Expected answer / interviewer notes:** Propagate correlation/trace context and use distributed tracing with consistent structured logs and metrics.

**Good follow-up:** Ask for a real project example, trade-off, or failure scenario.

### 16. [Advanced] How do you version events?

**Expected answer / interviewer notes:** Prefer backward-compatible additive changes, explicit schemas/contracts, consumer tolerance, and controlled evolution.

**Good follow-up:** Ask for a real project example, trade-off, or failure scenario.

### 17. [Advanced] What are common microservice anti-patterns?

**Expected answer / interviewer notes:** Distributed monolith, shared database, chatty calls, synchronous dependency chains, unclear ownership, and premature service splitting.

**Good follow-up:** Ask for a real project example, trade-off, or failure scenario.

### 18. [Advanced] How would you handle partial failure?

**Expected answer / interviewer notes:** Set timeouts, cancellation, bounded retries/backoff, circuit breaking, fallback where valid, queues, compensation, and clear user-visible states.

**Good follow-up:** Ask for a real project example, trade-off, or failure scenario.

### 19. [Advanced] How do you decide service boundaries?

**Expected answer / interviewer notes:** Use business capabilities/domain boundaries, ownership, change patterns, data ownership, and team autonomy—not arbitrary technical layers.

**Good follow-up:** Ask for a real project example, trade-off, or failure scenario.

### 20. [Advanced] When would you choose a modular monolith instead?

**Expected answer / interviewer notes:** When domain/team scale does not justify distributed complexity or boundaries are still evolving.

**Good follow-up:** Ask for a real project example, trade-off, or failure scenario.

---

## Cloud

### 1. [Basic] What are IaaS, PaaS, and SaaS?

**Expected answer / interviewer notes:** Infrastructure, managed application platforms, and complete software services with increasing provider responsibility.

### 2. [Basic] What is horizontal versus vertical scaling?

**Expected answer / interviewer notes:** Horizontal adds instances; vertical increases resources of an instance.

### 3. [Basic] What is a load balancer?

**Expected answer / interviewer notes:** Distributes traffic among healthy targets according to routing/health rules.

### 4. [Basic] What is a managed identity/workload identity conceptually?

**Expected answer / interviewer notes:** An application identity used to authenticate to cloud resources without embedding long-lived secrets.

### 5. [Basic] What is autoscaling?

**Expected answer / interviewer notes:** Automatically adjusting capacity based on metrics, schedules, or rules.

### 6. [Intermediate] What is a VNet/VPC?

**Expected answer / interviewer notes:** An isolated virtual network construct containing subnets, routing, and security controls.

### 7. [Intermediate] What is least privilege?

**Expected answer / interviewer notes:** Grant only permissions required for a task and limit duration/scope where possible.

### 8. [Intermediate] How should secrets be managed in cloud applications?

**Expected answer / interviewer notes:** Use a managed secret store, identity-based access, rotation, auditing, and avoid secrets in source/config artifacts.

### 9. [Intermediate] What is high availability versus disaster recovery?

**Expected answer / interviewer notes:** HA reduces local failure interruption; DR restores service after larger outages, often with explicit RTO/RPO targets.

### 10. [Intermediate] What are RTO and RPO?

**Expected answer / interviewer notes:** RTO is acceptable recovery time; RPO is acceptable data loss measured in time.

### 11. [Intermediate] What is Infrastructure as Code?

**Expected answer / interviewer notes:** Declarative/repeatable provisioning through versioned definitions and deployment pipelines.

### 12. [Intermediate] How do you monitor a cloud application?

**Expected answer / interviewer notes:** Collect logs, metrics, traces, dependency telemetry, health, dashboards, and actionable alerts.

### 13. [Intermediate] What is a private endpoint/private link concept?

**Expected answer / interviewer notes:** Private network access to a managed service rather than exposing traffic through a public endpoint.

### 14. [Advanced] How would you design an API for zone/region failure?

**Expected answer / interviewer notes:** Use multi-zone/region strategy based on requirements, remove single points of failure, replicate data appropriately, test failover, and document RTO/RPO.

**Good follow-up:** Ask for a real project example, trade-off, or failure scenario.

### 15. [Advanced] How do you control cloud cost?

**Expected answer / interviewer notes:** Tag ownership, right-size resources, autoscale, review idle capacity, storage lifecycle, budgets/alerts, and measure cost against value.

**Good follow-up:** Ask for a real project example, trade-off, or failure scenario.

### 16. [Advanced] What is the shared responsibility model?

**Expected answer / interviewer notes:** Provider and customer responsibilities vary by service model; managed services reduce but do not eliminate customer security responsibility.

**Good follow-up:** Ask for a real project example, trade-off, or failure scenario.

### 17. [Advanced] How would you deploy with minimal downtime?

**Expected answer / interviewer notes:** Rolling/blue-green/canary approaches, backward-compatible changes, health validation, traffic control, and fast rollback.

**Good follow-up:** Ask for a real project example, trade-off, or failure scenario.

### 18. [Advanced] How would you secure service-to-service communication?

**Expected answer / interviewer notes:** Strong workload identity, least privilege, TLS/private networking where appropriate, token validation, and network segmentation.

**Good follow-up:** Ask for a real project example, trade-off, or failure scenario.

### 19. [Advanced] What is observability versus monitoring?

**Expected answer / interviewer notes:** Monitoring tracks known signals/alerts; observability enables understanding system behavior from outputs such as logs, metrics, and traces.

**Good follow-up:** Ask for a real project example, trade-off, or failure scenario.

### 20. [Advanced] How would you investigate a cloud-only production performance issue?

**Expected answer / interviewer notes:** Correlate traces/metrics/logs, compare instances/regions/dependencies, inspect scaling/network/resource limits, and reproduce safely.

**Good follow-up:** Ask for a real project example, trade-off, or failure scenario.

---

## AI Tools

### 1. [Basic] How do you use AI coding tools in daily development?

**Expected answer / interviewer notes:** Expected: concrete workflow such as explanation, boilerplate, tests, review assistance, refactoring, and documentation with human verification.

### 2. [Basic] What are hallucinations in AI output?

**Expected answer / interviewer notes:** Confident but incorrect/invented information or code; output must be validated.

### 3. [Basic] Can AI-generated code be trusted without review?

**Expected answer / interviewer notes:** No. Review correctness, security, performance, licensing, architecture, and tests.

### 4. [Basic] What information should not be pasted into public AI tools?

**Expected answer / interviewer notes:** Secrets, credentials, proprietary source/data, customer PII, and other restricted information unless organizational policy explicitly permits it.

### 5. [Basic] What makes a good prompt for a coding task?

**Expected answer / interviewer notes:** Clear goal, relevant context, constraints, inputs/outputs, tech version, and acceptance criteria.

### 6. [Intermediate] How would you use AI to understand a legacy codebase?

**Expected answer / interviewer notes:** Provide bounded context, ask for architecture/data flow/dependency analysis, then verify against code/tests and iterate.

### 7. [Intermediate] How can AI help with code review?

**Expected answer / interviewer notes:** Generate review checklists, identify risks, explain diffs, suggest tests—but final judgment remains with the engineer.

### 8. [Intermediate] How would you validate AI-generated unit tests?

**Expected answer / interviewer notes:** Check that tests assert meaningful behavior, cover edge cases, avoid testing mocks/implementation details, and ensure failures are possible.

### 9. [Intermediate] What is context-window limitation?

**Expected answer / interviewer notes:** The model can only consider limited supplied context; large systems require retrieval, summaries, focused files, and verification.

### 10. [Intermediate] What is RAG conceptually?

**Expected answer / interviewer notes:** Retrieve relevant external/private knowledge and provide it as context to the model before generation.

### 11. [Intermediate] How would you prevent an AI tool from changing unrelated code?

**Expected answer / interviewer notes:** Use explicit scope, small tasks, diff review, tests, repository instructions, and require explanation of changed files.

### 12. [Intermediate] What AI risks apply to software development?

**Expected answer / interviewer notes:** Data leakage, incorrect output, insecure code, dependency/license issues, prompt injection, and overreliance.

### 13. [Intermediate] How do you evaluate whether AI improved productivity?

**Expected answer / interviewer notes:** Measure task outcomes such as cycle time, defects, review rework, developer effort, and quality—not just generated lines.

### 14. [Advanced] How would you build an AI-assisted code-review workflow?

**Expected answer / interviewer notes:** Controlled repository context, requirement/spec retrieval, static analysis/tests, structured findings, confidence/evidence, and human approval.

**Good follow-up:** Ask for a real project example, trade-off, or failure scenario.

### 15. [Advanced] What is prompt injection and why does it matter for RAG/agents?

**Expected answer / interviewer notes:** Untrusted content can try to override instructions or manipulate tool use; separate trusted instructions, constrain tools, sanitize context, and require approvals.

**Good follow-up:** Ask for a real project example, trade-off, or failure scenario.

### 16. [Advanced] How would you use an AI agent safely with production systems?

**Expected answer / interviewer notes:** Least-privilege tools, read-only defaults, scoped actions, approval gates, audit logs, rate limits, and no autonomous destructive access.

**Good follow-up:** Ask for a real project example, trade-off, or failure scenario.

### 17. [Advanced] How can AI assist incident investigation?

**Expected answer / interviewer notes:** Summarize telemetry, correlate anomalies, propose hypotheses/queries, but humans validate evidence before action.

**Good follow-up:** Ask for a real project example, trade-off, or failure scenario.

### 18. [Advanced] What is the difference between an AI assistant and an autonomous agent?

**Expected answer / interviewer notes:** Assistant responds/generates under user control; agent can plan and invoke tools/actions within granted permissions.

**Good follow-up:** Ask for a real project example, trade-off, or failure scenario.

### 19. [Advanced] How would you review an AI-generated architectural proposal?

**Expected answer / interviewer notes:** Validate requirements, assumptions, failure modes, security, scalability, cost, operational impact, and fit with existing constraints.

**Good follow-up:** Ask for a real project example, trade-off, or failure scenario.

### 20. [Advanced] What should a senior developer know about responsible AI usage?

**Expected answer / interviewer notes:** Data governance, human accountability, validation, security, bias/limitations where relevant, auditability, and compliance with company policy.

**Good follow-up:** Ask for a real project example, trade-off, or failure scenario.

---

## Angular/React

### 1. [Basic] What is component-based UI development?

**Expected answer / interviewer notes:** UI is decomposed into reusable components with explicit inputs/state/output behavior.

### 2. [Basic] What is state versus props/input?

**Expected answer / interviewer notes:** State is owned/mutable component/application data; props/inputs are values supplied by a parent or external source.

### 3. [Basic] What causes unnecessary UI re-renders?

**Expected answer / interviewer notes:** State changes, changed references, parent renders, subscriptions/context changes; framework-specific behavior differs.

### 4. [Basic] What is SPA routing?

**Expected answer / interviewer notes:** Client-side mapping from URL paths to views/components, often with guards/loaders.

### 5. [Basic] Why are keys important in React lists?

**Expected answer / interviewer notes:** Stable identity helps reconciliation preserve correct component instances; array indexes can cause bugs when ordering changes.

### 6. [Basic] What is Angular dependency injection?

**Expected answer / interviewer notes:** Framework-managed provision/resolution of dependencies using injectors and providers.

### 7. [Intermediate] Explain controlled components in React.

**Expected answer / interviewer notes:** Form value is driven by React state, giving explicit control over updates and validation.

### 8. [Intermediate] What are Angular Observables commonly used for?

**Expected answer / interviewer notes:** Async streams such as HTTP, events, reactive forms, and state/event flows.

### 9. [Intermediate] Observable versus Promise?

**Expected answer / interviewer notes:** Promise represents one eventual result; Observable can represent multiple values over time and supports operators/unsubscription.

### 10. [Intermediate] What is React useEffect commonly used for?

**Expected answer / interviewer notes:** Synchronizing a component with external systems such as subscriptions, timers, or imperative APIs; dependencies must be correct.

### 11. [Intermediate] How do you avoid memory leaks in frontend code?

**Expected answer / interviewer notes:** Clean up subscriptions/listeners/timers, cancel or ignore stale async work, and follow framework lifecycle patterns.

### 12. [Intermediate] What is lazy loading/code splitting?

**Expected answer / interviewer notes:** Load feature code only when needed to reduce initial bundle size.

### 13. [Intermediate] How would you manage shared application state?

**Expected answer / interviewer notes:** Keep state as local as possible; use framework services/context/store when multiple areas need coordinated state.

### 14. [Advanced] Explain Angular change detection at a high level.

**Expected answer / interviewer notes:** Angular checks bindings when relevant events/async work occur; strategies and signals/immutable patterns can reduce unnecessary work.

**Good follow-up:** Ask for a real project example, trade-off, or failure scenario.

### 15. [Advanced] How do you optimize a large frontend application?

**Expected answer / interviewer notes:** Profile first; optimize bundle size, rendering, list virtualization, memoization/change detection, caching, and network waterfalls.

**Good follow-up:** Ask for a real project example, trade-off, or failure scenario.

### 16. [Advanced] How do you prevent race conditions in API-driven UI?

**Expected answer / interviewer notes:** Cancel/switch stale requests, sequence responses, track request identity, and design state transitions explicitly.

**Good follow-up:** Ask for a real project example, trade-off, or failure scenario.

### 17. [Advanced] How would you structure a scalable Angular/React project?

**Expected answer / interviewer notes:** Organize around features/domain boundaries, shared primitives, clear API/data layers, routing boundaries, and consistent testing.

**Good follow-up:** Ask for a real project example, trade-off, or failure scenario.

### 18. [Advanced] How should frontend authentication tokens be handled?

**Expected answer / interviewer notes:** Follow the selected secure architecture; minimize XSS exposure, use appropriate browser storage/cookies, CSRF protection where relevant, and avoid logging tokens.

**Good follow-up:** Ask for a real project example, trade-off, or failure scenario.

### 19. [Advanced] How do you handle API errors consistently?

**Expected answer / interviewer notes:** Centralize transport concerns, map errors to meaningful UI states, support retry only where valid, and preserve correlation/debug context.

**Good follow-up:** Ask for a real project example, trade-off, or failure scenario.

### 20. [Advanced] What tests matter most for frontend code?

**Expected answer / interviewer notes:** Component/unit tests for behavior, integration tests for workflows, and a focused set of end-to-end tests for critical paths.

**Good follow-up:** Ask for a real project example, trade-off, or failure scenario.

---

## CSS/HTML/jQuery/Javascript

### 1. [Basic] What is semantic HTML and why use it?

**Expected answer / interviewer notes:** Use elements that express meaning such as nav, main, button, and form; improves accessibility, maintainability, and SEO.

### 2. [Basic] Explain the CSS box model.

**Expected answer / interviewer notes:** Content, padding, border, and margin; box-sizing affects width/height calculations.

### 3. [Basic] Flexbox versus CSS Grid?

**Expected answer / interviewer notes:** Flexbox is primarily one-dimensional layout; Grid handles two-dimensional layouts.

### 4. [Basic] What is event bubbling?

**Expected answer / interviewer notes:** An event generally propagates from target upward through ancestors, enabling delegation.

### 5. [Basic] var, let, and const?

**Expected answer / interviewer notes:** var is function-scoped with legacy semantics; let/const are block-scoped; const prevents rebinding, not object mutation.

### 6. [Basic] == versus === in JavaScript?

**Expected answer / interviewer notes:** == performs coercive comparison; === compares without coercion and is generally preferred.

### 7. [Intermediate] What is closure?

**Expected answer / interviewer notes:** A function retains access to lexical variables from its creation scope, useful but capable of retaining memory/state unexpectedly.

### 8. [Intermediate] Explain the JavaScript event loop.

**Expected answer / interviewer notes:** Coordinates call stack, task queues, and microtasks; Promise continuations are typically microtasks, affecting ordering.

### 9. [Intermediate] What is event delegation?

**Expected answer / interviewer notes:** Attach a handler to a common ancestor and identify matching targets, useful for dynamic lists.

### 10. [Intermediate] What is the difference between debounce and throttle?

**Expected answer / interviewer notes:** Debounce waits for inactivity; throttle limits execution frequency.

### 11. [Intermediate] What is CORS?

**Expected answer / interviewer notes:** Browser security policy controlling cross-origin requests based on server response headers; it is not an API authentication mechanism.

### 12. [Intermediate] What is XSS and how do you reduce it?

**Expected answer / interviewer notes:** Untrusted content executes script. Encode output, avoid unsafe HTML APIs, validate/sanitize where needed, and use security headers/CSP.

### 13. [Intermediate] What are promises and async/await in JavaScript?

**Expected answer / interviewer notes:** Promises represent asynchronous completion; async/await provides structured syntax over promises.

### 14. [Advanced] What is the critical rendering path?

**Expected answer / interviewer notes:** Browser work from loading/parsing resources through style/layout/paint; blocking scripts/styles and large assets can delay rendering.

**Good follow-up:** Ask for a real project example, trade-off, or failure scenario.

### 15. [Advanced] How do you investigate a frontend memory leak?

**Expected answer / interviewer notes:** Use browser memory tools, snapshots/allocation timelines, inspect detached DOM/listeners/closures, and reproduce lifecycle behavior.

**Good follow-up:** Ask for a real project example, trade-off, or failure scenario.

### 16. [Advanced] Explain CSS specificity and cascade layers conceptually.

**Expected answer / interviewer notes:** Cascade resolves competing declarations using origin/importance/layers/specificity/order; avoid escalating specificity wars.

**Good follow-up:** Ask for a real project example, trade-off, or failure scenario.

### 17. [Advanced] When is jQuery still reasonable?

**Expected answer / interviewer notes:** Legacy systems or existing plugins may justify maintenance use; for new modern framework code, native APIs/framework patterns are usually preferred.

**Good follow-up:** Ask for a real project example, trade-off, or failure scenario.

### 18. [Advanced] How do you secure client-side form handling?

**Expected answer / interviewer notes:** Client validation improves UX but server-side validation is authoritative; protect against XSS/CSRF and enforce authorization server-side.

**Good follow-up:** Ask for a real project example, trade-off, or failure scenario.

### 19. [Advanced] How would you optimize a page with thousands of DOM elements?

**Expected answer / interviewer notes:** Virtualize large lists, reduce layout thrashing, batch DOM work, simplify selectors/layout, and profile.

**Good follow-up:** Ask for a real project example, trade-off, or failure scenario.

### 20. [Advanced] What browser compatibility strategy would you use?

**Expected answer / interviewer notes:** Define supported browsers, use standards/features with progressive enhancement, transpile/polyfill as needed, and test critical flows.

**Good follow-up:** Ask for a real project example, trade-off, or failure scenario.

---

## Unit testing

### 1. [Basic] What is a unit test?

**Expected answer / interviewer notes:** A fast automated test of a small unit of behavior with controlled dependencies.

### 2. [Basic] What is AAA?

**Expected answer / interviewer notes:** Arrange inputs/dependencies, Act on behavior, Assert observable outcome.

### 3. [Basic] What makes a good unit test?

**Expected answer / interviewer notes:** Readable, deterministic, isolated, focused on behavior, and capable of failing for the right reason.

### 4. [Basic] What should generally not be unit tested directly?

**Expected answer / interviewer notes:** Framework implementation details, trivial getters, and third-party behavior unless your integration with it has logic.

### 5. [Basic] What is mocking?

**Expected answer / interviewer notes:** Replacing a dependency with controlled behavior/verification to isolate the unit.

### 6. [Basic] Stub versus mock?

**Expected answer / interviewer notes:** A stub supplies predetermined data; a mock can verify interactions/expectations. Exact terminology varies by framework.

### 7. [Intermediate] When should you use integration tests instead of mocks?

**Expected answer / interviewer notes:** When correctness depends on real collaboration: database mappings, HTTP pipeline, serialization, infrastructure, or framework behavior.

### 8. [Intermediate] What are test doubles?

**Expected answer / interviewer notes:** General category including stubs, mocks, fakes, spies, and dummies.

### 9. [Intermediate] What makes a test flaky?

**Expected answer / interviewer notes:** Timing, shared state, randomness, network/external dependencies, concurrency, or assumptions about execution order.

### 10. [Intermediate] How do you test async code?

**Expected answer / interviewer notes:** Await the operation, assert results/exceptions, avoid arbitrary delays, and control time/dependencies when possible.

### 11. [Intermediate] How do you test exceptions?

**Expected answer / interviewer notes:** Assert the expected exception type and relevant observable details; do not broadly catch and ignore errors.

### 12. [Intermediate] What is code coverage?

**Expected answer / interviewer notes:** A measure of executed code, useful as a signal but not proof of test quality or correctness.

### 13. [Intermediate] How would you test a repository/service boundary?

**Expected answer / interviewer notes:** Unit test business logic with controlled ports; integration test the actual persistence implementation separately.

### 14. [Advanced] How do you test time-dependent logic?

**Expected answer / interviewer notes:** Inject a clock/time abstraction or use framework time providers so tests control time deterministically.

**Good follow-up:** Ask for a real project example, trade-off, or failure scenario.

### 15. [Advanced] How do you test code using random values?

**Expected answer / interviewer notes:** Inject/control the random source or seed deterministic behavior while separately testing invariants.

**Good follow-up:** Ask for a real project example, trade-off, or failure scenario.

### 16. [Advanced] What is mutation testing?

**Expected answer / interviewer notes:** Intentionally changes code to see whether tests detect defects; it evaluates test effectiveness beyond coverage.

**Good follow-up:** Ask for a real project example, trade-off, or failure scenario.

### 17. [Advanced] How do you avoid over-mocking?

**Expected answer / interviewer notes:** Mock only meaningful boundaries, prefer simple fakes/test implementations where clearer, and assert behavior rather than internal call choreography.

**Good follow-up:** Ask for a real project example, trade-off, or failure scenario.

### 18. [Advanced] How would you test a message consumer?

**Expected answer / interviewer notes:** Test valid/invalid inputs, idempotency, retries/classification, side effects, cancellation, and integration behavior with realistic serialization/broker contracts.

**Good follow-up:** Ask for a real project example, trade-off, or failure scenario.

### 19. [Advanced] How should a 6+ year developer approach test architecture?

**Expected answer / interviewer notes:** Use a balanced test pyramid/portfolio: many fast unit tests, meaningful integration tests, and focused end-to-end tests for critical workflows.

**Good follow-up:** Ask for a real project example, trade-off, or failure scenario.

### 20. [Advanced] What would you review in a pull request regarding tests?

**Expected answer / interviewer notes:** Behavior coverage, edge/failure paths, determinism, meaningful assertions, regression protection, maintainability, and whether the test could pass despite a bug.

**Good follow-up:** Ask for a real project example, trade-off, or failure scenario.

---

# Recommended Missing Areas

The listed topics are strong, but for a **6+ years .NET developer**, I strongly recommend adding these areas:

## 1. System Design and Architecture — Highly Recommended
Cover:
- Designing a scalable API.
- Caching strategy.
- Database scaling.
- Queue-based processing.
- Rate limiting.
- Idempotency.
- Observability.
- Failure handling.
- Trade-offs between monolith, modular monolith, and microservices.

## 2. Security — Highly Recommended
Cover:
- JWT/OAuth/OpenID Connect.
- Authentication vs authorization.
- OWASP basics.
- SQL injection and XSS.
- Secret management.
- API security.
- RBAC/claims/policies.
- Secure logging and PII.

## 3. Design Patterns
Ask practical questions about:
- Strategy.
- Factory.
- Repository.
- Adapter.
- Decorator.
- Mediator.
- CQRS.
- When **not** to use a pattern.

## 4. Performance and Production Troubleshooting
Cover:
- Slow API investigation.
- Memory leaks.
- Thread-pool starvation.
- Database bottlenecks.
- Caching.
- Profiling.
- Logging, metrics, traces.
- Incident debugging.

## 5. DevOps / CI-CD / Containers
Cover:
- Docker fundamentals.
- Environment configuration.
- CI/CD pipelines.
- Deployment strategies.
- Rollback.
- Health checks.
- Kubernetes basics if relevant to the role.

## 6. Real Experience and Ownership
This is critical because experienced candidates can memorize answers. Ask:
- Describe the most difficult production issue you solved.
- What architecture decision would you change now?
- Describe a performance problem you investigated end-to-end.
- Describe a production incident and your exact contribution.
- What code review issue do you commonly identify?
- Describe a disagreement on technical design and how it was resolved.

# Recommended Interview Format

For a 60–90 minute interview:

1. **C# + OOP + SOLID** — 15 minutes
2. **.NET Core + API architecture** — 15 minutes
3. **SQL + LINQ + performance** — 15 minutes
4. **Microservices + Cloud** — 15 minutes
5. **Unit Testing + AI Tools + frontend** — 10–15 minutes
6. **Real-world scenario / system design** — 10–15 minutes

## Important Interviewing Advice

For a 6+ year candidate, do not ask all 240 questions in one interview. Use this as a question bank.

A strong interview should focus on:
- **40% practical scenarios**
- **30% core technical knowledge**
- **20% architecture and trade-offs**
- **10% communication, ownership, and real production experience**

The most valuable signal is whether the candidate can explain:
> **Why they would choose an approach, what can fail, how they would detect it, and what trade-offs they accepted.**

