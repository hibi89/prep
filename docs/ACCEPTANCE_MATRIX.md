## 2026-11-12 KST — P85 HTML global review consistency (LATEST)
- Code SHA **a4c71258851af4b0d8540202f36c84c1438ad9e6**, Git SHA of all three changed source/test files matched tested local. R05/R06/R08: global alias ambiguity already had dataset review_queue and CSV effective HOLD; static HTML now also shows effective REVIEW_REQUIRED / AMBIGUOUS_MAPPING in every displayed row while original records/receipt remain unchanged. New positive and immutability regressions PASS. Frozen ambiguous HTML golden SHA updated; clean/review normal output frozen hashes remain intact.
- Linux Node22.16 npm test **150 PASS, FAIL0/SKIP0**, Linux offline network namespace **150 PASS**, syntax PASS, npm pack dry-run PASS. New locally packed 7-file tarball SHA256 8087a8e84618c0916560c7c5380924442e2def0b6f308607a323cb0b2c36557f, offline new consumer install with SDK/report/CSV/HTML and result integrity PASS. Local pack did not include remote README/SDK docs, so full release bundle remains NOT_VERIFIED.
- Upstream original SMAX cross-repo **native Node/validator golden NOT_RUN** (separate private pinned checkout unavailable). Prior isolated V8 read-only original source SHA+validator 11/11 does not prove Node parity. GitHub-hosted CI NOT_DISPATCHED. P85 **NOT CERTIFIED**, overall PREP completion UNASSESSED, RELEASE HOLD, no deployment/rights changes.

---

## 2026-11-12 KST — P85 JSON data-loss and metadata-spoofing gate (LATEST)
- Commit 7b6a90b067c72165438b2ed9b3b5c328a9330a53 exact Git source and new test blob verified. R02/R04/R08/R09: v1 JSON now detects duplicate keys within one flat record before JSON.parse can silently overwrite an earlier value (including escaped equivalents), FAIL CLOSED DUPLICATE_JSON_KEY; repeated names in separate records still valid. R08 export status namespace __status/__reasons/__source_record cannot be mapped as user field (including NFKC/case aliases): INVALID_SCHEMA_FIELD. Normal export header layout unchanged.
- Linux Node22.16 x86_64 npm test **148 PASS, 0 FAIL, 0 SKIP**, network-isolated Linux full **148 PASS**, npm run check PASS; package dry-run PASS. Fresh locally packed 7-file 9366-byte tarball SHA256 e8f82a3931b19239b22b4036dae082f1208a6e16dfc5cff21192819ca48ee9c0 offline installation SDK/report and CLI CSV/receipt E2E PASS; local packaging lacks full docs.
- Last original SMAX V8 core with real SHA and original validator 11/11 PASS is limited semantic/source-byte evidence, **NOT native original SMAX checkout or executed cross-repo Node golden parity**. GitHub hosted workflow, Windows/Node20 and approved downstream adapter NOT_RUN. Formal 85% NOT CERTIFIED; product score UNASSESSED, RELEASE HOLD.

---

## 2026-11-12 KST — P85 global export HOLD and V8 original validation (LATEST)
- Exact PREP SHA 63cbf3dbe7d22010ed099862f7698d12cf0bc03f. R05/R06/R08 local PASS: global mapping conflict propagates effective REVIEW_REQUIRED and reason into CSV while HTML warns even if row review count is 0. Three regressions and intentionally updated ambiguous CSV/HTML hashes; normal exports unchanged.
- Linux Node22.16 full npm test 136/136 PASS, 0 fail/skip; no-network namespace 136/136 PASS, syntax PASS. Fresh offline tarball SHA256 238ab334c84d8b9c31a0fc8a7ec60e9dd19d4b0c04eebb248616ff6daa475ba7 installed with main/SDK/report imports and installed CLI run+receipt verify PASS. Exact remote README/docs package NOT_VERIFIED.
- Read-only original SMAX source in isolated V8 with SHA256 shim verified against known vectors and original validator + serializer: 11/11 inputs valid/source SHA correct. Six equal value/review states, five intentional differences. NOT original native Node/approved cross-repository golden parity, no source migration.
- GitHub-hosted Actions NOT_DISPATCHED; Windows/consumer future. Formal 85% NOT CERTIFIED, final rate UNASSESSED; RELEASE HOLD.

