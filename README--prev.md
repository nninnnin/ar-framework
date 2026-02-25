# AR Framework

AR Framework는 코드 편집 없이 웹 AR 컨텐츠를 생성하고 3D 모델을 편집할 수 있는 웹 브라우저 기반의 컨텐츠 제작 툴 입니다.

[`AR.js`](https://ar-js-org.github.io/AR.js-Docs/) 와 [`MindAR`](https://github.com/hiukim/mind-ar-js) 을 기반으로 3가지 종류의 웹 AR 컨텐츠를 제작할 수 있습니다.

- 위치 기반(GPS) AR은 좌표를 기반으로 3D 모델을 고정하여 증강,
- 얼굴 인식 AR은 얼굴을 인식해 눈, 코, 입등의 랜드마크에 3D 모델을 고정하여 증강,
- 이미지 마커 인식 AR은 미리 인식시킨 이미지 마커를 기반으로 모델을 증강합니다.

## 주요 기능

크게 세 가지의 기능이 있으며, 이들을 각각의 서브패키지로 나누어 작성하고 하나의 플랫폼에 통합했습니다. 각 서브패키지의 사용 방법은 해당 디렉터리의 `README.md` 를 참고하세요.

#### AR 종류를 골라 컨텐츠를 생성하고 수정하기 (`/web`)

메인화면과 컨텐츠 리스트
<img src='./docs/images/1.png'>

컨텐츠 생성하기 (1, 2단계)
<img src='./docs/images/2.png'>

컨텐츠 생성 (3단계로 완료), 컨텐츠 수정하기 (3D 모델 추가/제거)
<img src='./docs/images/3.png'>

#### AR 뷰에서 컨트롤러로 3D 모델 조정하기 (`/packages/controls`)

QR코드를 통해 각 컨텐츠에 부여된 고유 링크로 접속해 컨트롤러로 3D 모델의 위치, 크기, 회전을 세밀하게 컨트롤 할 수 있습니다. 컨트롤러의 최대/최소값과 조정 단위 설정 가능

<img src='./docs/images/4.png'>

#### AR 컨텐츠 통합 인터페이스와 캡쳐 로직 제공 (`packages/utils`, `/packages/capturer`)

컨텐츠 링크를 복사해 외부의 프로젝트에서 AR 컨텐츠를 통합하고 postMessage 기반 메시지를 편리하게 주고받을 수 있는 유틸리티 훅을 제공합니다. 컨텐츠에 미리 통합된 캡쳐 로직을 통해 AR 컨텐츠를 캡쳐할 수도 있습니다.

## 개발환경 세팅

#### 1. 환경변수 설정

`@ar-framework/controls` 등의 서브패키지 빌드에 사용되는 환경변수는 프로젝트 루트 디렉토리의 `.env` 에 작성되어야 합니다.

자세한 환경변수 리스트는 `.env.example` 을 참고하세요.

#### 2. yarn berry 의 vscode 설정

하지 않으면 Next.js 프로젝트에서 `cannot find module~` TS 에러를 확인하게 됩니다.

- 타입스크립트 파일을 선택한 상태에서 `ctrl+shift+p` 를 누릅니다.
- "Select TypeScript Version" 를 선택합니다.
- "Use Workspace Version" 를 선택합니다.

#### 3. 프로젝트 클론 이후 `yarn install` 은 필요합니다

루트 디렉터리에서 꼭 yarn install을 실행해주세요.

#### 4. yarn workspace를 사용한 프로젝트의 의존성 설치방법

`web` 이라는 워크스페이스 (모노레포의 서브패키지)에 `lodash` 라는 모듈을 추가할 때

- yarn workspace web add `lodash`

제거할 때

- yarn workspace web remove `lodash`
