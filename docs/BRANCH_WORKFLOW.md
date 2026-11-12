# PREP — Git Branch and Review Policy
Date: 2026-11-12 KST.

| Branch | Purpose | Allowed changes |
|---|---|---|
| main | Reviewed stable baseline | Approved docs, tested released code |
| develop | Integration before release | Reviewed changes, integration work |
| feature/core-extraction | Initial reusable core migration | Public-safe docs only until privacy gate; thereafter approved code/tests |

Create future feature/fix branches only when the work begins (e.g., feature/json-adapter). Do not proliferate empty branches. Pull requests target develop; release promotion targets main after full matrix. No direct force pushes or history rewrites; maintain original source unchanged. Pin dependency versions instead of branch-tip dependencies.

## Minimal change checklist
- Confirm source and target HEADs.
- Preserve previous version and rollback command/reference.
- Verify GitHub identity/author and privacy boundary.
- Run source-level tests and security regressions; capture exact SHA.
- Review license, provenance, output safety and integration compatibility.
- Update STATUS.md/HANDOFF.md on material changes, then verify actual GitHub paths and refs.
- Do not confuse GitHub CI ready with application/consumer behavior validation.