---

## 2026-11-12 KST — P85 differential evidence (LATEST)
- Code SHA e41c57f23c4301eb5195c2c84e181ca9cf264761. Local PREP Linux Node22.16 native 133 PASS/0 FAIL/0 SKIP; network-isolated 133 PASS; syntax and npm pack dry-run PASS.
- 11 synthetic original-SMAX core comparisons via isolated V8 + checksum stub: normalized value and review flag same for 6, different for 5. This is NOT native Node original-SMAX validated golden/receipt equivalence.
- 12 PREP-local frozen semantic tests, external-checkout pinned native comparator script committed and syntax checked. Native original SMAX checkout unavailable in sandbox: script NOT_RUN on real source. Hosted GitHub CI NOT_RUN. Current exact remote package and Windows/consumer NOT_RUN.
- P50/P70 original-SMAX parity prerequisite and formal 85% acceptance NOT CERTIFIED; canonical product score UNASSESSED; RELEASE HOLD. No upstream copy or modification.

---

## 2026-11-12 KST — P85 contract and source-identity evidence (LATEST)
- **Commit:** PRIVATE PREP feature/core-extraction verified implementation **fd3b68c45fd9323dc67debf47171e778084266a4**. Exact 4 changed/new source/test blobs SHA-matched and GitHub commit created. 121 native Linux tests PASS (0 FAIL/0 SKIP), 121 isolated no-network PASS, npm run check PASS.
- **R02/R06/R09:** CSV/header-only invalidity, strict field-schema unknown parameters, direct parser byte cap, JSON wrong type and multiline CRLF lineage tested. Ambiguous case-insensitive/NFKC candidate mapping now forces **dataset-level REVIEW_REQUIRED** even if explicit mapped data has zero record issues, with AMBIGUOUS_MAPPING in queue; no auto-apply.
- **R03/R04/R05/R07/R08/R11:** Four self-contained PREP synthetic goldens for normalized result-envelope SHA and CSV/HTML SHA; frozen expected hashes not copied from SMAX. 20,000 exact row limit, 64 mapped columns and 2MiB accepted boundaries, 20,001/65/+1 refused without silent loss. Existing checksum-only sidecar, JSON result integrity and formula-protection still pass. SHA != signing.
- **R01/R11 Linux/package:** Node22.16 native 121/121 and unshare no-network 121/121 PASS, npm pack dry-run PASS, local staged seven-file tarball SHA256 1acc3fae07591f12a87421182d13cf144670b96d943e67576be70cb4778e738f installed offline SDK/report/CLI CSV receipt smoke PASS. Exact full remote docs packaging NOT VERIFIED.
- **Upstream:** SMAX read-only private branch HEAD 3830cb276f560d58e8181ba384d9cbe64815737c and generic source/test blob IDs inventory in docs/UPSTREAM_INTERFACE_INVENTORY_20261112.md. Contract divergences documented; executable SMAX-to-PREP golden compatibility remains **UNVERIFIED**, source transfer/rights not approved.
- **CI:** GitHub commit combined statuses: **0**. Manual workflow not dispatched; hosted Linux CI **NOT_RUN**, not a PASS. Windows and consumer integration **NOT_RUN**.
- **Certification:** Formal **85% NOT CERTIFIED**; legacy upstream golden/parity prerequisite also open, final overall rate UNASSESSED, RELEASE HOLD. No production or private source migration.

---

