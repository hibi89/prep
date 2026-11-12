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
