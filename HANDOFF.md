# CURRENT PREP REGRESSION / PARITY HANDOFF ADDENDUM — 2026-11-12 KST
1. **Goal:** Independent offline PREP R01–R12; P70 functionality candidate, no release.
2. **Change:** Fixed false exact-duplicate detection by comparing every raw source column rather than normalized mapped fields. 2 new negative/positive regression tests. Original SMAX unchanged; provenance comparison read-only.
3. **Tests:** Node22.16.0 Linux native 61/61 PASS (FAIL0 SKIP0); clean ZIP extraction 61/61 PASS; syntax check PASS and pack dry-run PASS. GitHub source SHA `a9285b06c08a2483565c48eb19ebaca175ae405a` and test SHA `a8831717eb90e1e2f9ce57e663c3f0e6181272c1` exactly match local executed files.
4. **State:** P70 integrated features committed in PRIVATE `hibi89/prep@feature/core-extraction`; **official 70% NOT CERTIFIED**, canonical completion UNASSESSED; main/develop unchanged; RELEASE HOLD.
5. **Gap / failure evidence:** SMAX generic CSV read-only code source `3b6cedae4869b7d8d5ae587f8d565812b6d9e193` differs in numeric grouping/decimal representation, compact/separator date rules, boolean vocabulary and review/evidence object contract. Duplicate identity now consistent for full raw rows. Full golden parity/rights still missing, do not reuse incomplete validation.
6. **Code/ref:** PREP implementation checkpoint `9e10a96f9870d1bf90b64a2ef07ca8b85200d8d7`; source/test blobs above; pre-change safe baseline `15e21dbe1ccac516dff93967c538b7645e756a3f`. Current docs branch HEAD may be later.
7. **Production/environment:** Not deployed; local Node22 Linux verified, Node20+ targeted, Windows/CI/product consumer unverified.
8. **Backups/security:** Git SHA history rollback, original SMAX untouched; no customer data, credentials, paid API, rights change or external publishing.
9. **Next:** owner-approved rights/provenance audit and golden cross-contract tests; versioned compatibility policy if intentional normalization differences. Then close export/receipt security, native Windows and consumer adapter and reassess P70.
10. **Timestamp/evidence:** 2026-11-12 KST; synthetic ZIP integrity valid; ZIP SHA256 `3bb112b7a12d3d2019e5239fdeb6f1dd32b3d89c6bd935d036107c453471fb85`. See new STATUS section and existing handoff for earlier implementation details.

---

# CURRENT PREP TECHNICAL HANDOFF — P70 CANDIDATE (2026-11-12 KST)

1. **Goal/design/stack:** Independent PREP offline local-first engine per R01–R12, Node20+ ESM, 70% milestone target; original SMAX unchanged and not copied.
2. **Delivered/decision:** Authored an independent bounded 2MiB/20k-row/64-column CSV+JSON deterministic engine; schema/explicit mapping/suggestions, normalized rows, review queue, SHA evidence, guarded no-overwrite JSON/CSV, CLI inspect/run/verify. Compared full SMAX copy vs selective licensed extraction vs independent clean-room; clean-room used to avoid source transfer without rights inventory.
3. **Executed tests:** Linux Node22.16.0 `npm test` 59 PASS/0 FAIL/0 SKIP, `npm run check` PASS, npm pack dry-run PASS; fresh ZIP-extracted copy 59 PASS. A synthetic 20k-row input completed; Windows, GitHub CI and downstream consumer E2E NOT_RUN. Exact six GitHub blob hashes match tested local files (see current STATUS).
4. **State/stop point:** PRIVATE feature/core-extraction has GitHub source, CLI, tests, examples. 70% *functional candidate* implemented; **canonical 70% milestone NOT CERTIFIED** due upstream golden parity and source-rights/migration gate not passed; main/develop not promoted. RELEASE HOLD.
5. **Failures/recovery:** Initial encoded transfer length mismatch was aborted before writes; alternate per-file transfer verified SHA and corrected Unicode encoding. No remaining functional test failures. Do not retry private SMAX clone using known failed DNS path or count mocks as E2E.
6. **Repo/branch/SHA/paths:** `hibi89/prep@feature/core-extraction`, implementation checkpoint `75a4e27257ddfc56014e4772eb54b4e8bdc59084` (current final HEAD may advance with docs). Core `src/index.mjs` blob `ca35fba85d7045042f701d54954aeea04a901ca9`; test `test/prep.test.mjs` blob `96ba90427bd3f78ae8d8a7d2156fa82115f90335`. Pre-change branch SHA `15e21dbe1ccac516dff93967c538b7645e756a3f`.
7. **Deployment/environment:** Production/Vercel N/A, no deployment. Local `npm test`, `npm run check`, `node bin/prep.mjs --help` on Node20+ target; only Node22 Linux verified.
8. **Source/backup/security:** Upstream `hibi89/SMAX` PRIVATE `preprocessing` ownership/rights and golden comparison pending. No source copied, no customer fixtures, secrets, API calls, cloud, credentials, license release or original edits. Git pre-change SHA provides rollback.
9. **Next work/acceptance:** (P0) get approved scope/provenance for upstream comparison; obtain source SHA/test fixture inventory, run exact golden parity; (P1) close CSV receipt/encoding/security gaps and replace unverified acceptance rows with measured results; (P2) Windows native CLI and one pinned PREP consumer adapter only after review; (P3) CI and packaging under explicit owner approval where billing/security may change. Do not claim 70% until acceptance matrix prerequisite evidence is satisfied.
10. **Date/evidence/version:** 2026-11-12 KST. Verification: GitHub exact six file blobs, local Linux Node22.16.0 59/59, fresh ZIP 59/59, package check; code checkpoint `75a4e27257ddfc56014e4772eb54b4e8bdc59084`, docs baseline at this new handoff commit, final branch HEAD to resolve via GitHub.

---

## Historical handoff below (superseded where inconsistent)

# PREP — TECHNICAL HANDOFF (10 mandatory sections)
Updated: 2026-11-12 KST. Public-safe baseline only.

## 2026-11-12 KST — VERIFIED PRIVACY UPDATE (current; supersedes prior PUBLIC status)
- GitHub metadata confirms `hibi89/prep` is now **PRIVATE**; the owner made this change. Previous references in the historical record to "PUBLIC" or "blocked on visibility" describe conditions **before** this change.
- Original private SMAX code is still **not migrated**; independent PREP source exists only in the temporary local ZIP. Main/develop/feature branches have documentation only. Windows/CI/consumer integration are NOT_RUN.
- **PREP final-product completion: UNASSESSED.** GitHub independently verified code coverage: **0%**; local clean-room `npm test` 71/71 PASS (twice). **50% target not achieved**; do not invent percentage increases because privacy changed.
- Next: audit original source SHA/rights/test dependency, preserve backup, selectively extract to the now-private `feature/core-extraction`, validate golden results and test committed exact SHA. No permission/visibility change or deployment initiated in this turn.

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
