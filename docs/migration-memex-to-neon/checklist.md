# Memex → NEON 마이그레이션 체크리스트

## 1단계: DB 연결 설정

- [x] `@neondatabase/serverless` 패키지 설치
- [x] `drizzle-orm` 패키지 설치
- [x] `web/src/shared/lib/db.ts` 생성 (NEON + Drizzle 연결)
- [x] `web/src/shared/lib/schema.ts` 생성 (Drizzle 스키마)
- [x] `web/.env.local`에 `DATABASE_URL` 추가
- [x] `web/.env.example`에 `DATABASE_URL` 항목 추가

## 2단계: 엔티티별 핸들러 작성

### 2-1. projectGroups

- [x] `web/src/app/groups/api/handlers/queries/` 작성
- [x] `web/src/app/groups/api/handlers/neon.ts` 작성

### 2-2. arProjects

- [x] `web/src/app/projects/api/handlers/queries/` 작성
- [x] `web/src/app/projects/api/handlers/neon.ts` 작성
- [x] `web/src/app/projects/api/handlers/memex.ts` 기존 로직 분리

### 2-3. glbModels

- [x] `web/src/app/glbModels/api/handlers/queries/` 작성
- [x] `web/src/app/glbModels/api/handlers/neon.ts` 작성
- [x] `web/src/app/glbModels/api/handlers/memex.ts` 기존 로직 분리

## 3단계: 파일 업로드 교체

### 3-1. S3 설정

- [x] S3 버킷 및 IAM 설정
- [x] `@aws-sdk/client-s3` 패키지 설치
- [x] S3 관련 환경변수 추가 (`AWS_ACCESS_KEY_ID`, `AWS_SECRET_ACCESS_KEY`, `AWS_REGION`, `S3_BUCKET_NAME`)

### 3-2. uploadToS3 구현

- [x] `web/src/shared/utils/uploadToS3.ts` 생성 — `postMedia` 대체 함수 (파일 받아서 S3에 업로드 후 URL 반환)

## 4단계: 일괄 스왑

### 4-1. postMedia → uploadToS3 교체

- [x] `web/src/features/projectCreation/utils/imageTarget/uploadImageTargetFile.ts`
- [x] `web/src/entities/glbModel/utils/fetchers/index.ts`

### 4-2. API 라우트 교체

- [x] `web/src/app/groups/api/route.ts` — 이미 neon
- [x] `web/src/app/projects/api/route.ts` — memex → neon
- [x] `web/src/app/glbModels/api/route.ts` — memex → neon

### 4-3. 기존 fetcher 교체

- [x] `web/src/features/group/fetchers/group.ts`
- [x] `web/src/features/group/hooks/useGroups.tsx`
- [x] `web/src/features/group/types/group.ts`
- [x] `web/src/entities/project/utils/fetchers/index.ts`
- [x] `web/src/entities/glbModel/utils/fetchers/index.ts`
- [x] `web/src/entities/project/tests/createProject.ts`

## 4.5단계: 테스트

### 테스트 전략

| 대상                | 방식                      | 이유                                 |
| ------------------- | ------------------------- | ------------------------------------ |
| API 라우트 CRUD     | **Playwright (API 모드)** | DB 실연결 필요, 브라우저 불필요      |
| S3 업로드 전체 흐름 | **Playwright (API 모드)** | presigned URL → S3 PUT 실연결 필요   |
| 프로젝트 생성 E2E   | **Playwright (브라우저)** | 파일 업로드 포함 전체 UI 플로우 검증 |

> 유닛 테스트는 순수 함수(포맷터, 트랜스폼)에만 적합하고, 이번 마이그레이션의 핵심 리스크는 DB·S3 연동이므로 통합/E2E 위주로 테스트.

### 4-5-1. API 통합 테스트 (Playwright API)

- [x] `GET /groups/api` — 그룹 목록 반환 확인
- [x] `POST /groups/api` — 그룹 생성 후 DB 저장 확인
- [x] `GET /projects/api?groupName=X` — 프로젝트 목록 반환 확인
- [x] `POST /projects/api` — 프로젝트 생성 후 uid 반환 확인
- [x] `PUT /projects/api?projectId=X` — 프로젝트 수정 확인
- [x] `GET /glbModels/api` — GLB 모델 목록 반환 확인
- [x] `POST /glbModels/api` — GLB 모델 생성 후 uid 반환 확인

