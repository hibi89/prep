> **[KMONG_WORK_IN_PROGRESS_20261112 — 크몽 필수 지침 / 소유자 승인]** 이 저장소에서 크몽 상품 또는 육성 후보 작업을 담당하면 새 채팅·`ㄱ` 재개 시 이 `AGENTS.md`를 반드시 읽는다.
> - **실제 상품 개발·수정·테스트/검증 착수 시 즉시:** 중앙 `hibi89/hackathon-command-center-2026`의 `kmong-productization` 브랜치 [최종완성률 및 작업 현황 표](https://github.com/hibi89/hackathon-command-center-2026/blob/kmong-productization/docs/audits/KMONG_16_CURRENT_20261111.md)에서 **담당 제품명 바로 옆에 `**[작업중]**`**을 작성하고 실제 GitHub 커밋을 확인한다. 같은 저장소에 상품이 여럿이면 현재 담당 상품만 표시. 활성 16종 외 PREP·FFAX·Factory AX 등의 후보는 같은 문서의 별도 후보 작업 상태 표에서 표시한다.
> - **검증된 목표 완성률 달성 / 종료 / 중단 / 보류 / 다른 상품으로 작업 전환 시 즉시:** 자신의 `[작업중]`만 제거해 GitHub 커밋을 확인한다. 다른 채팅이 작업 중인 표식은 임의 변경하지 않는다. 중앙 최신 HEAD를 먼저 읽고 동시 갱신을 보존한다.
> - 중앙 기록 쓰기 실패 시 제품 `STATUS.md`·`HANDOFF.md`와 답변에 **`KMONG_HUB_SYNC_PENDING`**을 기록한다. 자동 실시간 동기화가 없고, 표식은 완성률 상향·판매/배포 승인이나 작업 자동 실행을 의미하지 않는다. 실제 검증 근거 없이는 숫자를 변경하지 않는다.

# PREP — AGENTS / Operating Rules
Updated: 2026-11-12 KST. Applies to all branches and AI collaborators.

## Authority and startup
- PREP has one technical lead responsible for design, code, testing, and verification.
- Read in order: HANDOFF.md → STATUS.md → AGENTS.md → REQUIREMENTS.md → docs/ARCHITECTURE.md → docs/MIGRATION_PLAN.md → relevant source/tests.
- The default branch is the source of reviewed specifications; actual code and exact Git commits override stale documents where verified.
- A user message "ㄱ" means continue the next approved and safe unit of work; it does not override privacy, cost, permissions, or release gates.

## Hard controls
1. Never copy private source into a public destination. This repository was confirmed **PRIVATE on 2026-11-12 KST** following the owner's settings change. That removes the visibility blocker, **not** the source-rights, secret-scanning, backup or equivalence-verification requirements.
2. Never commit secrets, .env files, private documents, customer data, tokens, credentials, model weights or licensed third-party datasets. Do not log raw rows or sensitive paths by default.
3. Do not change source repository content, Git history, GitHub privacy, branch protection, integrations, secrets, costs, domains or production deployment without explicit authorization.
4. Adopt an independent, local-first, deterministic core. No mandatory LLM, cloud upload, internet requirement, credential passthrough, automatic approval or destructive writes.
5. Compare at least two designs for major choices, including cost, performance and maintainability; record the decision in docs/DECISIONS.md.
6. Preserve working behavior and source lineage. Before migration, record source SHA and file inventory **privately**, obtain ownership/license clearance, then extract only reusable modules and golden tests.
7. All file inputs are untrusted. Apply type, encoding, size, path, symlink, formula-injection, unsafe content and denial-of-service checks before parsing/export.
8. Keep deterministic processing and recommendations separate from approval and execution. REVIEW/HOLD never silently becomes approved.
9. Tests must show exact command, PASS/FAIL/SKIP, environment and code SHA. Local/isolated/mocked success is not whole-product or production success.
10. Do not assert PREP's independent completion percent from another product's 50% status. Score it against REQUIREMENTS.md only after evidence review.
11. Recovery: save pre-change SHA and rollback steps. After one failed approach, diagnose and attempt one materially improved method; after two non-progressing failures, stop and pivot.
12. Before session completion, update STATUS.md and the ten-part HANDOFF.md for material changes. Cite repo/branch/SHA and clarify any blocked or unverified work.

## Git and release
- main: protected-in-practice reviewed baseline; develop: integration; feature/core-extraction: initial technical work.
- No force push, empty commits, opportunistic new projects, auto-deployment, or CI cost changes.
- Check authenticated GitHub identity and commit attribution; commits must be traceable to the connected account.
- Release only after verified CLI/SDK, security, Windows/Linux and downstream integration tests, and explicit owner approval.

## Scope boundaries
PREP owns reusable preprocessing contracts and quality. Consumers own their workflow/UI/business adapters. The upstream private project remains unmodified. Keep destination PRIVATE during any authorized selective source migration; never publish or transfer private source to a public remote.
