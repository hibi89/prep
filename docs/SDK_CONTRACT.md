## 2026-11-12 P85 strict mapping/limits contract update
- Global alias conflicts (for example both source headers Name and name with explicit distinct fields) produce dataset status REVIEW_REQUIRED and AMBIGUOUS_MAPPING review queue entries with record/source_line = null; actual row data remains explicitly mapped and untouched. receipt.review_rows counts row defects only, not global mapping conflicts. Consumers **must** check overall status.
- CSV with only a header cannot yield a falsely READY run: EMPTY_SOURCE_ROWS. Unknown schema-field options fail INVALID_SCHEMA_FIELD, wrong direct parseJSON input type INVALID_JSON. Direct parseCSV and parseJSON reject UTF-8 input over 2MiB with INPUT_LIMIT. Quoted bare CR and CRLF advance CSV source line provenance correctly.
- Four frozen synthetic PREP-only SHA goldens cover full result envelope, CSV export and HTML preview. They do not establish compatibility with SMAX; see docs/UPSTREAM_INTERFACE_INVENTORY_20261112.md.
- Node22.16 Linux native npm test 121/121 PASS and no-network full suite 121/121 PASS. Local runtime 7-file package offline install and SDK/report/CLI receipt smoke PASS. GitHub-hosted CI, Windows/consumer and full exact remote docs package NOT VERIFIED, RELEASE HOLD.

## 2026-11-12 P85 optional verified export and result integrity addendum
- Additive API: runLocal({input, config, output, format?, receiptOutput?}); CLI run --receipt-output FILE optionally writes a CSV or HTML file and a checksum-only PREP_EXPORT_V1 JSON sidecar. Old runLocal without receiptOutput produces only the requested file; JSON output includes full data envelope.
- CLI verify --source SOURCE --receipt SIDECAR --export EXPORTED validates BOTH source and export SHA-256 checksums and the enclosed receipt checksum; a mismatched source, missing export or corrupted sidecar fails closed.
- SDK makeExportReceipt, verifyExport and verifyResult are pre-release. New JSON result receipts include result_sha256 binding rows, review queue, mapping suggestions and status; newer JSON CLI verify rejects content tampering. Previous source-only receipt files remain verifiable but cannot prove unchanged normalized result content.
- Files are created with new-only staging/link; a process crash can leave an incomplete output/sidecar pair, so reject incomplete pairs. No two-file crash atomicity, digital signature, client authenticity, or authorization.
- PREP text CSV exports guard Unicode-hidden formula characters. SMAX differences remain intentional/unapproved for compatibility; no drop-in migration. Native Linux Node22 suite 104 PASS, GitHub Actions/Windows/consumer and upstream golden parity NOT VERIFIED, RELEASE HOLD.

# PREP SDK contract — 85% development candidate

- Package: `@private/prep-engine` v0.1.0, private pre-release; Node.js 20+ ESM only.
- Import: `@private/prep-engine/sdk`, with `SDK_CONTRACT_VERSION = "1-preview"`. This is **not** a semver-stable published release or an accepted downstream adapter.
- `prepareDataset(Uint8Array, "csv"|"json", schema)` returns `status`, `receipt`, `review_queue`, `mapping_suggestions` and retained `records`; no permission to execute/approve.
- `verifyReceipt(sourceBytes, receipt)` checks receipt checksum and source byte SHA-256 only; **does not authenticate source/issuer**, prove financial truth, validate upstream license, or recompute transformation without config.
- `runLocal({ input, config, output, format? })` writes a newly created `.json`, `.csv`, or escaped static `.html` report; no overwrite. Only the JSON envelope carries the complete receipt and rows. HTML is a **bounded preview** (first 200 rows/issues) carrying the receipt hashes, not an authoritative full-data output. CSV is **not** a stand-alone verifiable receipt; callers should separately preserve JSON if evidentiary traceability is required.
- Repeated inputs/config/version have deterministic meaning; no network, cloud, LLM or paid API by default.
- Intentional **PREP-vs-SMAX contract differences**: grouped/trailing-zero decimals, compact/date separators, boolean aliases, review codes/receipt envelope. No claim of drop-in parity. Consumers may not switch until explicit mapping and golden fixtures have been reviewed.
- Never treat `OK_FOR_OWNER_REVIEW` as authorization. Stop on `REVIEW_REQUIRED` / errors.
- Release gates outstanding: approved upstream rights/provenance, cross-contract goldens, full GitHub CI, Windows native E2E, fresh install, consumer adapter and owner acceptance.
