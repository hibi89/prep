## 2026-11-12 KST — original-source semantic execution evidence (LATEST)
- Read-only SMAX preprocessing HEAD 3830cb276f560d58e8181ba384d9cbe64815737c; original generic-csv blob 3b6cedae4869b7d8d5ae587f8d565812b6d9e193, CSV tokenizer blob 26d84c9a59216107ab492aedfcd91cd571e40c66.
- Unmodified parsing/normalization *logic* evaluated in isolated V8 with ESM wrapper removed and SHA-256 substituted with a fixed stub. Eleven synthetic inputs compared with native PREP: six same normalized value/review flag, five divergent (compact date, grouped decimal, decimal scale, boolean 'yes', above-int64 integer).
- Not original Node execution, real SHA, validator verification, end-to-end source/receipt parity or license clearance.
- Synthetic-only observations committed in fixtures/smax-generic-differential.mjs and 12 PREP test assertions. Read-only actual Node comparator scripts/compare-smax-checkout.mjs requires a separate checkout at exact SMAX pinned commit; NOT_RUN because no local checkout was available. No original private source stored in PREP repo.
- PREP Linux native and no-network 133/133 PASS; GitHub hosted CI not executed. Formal 85% not certified. RELEASE HOLD.

---

# PREP vs SMAX generic preprocessing — read-only contract inventory
**Date:** 2026-11-12 KST. **Classification:** private repository metadata and abstract API differences only. **No upstream source transfer, executable parity or license clearance.**

## Read-only provenance and recovery
- Upstream PRIVATE `hibi89/SMAX`, branch `preprocessing`, HEAD **`3830cb276f560d58e8181ba384d9cbe64815737c`**.
- Generic CSV engine `preprocessing/generic-csv.mjs` blob **`3b6cedae4869b7d8d5ae587f8d565812b6d9e193`**.
- CSV tokenizer `site/csv-transform.mjs` blob **`26d84c9a59216107ab492aedfcd91cd571e40c66`**.
- Upstream generic synthetic tests `tests/preprocessing-generic.test.mjs` blob **`3f99b78f416a36c08f299f6511a5f7f16c1215f3`**, schema tests `tests/preprocessing-generic-schema.test.mjs` blob **`0a4839d552d458154bdcf4d12571e3a45da79567`**.
- Upstream generic schema `preprocessing/SMAX_PREPROCESS_GENERIC_CSV_V1.schema.json` blob `ae5d2e8cbc40bc08ed586b7826c1bec5f5cead0d`.
- PREP tested independent implementation commit **`fd3b68c45fd9323dc67debf47171e778084266a4`** and read-only rollback checkpoint `b3bed36d6438b1a3603ffb686451f740becf8e4e`. No changes to upstream SMAX or PREP main/develop.

## Boundaries of compatibility (intentionally NOT a drop-in adapter)
| Area | SMAX generic source contract (read-only observation) | PREP candidate | Next verification |
|---|---|---|---|
| Package/schema | `SMAX_PREPROCESS_GENERIC_CSV_V1`, `columns[{key,source,type,required}]`, raw source cells in each output | `schema_version:1`, `fields[{name,source,type,required?}]`, receipt with normalized records | Owner-approved adapter design + source/result projection |
| Date | Also accepts compact YYYYMMDD, variable digit month/day | Fixed YYYY-MM-DD or YYYY/MM/DD with zero-padded components | Synthetic valid/invalid date goldens |
| Decimal | Allows grouped comma numbers, preserves decimal scale | Ungrouped digits only; trims redundant decimal zeros and enforces bounded precision | Exact decimal string semantics/rights-approved acceptance |
| Integer | Normalized integer strings, potentially broader numeric length | Signed 64-bit bounds | Boundary and negative cases |
| Boolean | true/false/1/0 only | Also yes/no/y/n and Korean aliases | Rejection-vs-acceptance map |
| Review | Per-row `NEEDS_REVIEW`, specific reason taxonomy; validator recomputes expected issues | Dataset `REVIEW_REQUIRED` or `OK_FOR_OWNER_REVIEW`, `verifyResult` checksum; dataset-level ambiguous-mapping HOLD | Explicit code/status mapping (not implicit approval) |
| Source/evidence | Original full columns/source cells + schema-versioned validator | Source SHA and output digest, optional checksum sidecar; normalized mapped result + trace line | Lossless provenance design and output tamper verification |
| Other formats | Upstream preprocessing tree has many independently versioned text/HTML/DOCX/XLSX modules | PREP v1 expressly limited to CSV/JSON input, JSON/CSV and preview HTML output | No expansion of v1 denominator without owner approval |

## Two feasible architectures (no scope change applied)
**A — Independent PREP with a separately versioned compatibility adapter:** 0 upstream code transfer, low licensing risk and independent upgradeability; different normalization semantics require explicit consumer review and eventual goldens. Best matches PREP's current independent multi-product purpose. A successful core test cannot certify existing SMAX behavior.

**B — Selectively transfer SMAX generic CSV code and synthetic goldens into PREP:** potentially faster byte-level parity, but requires owner authorization of source transfer, dependency and IP provenance review, a private-only destination and full regression. Higher maintenance coupling, and bypassing authorization is prohibited.

**Recommendation:** Keep independent core (A) and preserve upstream unchanged, then seek approval for a private controlled *execution-based* comparator/adapter and owner-chosen semantics. Do not silently change PREP normalizers to emulate SMAX.

## Golden verification plan and remaining gate
1. Obtain authorization for exact upstream source/fixture execution scope and rights/ownership signoff; do not import the original into PREP without permission.
2. Execute the **unaltered** SMAX version and the pinned PREP version independently on a shared **synthetic-only** suite; include overlapping benign cases and known divergent values. Record exact SHA, environment, output differences and status mapping.
3. Build an opt-in adapter with version pin if compatibility is approved. Invalid/review results must remain HOLD, with raw-row lineage and no silent alteration.
4. Verify golden parity or explicitly approved, documented incompatibility. The four PREP-native frozen goldens at `test/prep-native-golden.test.mjs` are NOT these upstream-to-PREP parity goldens.
5. GitHub-hosted Actions Linux CI is manual-only and was not dispatched; approval may be needed for runner usage. Linux local suite **121/121 PASS** on Node22.16, native and network-disabled; installation smoke completed on a local 7-file runtime archive with remote docs not included. Official P85 remains **NOT CERTIFIED**, release HOLD.
