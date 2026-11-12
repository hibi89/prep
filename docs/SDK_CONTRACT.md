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
