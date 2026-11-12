# PREP — Proposed Result Contract (DRAFT, NOT IMPLEMENTED)
Date: 2026-11-12 KST. Canonical public example contains synthetic metadata only.

## Contract principles
- Semantic version changes for breaking schemas; deterministic serialization rules documented and tested.
- Separate metadata from normalized row content; exports containing customer data are opt-in local output only.
- Preserve source row lineage, reasons and input hash. Never record unrestricted source paths or user data in logs by default.
- Review status is not permission to execute a business transaction.

## Proposed conceptual envelope
    {
      "schema_version": "PREP_RESULT_V1",
      "run_id": "synthetic-run",
      "source": {"format": "CSV", "sha256": "64_lowercase_hex_characters", "source_rows": 2},
      "transform": {"version": "0.1.0", "mapping_version": 1},
      "quality": {"input_rows": 2, "output_rows": 2, "review_rows": 1},
      "review_queue": [{"source_record": 3, "reasons": ["INVALID_DECIMAL"]}],
      "approval": "NOT_GRANTED",
      "status": "REVIEW_REQUIRED",
      "execution": "NOT_PERFORMED"
    }

This envelope is illustrative, not a promised byte-for-byte API. R01/R05/R07/R12 need implementation and golden-test freeze before v1.0.

## Planned states
- OK_FOR_OWNER_REVIEW: input validated, but not automatically approved.
- REVIEW_REQUIRED: ambiguous/malformed rows or mapping; human action required.
- INVALID: wrong schema, encoding, resource or path.
- UNAVAILABLE: intentionally unavailable external adapter, unsupported format or unverified feature.
Avoid implying these states authorize upload, financial action or customer-data mutation.

## Compatibility
Consumers pin explicit schema versions. New optional fields need documented defaults. Breaking changes require a new major contract, migration notes and backward-compatibility tests.
