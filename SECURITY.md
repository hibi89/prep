# PREP — Security and privacy policy
Date: 2026-11-12 KST. Planning requirements only.

## Data sovereignty
- The repository was PUBLIC during bootstrap but is **verified PRIVATE as of 2026-11-12 KST** after the owner's change. Private visibility does **not** itself grant source licensing rights or authorize committing raw customer data, secrets, credentials or third-party proprietary materials. Review ownership, dependencies, secure migration and access rights before source transfer.
- User-selected data files are processed locally. No network call, telemetry, model upload, analytics beacon or paid API in the default core.
- Keep original data immutable. Require explicit destination for generated outputs, fail if target already exists and avoid partial files via atomic write.
- Do not log raw rows, filenames that contain identifying information, secrets or credentials by default.

## Threat model and required controls
- Malformed CSV/JSON, formula injection, Unicode controls, invalid dates/decimals, path traversal, symlink escape, disguised encodings, oversized input, nested JSON depth and decompression bombs (for future archives) are untrusted.
- Limit input size, rows, columns, field lengths, parser depth, memory and execution time. Denial-of-service resistance requires measured tests.
- Validate mappings by explicit schema; conflicting candidates must trigger review. Never treat LLM output as trusted execution authority.
- Track SHA-256 origin integrity and immutable versioned receipts, without claiming SHA proves source authenticity or licensing.
- No shell execution of user strings; no unbounded regex use; strict subprocess options if any.
- Package dependency/SBOM/license audit, secret scanning, synthetic fixtures, cross-platform security E2E before release.
- No implicit privileges, login/auth bypass, secret exfiltration, file overwrite or deletion.

## Disclosures and approvals
Do not publish private-source files, exact customer fixtures, vendor credentials, unpublished business assets or a public demonstration with real data. Owner approval is required for visibility change, third-party transfer, paid tools, public deployment or change to security policy.

## Incident handling
Stop any suspected leak, do not repeat the same failed transfer, preserve evidence and report scope and proposed remediation. No automatic repository-history rewrite or force push.
