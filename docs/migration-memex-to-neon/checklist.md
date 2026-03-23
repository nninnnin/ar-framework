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

### 3-3. 교체 대상
- [ ] `web/src/features/projectCreation/utils/imageTarget/uploadImageTargetFile.ts` — `postMedia` → `uploadToS3`
- [ ] `web/src/entities/glbModel/utils/fetchers/index.ts` — `postMedia` → `uploadToS3`

## 4단계: 일괄 스왑

### 4-1. API 라우트 교체
- [ ] `web/src/app/groups/api/route.ts` — memex → neon (이미 neon)
- [ ] `web/src/app/projects/api/route.ts` — memex → neon
- [ ] `web/src/app/glbModels/api/route.ts` — memex → neon

### 4-2. 기존 fetcher 교체
- [ ] `web/src/features/group/fetchers/group.ts`
- [ ] `web/src/features/group/hooks/useGroups.tsx`
- [ ] `web/src/features/group/types/group.ts`
- [ ] `web/src/entities/project/utils/fetchers/index.ts`
- [ ] `web/src/entities/glbModel/utils/fetchers/index.ts`
- [ ] `web/src/entities/project/tests/createProject.ts`

## 5단계: 타입 및 의존성 정리

- [ ] `web/src/shared/types/memex.ts` Memex 래퍼 타입 제거
- [ ] `MemexModelItem<T>` → 직접 타입으로 교체
- [ ] `MemexListResult<T>` → 직접 타입으로 교체
- [ ] 각 엔티티 타입을 DB 컬럼 기준으로 재정의
- [ ] `@rebel9/memex-fetcher` 패키지 제거 (`yarn remove`)
- [ ] `MEMEX_TOKEN` 환경변수 제거
- [ ] `MEMEX_PROJECT_ID` 환경변수 제거
- [ ] `web/.env.example`에서 Memex 관련 항목 제거
- [ ] Memex 관련 import 전체 제거 확인

## 완료된 개별 항목

- [x] `adminPassword` — 환경변수(`NEXT_PUBLIC_ADMIN_PASSWORD`)로 교체
- [x] `imageTargets` — 독립 테이블 없음, `arProjects.imageTarget` jsonb 컬럼에 내장