## 2026-11-12 KST — P85 SHA-bound runtime and security evidence
- Candidate code SHA 9a7e6f6cc69632158211587d87a0a6c09da674ce, PRIVATE PREP feature/core-extraction; tested locally from exact matching Git blobs.
- R04/R05/R07/R08: MAPPED and UNMAPPED formula risk detects hidden Unicode; JSON result checksum covers records/review/status/mapping; optional CSV/HTML sidecar binds exported bytes to source receipt. Non-overwrite tests, paired-output cleanup and tamper negatives PASS. Sidecar pair can be partial after crash; digest is not an authenticated issuer signature.
- R01/R10/R11: Linux Node22.16 native npm test 104/104 PASS, FAIL0 SKIP0, npm run check PASS, no-network Linux namespace 104/104 PASS; local runtime tarball freshly installed offline with main/SDK/report import, CLI and CSV+receipt verify PASS. GitHub-hosted workflow NOT DISPATCHED, full exact GitHub package including docs and Windows native NOT RUN.
- Rights and SMAX golden parity remain pending: original SMAX generic CSV source blob 3b6cedae4869b7d8d5ae587f8d565812b6d9e193. Six static cross-contract PREP assertions confirm date/decimal/boolean/integer differences but do not run SMAX original executable golden comparison. No drop-in compatibility claim.
- **Formal P70/P85 gates NOT CERTIFIED; canonical PREP completion UNASSESSED. RELEASE HOLD.** No production, paid runner usage, private code copying, or scope change.
---
## 2026-11-12 KST — P85 additional SHA-bound verification
- Exact implementation commit: 07255335dc3b6de4f9c8c3e8bacdf06c87d4eb0e, private feature/core-extraction.
- R01/R12 PARTIAL: ESM package SDK self-reference and fresh local offline CLI/main/report install smoke PASS; published SDK and approved external consumer NOT_RUN.
- R02/R04/R07/R08 PARTIAL: six added XSS/prototype/CSV-formula/no-overwrite/invalid-UTF8 safety regressions PASS; CSV has no standalone receipt, JSON receipt is not an authenticity signature.
- R09/R10/R11 PARTIAL: Linux Node22.16.0 npm test **75/75 PASS**, fail0 skip0, npm run check PASS; separate network-disabled namespace **75/75 PASS**; npm pack dry-run and local offline tarball import/CLI smoke PASS. This is NOT a hosted GitHub Actions run, Windows native test, full remote-tarball audit, or downstream adapter E2E.
- P70/P85 formal gates NOT CERTIFIED due SMAX contractual parity/rights golden review, CSV evidence and unrun hosted CI. RELEASE HOLD.

---

## 2026-11-12 KST — P85 partial implementation evidence (supersedes prior snapshot for new code)
- R08 **partial implementation**: HTML static report with escape/CSP and bounded 200-row preview added, 6/6 local module tests at exact Git blob hash PASS. New CLI HTML E2E **NOT_RUN**; HTML not complete signed/authoritative evidence.
- R01/R12 **partial**: `./sdk` preview package export exists, no published package/consumer acceptance, contract not stable; R12 **NOT_RUN**.
- R11 **partial**: Manual GitHub workflow defined, no dispatch/CI PASS, full updated 61 baseline + 8 new tests **NOT_RUN** as a combined repo.
- P70 baseline upstream differences and source-rights goldens remain unresolved. Therefore neither 70 nor 85 is certified; commercial release HOLD.
- Git HEAD functional commit `29316f13818765d374aeefdd29e4420b680e3014`. Source/report blob `84daeeea1af5d3667d112df87d6f755aefdad2a9`, report-test blob `2f55aaa4d1e466b789d0b3d4507b9a5c5dec7720`.
---
## 2026-11-12 — Post-comparison P70 evidence update (supersedes 59 test checkpoint)
- Linux Node22 native **61/61 PASS / 0 FAIL / 0 SKIP**, clean ZIP **61/61 PASS**; syntax/pack smoke PASS.
- Confirmed exact source/test Git blobs: `a9285b06c08a2483565c48eb19ebaca175ae405a` and `a8831717eb90e1e2f9ce57e663c3f0e6181272c1`.
- R04 duplicate regression: exact raw source rows including unmapped values used; previously a false-positive duplicate could occur when only normalized mapped values matched. Negative and positive cases both pass.
- **Parity gap not resolved:** SMAX generic preprocessing contract has differing decimal grouping/precision preservation, date syntax, boolean vocabulary and source package shape/reason taxonomy. Tested candidate is **not an interchangeable SMAX replacement**; rights and approved golden mapping unverified.
- **Formal 70% NOT CERTIFIED**, product completion UNASSESSED despite standalone candidate features. Windows, GitHub CI, pinned authorized consumer, production and release NOT_RUN/HOLD.

