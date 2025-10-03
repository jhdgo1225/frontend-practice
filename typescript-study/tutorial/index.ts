/**
 * #2.0 How Typescript works
 */

// 서로 다른 타입 간의 결합 시도
// 에러 메시지: '+' 연산자를 'number[]' 및 'number' 형식에 적용할 수 없습니다.
// error TS2365: Operator '+' cannot be applied to types 'number[]' and 'number'.
[1, 2, 3, 4] + 5;

// 타입 인수 개수 에러 발생
function divide(a, b) {
  return a / b;
}
// 2개의 인수가 필요한데 1개를 가져왔습니다.ts(2554)
// index.ts(11, 20): 'b'의 인수가 제공되지 않았습니다.
divide("hello");

// number 타입의 프로퍼티에 boolean 타입값 할당 시도
const player = {
  age: 12,
};
player.age = false;

// ----------------------------------------------------

/**
 * #2.1 Implicit Types vs Explicit Types
 */

// 암시적 타입
let a = "hello"; // 타입 추론 -> let a: string
a = "bye";
a = 1; // 'number' 형식은 'string' 형식에 할당할 수 없습니다. ts(2322)

let c = [1, 2, 3];
c.push("4"); // 'string' 형식의 인수는 'number' 형식의 매개 변수에 할당될 수 없습니다.ts(2345)

// 명시적 타입
let b: boolean = "x"; // 'string' 형식은 'boolean' 형식에 할당할 수 없습니다.ts(2322)

// ----------------------------------------------------

/**
 * #2.2 Types of TS part One
 */

let a1: number[] = [1, 2];
let b1: string[] = ["i1", "1"];
let c1: boolean[] = [true];

// 선택적 타입
const player2: {
  name: string;
  age?: number;
} = {
  name: "jongho",
  // (property) age?: number | undefined
};

// 'player2.age'은(는) 'undefined'일 수 있습니다.
// player2 && player2.age 라는 조건식으로 대체하면 해결
if (player2.age < 10) {
}

// type 예약어: 사용자 정의 타입. 타입 재사용. alias
type Age = number;
type Name = string;
type Player = {
  name: Name;
  age?: Age;
};

const mary: Player = {
  name: "mary",
};

const gold: Player = {
  name: "gold",
  age: 20,
};

// 함수의 매개변수와 반환값 타입 지정

// 1. 함수 표기법
// function playerMaker(name: string): Player {
// 	return {
// 		name
// 	}
// }

// 2. 화살표 함수
const playerMaker = (name: string): Player => ({ name });

// ----------------------------------------------------

/**
 * #2.3 Types of TS part Two
 */

// readonly: 읽기 전용 변수로 지정. 불변성(immutability)을 보장
const names: readonly string[] = ["1", "2"];
names.push("3"); // 에러

// tuple: 정해진 개수와 순서에 따라 배열 선언
const info: [string, number, boolean] = ["jongho", 12, true];
info[0] = 12; // 'number' 형식은 'string' 형식에 할당할 수 없습니다.ts(2322)
info[0] = "ohgnoj";

// undefined: 선언도 할당도 안 됨, null: 아무 값도 없는 상태
// any: 여러 타입값으로 변경할 수 있음을 명시.(타입스크립트의 타입 에러를 우회하며 절대 권장하지 않음)

const nullnull: null = null;
const undef: undefined = undefined;

const a2: any[] = [1, 2, 3, 4];
const b2: any = true;
console.log(a + b);

// ----------------------------------------------------

/**
 * #2.4 Types of TS part Three
 */

// unknown: any와 같이 여러 타입값을 받을 수 있지만, 타입 검사도 정상적으로 받을 수 있다.
let a3: unknown;
let b3 = a3 + 4;

if (typeof a3 === "number") {
  let b = a3 + 1;
}

if (typeof a3 === "string") {
  let b = a3.toUpperCase();
}

function hello() {
  console.log("x");
}

// void: 아무 것도 반환하지 않음을 나타낸다.
// 반환값이 없는 함수라는 것을 추론 -> function voidfunc(): void
function voidfunc() {
  console.log("void");
}

// never: return값을 발생시키지 않는 타입. 주로 예외를 throw하거나 프로그램 종료를 명시할 때 사용
// | : or(|). 타입을 여러 개 받음을 명시하는 연산자
function hello(name: string | number) {
  if (typeof name === "string") {
    // (parameter) name: string | number
    name;
  } else if (typeof name === "number") {
    // (parameter) name: number
    name;
  } else {
    // (parameter) name: never
    name;
  }
}

// ----------------------------------------------------

/**
 * #3.0 Call Signatures
 */

//'a' 매개 변수에는 암시적으로 'any' 형식이 포함됩니다.ts(7006)
// (parameter) a: any
function add(a, b) {
  return a + b;
}

