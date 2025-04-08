# @ar-framework/utils

`AR Framework` 로 만들어진 컨텐츠와의 연동을 위해 사용할 수 있는 유틸리티 함수들을 작성해 두었습니다.

## 리액트 앱과 AR 컨텐츠의 연동

일반적으로 AR 컨텐츠를 담는 앱은 리액트로 UI를 사용해 구성하게 됩니다. 아래는 리액트 앱에서 AR 컨텐츠의 상태 변화와 리액트 앱의 UI 변경을 연동하기 위해 사용할 수 있는 훅(hook)입니다.

### `useArContents`

- AR 컨텐츠 소스 URL을 입력받고 iframe을 이용해 AR 컨텐츠를 보여주는 컴포넌트 `ArContentsIframe` 을 반환합니다.

- AR 컨텐츠의 상태 변화를 유발하기 위한 두 가지 메서드 `showGlbModels`와 `showCaptureButton` 을 반환합니다.

```
const AR_CONTENTS_SOURCE = "https://ar-framework.com/templates/api?projectUid=<PROJECT_UID>";

const {
  ArContentsIframe,
  showGlbModels,
  showCaptureButton,
} = useArContents(AR_CONTENTS_SOURCE);

const handleClick = () => {
  showGlbModels();
  showCaptureButton();
};

return (
  <>
    <ArContentsIframe />

    <button onClick={handleClick}>
      AR 시작하기
    </button>
  </>
);
```

### `useArContentsMessages`

AR 컨텐츠의 상태 변화에 리액트 UI를 반응시키기 위해 사용됩니다.

```
useArContentsMessages({
  handleARLoaded: () => {
    showArContents(false);
  },
  handleCapturedImage: (capturedImage: Blob) => {
    const objectURL = URL.createObjectURL(capturedImage);

    setCapturedImage(objectURL);
  },
});
```

---

### 버전 히스토리

- `1.1.3`
  - `index.d.ts` 추가
- `1.1.5`

  - `ArContentsIframe` 인터페이스 수정 (src 속성 추가)
  - tsconfig 옵션 추가: `"moduleResolution": "node"`

- `1.1.6`

  - 메시지 수신 로그 수정

- `1.1.7`

  - `ArContentsIframe` 에서 src 속성 제거
  - `ArContentsIframe` 리렌더링 문제 해소를 위해 메모아이징

- `1.1.8`

  - `ArContentsIframe` 에 src 속성 다시 추가
  - `useArContents` 에서 src 속성 제거

- `1.1.9`

  - `ArContentsIframe` 메모기능 제거

- `1.1.10`

  - iframe에 web-share 권한 추가

- `1.2.0`

  - `ArContentsIframe` 에 visibility 속성 추가

- `1.2.1`

  - `useArContentsMessages` 에 이벤트 핸들러 클린업 적용

- `1.3.0`

  - `useArContentsMessages` : gif 메시지 핸들러 추가

- `1.3.1`
  - iframe 크기 조정: 99.9dvh. 삼성인터넷에서 100dvh 시 플리커 현상 방지
