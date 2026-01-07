# Modern JavaScript - 10장. 객체 리터럴

### 객체 설명

- 변경 가능한 값
- 객체를 저장한 식별자는 객체 리터럴 자체를 저장하지 않고 객체 리터럴이 저장된 메모리 주소 값을 저장
- 객체는 0개 이상의 프로퍼티의 집합이며, 프로퍼티는 키(Key)와 값(Value)으로 구성

  ```javascript
  var person = {
    name: "Lee", // "name: 'Lee'" 자체를 하나의 프로퍼티
    // name -> Key, 'Lee' -> Value
    age: 20,
  };
  ```

- 함수도 프로퍼티 값으로 사용될 수 있고, 프로퍼티 값이 함수일 때 일반 함수와 구분하기 위해 메서드라 부름

  ```javascript
  var counter = {
    num: 0, // 프로퍼티
    increase: function () {
      // 메서드. 메서드도 프로퍼티이지만 일반 함수와 구분하기 위함
      this.num++;
    },
  };
  ```

### 프로퍼티(Property)

- 객체의 상태를 나타내는 **값(data)**
- 객체를 구성하는 단위
- 키, 값
  - 키(Key)
    - 프로퍼티 값에 접근할 수 있는 식별자
    - 빈 문자열을 포함한 문자열 혹은 Symbol
    - 네이밍 규칙(주로 카멜 케이스)으로 이름 짓는 것을 선호(예시: propertyName, orangeTree, ...)
    - 따옴표를 묶어서 키를 등록할 수 있으나 큰 프로그램을 구현할 때 기억하기 힘듬(예시: "last-name", "phone-number")
    - 예약어 사용 가능(이런 짓 ❌)
  - 값(Value)
    - 키에 대응되는 실질적인 값
    - 모든 타입 가능
- 2개 이상의 프로퍼티는 쉼표(,)로 구분
- 프로퍼티 중복 선언하면 먼저 선언한 프로퍼티 값 덮어 씌워짐

  ```javascript
  var foo = {
    name: "Lee",
    name: "Kim",
  };

  console.log(foo); // {name: "Kim"}
  ```

### 메서드(method)

- 프로퍼티(상태 데이터)를 참조하고 조작할 수 있는 **동작(behavior)**
- 프로퍼티의 값이 함수일 때, 해당 프로퍼티를 메서드라 부름
- 자바스크립트의 함수는 일급 객체이기 때문에 프로퍼티의 값으로 등록 가능

### 프로퍼티 생성 방식

**정적 생성**

- 객체 리터럴 중괄호 안에 미리 프로퍼티 선언

  ```javascript
  var person = {
    firstName: "Ung-mo", // 식별자 네이밍 규칙 준수
    "last-name": "Lee", // 식별자 네이밍 규칙 미준수
  };

  console.log(person); // {firstName: "Ung-mo", last-name: "Lee"}
  ```

**동적 생성**

- 대괄호를 이용해서 프로퍼티 생성

  ```javascript
  var obj = {};
  var key = "hello";

  obj[key] = "world";
  console.log(obj); // {hello: "world"}
  ```

### 프로퍼티 축약 표현

- 선언된 변수를 어떤 객체의 프로퍼티로 등록하고 싶다면 키-값 구분 없이 변수명만 등록 가능

```javascript
var x = 1, y = 2;

var obj = {          // ES5
  x: x,
  y: y,
};

var obj2 = { x, y }; // ES6

console.log(obj);    // {x: 1, y: 2}
console.log(obj2);   // {x: 1, y: 2}
```

### 메서드 축약 표현

- function 키워드 및 ':' 문자를 통한 키-값 구분 필요 없음
- function 키워드 없는 함수 선언문으로 메서드 등록

```javascript
var obj = {
  // ES5
  name: "Lee",
  sayHi: function () {
    console.log("Hi! " + this.name);
  },
};
obj.sayHi();

var obj2 = {
  // ES6
  name: "Lee",
  sayHi() {
    console.log("Hi! " + this.name);
  },
};
obj2.sayHi();
```

### 프로퍼티 접근

**마침표 표기법**

- 마침표 프로퍼티 접근 연산자(.) 사용

```javascript
var person = {
  name: "Lee",
};

console.log(person.name);
```

**대괄호 표기법**

- 대괄호 프로퍼티 접근 연산자(\[\]) 사용
- 프로퍼티의 키 입력 시 문자열 타입으로 입력

```javascript
var person = {
  name: "Lee",
};

console.log(person["name"]);
// console.log(person[name]) ❌. name을 식별자로 해석
```

- 등록되지 않은 프로퍼티 접근하면 undefined 반환. ReferenceError 발생 ❌
- 아래 상황 같이 특수 문자가 들어있는 문자열 타입의 키를 가진 프로퍼티에 접근한다면 대괄호 표기법으로 반드시 접근
- 프로퍼티의 키가 숫자 타입이면 평가 과정에서 문자열로 암묵적 타입 변환

```javascript
var person = {
	'last-name': 'Lee',
	1: 10
};

person.'last-name';   // SyntaxError: Unexprected string
person.last-name;     // 브라우저 환경: NaN
                      // Node.js 환경: ReferenceError: name is not defined
person[last-name];    // ReferenceError: last is not defined
person["last-name"];  // Lee

person.1              // SyntaxError: Unexpected number
person.'1';           // SyntaxError: Unexpected string
person[1];            // 10 : person[1] -> person['1']
person['1'];          // 10
```

### 프로퍼티 갱신

```javascript
var person = {
	name: 'Lee'
};

person.age = 20;
console.log(person). // {name: "Lee", age: 20}
```

### 프로퍼티 삭제

- delete 연산자 사용으로 프로퍼티 삭제
- 특정 객체에 등록된 프로퍼티의 키를 지정하면 삭제 가능
- 존재하지 않는 프로퍼티를 삭제하면 아무런 에러 없이 무시

```javascript
var person = {
  name: "Lee",
};

person.age = 20;
delete person.name; // person 객체의 name 프로퍼티 삭제
delete person.address; // address 프로퍼티 없음. Error ❌

console.log(person); // {age: 20}
```

### JavaScript의 객체 생성 방식

**클래스 기반 객체지향 언어(C++, 자바)**

- 클래스를 사전에 정의
- 필요한 시점에 new 연산자와 함께 생성자 호출로 인스턴스 생성

**프로토타입 기반 객체지향 언어(JavaScript, TypeScript)**

- 아래 객체 생성 방법을 지원
  - 객체 리터럴
  - Object 생성자 함수
  - 생성자 함수
  - Object.create 메서드
  - 클래스(ES6)

### 객체 리터럴

- 객체 리터럴은 객체를 생성하기 위한 표기법

```javascript
var person = {
  name: "Lee",
  sayHello: function () {
    console.log(`Hello: My Name is ${this.name}.`);
  },
};

console.log(typeof person);
console.log(person);
```

- 객체 리터럴의 중괄호는 코드 블록 ❌
- 클래스 정의 및 new 연산자 사용 필요 없음
