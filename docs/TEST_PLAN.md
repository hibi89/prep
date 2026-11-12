# PREP — Verification Matrix (planned; NOT EXECUTED)
Date: 2026-11-12 KST.

## Test dimensions
1. Parser: UTF-8, BOM policy, quoted comma/newline, empty header, duplicate header, malformed JSON/CSV, invalid encoding, embedded controls.
2. Schema: explicit types, mapping order, ambiguity, missing required fields, duplicated keys and mixed formats.
3. Normalization: leap dates, timezone neutrality, decimal precision, signed numbers, booleans, Unicode canonicalization and locale.
4. Quality: missing/invalid/duplicate/formula flags, preserved source rows and review reasons, zero silent deletion.
5. Evidence: SHA-256 from original bytes, deterministic receipts, tamper mismatch, versioning and golden outputs.
6. File safety: parent traversal, symlink/hardlink, special files, absent output, existing target refusal, atomic output, no original mutation.
7. Resource: 0-byte, limits, excessive rows/columns/field length/nesting, CPU/memory bounds, cancellation.
8. CLI/SDK: exit codes, helpful static errors without sensitive content, clean install, identical package API and CLI results.
9. Security: CSV injection neutralization, no telemetry or unintended outbound network; dependency/license audits.
10. Downstream compatibility: pinned release, consumer adapter golden parity and rollback path.
11. OS validation: Linux Node 20/22+ and Windows 10/11 native CLI/packaging, relevant browsers only if a browser UI is introduced.

## Commands after implementation
    node --version
    npm test
    npm run test:security
    npm run test:integration
    npm run build
    npm pack

Commands are **anticipated**. They do not currently exist as an implemented package test pipeline and have NOT been run in this repo. Add scripts only alongside actual runnable suites.

## Evidence record template
- Date (KST), branch, exact commit SHA
- OS/Node version and dependency lock hash
- Command, suite, PASS/FAIL/SKIP count, unresolved failures
- Fixture provenance (synthetic), input/output hash and original immutability
- Unverified areas and explicit release gate decision

## Promotion gate
No whole-product completion progress for mere test-file additions, isolated mocks or conceptual plans. A red regression blocks promotion; zero CI runs means NOT VERIFIED, not an inferred failure or success.