// 함수의 매개변수, 반환값 타입 정의 -> Call Signatures
type Add = (a: number, b: number) => number;

// function(a: number, b: number): number
const add1: Add = (a, b) => a + b;
// '(a: number, b: number) => void' 형식은 'Add' 형식에 할당할 수 없습니다.
// 'void' 형식은 'number' 형식에 할당할 수 없습니다.ts(2322)
const add2: Add = (a, b) => {
  a + b;
};

// ----------------------------------------------------

/**
 * #3.1 Overloading
 */

// Overloading: 다양한 매개변수 타입, 개수를 정의할 수 있도록 지원하는 함수 다형성 문법
// 복수의 Call Signature를 가지도록 한다.
type AddOverload = {
  (a: number, b: number): number;
  (a: number, b: number, c: number): number;
};

const add3: AddOverload = (a, b) => {
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
  if (typeof config === "string") console.log(config);
  else console.log(config.path, config.state);
};

const add4: AddOverload = (a, b, c?: number) => {
  if (c) return a + b + c;
  return a + b;
};

console.log(add4(1, 2));
console.log(add4(1, 2, 3));

// ----------------------------------------------------

/**
 * #3.2 Polymorphism
 */

// 아래 방식은 다른 타입의 인수를 전달받고 싶을 때 매번 새로운 함수 타입 정의를 추가해야 한다.
// 굉장히 번거로운 작업이다.
type SuperPrint = {
  (arr: number[]): void;
  (arr: boolean[]): void;
  (arr: string[]): void;
};

const superPrint: SuperPrint = (arr) => {
  arr.forEach((i) => console.log(i));
};

superPrint([1, 2, 3, 4]);
superPrint([true, false, true]);
superPrint(["a", "b", "c"]);

//  이 호출과 일치하는 오버로드가 없습니다.
//  오버로드 2/3('(arr: boolean[]): void')에서 다음 오류가 발생했습니다.
//    'number' 형식은 'boolean' 형식에 할당할 수 없습니다.
//  오버로드 2/3('(arr: boolean[]): void')에서 다음 오류가 발생했습니다.
//    'number' 형식은 'boolean' 형식에 할당할 수 없습니다.ts(2769)
superPrint([1, 2, true, false]);

// 제네릭: 여러 타입을 받을 수 있도록 지원하는 문법
// 데이터 타입에 의존하지 않는 특성을 가져 재사용성이 우수함
// 제네릭 프로그래밍이라는 프로그래밍 페러다임이 존재한다.
// C++ 언어에서는 템플릿 메타 프로그래밍이라고 부른다.

// 1. Call Signature
type GenericSuperPrint = {
  <T>(arr: T[]): void;
};

const genericSuperPrint: GenericSuperPrint = (arr) => arr[0];

const firstElem = genericSuperPrint([1, 2, 3, 4]);
const secondElem = genericSuperPrint([true, false, true]);
const thirdElem = genericSuperPrint(["a", "b", "c"]);
const fourthElem = genericSuperPrint([1, 2, true, false, "hello"]);

// 2. No Call Signature
function simpleSuperPrint<T>(a: T[]) {
	return a[0];
}

const a4 = simpleSuperPrint([1, 2, 3, 4]);
const b4 = simpleSuperPrint([true, false, true]);
const c4 = simpleSuperPrint(["a", "b", "c"]);
const d4 = simpleSuperPrint([1, 2, true, false, "hello"]);

// 3. type generic
type GPlayer<E> = {
  name: string;
  extraInfo: E;
};

type Extra = {
  favFood: string;
};

type PlayerWithE = GPlayer<Extra>;

const gPlayer: PlayerWithE = {
  name: "jongho",
  extraInfo: {
    favFood: "apple",
  },
};

// 제네릭에 대한 추가 지식
/*
	1. T의 의미
	T는 "Type"의 약자로, 제네릭 타입 변수로 자주 사용됩니다.
	제네릭 함수, 인터페이스, 클래스 등에서 특정 타입을 나타낼 때 사용되며, 단일 타입을 나타낼 때 주로 사용합니다.

	2. V의 의미
	V는 "Value"의 약자로, 제네릭 타입이 두 개 이상일 때 보조적으로 사용됩니다.
	다른 타입과 구별하기 위해 두 번째, 세 번째 타입 변수로 자주 사용됩니다.

	3. 관례적인 이름들
	제네릭 타입 변수의 이름은 자유롭게 지정할 수 있지만, 가독성을 위해 자주 사용하는 약어가 있습니다:

	이름 | 의미 | 용례
	T | Type (단일 타입) | 일반적인 제네릭 타입 변수에 사용
	K | Key | 객체의 키 타입을 나타낼 때 사용
	V | Value | 객체의 값 타입을 나타낼 때 사용
	E | Element | 배열이나 컬렉션의 요소 타입을 나타낼 때 사용
*/