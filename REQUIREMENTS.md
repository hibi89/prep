# PREP — FINAL PRODUCT REQUIREMENTS v1.0 (planning baseline)
Baseline date: 2026-11-12 KST. Status: DESIGN / NOT SHIPPED.

## Goal
Deliver a standalone, locally installed, verifiable, reusable data-preparation engine that turns explicitly selected structured datasets into normalized, traceable, reviewable outputs for independent downstream software.

## Confirmed product principles
- Independent product, not a UI embedded in any one customer platform.
- Local-first, offline by default; zero mandatory paid API calls.
- Source files are immutable by default. No implicit overwrite, delete, external upload or network requests.
- Deterministic core and explainable evidence. AI recommendations are optional, untrusted and never auto-approved.
- Versioned schemas, package interfaces and documented compatibility.
- Multi-product reuse without runtime dependencies on any upstream product's business rules.

## Required v1.0 features (all targets, not yet implemented here)
R01. CLI and ESM package with versioned commands, machine-readable exit/status and offline installation.
R02. Secure UTF-8 CSV and JSON input; explicit schema/column mappings and strict bounded file processing. Invalid encoding or unsafe path fails closed.
R03. Normalization of dates, integer/decimal, boolean and text with documented locale rules and precision; raw data remains traceable.
R04. Quality checks for missing required fields, invalid types, exact duplicates, malicious spreadsheet formulas and ambiguous mappings.
R05. Human-review queue with source record linkage and concise reason codes; no silent row deletion or false approval state.
R06. User-visible mapping suggestions that never silently change the mapping; conflicting candidate headers become REVIEW_REQUIRED.
R07. SHA-256 origin evidence, transform version, selected mapping, counts, a reproducible receipt and tamper/mismatch detection.
R08. Safe JSON/CSV export and optional sanitized static HTML report; explicit destination, atomic new-file creation and no overwrite by default.
R09. Deterministic and documented error codes; bounded memory/time, large-file refusal or streaming after benchmark validation.
R10. Configuration and schema validation; no remote access, customer-data telemetry or mandatory identity service.
R11. Unit + regression + golden + negative/security + CLI integration tests, Linux and Windows command validation.
R12. A versioned, independently usable SDK/API and at least one verified downstream integration adapter with no private code leakage.

## Explicit non-goals for initial release
- Real-time ERP/MES mutation, accounting/tax certification, user payment, authentication, browser SaaS, arbitrary code execution, guessing an unapproved mapping, autonomous AI decisioning.
- PDF/DOCX/OCR/RAG document ingestion and pretrained models are separate product extensions; not required to mark v1.0 complete.
- XLSX, Python bindings and high-volume streaming are staged options requiring design and licensing review, not v1.0 promises.

## Product quality and proof
- Reproducible fixtures with frozen golden hashes and schemas.
- Fail-closed status on ambiguous or malformed inputs; review reasons survive end-to-end.
- No source mutation, silent loss or data upload in default mode; security regression for path, formula and size boundaries.
- Exact SHA-bound CI + Windows native verification + packaging smoke + verified downstream adapter required for release.
- User signoff, dependency rights and commercial distribution review required before "100%" claim.

## Completion-scale milestones
50% = standalone executable deterministic core + baseline migration + regression proof.
70% = quality, schemas, CLI, JSON/CSV outputs integrated on bounded synthetic workloads.
85% = SDK, evidence, report and security suites with proven Linux integration.
95% = Windows native E2E, package/install and first external consumer adapter verified.
100% = all requirements/acceptance evidence, release security, package, documentation and owner approval.
These are thresholds for future assessment, not progress assertions. Current independent completion: UNASSESSED.

## Interface governance
Changes to result schema/exit codes require explicit versioning and golden test updates. Consumers pin an exact released PREP version and must handle HOLD/INVALID/UNAVAILABLE distinct from OK.
