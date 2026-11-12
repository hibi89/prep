# PREP — Private-source Migration & Recovery Plan
Date: 2026-11-12 KST. State: BLOCKED ON VISIBILITY / RIGHTS; NOT EXECUTED.

## Decision
Two options assessed:
- Whole-product clone: shortest copy step; **high disclosure, coupling, licensing and regression risk**. Rejected.
- Selective extraction: inventory reusable parser, schema, quality, provenance and tests, isolate source dependencies, then verify identical results. **Chosen** for lower long-term maintenance and security risk.

## Preconditions
1. Confirm this repository is PRIVATE if moving unpublished private source. Current observed visibility: PUBLIC. The assistant **must not** silently change visibility.
2. Explicit owner authorization for private source transfer, and license/IP review for external dependencies and any later publishing.
3. Snapshot original upstream branch SHA, relevant blob hashes, exact file inventory and golden expected results in an approved private destination (not in this public documentation).
4. Confirm existing upstream source, tests and customer data remain immutable; document rollback using original SHAs.

## Extraction procedure (only after preconditions)
- On feature/core-extraction, add the smallest reusable deterministic files and their supporting generic parsers, without copying unrelated UI, business rules, credentials or customer fixtures.
- Replace imports from product-specific paths with owned PREP core modules. Keep compatibility via a separately versioned consumer adapter.
- Preserve synthetic fixtures and source-provenance semantics; do not claim parity without exact cross-repository golden tests.
- Run unit + full native suite + Linux + Windows CLI + resource/security tests; record command, SHA, PASS/FAIL/SKIP.
- Advance via reviewed develop, then main. Pin consumer dependency only to an exact vetted PREP release and run consumer-side regression before removing legacy integration.
- Complete LICENSE and package-distribution decisions with the owner; do not add an open-source license by default.

## Recovery
- If new PREP migration fails: stop promotion, keep original consumer code unchanged and return to last validated branch SHA.
- If adapter mismatches: retain old path and expose feature flag or explicit opt-in; never delete the old upstream path during unverified staging.
- Do not force push, rewrite history, auto-sync private source to public remotes or claim success from isolated test doubles.

## Remaining approval
Owner must explicitly approve making the destination PRIVATE, or instead explicitly elect a public clean-room design with no copied private source. That choice affects all subsequent development and release actions.
