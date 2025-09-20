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

- TypeScript를 쓴다면 반드시 interface로 타입 정의를 해주는 것이 좋다

### combine (상태 타입 추론)

- TypeScript를 사용한다면 상태 타입을 추론한다.
- 그러나 일부 상태는 추론이 안 될 수도 있다. 이럴 땐 타입 만족(satisfies)이나 타입 단언(as) 키워드를 활용해 타입을 작성하면 된다.

```typescript
import { create } from 'zustand'
import { combine } from 'zustand/middleware'

type User = {
  email: string
  displayName: string
  isValid: boolean
} | null

const initialState = {
  // user: {} satisfies User as User, // Error!
  user: null satisfies User as User,
  isLoggedIn: false
}

export const useUserStore = create(
  combine(initialState, set => ({
    actions: {
      login: () => {
        set({
          user: {
            email: 'thesecon@gmail.com',
            displayName: 'HEROPY',
            isValid: true,
            phone: 12345678 // Error!
          }
        })
      }
    }
  }))
)
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
import { create } from 'zustand'
import {
  combine,
  subscribeWithSelector,
  persist,
  devtools
} from 'zustand/middleware'
import { immer } from 'zustand/middleware/immer'

const initialState = {
  count: 1,
  double: 2
}
export const useCountStore = create(
  devtools(
    persist(
      subscribeWithSelector(
        immer(
          combine(initialState, set => ({
            increase: () =>
              set(state => {
                state.count += 1
              }),
            decrease: () =>
              set(state => {
                state.count -= 1
              })
          }))
        )
      ),
      { name: 'countStore' }
    )
  )
)
```

---

**참고 자료**

- HEROPY DEV 님의 Zustand 핵심 정리: https://www.heropy.dev/p/n74Tgc
- Zustand 공식 문서: https://zustand.docs.pmnd.rs/getting-started/introduction
