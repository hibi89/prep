> **PREP current P85 checkpoint 2026-11-12:** feature/core-extraction source commit **fd3b68c45fd9323dc67debf47171e778084266a4**. Alias ambiguity now forces dataset HOLD; blank-data CSV/unknown field config/direct parser oversize fail closed and quoted CRLF provenance is corrected. Four **PREP-only** frozen golden scenarios + 20k-row/64-column/2MiB boundaries. Local Linux Node22.16 **121/121 PASS** native and network-disabled, syntax PASS, new local tarball offline SDK/CLI/export receipt smoke PASS. **85% NOT CERTIFIED**: source-rights/real SMAX golden parity and hosted CI outstanding, no Windows/authorized consumer/production. Upstream read-only inventory in [docs/UPSTREAM_INTERFACE_INVENTORY_20261112.md](docs/UPSTREAM_INTERFACE_INVENTORY_20261112.md). Historical 104/104, 75/75 notes below are superseded.

> **PREP P85 checkpoint 2026-11-12:** Exact GitHub feature implementation 9a7e6f6cc69632158211587d87a0a6c09da674ce, local Linux Node22.16 npm test **104/104 PASS** in normal and network-disabled environments, syntax PASS and fresh local runtime tarball offline install/CLI/SDK/CSV receipt smoke PASS. Optional --receipt-output and verify --export protect CSV/HTML byte-integrity; JSON result records now checksum-verified. Hidden Unicode formula risk also covered. **85% NOT CERTIFIED**, pending SMAX original-source compatibility golden/rights decision and GitHub-hosted CI; Windows and consumer remain later gates. See latest STATUS/HANDOFF.

> **2026-11-12 latest PREP P70 candidate hardening:** local Node22 Linux tests **61/61 PASS** (plus clean ZIP fresh extraction 61/61), exact Git code/test blob match; raw-row duplicate correction and two regression tests committed to PRIVATE `feature/core-extraction`. Upstream SMAX schema and numeric/date/boolean conversion differ; full parity and formal 70%-gate remain **NOT CERTIFIED**, canonical completion **UNASSESSED**. No production, upstream edits or main/develop promotion.
>
> **2026-11-12 P70 development update:** Independently authored PREP runtime, test suite and CLI are now committed to the PRIVATE `feature/core-extraction` branch. Tested local exact Git blobs on Linux Node22.16.0: **59/59 PASS**, plus fresh ZIP extraction 59/59, package dry-run and synthetic 20k-row benchmark. **70% functional candidate, NOT certified milestone:** SMAX behavioral parity, original-source rights/migration, CI, Windows and consumer acceptance remain open. `main` and `develop` are unchanged; no production deployment.
>
> Development commands on feature branch:
> ```sh
> npm test
> npm run check
> node bin/prep.mjs inspect --input examples/synthetic.csv
> node bin/prep.mjs run --input examples/synthetic.csv --config examples/schema.json --output result.json
> node bin/prep.mjs verify --source examples/synthetic.csv --receipt result.json
> ```
> The example deliberately raises REVIEW_REQUIRED (exit 2); output file must not exist. JSON numbers with decimal fractions are rejected for precision; use quoted strings. CSV export does not yet include a separate receipt. All input data stays local.
>
> **See latest [STATUS.md](STATUS.md) and [HANDOFF.md](HANDOFF.md); historical documentation-only statements below apply to the previous main baseline.**

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

## Final product design and acceptance baseline
- [Detailed final product blueprint](docs/FINAL_PRODUCT_BLUEPRINT.md) — user journey, modules, data flow, source/output boundaries and 100% definition.
- [R01–R12 acceptance matrix](docs/ACCEPTANCE_MATRIX.md) — positive/negative tests and exact release evidence.
- [Requirement IDs](REQUIREMENTS.md) — scope and required features; owner approval is still required for scope changes.

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
- **Privacy confirmed:** this repository was **PUBLIC at bootstrap** but the owner changed it to **PRIVATE** on 2026-11-12 KST (confirmed via GitHub). The visibility gate is resolved; review extraction rights, upstream dependencies, source backup and parity before transferring any code.
- An earlier completion percentage for the upstream combined product is **not** a PREP-only product completion claim.

## Branch model
- `main`: reviewed documentation and validated release-ready code only.
- `develop`: integration staging after independent checks.
- `feature/core-extraction`: isolate approved reusable core and synthetic tests after upstream inventory/rights and rollback review; preserve private visibility.

Feature branches merge via review and checks; no force-push or unauthorized public deployment.

## Read first
1. [HANDOFF.md](HANDOFF.md)
2. [STATUS.md](STATUS.md)
3. [AGENTS.md](AGENTS.md)
4. [REQUIREMENTS.md](REQUIREMENTS.md)
5. [docs/FINAL_PRODUCT_BLUEPRINT.md](docs/FINAL_PRODUCT_BLUEPRINT.md)
6. [docs/ACCEPTANCE_MATRIX.md](docs/ACCEPTANCE_MATRIX.md)
7. [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md)
8. [docs/MIGRATION_PLAN.md](docs/MIGRATION_PLAN.md)
9. [docs/TEST_PLAN.md](docs/TEST_PLAN.md)
10. Actual code/tests, once source migration has been approved and performed.

## Governance
**No secret, credential, personal/customer data, private source, paid service, third-party transfer, branch history rewrite, production deployment, or security/visibility change without appropriate authorization.** Product completion is evidence-based, not estimated from docs. See [SECURITY.md](SECURITY.md) and [docs/ROADMAP.md](docs/ROADMAP.md).

Copyright and distribution rights are **not granted** by this README. No open-source license has been selected.


## P85 candidate: review output and preview SDK (2026-11-12 KST)
- `node bin/prep.mjs run --input examples/synthetic.csv --config examples/schema.json --output preview.html` writes a new *static sanitized preview*, without overwriting existing files. Maximum 200 rows/issues shown; use JSON for complete receipt and output.
- Internal pre-release SDK entry: `@private/prep-engine/sdk`; see `docs/SDK_CONTRACT.md`. Not published or drop-in SMAX compatible.
- `.github/workflows/prep-candidate.yml` is **manual-only** and has not run. The feature branch is not certified for 85% or commercial release.
