# Modern JavaScript - 17장. 생성자 함수에 의한 객체 생성

### 생성자 함수 설명

- 객체 생성 방식 중 하나
- new 연산자를 이용하여 객체를 생성할 수 있는 함수
- 생성자 함수를 통해 생성된 객체를 인스턴스라고 한다.

### Object 생성자 함수

#### new object()

- 빈 객체를 생성

```javascript
const person = new Object();

person.name = "Lee";
person.sayHello = function () {
  console.log("Hi! My name is " + this.name);
};

console.log(person);
person.sayHello();
```

#### 빌트인(built-in) 생성자 함수

1. String

```javascript
const strObj = new String("Lee");
console.log(typeof strObj);
console.log(strObj);
```

2. Number

```javascript
const numObj = new Number(123);
console.log(typeof numObj);
console.log(numObj);
```

3. Boolean

```javascript
const boolObj = new Boolean(true);
console.log(typeof boolObj);
console.log(boolObj);
```

4. Function

```javascript
const func = new Function("x", "return x * x");
console.log(typeof func);
console.log(func);
```

5. Array

```javascript
const arr = new Array(1, 2, 3);
console.log(typeof arr);
console.log(arr);
```

6. RegExp

```javascript
const regExp = new RegExp(/ab+c/i);
console.log(typeof regExp);
console.log(regExp);
```

7. Date

```javascript
const date = new Date();
console.log(typeof date);
console.log(date);
```

### 객체 리터럴에 의한 객체 생성 방식의 문제점

- 동일한 프로퍼티를 갖는 객체를 여러 개 생성해야 하는 경우 매번 같은 프로퍼티를 기술해야 하기 때문에 비효율적이다.

```javascript
// circle1, clrcle2라는 객체 타입 변수의 프로퍼티 구성이 동일하다.
// 같은 프로퍼티의 객체를 일일이 기술하는 것이 비효율적이다.
const circle1 = {
  radius: 5,
  getDiameter() {
    return 2 * this.radius;
  },
};

console.log(circle1.getDiameter());

const circle2 = {
  radius: 10,
  getDiameter() {
    return 2 * this.radius;
  },
};

console.log(circle2.getDiameter());
```

### 생성자 함수에 의한 객체 생성 방식의 장점

- 객체를 생성하기 위한 템플릿처럼 생성자 함수를 사용하여 프로퍼티 구조가 동일한 객체 여러 개를 간편하게 생성할 수 있다.

```javascript
function Circle(radius) {
  this.radius = radius;
  this.getDiameter = function () {
    return 2 * this.radius;
  };
}

const circle1 = new Circle(5);
const circle2 = new Circle(10);

console.log(circle1.getDiameter());
console.log(circle2.getDiameter());
```

### 생성자 함수 인스턴스 생성 과정

### 인스턴스 생성 과정

1. 인스턴스 생성과 this 바인딩

   - 생성자 함수가 암묵적으로 빈 객체 생성. 이 빈 객체는 생성자 함수가 생성한 인스턴스다.
   - 인스턴스는 this에 바인딩된다. 해당 처리는 함수 몸체의 코드가 한 줄씩 실행되는 런타임 이전에 한다.
   - 이로써 생성자 함수 내부의 this가 생성자 함수가 생성할 인스턴스를 가리킴

   ```javascript
   function Circle(radius) {
     this.radius = radius;
     this.getDiameter = function () {
       return 2 * this.radius;
     };
   }
   ```

   **❓this 바인딩**

   > 식별자와 값을 연결하는 과정.
   > 예를 들어, 변수 선언은 변수 이름과 확보된 메모리 공간의 주소를 바인딩하는 것이다.
   > this 바인딩은 this(키워드로 분류되지만 식별자 역할을 한다.)와 this가 가리킬 객체를 바인딩하는 것이다.

2. 인스턴스 초기화

   - 생성자 함수에 기술되어 있는 코드를 한 줄씩 실행하여 this에 바인딩되어 있는 인스턴스를 초기화
   - 즉, this에 바인딩되어 있는 인스턴스에 프로퍼티나 메서드를 추가하고 생성자 함수가 인수로 전달받은 초기값을 인스턴스 프로퍼티에 할당하여 초기화하거나 고정값 할당

