# @ar-framework/capturer

AR 씬과 카메라 피드를 합성하여 캡처 이미지를 생성하는 유틸리티입니다.

A-Frame(`a-scene`)의 3D 렌더링 결과와 카메라 비디오 피드를 하나의 캔버스에 합성한 뒤 PNG Blob으로 내보냅니다. `web` 프로젝트의 퍼블릭 폴더에 번들로 주입되어, iframe 메시지 인터페이스를 통해 동작합니다.

## 동작 방식

캡처는 `trigger-capture` 메시지로 트리거됩니다.

```js
// 일반 캡처 (후면 카메라 AR)
iframe.contentWindow.postMessage({ type: "trigger-capture" }, "*");

// 페이스 캡처 (전면 카메라 AR, 좌우 반전 적용)
iframe.contentWindow.postMessage({
  type: "trigger-capture",
  payload: { captureType: "face" },
}, "*");
```

캡처가 완료되면 부모 윈도우로 결과를 전달합니다.

```js
window.addEventListener("message", (event) => {
  if (event.data.type === "image-captured") {
    const blob = event.data.payload; // PNG Blob
  }
});
```

## 주요 처리

- 디바이스 픽셀 비율(DPR)을 반영한 해상도로 캔버스 생성
- 캡처 직전 tone mapping을 임시 해제하여 색상 왜곡 방지 후 복원
- 전면 카메라(`face`) 모드에서는 비디오를 좌우 반전하여 합성