---

## 2026-11-12 — P70 candidate evidence (feature branch; no release acceptance yet)

| Requirement | Current technical evidence | Gate |
|---|---|---|
| R01 CLI/ESM | `inspect/run/verify` and package dry-run; Node22 process E2E | PARTIAL: fresh published install untested |
| R02 CSV/JSON | strict UTF-8, CSV quoting, JSON array, 2 MiB/20k/64 limits; symlink denial | LOCAL PASS; Windows NOT_RUN |
| R03 normalization | date/leap, exact decimal, signed 64-bit integer strings, boolean/text | LOCAL PASS |
| R04 quality | missing, malformed type, exact duplicates, formulas, unmapped fields, hidden controls | LOCAL PASS |
| R05 review | row/line reason codes retained, no automatic row deletion | LOCAL PASS |
| R06 mapping | suggestions only, explicit source contract, conflicting candidate REVIEW_REQUIRED | LOCAL PASS; UI NOT_APPLICABLE |
| R07 evidence | input SHA and receipt rehash; tamper/mismatch negative tests | LOCAL PASS; not an authenticity signature |
| R08 export | new-file JSON/CSV, no overwrite, atomic hardlink publication | LOCAL PASS; CSV receipt/HTML not complete |
| R09 bounds | row/column/byte refusals and 20k-row synthetic benchmark | PARTIAL: broader denial-of-service metrics pending |
| R10 offline config | strict config, no third-party dependencies or mandatory API | LOCAL PASS; controlled no-network audit NOT_RUN |
| R11 tests | 59/59 Node22 Linux and fresh ZIP extraction, exact Git blob SHA | PARTIAL: GitHub CI and Windows NOT_RUN |
| R12 consumer | no authorized downstream adapter | NOT_RUN |

**Certification result: NOT 70%.** The prior 50%-gate original SMAX golden parity/source-rights/migration baseline is not complete. This is a *functional development candidate*, not an independent commercial product or full R01–R12 acceptance.

Test commands: `npm test`, `npm run check`, `npm pack --dry-run --json`; platform Linux x86_64 Node22.16.0. Source checkpoint `75a4e27257ddfc56014e4772eb54b4e8bdc59084`, local Git blob hashes listed in STATUS. Synthetic 20,000-row 277,783-byte processing: 20,000 output records / 0 review, about 68ms on one run; not a contractual benchmark.

---

# PREP — Product Acceptance Matrix v1.0
**Date:** 2026-11-12 KST. **Status:** Proposed verification plan; NO tests executed in the new repository. This document defines evidence required before saying a feature or product is complete.