3. 인스턴스 반환

   - 생성자 함수 내부의 모든 처리가 끝나면 완성된 인스턴스가 바인딩된 this가 암묵적으로 반환된다.

   ```javascript
   function Circle(radius) {
     // 1. 암묵적으로 빈 객체가 생성되고 this에 바인딩

     // 2. this에 바인딩되어 있는 인스턴스를 초기화
     this.radius = radius;
     this.getDiameter = function () {
       return 2 * this.radius;
     };

     // 3. 완성된 인스턴스가 바인딩된 this가 암묵적으로 반환됨
   }

   // 인스턴스 생성. Circle 생성자 함수는 암묵적으로 this가 반환함
   const circle = new Circle(1);
   console.log(circle);
   ```

   - 만약 객체를 명시적으로 반환하면 this 대신 해당 객체 반환된다.
   - 그러나 원시 값을 반환하면 원시 값 무시하고 암묵적으로 this가 반환된다.

### 함수 객체와 일반 객체와의 차이점

- 함수도 객체이지만 일반 객체가 가지고 있는 내부 슬롯과 내부 메서드를 모두 가지고 있으면서 함수 객체만 가지고 있는 내부 슬롯(\[\[Environment\]\], \[\[FormalParameters\]\])과 내부 메서드(\[\[Call\]\], \[\[Construct\]\])가 존재함

### \[\[Call\]\], \[\[Construct\]\]

- 함수가 일반 함수로서 호출되면 내부 메서드 \[\[Call\]\]이 호출
- 함수가 생성자 함수로서 호출되면 내부 메서드 \[\[Construct\]\]가 호출

```javascript
function foo() {}

// 일반적인 함수로서 호출: [[Call]]이 호출됨
foo();

// 생성자 함수로서 호출: [[Construct]]가 호출됨
new foo();
```

- callable: 내부 메서드 \[\[Call\]\]을 갖는 함수 객체
- constructor: 내부 메서드 \[\[Construct\]\]를 갖는 함수 객체
- non-constructor: 내부 메서드 \[\[Construct\]\]를 갖고 있지 않는 함수 객체

- 함수 객체는 반드시 callable 해야 하며, 인스턴스를 생성할 수 있거나(constructor), 인스턴스를 생성할 수 없어서 일반 함수로서의 기능만 제공(non-constructor)할 수 있음

### constructor, non-constructor 구분

**constructor**

- 함수 선언문, 함수 표현식, 클래스(클래스도 함수)

**non-constructor**

- 메서드(ES6 메서드 축약 표현)
- 화살표 함수

```javascript
// 일반 함수 정의: 함수 선언문, 함수 표현식
function foo() {}
const bar = function () {};
// 프로퍼티 x의 값으로 할당된 것은 일반 함수로 정의된 함수. 메서드로 인정 ❌
const baz = {
	x: function () {}
};

// 일반 함수로 정의된 함수만이 constructor
new foo();  // foo {}
new bar();  // bar {}
new baz.x();  // x {}

// 화살표 함수 정의
cosnt arrow = () => {};

new arrow();  // TypeError: arrow is not a constructor

// 메서드 정의: ES6의 메서드 축약 표현만 메서드로 인정
cosnt obj = {
	x() {}
};

new obj.x();  // TypeError: obj.x is not a constructor
```

### new 연산자

- new 연산자와 함께 호출하면 내부 메서드 \[\[Construct\]\]가 호출된다.
- 단, new 연산자와 함께 호출하는 함수는 **non-constructor**가 아니라 **constructor** 이어야 한다.

```javascript
function add(x, y) {
  return x + y;
}

let inst = new add();
console.log(inst); // {}

function createUser(name, role) {
  return { name, role };
}

inst = new createUser("Lee", "admin");
console.log(inst); // { name: "Lee", role: "admin" }
```

- 반대로 new 연산자 없이 호출하는 함수는 내부 메서드 \[\[Construct\]\]이 아닌 \[\[Call\]\]이 호출된다.

