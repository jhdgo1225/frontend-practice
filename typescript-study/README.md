### 타입스크립트 특징

    - 타입 지정 및 추론
    - 타입 안정성
    - 컴파일 타임에서 타입 에러 발생
    - 컴파일 완료 시 자바스크립트 코드로 변환

### 기본 데이터 타입

    - string
    - number
    - boolean
    - undefined
    - null

### 암시적 타입

### 선택적 타입

### Alias 타입 생성

### 함수 argument 타입, return 타입 명시

### readonly

### Tuple

- 예시

```typescript
const player: readonly [string, number, boolean] = ["nico", 1, true];
```

### 특수 타입('특수' 워딩은 스스로가 지칭한 것. 공식 용어 ❌)

- any: 여러 타입 수용. 좋은 방안은 아님
- unknown: 여러 타입 수용. any는 타입 에러를 무시하고 any 타입의 변수에서 접근가능한 프로퍼티를 이용할 수 있음. 그러나 unknown은 그런 동작을 하지 못하도록 방지한다.
- never: 일부 함수는 값을 반환하지 않는다. 이는 함수가 예외를 throw 하거나 프로그램 실행을 종료함을 의미한다.

### 함수 call signature

```typescript
type Add = (a: number, b: number) => number;

const add: Add = (a, b) => a + b;
```

### overloading: 하나의 함수에 복수의 Call signature를 가질 수 있는 성질

```typescript
type Add = {
  (a: number, b: number): number;
  (a: number, b: string): number;
};

const add: Add = (a, b) => {
  if (typeof b === "string") return a;
  return a + b;
};

type Config = {
  path: string;
  state: object;
};

type Push = {
  (path: string): void;
  (config: Config): void;
};

const push: Push = (config) => {
  if (typeof config === "string") {
    console.log(config);
  } else {
    console.log(config.path, config.state);
  }
};

type Add = {
  (a: number, b: number): number;
  (a: number, b: number, c: number): number;
};

const add: Add = (a, b, c?: number) => {
  if (c) return a + b + c;
  return a + b;
};
```

### 다형성(polymorphism), 제네릭(generic)

```typescript
/* type SuperPrint = {
	(arr: number[]): void
	(arr: boolean[]): void
	(arr: string[]): void
	(arr: (number|boolean)[]): void
} */

type SuperPrint = {
  <T>(arr: T[]): T;
};

const superPrint: SuperPrint = (arr) => {
  arr.forEach((i) => console.log(i));
};

superPrint([1, 2, 3, 4]);
superPrint([true, false, true]);
superPrint(["a", "b", "c"]);
superPrint([1, 2, true, false]);
```

### 클래스

```typescript
class Player {
  constructor(
    private firstName: string,
    private lastName: string,
    public nickname: string
  ) {}
}

const nico = new Player("nico", "las", "니꼬");

nico.firstName;
nico.nickname;
```

### 추상 클래스: 기능 확장에 중심을 둔 클래스. 구체 클래스 생성용. 해당 클래스로 인스턴스 생성 불가능

### 추상 메소드: 추상 클래스를 상속받는 클래스에서 반드시 구현해야 하는 메소드

```typescript
abstract class User {
  constructor(
    private firstName: string,
    private lastName: string,
    public nickname: string
  ) {}

  abstract getNickName(): void;

  getFullName() {
    return `${this.firstName} ${this.lastName}`;
  }
}

class Player extends User {
  getNickName() {
    console.log(this.nickname);
  }
}

const nico = new Player("nico", "las", "니꼬");
```

### type 키워드 활용 추가 설명

```typescript
type Team = "red" | "blue" | "yellow";
type Health = 1 | 5 | 10;

type Player = {
  nickname: string;
  team: Team;
  health: Health;
};

const nico: Player = {
  nickname: "pico",
  team: "pink",
  health: 5,
};
```

### interface

- object 모양을 특정해주기 위한 키워드. 상속 제공(extends)
- property 축적 가능

