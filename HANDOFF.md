# PREP — TECHNICAL HANDOFF (10 mandatory sections)
Updated: 2026-11-12 KST. Public-safe baseline only.

## 1. Goal, confirmed needs, technology
Standalone local-first deterministic preparation engine for reusable data verification/normalization, review queues, origin evidence and downstream SDK/CLI. Node.js 20+ / ECMAScript modules are the initial compatibility choice; no paid AI requirement. Requirements in REQUIREMENTS.md.

## 2. Completed work, changes and decision rationale
Repository metadata inspected; the initial documentation, architecture, requirements, security, testing and migration framework was **committed and file-verified** as a documentation-only baseline. Architecture decision: selective reusable-core extraction is preferred to wholesale copying because it reduces coupling, private-source exposure and regression risk. This does not prove implementation.

## 3. Test commands and verified outcomes
No standalone source, unit tests, package build, CI, Windows browser or product E2E has run at this new repository baseline. PASS/FAIL/SKIP: NOT_RUN / NOT_RUN / NOT_RUN. Future npm test commands are described in docs/TEST_PLAN.md, not claimed as executed.

## 4. Done / ongoing / pending / blocked and stop point
DONE: public-safe repository initialization, 16 documentation/config files and three branch refs verified on GitHub. IN PROGRESS: owner visibility/rights decision. PENDING: core migration, independent compilation, test evidence, SDK, adapters. BLOCKED: private code migration while new repository visibility is PUBLIC. RELEASE HOLD.

## 5. Failure evidence, causes, attempts, prohibited retry, alternatives
No source migration attempted. No failure attributed to source. Security mismatch: public destination vs private source. Do not copy private source here or relabel the public repository as private without user authorization. Preferred alternative: owner approves repository-private visibility, then minimal verified extraction. Public-safe clean-room rewrite is slower and must not be conflated with copying proprietary material.

## 6. Repository, branches, SHA, important paths
Repository: hibi89/prep. Default branch: main. Integration: develop. Initial development: feature/core-extraction. Initializing commit: 0c455e60ec284684f7350505012b6035b5027deb. Verified 16-file documentation baseline: 46549bbe30e1bbb4cbdc90b5131cb912e765f64d. Later doc-only refresh SHA and each branch HEAD must be resolved from GitHub. Read README.md, AGENTS.md, REQUIREMENTS.md, STATUS.md, docs/*.md.

## 7. Production URL, host, runtime and environment
No Production deployment, Vercel project, release artifact or running API (NOT APPLICABLE). Planned local runtime: Node.js 20+; full native version and platform matrix untested for this repo. CI not yet created.

## 8. Original, backups, credential management and no-touch
The existing internally owned source remains in its original PRIVATE repository, unchanged. Source inventory, precise private SHA and code contents remain restricted until privacy/rights gate clearance. Git history is the documentation baseline rollback mechanism. No real customer data, tokens, .env, personal information or private code may be committed or exported. No edits to upstream main/develop or project consumers.

## 9. Next work priority, procedure, acceptance and approval
First obtain owner's explicit approval for PRIVATE visibility or maintain public-safe only. Then inventory upstream dependencies, preserve exact SHA and regression expectations, extract core into feature branch, remove upstream imports, run native whole-repo tests/security suite, integrate into develop, validate a downstream adapter, assess milestones, and consider release with separate approval. No paid API, public deployment or privacy change without approval.

## 10. Updated time, verification scope, baseline commit
2026-11-12 KST. This document is a bootstrap planning record, not product verification. Initializing README SHA 0c455e60ec284684f7350505012b6035b5027deb; verified all-document baseline SHA 46549bbe30e1bbb4cbdc90b5131cb912e765f64d. Branch existence verified; final documentation refresh SHA is to be read from the live branch. Latest GitHub HEAD is authoritative. Completion: UNASSESSED; source & product validation: NOT_RUN.

## New chat activation
"You are PREP technical lead. Check hibi89/prep current refs; read HANDOFF.md → STATUS.md → AGENTS.md → REQUIREMENTS.md → docs/ARCHITECTURE.md → docs/MIGRATION_PLAN.md, then inspect real source/tests. Continue only an authorized next unit. Never expose private source in a public repository. Report verified SHA/tests/limits and update STATUS/HANDOFF."
