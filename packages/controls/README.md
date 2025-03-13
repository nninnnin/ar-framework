# @ar-framework/controls

AR 모델을 컨트롤하는 UI를 생성합니다.

## 기술

- UI를 간편하게 개발하기 위해 `리액트` 를,
- 리액트와 여러 패키지들을 하나의 자바스크립트 파일로 트랜스파일 및 번들링하기 위해 `parcel` 을 사용했습니다.

## 사용법

- 코드를 변경하고 `yarn run build` 명령어로 파슬 빌드를 생성합니다. 빌드 결과물은 해당 디렉터리의 dist 폴더에 생성됩니다.

- 해당 빌드 결과물을 `@ar-framework/web` 에 포함시키기 위해 빌드 스크립트에 `copyAppToWebPublic` 명령이 포함되어 있습니다. 빌드 이후 빌드 결과물을 `@ar-framework/web` 패키지의 public/script 폴더로 이동시켜줍니다.
