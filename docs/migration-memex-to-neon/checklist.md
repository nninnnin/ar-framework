# Memex → NEON 마이그레이션 체크리스트

## 1단계: DB 연결 설정

- [ ] `@neondatabase/serverless` 패키지 설치
- [ ] `web/src/shared/lib/db.ts` 생성 (NEON 연결 인스턴스)
- [ ] `web/.env.local`에 `DATABASE_URL` 추가
- [ ] `web/.env.example`에 `DATABASE_URL` 항목 추가

## 2단계: 엔티티별 fetcher 교체

### 2-1. projectGroups
- [ ] `getList` → `SELECT * FROM projectGroups`
- [ ] `postItem` → `INSERT INTO projectGroups`

### 2-2. arProjects
- [ ] `getList` → `SELECT * FROM arProjects`
- [ ] `getItem` → `SELECT * FROM arProjects WHERE uid = $1`
- [ ] `postItem` → `INSERT INTO arProjects`
- [ ] `updateItem` → `UPDATE arProjects SET ... WHERE uid = $1`

### 2-3. glbModels
- [ ] `getList` → `SELECT * FROM glbModels`
- [ ] `getItem` → `SELECT * FROM glbModels WHERE uid = $1`
- [ ] `postItem` → `INSERT INTO glbModels`
- [ ] `updateItem` → `UPDATE glbModels SET ... WHERE uid = $1`

### 2-4. imageTargets
- [ ] `getItem` → `SELECT * FROM imageTargets WHERE uid = $1`
- [ ] `updateItem` → `UPDATE imageTargets SET ... WHERE uid = $1`

### 2-5. adminPassword
- [ ] `getList` → `SELECT * FROM adminPassword LIMIT 1`

## 3단계: 파일 업로드 처리

- [ ] 스토리지 선택 및 설정 (S3 / Vercel Blob / R2)
- [ ] `uploadImageTargetFile.ts` 교체
- [ ] 업로드 URL을 DB에 저장하는 방식으로 통일
- [ ] GLB 모델 파일 업로드 경로 동일하게 처리

## 4단계: 타입 정리

- [ ] `web/src/shared/types/memex.ts` Memex 래퍼 타입 제거
- [ ] `MemexModelItem<T>` → 직접 타입으로 교체
- [ ] `MemexListResult<T>` → 직접 타입으로 교체
- [ ] 각 엔티티 타입을 DB 컬럼 기준으로 재정의

## 5단계: 의존성 정리

- [ ] `@rebel9/memex-fetcher` 패키지 제거 (`yarn remove`)
- [ ] `MEMEX_TOKEN` 환경변수 제거
- [ ] `MEMEX_PROJECT_ID` 환경변수 제거
- [ ] `web/.env.example`에서 Memex 관련 항목 제거
- [ ] Memex 관련 import 전체 제거 확인
