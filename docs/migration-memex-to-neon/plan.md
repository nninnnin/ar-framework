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

- `web/src/app/projects/api/route.ts` 교체
- GET(list), GET(item), POST, PUT

#### 2-3. glbModels

- `web/src/app/glbModels/api/route.ts` 교체
- GET(list), GET(item), POST, PUT

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

## 참고 파일

- DB 스키마: `backups/20260323.sql`
- 현재 타입 정의: `web/src/shared/types/memex.ts`
- Next.js API Routes: `web/src/app/**/api/route.ts`
