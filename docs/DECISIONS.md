# PREP — Engineering Decision Register
Decisions as of 2026-11-12 KST. Public-safe summary only.

D01 — Independent product
Decision: separate repository and product acceptance scope. Rationale: reusable engine with own versioning, avoiding a dependent platform's release cadence.

D02 — Baseline strategy
Options: wholesale clone versus selective extraction. Decision: selective extraction + exact golden parity and source immutable. Performance: similar runtime; setup: selective extraction slightly slower; security/maintenance: selective extraction better.

D03 — Core runtime
Options: rewrite in Python from day one versus preserve Node.js ESM deterministic algorithms. Decision: preserve Node 20+ ESM for initial source parity; add Python wrapper only if a real consumer requires it. Reduces regression and rewrite time.

D04 — Data/AI boundary
Decision: deterministic offline rules as core; model-based suggestions optional, explicitly approved and never an automatic authority. No mandatory paid API.

D05 — Repository visibility
Historical reality: new destination was PUBLIC at creation. The owner changed it to **PRIVATE** on 2026-11-12 KST and GitHub metadata confirms that status. Visibility gate satisfied; code migration remains dependent on rights, source inventory, rollback and regression review.

D06 — Release policy
No automatic license publication, paid service, external upload or production release. Exact code SHA and native cross-platform test evidence required.

Proposals under consideration: XLSX as optional adapter, larger streaming dataset and optional schema inference; not approved as current shipped functionality.
