# Zustand

### 설치

```shell
npm i zustand
```

### 스토어

- 애플리케이션의 여러 상태를 중앙에서 관리하는 패턴
- 컴포넌트 간의 데이터 공유를 쉽게 처리하고 데이터 변경을 감지해 자동으로 렌더링 할 수도 있다.
- Props Drilling이 심한 컴포넌트를 대상으로 관리하는 것이 좋다

### create (기본 사용)

- create 함수로 스토어 생성
- create의 콜백 함수는 set, get 매개변수를 가진다. **set**은 **상태 변경**, **get**은 **상태 조회**를 수행한다.
- 콜백이 반환하는 객체에서 속성은 상태(state), 메서드는 액션(action)이라고 한다.
- set을 활용하면 콜백 함수의 state 매개변수로 현재 스토어 정보를 가져올 수 있다. 아래 코드를 가지고 보면 bears, increasePopulation, removeAllBears, updateBears를 접근할 수 있다. 주로 **상태 접근**을 위한 용도로 쓰인다.
- 만약 TypeScript를 쓴다면 반드시 interface로 타입 정의를 해준다.

```typescript
import { create } from "zustand";

interface BearState {
  bears: number;
  increasePopulation: () => void;
  removeAllBears: () => void;
  updateBears: (newBears: number) => void;
}

const useBear = create<BearState>((set) => ({
  // 상태(state): bears
  bears: 0,
  // 액션(action): increasePopulation, removeAllBears, updateBears
  increasePopulation: () => set((state) => ({ bears: state.bears + 1 })),
  removeAllBears: () => set({ bears: 0 }),
  updateBears: (newBears) => set({ bears: newBears }),
}));
```

- 스토어 훅을 가져와 호출할 때 선택자 함수를 전달해 원하는 상태나 액션을 얻을 수 있다.

```typescript
import useBear from "../stores/bears";

export function BearCounter() {
  const bears = useBear((state) => state.bears);
  return <h1>{bears} bears around here...</h1>;
}

export function Controls() {
  const increasePopulation = useBear((state) => state.increasePopulation);
  return <button onClick={increasePopulation}>one up</button>;
}
```

- 주의점은 스토어 훅을 호출할 때 선택자 함수 없이 호출하면 다른 컴포넌트에서 상태를 변경할 때 스토어 훅을 사용한 모든 컴포넌트에서 불필요한 리렌더링이 발생한다.

**예시**

```javascript
// 스토어에 이런 상태가 있다고 가정
const useUserStore = create((set) => ({
  name: '홍길동',
  age: 25,
  email: 'hong@email.com',
  avatar: 'image.jpg',
  posts: [...많은 게시물들...],
  notifications: [...많은 알림들...],
  // ... 수십 개의 다른 상태들
}))

// ❌ 컴포넌트 A: 이름만 필요한데 전체를 구독
function UserName() {
  const 스토어 = useUserStore() // 전체 상태 구독!

  return <h1>{스토어.name}</h1>  // 이름만 사용
}

// ❌ 컴포넌트 B: 이메일만 필요한데 전체를 구독
function UserEmail() {
  const 스토어 = useUserStore() // 전체 상태 구독!

  return <p>{스토어.email}</p>   // 이메일만 사용
}
```

**상태 변경 발생**

```javascript
// 어딘가에서 나이만 바뀌어도...
setAge(26);

// 🚨 문제 발생!
// - UserName 컴포넌트 리렌더링 (이름은 안 바뀌었는데!)
// - UserEmail 컴포넌트 리렌더링 (이메일도 안 바뀌었는데!)
// - 스토어를 구독하는 모든 컴포넌트가 리렌더링!
```

**반드시 선택자 함수 사용!**

```javascript
// ✅ 올바른 방법: 필요한 것만 구독
function UserName() {
  const name = useUserStore((state) => state.name); // 이름만 구독

  return <h1>{name}</h1>;
}

function UserEmail() {
  const email = useUserStore((state) => state.email); // 이메일만 구독

  return <p>{email}</p>;
}

// 이제 나이가 바뀌어도 이 컴포넌트들은 리렌더링되지 않습니다!
setAge(26); // UserName, UserEmail 컴포넌트는 평온함 😌
```

### combine (상태 타입 추론)

- TypeScript를 사용한다면 상태 타입을 추론한다.
- 그러나 일부 상태는 추론이 안 될 수도 있다. 이럴 땐 타입 만족(satisfies)이나 타입 단언(as) 키워드를 활용해 타입을 작성하면 된다.

```typescript
import { create } from "zustand";
import { combine } from "zustand/middleware";

type User = {
  email: string;
  displayName: string;
  isValid: boolean;
} | null;

const initialState = {
  // user: {} satisfies User as User, // Error!
  user: null satisfies User as User,
  isLoggedIn: false,
};

export const useUserStore = create(
  combine(initialState, (set) => ({
    actions: {
      login: () => {
        set({
          user: {
            email: "thesecon@gmail.com",
            displayName: "HEROPY",
            isValid: true,
            phone: 12345678, // Error!
          },
        });
      },
    },
  }))
);
```

- combine의 주요 이점은 상태 타입 추론이지만 combine을 안 쓰는 것보다 상태와 액션을 명확히 구분해주기 때문에 가독성이 높아진다.

### useShallow (다중 상태 선택 훅)

- 스토어 훅에서 useShallow 훅을 중첩 호출해 선택자 함수를 전달함으로써 여러 상태, 혹은 액션을 한번에 객체나 배열로 가져올 수 있다.

```typescript
import { useShallow } from "zustand/shallow";

const { 상태, 액션 } = use이름Store(
  useShallow((state) => ({
    상태: state.상태,
    액션: state.액션,
  }))
);
```

### devtools

- Zustand 상태를 모니터링할 수 있는 개발자 도구 활성화

```typescript
import { create } from "zustand";
import {
  combine,
  subscribeWithSelector,
  persist,
  devtools,
} from "zustand/middleware";
import { immer } from "zustand/middleware/immer";

const initialState = {
  count: 1,
  double: 2,
};
export const useCountStore = create(
  devtools(
    persist(
      subscribeWithSelector(
        immer(
          combine(initialState, (set) => ({
            increase: () =>
              set((state) => {
                state.count += 1;
              }),
            decrease: () =>
              set((state) => {
                state.count -= 1;
              }),
          }))
        )
      ),
      { name: "countStore" }
    )
  )
);
```

---

**참고 자료**

- HEROPY DEV 님의 Zustand 핵심 정리: https://www.heropy.dev/p/n74Tgc
- Zustand 공식 문서: https://zustand.docs.pmnd.rs/getting-started/introduction
