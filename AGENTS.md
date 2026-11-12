> **[KMONG_WORK_TARGET_GATE_20261112 | 사용자 최신 확정 | 필수 작업 규칙]** 이 저장소에서 크몽 상품·육성 후보를 작업하는 모든 AI 담당자는 새 채팅·`ㄱ` 시작 시 이 문구를 읽고 적용한다.
> - 실제 개발/수정/테스트 착수 즉시 [해총 크몽 최종완성률·후보 상태표](https://github.com/hibi89/hackathon-command-center-2026/blob/kmong-productization/docs/audits/KMONG_16_CURRENT_20261111.md)의 **해당 상품명 옆에 `**[작업중]**`을 표시하고 GitHub 커밋**한다. 확정 단계 목표(예: 95%)와 검증 기준을 제품 STATUS/HANDOFF에 남긴다.
> - **목표 완성률 달성 전에는 [작업중]을 삭제하지 않는다.** 일시중단·종료·보류·다른 제품 전환·담당 채팅 변경도 삭제 사유가 아니다. 예전 '전환·중단 시 삭제' 지시는 폐기한다.
> - **검증된 목표치에 도달한 뒤에만** 기능 SHA·PASS/FAIL/SKIP·미검증을 기록하고 자기 표시를 제거·커밋한다. 목표 하향/변경으로 표식 제거 시 사용자 명시 승인 필요. 다른 담당자 표시·기존 수치·RELEASE HOLD 보존.
> - 표식은 목표 미달 상태를 의미하며 **실시간 실행 증명은 아니다**. 허브 최신 HEAD 확인 후 안전하게 반영, 실패 시 `KMONG_HUB_SYNC_PENDING` 기록. 자동 동기화 없음. 크몽 외 작업에는 표시 불필요.

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
