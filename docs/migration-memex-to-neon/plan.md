# Memex → NEON 마이그레이션 플랜

## 개요

현재 데이터 레이어로 사용 중인 Memex CMS를 NEON PostgreSQL로 교체한다.
프론트엔드(React)와 Next.js API Routes(BFF) 사이의 인터페이스는 유지하고,
BFF 내부의 Memex fetcher 호출부만 DB 쿼리로 교체한다.

## 아키텍처 변경

```
Before: Memex CMS → memexFetcher → Next.js API Routes → React Frontend

After:  NEON PostgreSQL → DB 쿼리 → Next.js API Routes → React Frontend
```

## 데이터 모델

| 테이블          | 설명             |
| --------------- | ---------------- |
| `arProjects`    | 메인 프로젝트    |
| `glbModels`     | 3D 모델          |
| `imageTargets`  | 이미지 타겟 마커 |
| `projectGroups` | 프로젝트 그룹    |
| `adminPassword` | 관리자 인증      |

## 단계별 플랜

### 1단계: DB 연결 설정

- `@neondatabase/serverless` 패키지 설치
- `web/src/shared/lib/db.ts` — NEON 연결 인스턴스 생성
- `web/.env.local`에 `DATABASE_URL` 추가
- `web/.env.example`에 `DATABASE_URL` 항목 추가

### 2단계: 엔티티별 API 라우트 작성

각 엔티티에 대한 NEON 기반 API 라우트를 새로 작성한다.
기존 Memex fetcher 코드는 이 단계에서 건드리지 않는다.

#### 2-1. projectGroups

- `web/src/app/groups/api/route.ts` 생성
- GET: `SELECT`, POST: `INSERT`

#### 2-2. arProjects

- `web/src/app/projects/api/handlers/neon.ts` 작성 (GET list, GET item, POST, PUT)
- `web/src/app/projects/api/handlers/memex.ts` — 기존 로직 보존
- `web/src/app/projects/api/route.ts` — import 교체로 스왑

#### 2-3. glbModels

- `web/src/app/glbModels/api/handlers/neon.ts` 작성 (GET list, GET item, POST, PUT)
- `web/src/app/glbModels/api/handlers/memex.ts` — 기존 로직 보존
- `web/src/app/glbModels/api/route.ts` — import 교체로 스왑

### 3단계: 파일 업로드 교체

현재 Memex `postMedia()`로 업로드하던 파일을 별도 스토리지로 교체한다.

- 스토리지: S3
- `web/src/features/projectCreation/utils/imageTarget/uploadImageTargetFile.ts` 교체
- 업로드 후 반환된 URL을 DB에 저장하는 방식으로 통일

### 4단계: 기존 fetcher 일괄 교체

2단계 API 라우트와 3단계 파일 업로드가 모두 준비된 후, 기존 Memex fetcher 호출부를 한꺼번에 교체한다.

- `web/src/features/group/fetchers/group.ts`
- `web/src/features/group/hooks/useGroups.tsx`
- `web/src/features/group/types/group.ts`
- `web/src/entities/project/utils/fetchers/index.ts`
- `web/src/entities/glbModel/utils/fetchers/index.ts`
- `web/src/entities/project/tests/createProject.ts`

### 5단계: 타입 및 의존성 정리

- `web/src/shared/types/memex.ts` — Memex 래퍼 타입 제거
- `MemexModelItem<T>`, `MemexListResult<T>` 등을 직접 타입으로 교체
- 각 엔티티 타입을 DB 스키마 기반으로 재정의
- `@rebel9/memex-fetcher` 패키지 제거
- `MEMEX_TOKEN`, `MEMEX_PROJECT_ID` 환경변수 제거
- `.env.example` 업데이트

### 6단계: Drizzle Kit 마이그레이션 설정

5단계 완료 후 `schema.ts`를 코드 원천으로 확립한다. 현재 Neon 테이블은 직접 생성된 상태이므로 `drizzle-kit introspect`로 초기 스냅샷을 캡처하고, 이후 스키마 변경은 `generate → migrate` 워크플로로 관리한다.

→ 워크플로 상세: [drizzle-kit-migration-workflow.md](./details/drizzle-kit-migration-workflow.md)

## 아키텍처 원칙 (향후 변경 대비)

백엔드 레이어는 또 바뀔 수 있다. 교체 비용을 최소화하기 위해 아래 레이어 경계를 유지한다.

```
DB (Drizzle)       — 저장 무결성만 담당, $inferSelect 타입은 이 레이어 밖으로 노출 금지
    ↓ raw data
Zod schema         — 앱 데이터 계약의 원천. TypeScript 타입은 z.infer<>로 파생
    ↓ z.infer<>
fetcher            — 데이터 가져오기 + Zod parse, 도메인 타입 반환
    ↓
컴포넌트 / 훅      — 항상 같은 도메인 타입을 받음, 백엔드 변경에 무관
```

- TypeScript 타입을 손으로 따로 정의하지 않는다 → Zod에서 `z.infer<>`로 파생
- Drizzle `$inferSelect` 타입은 API 핸들러 안에서만 쓰고 밖으로 노출하지 않는다
- 백엔드가 바뀌면 fetcher + Zod parse 위만 수정하면 된다
- 서버는 DB 데이터를 최소 변환만 해서 전달하고, 포매팅은 Zod 검증 이후 클라이언트에서 수행한다

→ 상세 논의: [client-validation-and-formatting.md](./details/client-validation-and-formatting.md)

## 참고 파일

- DB 스키마: `backups/20260323.sql`
- 현재 타입 정의: `web/src/shared/types/memex.ts`
- Next.js API Routes: `web/src/app/**/api/route.ts`
