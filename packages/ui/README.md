# @ar-framework/ui

AR Framework 디자인 시스템 패키지.

---

## 왜 이 패키지가 필요한가

### 문제: Tailwind Purge

`packages/controls`는 Tailwind CSS를 사용한다. Tailwind는 빌드 시점에 실제로 사용된 클래스만 남기고 나머지를 제거(purge)한다.

버튼 같은 공통 UI를 별도 패키지로 분리할 때, 그 패키지 안에서 Tailwind 클래스를 사용하면 문제가 발생한다:

1. UI 패키지를 독립적으로 빌드하면 Tailwind 설정이 없어 클래스가 번들에서 제거됨
2. controls에서 import해도 스타일이 빠져있는 상태로 도착

이를 해결하려면 controls의 Tailwind 설정이 UI 패키지 파일까지 스캔하도록 경로를 추가해야 한다 — 패키지 간 결합이 생긴다.

### 대안 검토

| 방식 | 설명 | 문제 |
|---|---|---|
| 인라인 스타일 | `style={{ backgroundColor: "#000" }}` | 토큰 관리 어려움, 동적 스타일 제한 |
| CSS-in-JS (Emotion) | 스타일이 JS에 포함 | 런타임 오버헤드 |
| CSS 모듈 | 별도 CSS 파일 번들 | 소비자가 CSS도 import해야 함 |
| Headless | 스타일 없이 로직만 | 소비자 작업 많음 |

### 선택: vanilla-extract

**빌드 타임에 CSS로 컴파일**되는 TypeScript 기반 스타일링 라이브러리.

```typescript
// tokens.css.ts
export const vars = createGlobalTheme(":root", {
  color: {
    primary: "#000000",
    surface: "#ffffff",
  },
});
```

선택 이유:

- **런타임 오버헤드 없음** — 결과물은 순수 CSS
- **타입 안전** — 토큰이 TypeScript 상수이므로 자동완성, 오타 방지
- **Purge 문제 없음** — Tailwind와 무관하게 동작
- **Parcel 플러그인 지원** — 기존 빌드 시스템과 호환
- **토큰 중앙화** — 색상, 간격 등을 한 곳에서 관리하고 모든 패키지가 참조

소비자(controls, web 등)는 생성된 CSS 파일을 한 번 import하면 된다:

```typescript
import "@ar-framework/ui/dist/index.css";
```

---

## 구조

```
src/
  tokens.css.ts   ← 디자인 토큰 (색상, 간격, 타이포)
  Button.tsx      ← 버튼 컴포넌트
  index.tsx       ← export 묶음
```
