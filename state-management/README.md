# 프론트엔드 상태관리

### 상태관리

- 컴포넌트의 메모리를 관리하는 것
- 프론트엔드는 UI/UX 중요성과 함께 많은 발전을 거치게 되면서 단순한 정적 페이지가 아닌 많은 인터랙션을 수행과 많은 사용자들이 이용할 수 있도록 컴포넌트에서 사용되는 상태 관리 중요성도 커지고 있다.

### Client State vs Server State

- Client State: 클라이언트가 소유하고 제어하는 데이터(예시: UI 테마, 홈페이지 언어, 모달 등) local과 global로 구분됨
- Server State: 클라이언트가 서버로부터 받아오는 모든 데이터.(예시: API 호출 데이터) 비동기 상태를 가짐. 서버와 클라이언트 간의 state가 항상 일치하지 않으며 더 이상 유효하지 않은 데이터를 소유할 가능성이 있음.

### 프론트엔드 상태관리 방법의 변화

(이미지 첨부)

### Zustand, React Query 상태관리 라이브러리 용도

1. Zustand(Client State 관리)

- Client에서 소유 및 관리
- Client에서 온전히 제어가능한 상태

2. React Query(Server State 관리)

- Client 외부에서 소유
- Client 측에서는 일종의 캐시 상태

### React Query(@tanstack-query/react)

- 유용한 옵션과 인터페이스
- 리액트 훅같은 간단한 사용법
- 캐싱, 동기화 등 다양한 기능 수행

**Redux와 비교**

1. API 호출 코드에 Polling 구현

- Redux
  - Action 선언
  - State 추가
  - Reducer 대응
  - saga 폴링 구현
  - 컴포넌트 연결
- React Query
  - Query 선언 + 옵션

2. API 호출 상태 확인

- Redux
  - State 추가
  - Reducer 대응
  - 컴포넌트 연결
- React Query
  - Query에서 제공

### Zustand

- 작고, 빠르며, 확장 가능한 최소한의 상태 관리 솔루션
- 적은 보일러 플레이트 코드
- 직관적인 사용법
- 작은 패키지 사이즈

**Redux와 비교**

- Redux
  - 스토어 및 상태 선언
  - Action 선언
  - Reducer 구현
  - Provider 연결
  - 컴포넌트 연결
- Zustand
  - 스토어에 모두 구현
  - 컴포넌트에서 호출

---

**참고**

- 우아콘2023: 프론트엔드 상태관리 실전 편 with React Query & Zustand
  https://www.youtube.com/watch?v=nkXIpGjVxWU&t=1500s
- Client State VS Server State 참고 블로그: https://velog.io/@rookieand/Server-State%EB%8A%94-%EB%AD%90%EA%B3%A0-React-Query%EB%8A%94-%EC%99%9C-%EC%93%B0%EB%8A%94%EA%B0%80
