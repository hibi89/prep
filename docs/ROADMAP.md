# PREP — Evidence-based Roadmap
Date: 2026-11-12 KST. Milestones are *acceptance thresholds*, not reported progress. The final product definition is [FINAL_PRODUCT_BLUEPRINT.md](FINAL_PRODUCT_BLUEPRINT.md); exact evidence and fail cases are in [ACCEPTANCE_MATRIX.md](ACCEPTANCE_MATRIX.md).

| Stage | Target proof | Release |
|---|---|---|
| P0 — repo bootstrap | Reviewed requirements, handoff, risk, branch model and public-safe docs | Documentation only |
| P1 — independent baseline | Authorized extraction, no upstream runtime dependency, actual CLI/core tests | Internal |
| 50% gate | Real reusable core + golden parity + synthetic security baseline | Internal |
| 70% gate | Schema/quality/review, deterministic CSV/JSON, CLI integration and bounded IO | Internal |
| 85% gate | Versioned SDK, receipts, safe reports, core security/CI Linux evidence | Internal |
| 95% gate | Windows native run, install/package smoke, one real approved consumer adapter | Candidate |
| 100% gate | All R01–R12 accepted; provenance, security, licensing, customer/owner acceptance | Owner release gate |

## Priority
P0 privacy decision → P1 exact source inventory → P2 minimal extraction → P3 full native tests → P4 contracts + adapters → P5 distribution and acceptance.

## Done means
Code changed, exact SHA captured, relevant whole-code tests passed, edge/security failures reviewed and artifacts installed/tested on the designated target. Docs/code/test percentage are never interchangeable.

## Deferred
XLSX streaming, massive files, RAG documents, PDF/DOCX/OCR, statistical ML imputation, optional AI mapping, Python wrapper, cloud SaaS and enterprise connectors. Each requires separate acceptance scope and proof.
