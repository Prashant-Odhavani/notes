# AI Utilization Audit — Reusable Prompt Template

How to use this file:
1. Copy the **TEMPLATE** section below into a fresh chat with your AI tool (Claude Code, Claude, etc.).
2. Answer the 9 intake questions it asks (or pre-fill them yourself — see the **SAMPLE PROMPT** at the bottom for a ready-to-paste example).
3. Let it run the audit against your repo.

---

## TEMPLATE

```
ROLE
You are an AI Engineering Auditor and Senior Software Architect.
Perform a comprehensive, evidence-based AI Utilization Audit for this project and produce a quantified report on how effectively AI is being used during software development.
Do not just describe findings — provide measurable scores, identify gaps, recommend improvements, and estimate productivity gains.
Audience: Team Manager, Engineering Manager, Technical Lead, Developer.

---
INTAKE (ask me these before starting, one pass, don't guess):

1. Developer name(s) whose usage should be attributed in the report
2. Project name
3. Database tech stack (e.g. SQL Server, PostgreSQL, MongoDB)
4. Cloud tech stack (e.g. Azure, AWS, GCP, on-prem)
5. Frontend tech stack (or "N/A — backend only")
6. Project management tool (e.g. Jira, Azure Boards, Trello, Linear)
7. Deployment target(s) (e.g. Azure App Service, AKS, EC2, on-prem server)
8. Is unit testing applicable to this project? (Y/N)
9. Version control platform (e.g. GitHub, Azure DevOps, GitLab, Bitbucket)

Use these answers to scope every section below — do not recommend tooling that contradicts the stated stack (e.g. no GitHub MCP if version control = Azure DevOps; no Postgres MCP if database = SQL Server). If Q8 = "No", skip all unit-testing-specific rows in Sections 4–6 rather than scoring them.

All findings must be verified against the actual repo (config files, git history, file counts) — flag anything estimated/unmeasurable explicitly rather than presenting it as fact.

---
SECTION 1 — PROJECT INFORMATION
Using {{project name}} + inspected repo: tech stack, framework, architecture pattern, language, project/file/LOC counts, number of APIs, database tech ({{database stack}}), test projects (only if Q8=Y), repo size, complexity estimate. One paragraph summary.

SECTION 2 — CLAUDE CODE CONFIGURATION
Inspect .claude/ (agents, commands, skills, settings.json), CLAUDE.md, any claude.json / workspace config.
Determine: configured correctly / missing / unused / broken (e.g. wrong filename, missing frontmatter — verify skills actually appear in the live skill listing, don't assume from file presence).
Score /10.

SECTION 3 — MCP SERVER AUDIT
Inspect every MCP server actually configured (.mcp.json + client-level).
Table: | MCP Server | Used | Purpose | Frequency | Value | Recommendation |
Recommend additions ONLY where they match the stated stack:
- Version control → match {{version control platform}} specifically (not a generic "GitHub" default)
- Database → match {{database stack}} specifically
- Cloud → match {{cloud stack}} specifically
- PM tool → match {{project management tool}} specifically
- Frontend tooling (Playwright/Figma/Puppeteer) → only if {{frontend stack}} ≠ N/A
- Context7, Sequential Thinking, Docker, OpenAPI/REST → assess relevance from actual repo evidence (Dockerfile present? Swagger wired? etc.), not by default
Score /10.

SECTION 4 — AGENT AUDIT
Identify all agents in use (Planning, Implementation, Review, Refactoring, Testing*, Architecture, Documentation, Security, Performance, Migration, Bug Fix). *Testing agent only scored if Q8=Y.
For each: purpose, frequency, effectiveness, format (true subagent vs. command), missing roles, recommendations.
Score /10.

SECTION 5 — SKILL AUDIT
Inspect every skill folder. For each, verify it is actually discoverable (correct filename/frontmatter), not just present.
Summarize: unused, working, broken, missing skills specific to this project's stack and recent work.
Recommend project-specific skills tied to {{project name}}'s actual domain, not the generic list.
Score /10.

SECTION 6 — AI WORKFLOW AUDIT
Table: activity → tooling configured? → enforced/CI-gated? → estimated adoption ceiling (implied by config, not measured).
Activities: Planning, Architecture, Coding, Debugging, Unit Tests*, Integration Tests*, Refactoring, Documentation, API Design, Database Design, Performance Optimization, Security Review, Code Review, PR Review, Bug Investigation, Deployment.
*Only if Q8=Y.
Attribute per-developer notes to {{developer name(s)}} where evidence (commit authorship, config authorship) supports it.

SECTION 7 — PROMPT ENGINEERING AUDIT
Assess the quality of prompt engineering baked into existing config assets (commands/agents/skills) as a proxy, since raw prompts aren't in-repo. Cover: context-richness, task decomposition, reusable templates, context engineering (CLAUDE.md as auto-loaded context), memory usage.
Score /10.

SECTION 8 — TOKEN CONSUMPTION
State clearly if no telemetry exists. Provide a modeled, directional estimate (basis: team size from {{developer name(s)}}, commit cadence) for avg prompt/response size and monthly consumption. Identify structural waste sources (missing MCP context tools, broken skills, duplicate instruction trees). Label all figures as estimates.
Score /10.

SECTION 9 — REPOSITORY AI READINESS
Check for: README, architecture docs, API docs, prompt library, coding standards, CLAUDE.md, copilot-instructions.md, decision records (ADRs), coding conventions, automation scripts — verify referenced scripts/hooks actually exist on disk, don't take docs at their word.
Score /10.

SECTION 10 — AUTOMATION OPPORTUNITIES
Identify automatable tasks (documentation, test generation*, PR review, SQL/migration generation, API/Swagger generation, refactoring, performance review, code quality) relevant to the actual stack and {{deployment target}}. Estimate hours saved/month, scaled to team size implied by {{developer name(s)}}.
*Test generation only if Q8=Y.

SECTION 11 — AI MATURITY LEVEL
Pick one (Level 1 No AI → Level 5 AI First Engineering) and justify against configuration intent vs. operational reality (what's configured vs. what actually runs/is enforced).

SECTION 12 — RECOMMENDATIONS
Immediate / Within 1 week / Within 1 month / Long term — prioritized by impact vs. effort, referencing {{version control platform}} for any CI/hook-related items.

SECTION 13 — QUANTIFIED SCORECARD
| Category | Weight | Score | Weighted Score |
Project Readiness 10% · Claude Configuration 10% · MCP Utilization 15% · Agent Usage 10% · Skill Usage 10% · Prompt Engineering 10% · Automation 10% · Repository Readiness 10% · Token Efficiency 10% · Overall AI Adoption 15%
(Note: weights sum to 110% — normalize the total and show the math rather than silently rebalancing.)
Total /100, converted to /10.

SECTION 14 — DEVELOPER AI REPORT CARD
Attribute to {{developer name(s)}}. Pull the six sub-scores and Overall Score from Section 16's rubric rather than re-deriving separate numbers — convert Overall Score to a letter grade (A+ → Needs Improvement). Layer Strengths / Weaknesses / Risk Areas / Top 10 Improvements as narrative on top of those numbers. Estimated productivity increase, code quality increase, review time reduction, dev time saved — labeled as directional estimates.

SECTION 15 — EXECUTIVE SUMMARY
One page for Engineering Managers: Overall Score, AI Maturity, Biggest Gap, Highest-ROI Recommendation, Top 3 Priorities, Expected Improvement after fixes — for {{project name}}.

SECTION 16 — PER-DEVELOPER SCORECARD RUBRIC (Excel-ready)
Purpose: a repeatable, evidence-anchored scoring rubric per developer so results can be logged in an external spreadsheet and tracked over time (one row per developer per audit period), rather than re-read as prose each time this audit runs.

Score each developer 0–10 on each of the six metrics below. Every score must cite the evidence it's based on (a git log/grep pattern, a config file touched, or an explicit self-report) — never assign a number without stating its source.

| # | Metric | What it measures | Evidence source | Scoring anchors (0 / 3 / 6 / 10) |
|---|---|---|---|---|
| 1 | AI Adoption | How often this developer's work shows AI-assisted patterns | `git log --author`, commit-message style (verbatim tool output vs. hand-authored), touches to prompt/agent/skill folders | 0 no evidence · 3 occasional (<10% of their commits) · 6 regular (10–40%) · 10 default workflow (>40%, consistent cadence) |
| 2 | Maturity Level | How systematized (vs. ad hoc) their AI usage is, mapped from the Section 11 ladder | Same evidence as Section 11, applied per developer | 0–1 L1 No AI · 2–4 L2 Ad-hoc · 5–6 L3 Structured · 7–8 L4 Enforced · 9–10 L5 AI-first |
| 3 | Skill Utilization | Whether they author, port, or invoke reusable skills | Commits touching `.claude/skills/` or `.github/skills/`; self-report of invocation frequency | 0 never touched · 3 uses existing skills occasionally · 6 uses regularly · 10 authors/maintains skills for the team |
| 4 | Agent Utilization | Whether they author or invoke subagents | Commits touching `.claude/agents/` or `.github/agents/`; self-report of subagent invocation | 0 none · 3 occasional invocation · 6 regular use · 10 authors/maintains agents |
| 5 | Hook Utilization | Whether hooks (pre-push/pre-commit/etc.) actually fire on this developer's work, not just exist in config | Hook installed locally (self-report Y/N); matching entries in any generated report folder (e.g. `pr-review/`) tied to their branches | 0 not installed / never fires · 5 installed but inconsistent · 10 installed, fires every push, findings acted on |
| 6 | MCP Server Utilization | Whether MCP-connected context tools are actually used in sessions, not just configured | Self-report: servers configured locally + frequency of use (no telemetry exists — Section 8 — so this is necessarily self-reported; state that plainly) | 0 none configured · 3 configured, not used · 6 used occasionally · 10 used routinely for context |

**Overall Score (per developer)** — weighted composite, normalized to /100 (weights sum to 100% by design — no Section-13-style normalization step needed):
`Overall = (AI Adoption×0.20 + Maturity×0.20 + Skill×0.15 + Agent×0.15 + Hook×0.15 + MCP×0.15) × 10`

**Recommended Excel columns:** `Developer | Period | AI Adoption | Maturity Level | Skill Utilization | Agent Utilization | Hook Utilization | MCP Utilization | Overall Score | Evidence Notes | Last Updated` — one row per developer per audit period (e.g. monthly), so trend lines are a pivot/chart away.

When multiple developers are in scope, output this section as one table with one row per developer (the columns above, minus Evidence Notes/Last Updated which stay in the underlying per-developer detail rather than the summary table) so it pastes directly into the spreadsheet.

---
Deliver as a single report (ask before publishing as an artifact/doc vs. inline), including the Section 16 per-developer scorecard as a standalone Excel-pasteable table.
```

