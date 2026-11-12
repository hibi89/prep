# PREP — Independent Architecture v1 (DESIGN)
Date: 2026-11-12 KST. No source migration completed. Product-level final blueprint: [FINAL_PRODUCT_BLUEPRINT.md](FINAL_PRODUCT_BLUEPRINT.md); acceptance tests: [ACCEPTANCE_MATRIX.md](ACCEPTANCE_MATRIX.md).

## Chosen approach
A. Copy the existing product tree: quick to stage but leaks unrelated assets and couples code to a business-specific UI.
B. Selectively extract the deterministic reusable core and tests: slightly more setup, preserves upstream behavior via golden tests, lowers ongoing dependency and disclosure risks.
**Decision: B**, after private-repository/rights gate. See docs/DECISIONS.md.

## Target data path
1. User explicitly selects local source + format + configuration.
2. Secure file adapter checks path, type, size, encoding and immutability boundary.
3. Format parser emits bounded records and source lineage.
4. Profiler inspects headers/types and proposes **unapplied** mappings.
5. Explicit schema validator checks source types and transformations.
6. Deterministic normalization computes standardized values and review reasons; no hidden row loss.
7. Quality and evidence aggregator records input SHA-256, counts, versions and traceable review queue.
8. Output policy creates a separate new local result only after requested; no overwrite. Optional sanitized HTML review.
9. Host application decides any subsequent business action via separate permission + approval.

## Logical modules (planned directories)
- src/core: data types, safe normalization, quality and review states; pure functions.
- src/parsers: bounded CSV and JSON adapters; validate raw untrusted syntax.
- src/io: local read/atomic output with explicit permissions and path checks.
- src/evidence: provenance receipt, deterministic hash, versioning.
- src/sdk: stable ESM public API; no dependency on host product paths.
- src/cli: supported flags, stable exit code mapping, no raw sensitive stdout.
- src/reports: safe JSON/CSV and optional CSP HTML.
- tests: source-frozen synthetic golden/negative/security/e2e regression fixtures.

## Integration boundaries
- PREP never imports modules from a host application's source folders.
- Downstream adapters call a released PREP interface pinned to an exact version.
- Consumer-specific salary/sales/accounting decisions, UI, payments and workflow permissions live in the consumer, not PREP.
- API is versioned so multiple applications can upgrade independently. Never share a mutable unversioned live branch as a library dependency.

## Reliability and operating cost
- Default execution is offline and deterministic; mandatory external API spend = 0.
- Bounded input limits protect memory; streaming requires measured profiles before raising caps.
- No external persistence by default. Data writes occur only via explicit output action and verified destination.
- Every report carries provenance and review status; errors use explicit categories, not silent fallback.

## Known limitations
Independent code/tests do not exist in this repository yet. Existing private implementation can inform later extraction but is not proof of the planned complete architecture. No model call, hosted service, SI-grade ERP adapter or customer installation has been verified here.
