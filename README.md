# PREP — Universal Data Preparation Engine

**Status (2026-11-12 KST): repository bootstrap / no product release.**

PREP is an independently versioned, **local-first, deterministic data preparation engine** designed to validate and standardize permitted business data before it reaches downstream automation or AI systems.

## Product promise
- Read user-selected files; **never silently change originals**.
- Parse, validate, normalize, and profile structured data with explainable review reasons.
- Preserve source lineage and verifiable integrity evidence (e.g., SHA-256).
- Keep ambiguous mappings and quality failures behind **human review**, not automatic approval.
- Expose a versioned CLI and library contract reusable by multiple products.
- Default to **zero mandatory paid API/LLM calls** and no customer-data network transmission.

## V1 target, not a release claim
1. CSV and JSON ingest, explicit schemas and safe column-mapping suggestions.
2. Type and quality checks, duplicate/missing/error review queues, bounded resource use.
3. Deterministic normalized outputs, provenance receipts, human-review reports.
4. Versioned JavaScript ESM SDK and CLI; optional file adapters after independent validation.
5. Security regression, cross-platform CLI, installation/package and integration tests.

Other formats (including XLSX), document ingestion, streaming scale, optional AI mapping and Python interoperability are **planned extensions**, not confirmed capabilities in this new repository.

## Current verified state
- This is a **new repository**. Independent PREP source, tests, CI and release are **not yet migrated or verified**.
- The existing internal preprocessing baseline remains at its original location, unchanged. It must **not** be copied into a public repository.
- **Privacy gate:** this repository was observed as **public** at bootstrap, whereas the intended reusable source is private. Only non-confidential planning documents may be committed here until the owner explicitly authorizes a privacy change and a source-migration review.
- An earlier completion percentage for the upstream combined product is **not** a PREP-only product completion claim.

## Branch model
- `main`: reviewed documentation and validated release-ready code only.
- `develop`: integration staging after independent checks.
- `feature/core-extraction`: isolate the reusable core and its tests; no private source while this repo remains public.

Feature branches merge via review and checks; no force-push or unauthorized public deployment.

## Read first
1. [HANDOFF.md](HANDOFF.md)
2. [STATUS.md](STATUS.md)
3. [AGENTS.md](AGENTS.md)
4. [REQUIREMENTS.md](REQUIREMENTS.md)
5. [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md)
6. [docs/MIGRATION_PLAN.md](docs/MIGRATION_PLAN.md)
7. [docs/TEST_PLAN.md](docs/TEST_PLAN.md)
8. Actual code/tests, once source migration has been approved and performed.

## Governance
**No secret, credential, personal/customer data, private source, paid service, third-party transfer, branch history rewrite, production deployment, or security/visibility change without appropriate authorization.** Product completion is evidence-based, not estimated from docs. See [SECURITY.md](SECURITY.md) and [docs/ROADMAP.md](docs/ROADMAP.md).

Copyright and distribution rights are **not granted** by this README. No open-source license has been selected.