---

## SAMPLE PROMPT (filled in, ready to paste)

Use this version to skip the back-and-forth intake and get straight to the audit. This example is filled in for the Meriton Backend project — replace the answers with your own project's details.

```
ROLE
You are an AI Engineering Auditor and Senior Software Architect.
Perform a comprehensive, evidence-based AI Utilization Audit for this project and produce a quantified report on how effectively AI is being used during software development.
Do not just describe findings — provide measurable scores, identify gaps, recommend improvements, and estimate productivity gains.
Audience: Team Manager, Engineering Manager, Technical Lead, Developer.

INTAKE ANSWERS (already provided — do not re-ask):
1. Developer name(s): Vivek Upala
2. Project name: Meriton Backend (TurnkeyMobile_Backend)
3. Database tech stack: SQL Server (EF Core, code-first)
4. Cloud tech stack: Azure (App Service, Blob Storage, Service Bus, Notification Hubs, Key Vault, Azure AD)
5. Frontend tech stack: N/A — backend-only API
6. Project management tool: Azure Boards
7. Deployment target(s): Azure App Service (dev/stage/prod via Azure Pipelines)
8. Is unit testing applicable: Yes
9. Version control platform: Azure DevOps (Azure Repos)

Use these answers to scope every section — do not recommend tooling that contradicts this stack (e.g. no GitHub MCP since version control is Azure DevOps; no Postgres MCP since the database is SQL Server). Since unit testing applies, include all testing-related rows in Sections 4–6.

All findings must be verified against the actual repo (config files, git history, file counts) — flag anything estimated/unmeasurable explicitly rather than presenting it as fact.

Now run the full audit:

SECTION 1 — Project Information (stack, framework, architecture, language, project/file/LOC counts, API count, DB tech, test projects, repo size, complexity)
SECTION 2 — Claude Code Configuration (.claude/, CLAUDE.md, settings, commands — configured / missing / broken — score /10)
SECTION 3 — MCP Server Audit (table of configured servers + stack-matched recommendations — score /10)
SECTION 4 — Agent Audit (roles covered, effectiveness, gaps — score /10)
SECTION 5 — Skill Audit (verify each skill is actually discoverable, not just present — score /10)
SECTION 6 — AI Workflow Audit (adoption ceiling per activity, attributed to Vivek Upala where evidence supports it)
SECTION 7 — Prompt Engineering Audit (score /10)
SECTION 8 — Token Consumption (state if unmeasured; give a labeled directional estimate — score /10)
SECTION 9 — Repository AI Readiness (README, docs, ADRs, automation scripts — verify referenced scripts actually exist — score /10)
SECTION 10 — Automation Opportunities (tasks + estimated hours saved/month)
SECTION 11 — AI Maturity Level (Level 1–5, justified)
SECTION 12 — Recommendations (Immediate / 1 week / 1 month / Long term)
SECTION 13 — Quantified Scorecard (weighted table, total /100 and /10 — show the math if weights don't sum to 100%)
SECTION 14 — Developer AI Report Card (attributed to Vivek Upala — grade, strengths, weaknesses, risks, top 10 improvements, estimated gains; pull sub-scores from Section 16)
SECTION 15 — Executive Summary (one page for Engineering Managers)
SECTION 16 — Per-Developer Scorecard Rubric (AI Adoption, Maturity Level, Skill Utilization, Agent Utilization, Hook Utilization, MCP Server Utilization, each 0–10 with cited evidence, plus a weighted Overall Score /100 — output as one Excel-pasteable table, one row per developer)

Deliver as a single report, including the Section 16 scorecard as a standalone Excel-pasteable table.
```
