# AR Framework Web

AR Framework 웹사이트와 에디터를 포함합니다.

- `/[projectUid]` 로 프로젝트 에디터에 접속할 수 있습니다.<br/>
- 센서 등이 필수적인 AR 프로젝트의 특성상 현재 AR 프로젝트 에디터는 모바일 전용입니다\*

---

## 설계와 관련된 이야기들

### Dialog 컴포넌트 디자인

- 다이얼로그는 Small, Large 두 가지의 사이즈가 존재
- `Dialog Small` 의 사용처
  - 그룹 생성 시 간단한 원스텝 다이얼로그의 용도
- `Dialog Large` 의 사용처
  - 프로젝트 생성 시 퍼널의 용도
  - 생성된 프로젝트의 디테일 뷰의 용도
- 이와 같이 각 사이즈별로 다양한 내용을 구현할 수 있도록 `Dialog` 컴포넌트에서는 스타일만을 내부 의존성으로 가지며, 다이얼로그의 내용은 children으로 주입받을 수 있도록 구현

- 다이얼로그의 사이즈 선택 이후 공통적으로 사용되는 내부 구성요소 (컨텐츠 컨테이너, 버튼 컨테이너, 버튼)는 서브 컴포넌트화하여 Dialog 내부에 응집될 수 있도록 코드 구성
  - 다이얼로그의 사이즈에 따라 해당 내부 구성요소 또한 스타일이 변화할 수 있도록 구현하여 내부요소 구현 편의성 높임

### Backend For Frontend

Next API route를 적극적으로 활용하여 BFF를 구성

- `entities` 폴더에는 각 데이터 도메인에 관한 서비스 로직이 작성되어 있음
- 서비스 로직에는 memexFetcher를 이용해 미믹스 데이터 fetching & formatting
- 각 엔티티에 해당하는 API route로 요청을 보내기 위한 `nextApiFetcher`을 사용해 useQuery등의 훅에서 서버사이드로 데이터 요청

- 서버사이드에서 각 엔티티와 관련된 모든 데이터처리를 담당하므로 프론트엔드에서는 요청 한번으로 효율적인 데이터처리 가능

---

### TODO

- 관심사 주제로 디렉토리 구조 변경하여 응집도 높여보기 [V]
- createMemexFetcher를 여러 파일에서 하는 경우 memexFetcher 인스턴스가 싱글톤으로 유지되는가? [ ]
