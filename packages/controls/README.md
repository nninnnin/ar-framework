# @ar-framework/controls

AR 모델을 컨트롤하는 UI를 생성합니다.

## 기술

- UI를 간편하게 개발하기 위해 `리액트` 를,
- 리액트와 여러 패키지들을 하나의 자바스크립트 파일로 트랜스파일 및 번들링하기 위해 `parcel` 을 사용했습니다.

## 사용법

- 코드를 변경하고 `yarn run build` 명령어로 파슬 빌드를 생성합니다. 빌드 결과물은 해당 디렉터리의 dist 폴더에 생성됩니다.

- 해당 빌드 결과물을 `@ar-framework/web` 에 포함시키기 위해 빌드 스크립트에 `copyAppToWebPublic` 명령이 포함되어 있습니다. 빌드 이후 빌드 결과물을 `@ar-framework/web` 패키지의 public/script 폴더로 이동시켜줍니다.

---

## 개발 서버와 빌드

- 개발 시에는 먼저 `yarn run dev` 를 사용해 parcel dev server를 켭니다. `localhost:1234` 에서 실행됩니다.

- 코드를 고쳤다면 `yarn run build:dev` 를 통해 개발용 빌드를 업데이트하고 방금 열어준 개발서버의 포트로 접속해 코드의 변경사항을 확인할 수 있습니다.

## 주의사항!

- 마지막 변경사항을 `@ar-framework/web` 에 반영하기 위해 `yarn run build` 명령어를 사용해 **프로덕션용 빌드** 를 생성하고 `web/public` 폴더의 내용이 바뀐 것을 확인 후 커밋에 포함시켜주세요.