```typescript
type Team = "red" | "blue" | "yellow";
type Health = 1 | 5 | 10;

interface Player {
  nickname: string;
  team: Team;
  health: Health;
}

const nico: Player = {
  nickname: "pico",
  team: "pink",
  health: 5,
};
```

### implements

- 클래스가 특정 인터페이스를 충족하는지 확인
- 클래스를 올바르게 구현하지 못하면 오류가 발생
- 인터페이스 유형으로 처리될 수 있는지 확인
- 클래스의 유형이나 메서드는 전혀 변경하지 않음
- 클래스는 여러 인터페이스를 구현 (예시: **class A implements B, C, D**)

```typescript
interface User {
  firstName: string;
  lastName: string;
  sayHi(name: string): string;
  fullName(): string;
}

interface Human {
  health: number;
}

class Player implements User {
  constructor(
    public firstName: string,
    public lastName: string,
    public health: number
  ) {}

  fullName() {
    return `${this.firstName} ${this.lastName}`;
  }

  sayHi(name: string) {
    return `Hello ${name}. My name is ${this.fullName()}`;
  }
}
```

### 다형성, 제네릭, 클래스, 인터페이스 전체 활용 예시

```typescript
interface SStorage<T> {
  [key: string]: T;
}

class LocalStorage<T> {
  private storage: SStorage<T> = {};
  set(key: string, value: T) {
    this.storage[key] = value;
  }
  remove(key: string) {}
  get(key: string): T {
    return this.storage[key];
  }
  clear() {
    this.storage = {};
  }
}

const stringsStorage = new LocalStorage<string>();

stringsStorage.get("ket");
stringsStorage.set("hello", "how are you");

const booleansStorage = new LocalStorage<boolean>();

booleansStorage.get("xxx");
booleansStorage.set("hello", true);
```

### 타입스크립트 환경설정

1. NodeJS 및 타입스크립트 환경 설정

```shell
npm init -y
npm i -D typescript
```

2. tsconfig.json 생성

3. tsconfig.json 내용 작성

```json
{
  "include": ["src"],
  "compilerOptions": {
    "outDir": "build",
    "target": "es6",
    "lib": ["ES6", "DOM"]
  }
}
```

- include: 컴파일 대상이 되는 파일, 혹은 디렉토리
- outDir: build된 파일들이 보관되는 디렉토리
- target: build 후 생성된 JavaScript 파일의 ECMAScript 버전
- lib: 타입스크립트에게 어떤 API를 사용하고 어떤 환경에서 코드를 실행하는 지를 지정. target 런타임 환경이 무엇인지를 지정한다. 프로그램이 브라우저에서 실행되면 lib에 "DOM" 유형을 정의할 수 있다.

### 타입스크립트 build

- "tsc" 명령어 실행
- 명령어 실행 후 디폴트로 특정 타입스크립트 파일이 위치한 경로에 자바스크립트 파일 생성
- tsconfig.json 파일로 컴파일 대상이 되는 경로, 빌드 폴더(outDir), ES 버전 등을 설정할 수 있다.
- tsconfig.json에서 lib 옵션은 타입스크립트에게 어떤 API를 사용하고 어떤 환경에서 코드를 실행하는 지를 정의

### .d.ts

- 정의 파일
- 자바스크립트 코드의 모양을 타입스크립트에 설명해주는 파일
- 예시(typescript: myPackage.d.ts, javascript: myPackage.js)
```typescript
interface Config {
  url: string;
}

declare module "myPackage" {
  function init(config: Config): boolean;
  function exit(code: number): number;
}
```

```javascript
export function init(config) {
  return true;
}

export function exit(code) {
  return code + 1;
} 
```

### JSDoc

- 타입스크립트에서 자바스크립트 코드 설명을 읽을 수 있도록 표현된 주석
- 자바스크립트 파일에서 첫 줄에 // @ts-check 이후 작성 가능하다

### DefinitelyTyped

- TypeScript type 정의를 위한 리포지토리: https://github.com/DefinitelyTyped/DefinitelyTyped
- @types/node 패키지 설치: npm i @types/node -D
