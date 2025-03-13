# AR Framework

### 개발환경 세팅 시 참고사항

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