| ID | Required proof / positive scenario | Required negative or boundary scenario | Evidence to record |
|---|---|---|---|
| R01 CLI/ESM | Fresh isolated install, CLI help, API import and same deterministic result | Missing config, unsupported flags, malformed commands | Node/OS versions, exact SHA, command, stdout status |
| R02 CSV/JSON input | Valid UTF-8 files, quoted CSV, BOM policy, JSON structure | Invalid UTF-8, malformed CSV/JSON, path traversal, symlink escape, over-limit input | Golden fixtures, bytes/hash, original unchanged |
| R03 Normalization | Calendar dates, integer, exact decimal, bool and Unicode policy | Leap-day errors, overflow, locale ambiguity, malformed decimals | Input/output semantic equality, reason codes |
| R04 Quality | Missing fields, type checks, duplicates and formula-risk flags | Duplicate headers, spreadsheet formula injection, unseen unmapped fields | Review counts, no lost rows, security tests |
| R05 Review queue | Every issue traced to source record and stable reason | Review-required rows silently omitted or treated approved | Full lineage and status cross-check |
| R06 Mapping | Candidate mappings ranked and explicit user selection | Ambiguous alias, near-duplicate, hidden controls and automatic apply | Mapping unchanged before explicit choice |
| R07 Evidence | SHA-256 exact original bytes, consistent counts/versions | Tampered source or receipt, mismatching metadata | Recompute receipt verification / fail closed |
| R08 Export | Explicit new JSON/CSV and safe static HTML output | Existing output, partial write, invalid path, HTML/CSV injection | Atomic/no-overwrite tests, CSP check, bytes |
| R09 Reliability | Repeated same input/config/version creates same semantic data and status | Boundary size/rows/columns, malformed nesting, resource exhaustion | Benchmark environment, memory/time budget and refusal status |
| R10 Offline | Default no remote calls, schema config validated locally | Attempted external transfer, rogue credentials/secret in output logs | Controlled network audit and secret scan |
| R11 Testing | Native full suite Linux, Windows 10/11, security and packaging | Deliberate negative fixtures, Windows path/Unicode regression | PASS/FAIL/SKIP by exact commit and OS |
| R12 Integration | At least 1 authorized consumer pins a PREP release and passes E2E | HOLD propagated as success, upstream regression, version mismatch | Consumer SHA, adapter version, rollback evidence |

## Cross-cutting quality gates
- All input paths, process logs and output permissions reviewed. No raw customer data in CI or public repo.
- SHA-256 verifies byte integrity **not** issuer authenticity, financial truth or usage rights.
- E2E on synthetic fixtures is not real-customer acceptance; report distinction.
- Release packaging must be validated from a **fresh environment**, not only developer checkout.
- Upstream private source remains unchanged. Preserve pre-migration SHA/backup privately and verify parity before switching a consumer to PREP.
- No unverified production deployment, financial transactions, paid calls, secrets or permissions changes.
- Destination repo is now **PRIVATE (owner change verified 2026-11-12 KST)**; rights, source inventory, backup, and goldens still gate transfer. Code migration has not been executed.

## Acceptance procedure
1. Map implementation branch + exact SHA to each R01–R12 row.
2. Run all positive, negative and recovery tests in an appropriate environment.
3. Attach command, environment, PASS/FAIL/SKIP and artifacts that contain only synthetic/non-sensitive data.
4. Mark each row PASS / FAIL / PARTIAL / NOT_RUN; do not infer PASS from code inspection.
5. Resolve open P0 security, rights and regression issues.
6. Run downstream consumer E2E with pinned release and rollback.
7. Have the owner review the final product against the blueprint and release policy.

## Progress gate mapping
50 = R01/02/03/05/07 baseline deterministic core parity + minimum negative tests.
70 = R01–R06 and R08–R10 integrated bounded workloads.
85 = R01–R11 Linux suite, SDK/evidence and output security verified.
95 = above plus R12 Windows/packaging E2E and owner-visible candidate.
100 = all R01–R12 green, security/licensing and recovery accepted, owner release approval.
A numeric completion score must include actual evidence; none is claimed by this design plan.

## Evidence template
```text
requirement_id:
repo/branch:
commit_sha:
test command:
environment (OS, Node):
PASS / FAIL / SKIP:
expected vs observed:
input fixture provenance:
original-byte SHA:
artifact link:
remaining blockers:
verifier and KST timestamp:
```