### 4-5-2. S3 업로드 통합 테스트 (Playwright API)

- [x] `POST /upload/api` — presigned URL 발급 확인 (key, fileUrl 포함)
- [x] presigned URL로 파일 PUT → S3 저장 확인

### 4-5-3. E2E 테스트 (Playwright 브라우저)

- [x] 위치기반 AR 프로젝트 생성 (GLB 파일 업로드 포함)
- [x] 이미지마커 AR 프로젝트 생성 (이미지 타겟 + GLB 업로드 포함)
- [x] 그룹 생성 및 목록 노출 확인

## 5단계: 타입 및 의존성 정리

### 5-1. 교체 완료된 것들 정리 (즉시 가능)

- [x] `web/src/app/glbModels/api/handlers/memex.ts` 삭제 — neon 핸들러로 대체됨
- [x] formatter/formatters에서 `@rebel9/memex-fetcher` 유틸(pipe, mapObjectProps 등) 제거 — 순수 JS로 대체
- [x] Memex 래퍼 타입(`MemexModelItem<T>`, `MemexListResult<T>`) → 직접 타입으로 교체
- [x] 각 엔티티 타입 파일에서 `@/shared/types/memex` import 제거
- [x] `shared/utils/createUpdateBody.ts`의 `MemexDataType` → `DataType` 으로 이름 변경
- [x] `app/groups/api/route.ts` Memex 스왑 주석 제거

### 5-2. 아직 Memex API 직접 사용 중 (마이그레이션 필요)

- [ ] **imageTarget Neon 마이그레이션** — `imageTargets` 테이블 추가 또는 arProjects jsonb 활용으로 아래 파일 교체:
  - [ ] `features/projectCreation/utils/imageTarget/postImageTarget.ts` (현재 Memex `postItem` 사용)
  - [ ] `entities/imageTarget/utils/getImageTarget.ts` (현재 Memex `getItem` 사용)
  - [ ] `entities/imageTarget/utils/updateImageTarget.ts` (현재 Memex `updateItem` 사용)
- [ ] **템플릿 데이터 Neon 마이그레이션** — 아래 파일 Neon API 호출로 교체:
  - [ ] `app/templates/utils/fetchers/glbModels.ts` (현재 Memex `getList` 사용)
  - [ ] `app/templates/utils/fetchers/targetImage.ts` (현재 Memex `getItem` 사용)
  - [ ] `app/templates/[templateId]/api/route.ts` — `templateId` 검색 Neon 처리 추가
- [ ] `@rebel9/memex-fetcher` 패키지 제거 (`yarn remove`) — 위 마이그레이션 완료 후
- [ ] `MEMEX_TOKEN` 환경변수 제거 — 위 마이그레이션 완료 후
- [ ] `MEMEX_PROJECT_ID` 환경변수 제거 — 위 마이그레이션 완료 후
- [ ] `web/.env.example`에서 Memex 관련 항목 제거 — 위 마이그레이션 완료 후
- [ ] `web/src/shared/types/memex.ts` 파일 삭제 — 위 마이그레이션 완료 후

## 6단계: Drizzle Kit 마이그레이션 설정

> `schema.ts`를 코드 원천으로 삼고, DB 변경을 코드로 관리하기 위한 설정

- [ ] `drizzle-kit` 패키지 설치 (`yarn add -D drizzle-kit`)
- [ ] `drizzle.config.ts` 생성 — DB 연결 및 마이그레이션 경로 설정
- [ ] `drizzle-kit introspect` 실행 — 현재 Neon 테이블 상태를 초기 마이그레이션 스냅샷으로 캡처
- [ ] `package.json`에 마이그레이션 스크립트 추가 (`db:generate`, `db:migrate`, `db:check`)
- [ ] 이후 스키마 변경 시 `drizzle-kit generate` → `drizzle-kit migrate` 워크플로 사용

## 완료된 개별 항목

- [x] `adminPassword` — 환경변수(`NEXT_PUBLIC_ADMIN_PASSWORD`)로 교체
- [x] `imageTargets` — 독립 테이블 없음, `arProjects.imageTarget` jsonb 컬럼에 내장
