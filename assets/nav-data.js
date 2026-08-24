/* ==========================================================================
   HB_NAV - single source of truth for handbook structure.
   Every page's sidebar, breadcrumbs, prev/next links and the home page index
   are generated from this file. Add a page here FIRST, then create the file.

   ORDER IS THE LEARNING PATH. Sections run from C# language fundamentals
   through to production and interview prep. A reader should never need a
   concept that appears later in the list. Do not reorder casually - see
   DECISIONS.md D-018.

   Whether a page is written yet is NOT tracked here - it is derived from disk
   by tools/build-index.mjs, which regenerates assets/search-index.js. Pages
   listed here but absent from that index render greyed-out ("planned").
   Run:  node tools/build-index.mjs   after adding or renaming any page.
   ========================================================================== */
window.HB_NAV = {
  title: ".NET Developer Interview Handbook",
  short: ".NET Handbook",

  /* Parts group the sections into a visible learning journey. */
  parts: [
    { id: "lang",   title: "Part 1 · C# Language Foundations",     desc: "The language itself, plus the design principles every .NET codebase is built on.", sections: ["01-csharp-fundamentals", "02-oop", "03-solid", "04-linq", "05-csharp-advanced"] },
    { id: "platform", title: "Part 2 · .NET Platform &amp; Web APIs", desc: "How .NET applications are hosted, wired together and exposed over HTTP.", sections: ["06-dotnet-platform", "07-aspnet-core", "08-http-web-apis", "09-dotnet-framework"] },
    { id: "data",   title: "Part 3 · Data Access &amp; Databases",  desc: "Relational first, then the ORM you use daily, then NoSQL and caching.", sections: ["10-sql", "11-ef-core", "12-postgresql", "13-mongodb", "14-cosmos-db", "15-dynamodb", "16-redis"] },
    { id: "quality", title: "Part 4 · Testing &amp; Quality",       desc: "How you prove any of the above actually works.", sections: ["17-testing"] },
    { id: "arch",   title: "Part 5 · Architecture &amp; Distributed Systems", desc: "Structuring larger systems, and what breaks once they span a network.", sections: ["18-design-patterns", "19-architecture", "20-microservices", "21-messaging", "22-kafka", "23-multi-tenant-saas"] },
    { id: "ops",    title: "Part 6 · Cloud, DevOps &amp; Delivery", desc: "Running .NET systems in production on Azure, and the practices around it.", sections: ["24-azure", "25-docker-kubernetes", "26-iac", "27-git", "28-github-actions", "29-sdlc"] },
    { id: "front",  title: "Part 7 · Front-End for .NET Developers", desc: "The browser side of a full-stack .NET role.", sections: ["30-web-fundamentals", "31-angular", "32-react"] },
    { id: "ai",     title: "Part 8 · AI-Assisted Development",     desc: "Using AI tooling without shipping code you do not understand.", sections: ["33-ai-tools", "34-mcp"] },
    { id: "prep",   title: "Part 9 · Interview Preparation",       desc: "Everything above, applied under interview conditions.", sections: ["35-scaling-scenarios", "36-system-design", "37-final-prep"] }
  ],

  sections: [
    /* ===================== Part 1 - C# Language Foundations ===================== */
    {
      id: "01-csharp-fundamentals", num: "01", title: "C# Fundamentals",
      desc: "The type system and language features you use in every file, explained properly.",
      pages: [
        { file: "index.html", title: "Overview" },
        { file: "type-system.html", title: "Types &amp; Memory Layout", desc: "Value vs reference types, stack vs heap, boxing, structs, records, enums, nullability." },
        { file: "language-features.html", title: "Core Language Features", desc: "Generics, delegates, events, lambdas, extension methods, iterators, pattern matching." },
        { file: "modern-csharp.html", title: "Modern C# by Version", desc: "What arrived in C# 8-13 and which features actually matter in real code." }
      ]
    },
    {
      id: "02-oop", num: "02", title: "Object-Oriented Programming",
      desc: "The four pillars done properly, plus coupling, cohesion and composition over inheritance.",
      pages: [
        { file: "index.html", title: "Overview" },
        { file: "fundamentals.html", title: "OOP Fundamentals", desc: "Encapsulation, abstraction, inheritance, polymorphism - with the C# details." },
        { file: "advanced.html", title: "Advanced OOP &amp; Design Quality", desc: "Composition, coupling, cohesion, immutability, object lifetime, Liskov in practice." }
      ]
    },
    {
      id: "03-solid", num: "03", title: "SOLID Principles",
      desc: "All five principles with a mental model for each, bad code, fixed code, and the limits.",
      pages: [
        { file: "index.html", title: "SOLID In Depth" }
      ]
    },
    {
      id: "04-linq", num: "04", title: "LINQ",
      desc: "IEnumerable vs IQueryable, deferred execution, expression trees and query translation.",
      pages: [
        { file: "index.html", title: "LINQ In Depth" },
        { file: "performance.html", title: "LINQ Performance &amp; Providers", desc: "Allocation costs, N+1, translation failures, client evaluation." }
      ]
    },
    {
      id: "05-csharp-advanced", num: "05", title: "C# Advanced: Memory, Async &amp; Concurrency",
      desc: "The runtime-level topics that separate a mid-level from a senior C# developer.",
      pages: [
        { file: "index.html", title: "Overview" },
        { file: "memory-gc.html", title: "Memory Management &amp; GC", desc: "Generations, LOH, IDisposable, finalizers, Span&lt;T&gt;, pooling, leaks." },
        { file: "async-await.html", title: "async / await", desc: "State machines, SynchronizationContext, ValueTask, deadlocks, cancellation." },
        { file: "concurrency.html", title: "Concurrency &amp; Parallelism", desc: "Threads, thread pool, locks, SemaphoreSlim, concurrent collections, channels." },
        { file: "performance.html", title: "Performance, Reflection &amp; Internals", desc: "Expression trees, reflection, attributes, source generators, benchmarking." }
      ]
    },

    /* ===================== Part 2 - .NET Platform & Web APIs ===================== */
    {
      id: "06-dotnet-platform", num: "06", title: ".NET Platform Fundamentals",
      desc: "The runtime, the SDK, and the hosting, DI, configuration and logging every app uses.",
      pages: [
        { file: "index.html", title: "Overview" },
        { file: "runtime-sdk.html", title: "Runtime, SDK &amp; Project System", desc: "CLR, JIT, AOT, target frameworks, the CLI, NuGet, project files." },
        { file: "hosting-di-config.html", title: "Hosting &amp; Dependency Injection", desc: "Generic host, service lifetimes, captive dependencies, scopes." },
        { file: "configuration-logging.html", title: "Configuration, Options &amp; Logging", desc: "Providers, the options pattern, structured logging, secrets in development." }
      ]
    },
    {
      id: "07-aspnet-core", num: "07", title: "ASP.NET Core",
      desc: "Middleware, routing, APIs, validation, security, background work and resilience.",
      pages: [
        { file: "index.html", title: "Overview" },
        { file: "pipeline-routing.html", title: "Middleware, Pipeline &amp; Routing", desc: "Request pipeline, endpoint routing, ordering rules, custom middleware." },
        { file: "apis.html", title: "Controllers, Minimal APIs &amp; Binding", desc: "MVC vs minimal APIs, model binding, validation, filters, content negotiation." },
        { file: "security.html", title: "Authentication &amp; Authorization", desc: "JWT, cookies, policies, claims, CORS, data protection, common holes." },
        { file: "background-services.html", title: "Background &amp; Hosted Services", desc: "BackgroundService, scoped work, graceful shutdown, scheduling, idempotency." },
        { file: "performance-resilience.html", title: "Performance &amp; Resilience", desc: "Kestrel, thread pool, HttpClientFactory, Polly, rate limiting, health checks." },
        { file: "api-lifecycle.html", title: "Versioning, OpenAPI &amp; Error Handling", desc: "API versioning strategies, Swagger, ProblemDetails, global exception handling." }
      ]
    },
    {
      id: "08-http-web-apis", num: "08", title: "HTTP &amp; Web API Design",
      desc: "Protocol behaviour, REST design, caching, auth standards and reliable contracts.",
      pages: [
        { file: "index.html", title: "Overview" },
        { file: "http-protocol.html", title: "HTTP Protocol", desc: "Methods, status codes, headers, caching, ETags, HTTP/1.1 vs 2 vs 3." },
        { file: "rest-design.html", title: "REST &amp; API Design", desc: "Constraints, resources, versioning, pagination, filtering, error shapes." },
        { file: "auth-security.html", title: "Auth &amp; API Security", desc: "JWT, OAuth 2.0, OIDC, CORS, CSRF, secrets, common vulnerabilities." },
        { file: "reliability.html", title: "Reliability, Rate Limits &amp; Webhooks", desc: "Idempotency keys, retries, timeouts, throttling, webhook design." }
      ]
    },
    {
      id: "09-dotnet-framework", num: "09", title: ".NET Framework &amp; Modernization",
      desc: "CLR internals, AppDomains, IIS, ASP.NET MVC/Web API, WCF - and how to migrate off them.",
      pages: [
        { file: "index.html", title: ".NET Framework &amp; Legacy Modernization" }
      ]
    },

    /* ===================== Part 3 - Data Access & Databases ===================== */
    {
      id: "10-sql", num: "10", title: "SQL &amp; Azure SQL",
      desc: "Relational fundamentals through execution plans, isolation levels, tuning and Azure SQL.",
      pages: [
        { file: "index.html", title: "Overview" },
        { file: "fundamentals.html", title: "Relational Fundamentals", desc: "Keys, constraints, relationships, normalization and when to denormalize." },
        { file: "indexing.html", title: "Indexing", desc: "Clustered, non-clustered, composite, covering, filtered; fragmentation." },
        { file: "querying.html", title: "Querying", desc: "Joins, subqueries, CTEs, window functions, pagination, set operations." },
        { file: "transactions.html", title: "Transactions &amp; Concurrency", desc: "ACID, isolation levels, locking, blocking, deadlocks, snapshot isolation." },
        { file: "programmability.html", title: "Procedures, Views, Functions &amp; Triggers", desc: "When server-side logic helps and when it hurts." },
        { file: "performance.html", title: "Query Performance &amp; Execution Plans", desc: "Reading plans, parameter sniffing, SARGability, statistics, tuning workflow." },
        { file: "scaling-operations.html", title: "Partitioning, Replication &amp; Recovery", desc: "Partitioning, replication topologies, backup/restore, RPO/RTO." },
        { file: "azure-sql.html", title: "Azure SQL", desc: "Service tiers, DTU vs vCore, elastic pools, HA, geo-replication, security." },
        { file: "practice-problems.html", title: "SQL Interview Problems", desc: "Worked query problems with the reasoning interviewers look for." }
      ]
    },
    {
      id: "11-ef-core", num: "11", title: "Entity Framework Core",
      desc: "Change tracking, mapping, query translation, concurrency and the performance traps.",
      pages: [
        { file: "index.html", title: "Overview" },
        { file: "fundamentals.html", title: "DbContext &amp; Change Tracking", desc: "Lifetimes, entity states, tracking vs no-tracking, identity resolution." },
        { file: "modeling-migrations.html", title: "Modelling &amp; Migrations", desc: "Fluent API, relationships, owned types, conventions, safe migrations." },
        { file: "querying.html", title: "Querying &amp; Loading Strategies", desc: "Eager/lazy/explicit loading, split queries, projections, raw SQL." },
        { file: "transactions-concurrency.html", title: "Transactions &amp; Concurrency", desc: "SaveChanges semantics, optimistic concurrency, execution strategies." },
        { file: "performance.html", title: "EF Core Performance", desc: "N+1, cartesian explosion, compiled queries, bulk operations, pooling." }
      ]
    },
    {
      id: "12-postgresql", num: "12", title: "PostgreSQL",
      desc: "MVCC, the planner, JSONB, partitioning, vacuum and production tuning.",
      pages: [
        { file: "index.html", title: "Overview" },
        { file: "fundamentals.html", title: "Fundamentals &amp; Data Types", desc: "Types, constraints, arrays, JSON/JSONB, schemas, sequences." },
        { file: "indexing.html", title: "Indexing", desc: "B-tree, GIN, GiST, BRIN, partial, expression and covering indexes." },
        { file: "mvcc-transactions.html", title: "MVCC, Transactions &amp; Locking", desc: "Snapshots, isolation levels, row versions, locks, deadlocks, advisory locks." },
        { file: "performance.html", title: "Planner, EXPLAIN &amp; Tuning", desc: "Reading EXPLAIN ANALYZE, statistics, joins, key configuration knobs." },
        { file: "operations.html", title: "Vacuum, Partitioning, Replication &amp; HA", desc: "Autovacuum, bloat, wraparound, partitioning, replication, pooling, failover." }
      ]
    },
    {
      id: "13-mongodb", num: "13", title: "MongoDB",
      desc: "Document modelling, aggregation, replica sets, sharding and consistency controls.",
      pages: [
        { file: "index.html", title: "Overview" },
        { file: "fundamentals.html", title: "Documents &amp; Schema Design", desc: "BSON, embedding vs referencing, patterns and anti-patterns." },
        { file: "indexing-aggregation.html", title: "Indexing &amp; Aggregation", desc: "Compound, multikey, text, TTL indexes; pipeline stages and optimization." },
        { file: "consistency.html", title: "Transactions, Write/Read Concerns", desc: "Replica sets, elections, oplog, write/read concern, read preference." },
        { file: "scaling-operations.html", title: "Sharding, Change Streams &amp; Atlas", desc: "Shard keys, balancer, change streams, pagination, Atlas operations." }
      ]
    },
    {
      id: "14-cosmos-db", num: "14", title: "Azure Cosmos DB",
      desc: "Partitioning, RU economics, consistency levels, change feed and global distribution.",
      pages: [
        { file: "index.html", title: "Overview" },
        { file: "fundamentals.html", title: "Architecture &amp; Partitioning", desc: "Accounts, containers, items, logical vs physical partitions, partition keys." },
        { file: "throughput-consistency.html", title: "Throughput &amp; Consistency", desc: "RU/s, provisioned vs autoscale vs serverless, five consistency levels." },
        { file: "queries-indexing.html", title: "Indexing &amp; Query Execution", desc: "Indexing policy, point reads, cross-partition queries, RU charges." },
        { file: "change-feed-global.html", title: "Change Feed &amp; Global Distribution", desc: "Change feed processor, multi-region writes, conflict resolution, failover." },
        { file: "modeling-cost.html", title: "Data Modelling, Cost &amp; Comparisons", desc: "Denormalization, hot partitions, cost control, Cosmos vs MongoDB vs DynamoDB." }
      ]
    },
    {
      id: "15-dynamodb", num: "15", title: "DynamoDB",
      desc: "Access-pattern-driven modelling, single-table design, capacity modes and streams.",
      pages: [
        { file: "index.html", title: "Overview" },
        { file: "fundamentals.html", title: "Fundamentals", desc: "Tables, items, partition/sort keys, query vs scan, GSI/LSI, consistency." },
        { file: "data-modeling.html", title: "Single-Table Design", desc: "Access-pattern modelling, overloaded keys, hierarchies, adjacency lists." },
        { file: "operations.html", title: "Capacity, Streams &amp; Operations", desc: "On-demand vs provisioned, hot partitions, transactions, TTL, global tables." }
      ]
    },
    {
      id: "16-redis", num: "16", title: "Redis &amp; Caching",
      desc: "Data structures, caching strategies, distributed locks, and every way a cache betrays you.",
      pages: [
        { file: "index.html", title: "Overview" },
        { file: "fundamentals.html", title: "Architecture &amp; Data Types", desc: "Single-threaded model, strings, hashes, lists, sets, sorted sets, streams." },
        { file: "caching-patterns.html", title: "Caching Patterns &amp; Invalidation", desc: "Cache-aside, read/write-through, write-behind, TTL strategy, stampede." },
        { file: "distributed-primitives.html", title: "Locks, Rate Limiting &amp; Pub/Sub", desc: "Distributed locks, the Redlock debate, counters, leaderboards, streams." },
        { file: "operations.html", title: "Persistence, Clustering &amp; Failure", desc: "RDB/AOF, eviction, replication, cluster, hot keys, outage behaviour." }
      ]
    },

    /* ===================== Part 4 - Testing & Quality ===================== */
    {
      id: "17-testing", num: "17", title: "Testing",
      desc: "A test strategy that catches defects instead of freezing implementation details.",
      pages: [
        { file: "index.html", title: "Overview" },
        { file: "fundamentals.html", title: "Fundamentals &amp; Test Doubles", desc: "Pyramid, AAA, isolation, mocks vs stubs vs fakes, when mocking harms." },
        { file: "dotnet-practice.html", title: "Testing in .NET", desc: "xUnit, NUnit, Moq/NSubstitute, async tests, WebApplicationFactory, Testcontainers." },
        { file: "strategy.html", title: "Strategy, Coverage &amp; CI", desc: "Integration, contract, E2E, coverage, mutation testing, flaky tests." }
      ]
    },

    /* ===================== Part 5 - Architecture & Distributed Systems ===================== */
    {
      id: "18-design-patterns", num: "18", title: "Design Patterns",
      desc: "GoF and enterprise patterns as they actually appear in production .NET systems.",
      pages: [
        { file: "index.html", title: "Overview" },
        { file: "creational.html", title: "Creational Patterns", desc: "Factory Method, Abstract Factory, Builder, Singleton, Prototype." },
        { file: "structural.html", title: "Structural Patterns", desc: "Adapter, Decorator, Facade, Proxy, Composite, Bridge." },
        { file: "behavioral.html", title: "Behavioral Patterns", desc: "Strategy, Observer, Command, CoR, Template Method, State, Mediator." },
        { file: "enterprise.html", title: "Enterprise Patterns", desc: "Repository, Unit of Work, Specification, DI, CQRS, Event Sourcing." }
      ]
    },
    {
      id: "19-architecture", num: "19", title: "Architecture &amp; Integration",
      desc: "Application architectures, DDD, event-driven design and the distributed patterns behind them.",
      pages: [
        { file: "index.html", title: "Overview" },
        { file: "application-architecture.html", title: "Application Architectures", desc: "Layered, Clean, Hexagonal, Onion, Vertical Slice, Modular Monolith." },
        { file: "ddd.html", title: "Domain-Driven Design", desc: "Bounded contexts, aggregates, domain events, ubiquitous language." },
        { file: "event-driven.html", title: "Event-Driven Architecture", desc: "Events vs commands, choreography vs orchestration, integration events." },
        { file: "integration-patterns.html", title: "Integration &amp; API Patterns", desc: "API gateway, BFF, request/reply, fire-and-forget, queue-based load levelling." },
        { file: "resilience-patterns.html", title: "Resilience Patterns", desc: "Retry, timeout, circuit breaker, bulkhead, rate limiting, fallback." },
        { file: "distributed-data.html", title: "Distributed Data &amp; Consistency", desc: "Idempotency, outbox, inbox, saga, eventual consistency, DLQs." }
      ]
    },
    {
      id: "20-microservices", num: "20", title: "Microservices",
      desc: "Boundaries, communication, data ownership, resilience and the real operational cost.",
      pages: [
        { file: "index.html", title: "Overview" },
        { file: "boundaries.html", title: "Boundaries &amp; Decomposition", desc: "Finding service boundaries, database-per-service, shared data problems." },
        { file: "communication.html", title: "Communication", desc: "REST vs gRPC vs messaging, service discovery, contracts, gateways." },
        { file: "data-consistency.html", title: "Data &amp; Consistency", desc: "Sagas, eventual consistency, idempotency, distributed transactions." },
        { file: "operations.html", title: "Resilience &amp; Observability", desc: "Distributed tracing, correlation, health, deployment, versioning, testing." },
        { file: "migration.html", title: "Migration &amp; Modular Monolith", desc: "Strangler fig, when NOT to split, modular monolith as the default." }
      ]
    },
    {
      id: "21-messaging", num: "21", title: "Messaging &amp; Pub/Sub",
      desc: "Queue vs topic semantics, fan-out, retries, DLQs, ordering and idempotent consumers.",
      pages: [
        { file: "index.html", title: "Messaging Patterns In Depth" }
      ]
    },
    {
      id: "22-kafka", num: "22", title: "Kafka",
      desc: "Log mechanics, partitions, consumer groups, delivery semantics and lag management.",
      pages: [
        { file: "index.html", title: "Overview" },
        { file: "fundamentals.html", title: "Architecture &amp; Fundamentals", desc: "Brokers, topics, partitions, replication, ISR, producers, consumers." },
        { file: "delivery-ordering.html", title: "Delivery Semantics &amp; Ordering", desc: "At-most/least/exactly-once, idempotent producer, transactions, keys." },
        { file: "operations.html", title: "Operations &amp; Scaling", desc: "Rebalancing, lag, retention, compaction, partition sizing, failure recovery." }
      ]
    },
    {
      id: "23-multi-tenant-saas", num: "23", title: "Multi-Tenant SaaS",
      desc: "Isolation models, tenant context, noisy neighbours, onboarding and per-tenant operations.",
      pages: [
        { file: "index.html", title: "Overview" },
        { file: "isolation-models.html", title: "Tenant Isolation Models", desc: "Shared schema, schema-per-tenant, database-per-tenant, hybrid, pods." },
        { file: "tenant-context.html", title: "Tenant Context &amp; Security", desc: "Resolution, propagation, tenant-aware data access, RBAC, cross-tenant leaks." },
        { file: "scaling-operations.html", title: "Scaling &amp; Noisy Neighbours", desc: "Throttling, resource isolation, per-tenant scaling, monitoring, DR." },
        { file: "lifecycle-billing.html", title: "Onboarding, Billing &amp; Migration", desc: "Provisioning, metering, feature flags, tenant migration, offboarding." }
      ]
    },

    /* ===================== Part 6 - Cloud, DevOps & Delivery ===================== */
    {
      id: "24-azure", num: "24", title: "Azure Cloud",
      desc: "The services you will be asked about, with architecture, limits, cost and failure modes.",
      pages: [
        { file: "index.html", title: "Overview" },
        { file: "app-service.html", title: "App Service", desc: "Plans, scaling, slots, networking, diagnostics, limits." },
        { file: "functions.html", title: "Azure Functions", desc: "Triggers, bindings, hosting plans, cold start, scaling, Durable Functions." },
        { file: "aks.html", title: "AKS", desc: "Cluster architecture, node pools, scaling, identity, networking, upgrades." },
        { file: "api-management.html", title: "API Management", desc: "Gateway, policies, products, versioning, tiers, self-hosted gateway." },
        { file: "service-bus.html", title: "Service Bus", desc: "Queues, topics, sessions, dead-lettering, locks, duplicate detection." },
        { file: "event-hubs.html", title: "Event Hubs", desc: "Partitions, consumer groups, checkpointing, throughput units, Capture." },
        { file: "event-grid.html", title: "Event Grid", desc: "Topics, subscriptions, filtering, retries, dead-letter, CloudEvents." },
        { file: "storage.html", title: "Storage Accounts", desc: "Blob, Queue, Table, tiers, redundancy, SAS, lifecycle, performance." },
        { file: "config-secrets.html", title: "App Configuration &amp; Key Vault", desc: "Centralized config, feature flags, secrets, rotation, managed identity." },
        { file: "application-insights.html", title: "Application Insights", desc: "Telemetry model, sampling, KQL, distributed tracing, alerting, cost." },
        { file: "comparisons.html", title: "Azure Service Comparisons", desc: "Messaging, compute, storage and config services compared with decision rules." }
      ]
    },
    {
      id: "25-docker-kubernetes", num: "25", title: "Docker &amp; Kubernetes",
      desc: "Images, layers, orchestration primitives, scaling and production container operations.",
      pages: [
        { file: "index.html", title: "Overview" },
        { file: "docker.html", title: "Docker &amp; Containerization", desc: "Images, layers, Dockerfiles, multi-stage builds, volumes, networks, security." },
        { file: "kubernetes.html", title: "Kubernetes", desc: "Pods, deployments, services, ingress, config, statefulsets, jobs, HPA." },
        { file: "production.html", title: "Containers in Production", desc: "Resource limits, probes, rollouts, autoscaling, cost, debugging." }
      ]
    },
    {
      id: "26-iac", num: "26", title: "Infrastructure as Code",
      desc: "State, drift, modules and environments - with Terraform, Bicep and ARM compared.",
      pages: [
        { file: "index.html", title: "IaC Principles" },
        { file: "terraform.html", title: "Terraform", desc: "Providers, state, backends, modules, workspaces, plan/apply, imports." },
        { file: "bicep-arm.html", title: "Bicep &amp; ARM", desc: "Resources, modules, scopes, parameters, deployment modes, what-if." },
        { file: "practices.html", title: "IaC in Production", desc: "Pipelines, secrets, drift, environment strategy, Terraform vs Bicep vs ARM." }
      ]
    },
    {
      id: "27-git", num: "27", title: "Git &amp; Source Control",
      desc: "The model behind the commands, plus workflows, review practice and recovery scenarios.",
      pages: [
        { file: "index.html", title: "Git In Depth" }
      ]
    },
    {
      id: "28-github-actions", num: "28", title: "GitHub Actions &amp; CI/CD",
      desc: "Workflows, runners, secrets, OIDC to Azure, reusable workflows and deployment strategies.",
      pages: [
        { file: "index.html", title: "GitHub Actions In Depth" }
      ]
    },
    {
      id: "29-sdlc", num: "29", title: "Software Delivery Lifecycle",
      desc: "How software actually gets built, shipped and operated - and what a senior owns at each stage.",
      pages: [
        { file: "index.html", title: "Overview" },
        { file: "requirements.html", title: "Requirements &amp; Analysis", desc: "Elicitation, functional vs non-functional, acceptance criteria, ambiguity." },
        { file: "estimation-planning.html", title: "Estimation &amp; Planning", desc: "Sizing, uncertainty, commitment vs forecast, breaking down work." },
        { file: "architecture-design.html", title: "Architecture &amp; Technical Design", desc: "Design docs, ADRs, trade-off analysis, technical spikes." },
        { file: "development.html", title: "Development &amp; Code Review", desc: "Branching, code review that finds real defects, definition of done." },
        { file: "testing.html", title: "Testing &amp; Quality", desc: "Test strategy across the lifecycle, shift-left, quality gates." },
        { file: "cicd-deployment.html", title: "CI/CD, Release &amp; Deployment", desc: "Pipelines, environments, blue/green, canary, feature flags, rollback." },
        { file: "operations.html", title: "Operations &amp; Incident Management", desc: "Monitoring, observability, on-call, incidents, postmortems, SLOs." },
        { file: "process.html", title: "Agile, Scrum, Kanban &amp; DevOps", desc: "Process mechanics, DORA metrics, technical debt, documentation." }
      ]
    },

    /* ===================== Part 7 - Front-End for .NET Developers ===================== */
    {
      id: "30-web-fundamentals", num: "30", title: "HTML, CSS &amp; JavaScript",
      desc: "Browser fundamentals that senior interviews still probe - especially the event loop.",
      pages: [
        { file: "index.html", title: "Overview" },
        { file: "html.html", title: "HTML &amp; Accessibility", desc: "Semantics, forms, a11y, SEO basics, browser rendering path." },
        { file: "css.html", title: "CSS", desc: "Box model, layout, flexbox, grid, specificity, responsive design, animation." },
        { file: "javascript.html", title: "JavaScript", desc: "Types, scope, closures, this, prototypes, promises, event loop, modules." },
        { file: "jquery.html", title: "jQuery &amp; Legacy Front Ends", desc: "Core API, AJAX, why it faded, migration strategy." }
      ]
    },
    {
      id: "31-angular", num: "31", title: "Angular",
      desc: "Components, DI, RxJS, signals, change detection and performance.",
      pages: [
        { file: "index.html", title: "Overview" },
        { file: "fundamentals.html", title: "Components, Modules &amp; DI", desc: "Component model, templates, directives, pipes, standalone components, DI." },
        { file: "reactivity.html", title: "RxJS, Signals &amp; Change Detection", desc: "Observables, subjects, operators, signals, OnPush, zone behaviour." },
        { file: "forms-routing-http.html", title: "Forms, Routing &amp; HTTP", desc: "Reactive forms, validation, guards, resolvers, interceptors, lazy loading." },
        { file: "performance-testing.html", title: "Performance, Testing &amp; Security", desc: "Bundle size, rendering cost, testing strategy, XSS and sanitization." }
      ]
    },
    {
      id: "32-react", num: "32", title: "React",
      desc: "Hooks, reconciliation, rendering performance, state strategy and modern patterns.",
      pages: [
        { file: "index.html", title: "Overview" },
        { file: "fundamentals.html", title: "Components, JSX &amp; Hooks", desc: "Props, state, effects, refs, context, rules of hooks, custom hooks." },
        { file: "rendering-performance.html", title: "Rendering &amp; Performance", desc: "Virtual DOM, reconciliation, memoization, lists, profiling, concurrent React." },
        { file: "state-data.html", title: "State Management &amp; Data Fetching", desc: "Local vs server state, Redux/Zustand/Query, caching, forms, routing." },
        { file: "testing-security.html", title: "Testing, Errors &amp; Security", desc: "Testing Library, error boundaries, XSS, auth token handling." }
      ]
    },

    /* ===================== Part 8 - AI-Assisted Development ===================== */
    {
      id: "33-ai-tools", num: "33", title: "AI-Assisted Development",
      desc: "Using Claude, Cursor and agents without shipping code you do not understand.",
      pages: [
        { file: "index.html", title: "AI Tools for Engineers" }
      ]
    },
    {
      id: "34-mcp", num: "34", title: "Model Context Protocol",
      desc: "MCP architecture, tools/resources/prompts, transports, security and building servers.",
      pages: [
        { file: "index.html", title: "MCP In Depth" }
      ]
    },

    /* ===================== Part 9 - Interview Preparation ===================== */
    {
      id: "35-scaling-scenarios", num: "35", title: "Scaling Scenarios",
      desc: "Production problems with diagnosis order, metrics, mitigations and long-term fixes.",
      pages: [
        { file: "index.html", title: "Overview &amp; Method" },
        { file: "api.html", title: "API &amp; Service Scaling", desc: "10x traffic, CPU spikes, memory growth, latency, pool exhaustion." },
        { file: "database.html", title: "Database Scaling", desc: "Slow queries at scale, hot partitions, read/write-heavy, batch, reporting." },
        { file: "distributed.html", title: "Distributed Failure Scenarios", desc: "Service down, duplicates, out-of-order, consumer lag, partial failure." },
        { file: "caching.html", title: "Caching Failures", desc: "Stampede, invalidation, hot keys, Redis outage, cache correctness." },
        { file: "saas.html", title: "Multi-Tenant Scaling", desc: "Noisy neighbour, tenant isolation, large tenant onboarding." },
        { file: "cloud.html", title: "Azure Scaling Scenarios", desc: "App Service, AKS, Functions, Event Hubs, Service Bus, SQL, Cosmos." }
      ]
    },
    {
      id: "36-system-design", num: "36", title: "System Design Exercises",
      desc: "Full designs combining every topic, structured the way a senior interview runs.",
      pages: [
        { file: "index.html", title: "Overview" },
        { file: "method.html", title: "How to Run a Design Interview", desc: "Requirements, estimation, structure, trade-offs, what interviewers score." },
        { file: "multi-tenant-saas.html", title: "Multi-Tenant SaaS Platform" },
        { file: "booking.html", title: "High-Scale Booking System" },
        { file: "notifications.html", title: "Notification &amp; Real-Time Platform" },
        { file: "payments.html", title: "Payment Processing System" },
        { file: "document-processing.html", title: "File / Document Processing" },
        { file: "event-driven-orders.html", title: "Event-Driven Order System" },
        { file: "background-jobs.html", title: "Distributed Background Jobs" },
        { file: "rest-api-scale.html", title: "Large-Scale REST API" },
        { file: "insurance-platform.html", title: "Insurance Management Platform" }
      ]
    },
    {
      id: "37-final-prep", num: "37", title: "Final Interview Prep",
      desc: "Rapid revision, the highest-yield questions, follow-ups and answers that expose shallow depth.",
      pages: [
        { file: "index.html", title: "Overview" },
        { file: "rapid-revision.html", title: "Rapid Revision", desc: "One-screen summaries of every major topic." },
        { file: "top-questions.html", title: "Top Interview Questions", desc: "The highest-frequency questions across all topics." },
        { file: "senior-questions.html", title: "Senior-Level Questions", desc: "Questions that separate 7 years of experience from 1 year repeated 7 times." },
        { file: "architecture-questions.html", title: "Architecture Questions", desc: "Design and trade-off questions with model answers." },
        { file: "troubleshooting.html", title: "Troubleshooting &amp; Performance", desc: "Production debugging scenarios and diagnosis narratives." },
        { file: "behavioral.html", title: "Behavioural + Technical", desc: "Engineering judgement questions and how to structure answers." },
        { file: "red-flags.html", title: "Red Flags", desc: "Answers that sound right but reveal shallow understanding." }
      ]
    }
  ]
};
