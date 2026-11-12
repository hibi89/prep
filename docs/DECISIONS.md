## D12 — P85 receipt strategy and Unicode security (2026-11-12 KST)
- A: mandatory automatic sidecar with each CSV/HTML export, simpler to force proof but breaking existing single-file callers and recovery assumptions. B: opt-in explicit receiptOutput and CLI flag, new-only paired staging with rollback. **B chosen** for additive backward compatibility and zero paid API cost. OS process crash may leave one of two files; a consumer must verify both.
- Source-only SHA could not detect changes to normalized JSON records. Add result_sha256 over records/review queue/mapping/status and verifyResult, while preserving historic source-only receipt verification. These are checksums, not issuer authentication.
- C1 controls, Default_Ignorable_Code_Point and formula characters must be reviewed before CSV export; also flag formula in unmapped fields without dropping rows. Synthetic tests 104/104 PASS on Linux Node22; network-disabled repeat 104/104 PASS.
- No automatic SMAX migration, source rights change, commercial license publication or private runner dispatch; upstream contract differences documented separately.
---
## D11 — Local Linux verification and package allowlisting (2026-11-12 KST)
- Option A, manually dispatch GitHub Actions: exact remote CI evidence, but runner spend/owner approval required; NOT DISPATCHED. Option B, reconstruct exact GitHub blob SHA files locally, run native Node22 full suite and network-disabled namespace plus offline package smoke: no paid usage, repeatable, does not replace hosted CI/Windows. **Chosen B**.
- Package option A, .npmignore blacklist: easy, but could miss new temporary archives. Package option B, package.json files allowlist: equally low cost and safer against untracked scripts/archive leakage. **Chosen B**, with src/bin/examples/SDK contract included.
- Candidate code SHA 07255335dc3b6de4f9c8c3e8bacdf06c87d4eb0e, new synthetic 6-case security test blob 80e31980725e54b154d6ce81a54670a7ffe78de7, package blob 4ddbdae0328ff6e58d582aa11532d65fa2893557. Linux native 75/75, Linux no-network 75/75, npm syntax and package smoke PASS. Not a product completion certification.

---

## D10 — P85 report/SDK versus direct SMAX coupling (2026-11-12 KST)
- Option A: import or copy SMAX data/formatter, potentially faster feature reuse but differing date/decimal/boolean contracts and rights, high dependency/regression risk; no budget advantage for offline local deterministic work.
- Option B: retain PREP clean-room core and add narrow HTML reporter plus preview SDK facade, zero paid calls and minimal coupling; slightly more test/contract work but maintainable independent versioning.
- **Chosen B**. Source is private, reports static/CSP-locked and bounded. A no-auto-spend manually triggered CI YAML is committed, *not executed*. No published SDK or approval authority implied. Preserve prior cross-contract golden parity gate.
---
## D09 — Raw-row exact duplicate semantics (2026-11-12)
- Option A: hash mapped normalized values (fast, insufficient; distinct raw source rows with different unmapped columns collide). Rejected after read-only SMAX comparison.
- Option B: compare the complete raw source row in stable source-column order (same bounded-memory cost for at most 2MiB/20k rows; matches raw exact-duplicate definition). Implemented with two new tests; Node22 Linux 61/61 PASS; exact Git code/test blob SHAs in STATUS.
- Cross-implementation date/decimal/boolean/evidence differences are not silently reconciled; require explicit versioned compatibility decisions and upstream golden parity before certification.

## D07 — Bounded deterministic parser vs unapproved streaming engine (2026-11-12)
- A: stream every input, more complexity, harder reasoning about line and receipt consistency, potentially scales further.
- B: fail closed above 2 MiB / 20,000 rows / 64 columns, parse in-memory, no third-party deps, easier testability; per-file memory bounded by explicit input and parsed objects.
- Chosen B for initial CSV+JSON milestone: lower cost (0 paid API), simpler maintenance, sufficient bounded synthetic verification. No blanket high-volume performance guarantee.

## D08 — Transfer/ownership and testing strategy (2026-11-12)
- Wholesale upstream clone: smallest development effort but high license, secrets and host-coupling risk; rejected.
- Selective upstream extraction with golden parity: favored for confirmed rights and behavior, still requires owner-approved scope/inventory.
- Independent clean-room Node ESM core: implemented meanwhile on PRIVATE feature branch; avoids copying private source, costs more verification work. Golden parity is still outstanding, and P70 is not certified.
- Evidence uses exact Git blob SHA of each locally executed code/test file, with Linux Node22.16 `59/59 PASS` and fresh ZIP 59/59. Integration/promotion/Windows unverified.

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
