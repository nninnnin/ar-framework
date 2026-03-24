# drizzle-kit 마이그레이션 워크플로

## 초기 설정 (최초 1회)

현재 Neon 테이블은 직접 생성된 상태라 `schema.ts`와 실제 DB가 동기화되어 있다는 보장이 없다. 워크플로를 확립하기 전에 먼저 현재 DB 상태를 스냅샷으로 캡처해야 한다.

```bash
drizzle-kit introspect   # 현재 DB → schema.ts + 초기 migration 파일 생성
```

이후부터는 `schema.ts`를 코드 원천으로 삼고 아래 워크플로를 따른다.

## 일반 워크플로

```
schema.ts 수정
  ↓
drizzle-kit generate     # 변경분 감지 → SQL migration 파일 생성
  ↓
git commit               # migration 파일을 코드와 함께 커밋
  ↓
drizzle-kit migrate      # 실제 DB에 적용
```

생성(`generate`)과 적용(`migrate`)은 분리된 단계다. 파일이 생성됐다고 자동으로 DB에 반영되지 않는다.

## migrate 실행 시점

### 옵션 1: CI/CD 파이프라인에 포함 (권장)

배포 직전 단계에서 실행. migrate 실패 시 배포가 중단되므로 schema 불일치가 프로덕션에 도달하지 않는다.

```
# 예시: Vercel build command 또는 별도 배포 스크립트
drizzle-kit migrate && next build
```

### 옵션 2: 수동 실행

개발자가 프로덕션 DB에 직접 연결해 실행. 타이밍을 직접 제어할 수 있지만, 잊어버리면 `schema.ts`와 실제 DB가 조용히 어긋난다.

## 주의

- migration 파일은 반드시 git에 포함시킨다 — 히스토리가 곧 DB 변경 이력
- `schema.ts`를 직접 수정하고 `generate` 없이 배포하면 타입은 맞지만 DB는 안 바뀐 상태가 됨
- Neon은 브랜치 기능을 지원하므로 스테이징 DB를 별도로 두고 migrate를 먼저 검증하는 것도 가능