```javascript
function Circle(radius) {
  this.radius = radius;
  this.getDiameter = function () {
    return 2 * this.radius;
  };
}

const circle = Circle(5);
console.log(circle); // undefined

console.log(radius); // 5
console.log(getDiameter()); // 10

circle.getDiameter();
// TypeError: Cannot read properties of undefined (reading 'getDiameter')
```

- Circle 함수를 new 연산자와 함께 호출 시 함수 내부의 this는 Circle 생성자 함수의 인스턴스를 바인딩한다.
- 그러나 new 연산자와 함께 호출하지 않으면 함수 내부의 this는 전역 객체 window를 가리킨다.
- 위 예제의 Circle 함수 호출은 전역 객체의 프로퍼티와 메서드로 등록한다.
- 일반 함수와 생성자 함수의 특별한 형식적 차이는 없다. 생성자 함수 이름을 파스칼 표기법으로 구분하는 것이 좋다.

### new.target

- new 연산자 없이 생성자 함수 호출은 언제나 발생한다. 해당 방식은 객체 생성이 불가능하다.
- ES6에서 new.target을 통해 이러한 실수를 방지
- new.target은 this와 유사하게 constructor인 모든 함수 내부에서 암묵적인 지역 변수와 같이 사용되며 메타 프로퍼티라 부름
- IE 브라우저에 지원 ❌
- 함수 내부에서 new.target을 사용하면 new 연산자와 함께 생성자 함수로서 호출되었는지 확인
- new 연산자와 함께 생성자 함수로서 호출 -> 함수 내부의 new.target은 함수 자신을 가리킴
- new 연산자 없이 일반 함수로서 호출 -> 함수 내부의 new.target은 undefined

```javascript
// 생성자 함수
function Circle(radius) {
  if (!new.target) {
    return new Circle(radius);
  }
  this.radius = radius;
  this.getDiameter = function () {
    return 2 * this.radius;
  };
}

// new 연산자 없이 생성자 함수를 호출하여도 new.target을 통해 생성자 함수로서 호출됨
const circle = Circle(5);
console.log(circle.getDiameter());
```

- 위와 같이 new 연산자를 사용하지 않고도 생성자 함수로서 동작시키고 싶다면 if (!new.target) {} 예외처리를 하면 된다.

### 스코프 세이프 생성자 패턴(scope-safe constructor)

- IE 브라우저에서 new 연산자 없이 생성자 함수로서 작용하고 싶다면 스코프 세이프 생성자 패턴을 사용

```javascript
// Scope-Safe Constructor Pattern
function Circle(radius) {
  if (!(this instanceof Circle)) {
    return new Circle(radius);
  }

  this.radius = radius;
  this.getDiameter = function () {
    return 2 * this.radius;
  };
}

// new 연산자 없이 생성자 함수를 호출하여도 생성자 함수로서 호출됨
const circle = Circle(5);
console.log(circle.getDiameter());
```

### 빌트인 생성자 함수

- Object, String, Number, Math, Function, Array, Promise 등의 빌트인 생성자 함수는 new 연산자와 함께 호출되었는지를 확인한 후 적절한 값을 반환
- Object, Function 생성자 함수는 new 연산자 없이 호출해도 new 연산자와 함께 호출했을 때와 동일하게 동작

```javascript
let obj = new Object();
console.log(obj); // {}

obj = Object();
console.log(obj); // {}

let f = new Function("x", "return x ** x");
console.log(f); // f anonymous(x) { return x ** x }

f = Function("x", "return x ** x");
console.log(f); // f anonymous(x) { return x ** x }
```

- String, Number, Boolean 생성자 함수는 new 연산자와 함께 호출했을 때 각각에 대한 객체를 반환, 그러나 new 연산자 없이 호출하면 문자열, 숫자, 불리언 값을 반환

```javascript
const strObj = new String(123);
console.log(strObj, typeof strObj); // [String: '123'] object

const numObj = new Number("123");
console.log(numObj, typeof numObj); // [Number: 123] object

const boolObj = new Boolean("true");
console.log(boolObj, typeof boolObj); // [Boolean: true] object

const str = String(123);
console.log(str, typeof str); // 123 string

const num = Number("123");
console.log(num, typeof num); // 123 number

const bool = Boolean("true");
console.log(bool, typeof bool); // true boolean
```
