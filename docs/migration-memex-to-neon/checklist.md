# Memex → NEON 마이그레이션 체크리스트

## 1단계: DB 연결 설정

- [x] `@neondatabase/serverless` 패키지 설치
- [x] `web/src/shared/lib/db.ts` 생성 (NEON 연결 인스턴스)
- [x] `web/.env.local`에 `DATABASE_URL` 추가
- [x] `web/.env.example`에 `DATABASE_URL` 항목 추가

## 2단계: 엔티티별 API 라우트 작성

### 2-1. projectGroups
- [x] `web/src/app/groups/api/route.ts` 생성 (GET, POST)

### 2-2. arProjects
- [ ] `web/src/app/projects/api/route.ts` 교체 (GET list, GET item, POST, PUT)

### 2-3. glbModels
- [ ] `web/src/app/glbModels/api/route.ts` 교체 (GET list, GET item, POST, PUT)

## 3단계: 파일 업로드 교체

- [ ] S3 버킷 및 IAM 설정
- [ ] `@aws-sdk/client-s3` 패키지 설치
- [ ] `uploadImageTargetFile.ts` 교체
- [ ] 업로드 URL을 DB에 저장하는 방식으로 통일
- [ ] GLB 모델 파일 업로드 경로 동일하게 처리

## 4단계: 기존 fetcher 일괄 교체

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
