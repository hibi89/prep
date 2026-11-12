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
