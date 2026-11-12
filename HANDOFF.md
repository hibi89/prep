# PREP — TECHNICAL HANDOFF (10 mandatory sections)
Updated: 2026-11-12 KST. Public-safe baseline only.

## 2026-11-12 KST latest implementation evidence (read before historical bootstrap)
- New independent clean-room Node.js ESM candidate produced **locally only**, not copied from Private SMAX and **not committed** to PUBLIC GitHub. `PREP_STANDALONE_CORE_LOCAL_CANDIDATE_20261112.zip` archive SHA-256 `974dbad1f146a154d4f08033cd6e3d0e1f2b87b7966f3b4f7849070f477fdbe4`.
- 71/71 PASS, FAIL0, SKIP0 on Linux Node22 original local code and **71/71 PASS again after fresh ZIP extraction**; CLI inspect/run REVIEW_REQUIRED exit2/verify SOURCE_BYTES_MATCH, syntax/pack dry-run/ZIP integrity passed.
- Implemented candidate CSV parse/schema/type normalization/quality review, SHA source verification, CLI and no-overwrite safe local output. **No PREP GitHub code baseline, original SMAX functional parity, CI, Windows, JSON or consumer adapter.**
- Therefore **50% gate NOT achieved**, canonical product completion `UNASSESSED`, GitHub implementation remains 0 verified. No private code publicized. Evidence: [LOCAL_CANDIDATE_EVIDENCE_20261112.md](docs/LOCAL_CANDIDATE_EVIDENCE_20261112.md).
- Blocker and next approval: owner must approve PRIVATE destination or explicitly authorize publicly distributing the newly authored core; then validate upstream golden/source rights, GitHub exact-code tests and Windows. Download ZIP from conversation while available; this GitHub text is not a durable copy of code.

## 1. Goal, confirmed needs, technology
Standalone local-first deterministic preparation engine for reusable data verification/normalization, review queues, origin evidence and downstream SDK/CLI. Node.js 20+ / ECMAScript modules are the initial compatibility choice; no paid AI requirement. Requirements in REQUIREMENTS.md.

## 2. Completed work, changes and decision rationale
Repository metadata inspected; the initial documentation, architecture, requirements, security, testing and migration framework was **committed and file-verified** as a documentation-only baseline. Final-product review subsequently added docs/FINAL_PRODUCT_BLUEPRINT.md and docs/ACCEPTANCE_MATRIX.md to specify full user journey, 12 required modules, safety/data flow, interfaces, 50/70/85/95/100 thresholds and row-level PASS/FAIL evidence. These are documented requirements, not running functions. Architecture decision: selective reusable-core extraction is preferred to wholesale copying because it reduces coupling, private-source exposure and regression risk. This does not prove implementation.

## 3. Test commands and verified outcomes
No standalone source, unit tests, package build, CI, Windows browser or product E2E has run **from code committed to this GitHub repository**. A separate fresh, newly authored local candidate did run 71/71 PASS on Linux, but does not establish upstream parity or this repository's release readiness. PASS/FAIL/SKIP: NOT_RUN / NOT_RUN / NOT_RUN. Future npm test commands are described in docs/TEST_PLAN.md, not claimed as executed.

## 4. Done / ongoing / pending / blocked and stop point
DONE: public-safe repository initialization, 16 documentation/config files and three branch refs verified on GitHub. IN PROGRESS: owner visibility/rights decision and final design review. PENDING: authorized core migration, GitHub-exact-code tests, SDK release, consumer adapters and Windows validation. A local prototype is tested but not source-migrated. BLOCKED: private code migration while new repository visibility is PUBLIC. RELEASE HOLD.

## 5. Failure evidence, causes, attempts, prohibited retry, alternatives
No source migration attempted. No failure attributed to source. Security mismatch: public destination vs private source. Do not copy private source here or relabel the public repository as private without user authorization. Preferred alternative: owner approves repository-private visibility, then minimal verified extraction. Public-safe clean-room rewrite is slower and must not be conflated with copying proprietary material.

## 6. Repository, branches, SHA, important paths
Repository: hibi89/prep. Default branch: main. Integration: develop. Initial development: feature/core-extraction. Initializing commit: 0c455e60ec284684f7350505012b6035b5027deb. Verified 16-file documentation baseline: 46549bbe30e1bbb4cbdc90b5131cb912e765f64d. Later doc-only refresh SHA and each branch HEAD must be resolved from GitHub. Read README.md, AGENTS.md, REQUIREMENTS.md, STATUS.md, docs/FINAL_PRODUCT_BLUEPRINT.md, docs/ACCEPTANCE_MATRIX.md, docs/*.md.

## 7. Production URL, host, runtime and environment
No Production deployment, Vercel project, release artifact or running API (NOT APPLICABLE). Planned local runtime: Node.js 20+; full native version and platform matrix untested for this repo. CI not yet created.

## 8. Original, backups, credential management and no-touch
The existing internally owned source remains in its original PRIVATE repository, unchanged. Source inventory, precise private SHA and code contents remain restricted until privacy/rights gate clearance. Git history is the documentation baseline rollback mechanism. No real customer data, tokens, .env, personal information or private code may be committed or exported. No edits to upstream main/develop or project consumers.

## 9. Next work priority, procedure, acceptance and approval
First obtain owner's explicit approval for PRIVATE visibility or maintain public-safe only. Final design changes must reconcile REQUIREMENTS.md, docs/FINAL_PRODUCT_BLUEPRINT.md, docs/ACCEPTANCE_MATRIX.md and the owner's confirmed v1 scope. Then inventory upstream dependencies, preserve exact SHA and regression expectations, extract core into feature branch, remove upstream imports, run native whole-repo tests/security suite, integrate into develop, validate a downstream adapter, assess milestones, and consider release with separate approval. No paid API, public deployment or privacy change without approval.

## 10. Updated time, verification scope, baseline commit
2026-11-12 KST. This document is a bootstrap planning record, not product verification. Initializing README SHA 0c455e60ec284684f7350505012b6035b5027deb; verified all-document baseline SHA 46549bbe30e1bbb4cbdc90b5131cb912e765f64d. Branch existence verified; final documentation refresh SHA is to be read from the live branch. Latest GitHub HEAD is authoritative. Completion: UNASSESSED; source & product validation: NOT_RUN.

## New chat activation
"You are PREP technical lead. Check hibi89/prep current refs; read HANDOFF.md → STATUS.md → AGENTS.md → REQUIREMENTS.md → docs/FINAL_PRODUCT_BLUEPRINT.md → docs/ACCEPTANCE_MATRIX.md → docs/ARCHITECTURE.md → docs/MIGRATION_PLAN.md, then inspect real source/tests. Continue only an authorized next unit. Never expose private source in a public repository. Report verified SHA/tests/limits and update STATUS/HANDOFF."
