# Modern JavaScript - 6장. 데이터 타입

### 데이터 타입

- 값의 종류
- 원시 타입 -> 변할 수 없는 값, 객체 타입 -> 변할 수 있는 값
- 데이터 타입 별 메모리 공간의 확보와 참조는 숫자, 문자열 이외에는 자바스크립트 엔진 제조사 별로 다름

| 구분    | 데이터 타입          | 설명                                                                                                                 |
| ----- | --------------- | ------------------------------------------------------------------------------------------------------------------ |
| 원시 타입 | 숫자(number) 타입   | 숫자. 정수, 실수 구분 ❌<br>배정밀도 64비트 부동소수점 형식 사용. 8바이트<br>Infinity(양의 무한대), -Infinity(음의 무한대), NaN(산술 연산 불가, Not-a-Number) |
|       | 문자열(string) 타입  | 문자열                                                                                                                |
|       | 불리언(boolean) 타입 | 논리적 참(true), 거짓(false)                                                                                             |
|       | undefined 타입    | var 키워드로 선언된 변수에 암묵적으로 할당되는 값                                                                                      |
|       | null 타입         | 값이 없음을 의도적으로 명시할 때 사용하는 값                                                                                          |
|       | 심벌(symbol) 타입   | ES6에서 추가된 7번째 타입                                                                                                   |
| 객체 타입 |                 | 객체, 함수, 배열 등                                                                                                       |

### 데이터 타입의 필요성

- 값을 저장할 때 확보해야 하는 메모리 공간의 크기를 결정
- 값을 참조할 때 한 번에 읽어 들여야 할 메모리 공간의 크기를 결정
- 메모리에서 읽어 들인 2진수를 어떻게 해석할 지 결정

### 동적 타입 언어

- C언어와 같은 컴파일러 언어는 정적 타입 언어
- 정적 타입 언어는 컴파일 시점에서 변수와 그 변수에 할당을 시도한 값에 대한 타입을 체크함
- 자바스크립트는 동적 타입 언어
- 런타임 시점에서 선언된 변수에 여러 타입의 값을 할당 및 재할당할 수 있고, 할당 작업 이후의 변수는 해당 값의 타입을 가짐

```javascript
var foo;
console.log(typeof foo);  // undefined

foo = 3;
console.log(typeof foo);  // number

foo = 'Hello';
console.log(typeof foo);  // string

foo = true;
console.log(typeof foo);  // boolean

foo = null;
console.log(typeof foo);  // object

foo = Symbol();
console.log(typeof foo);  // symbol
```

### 동적 타입 언어 사용의 주의점

- 변수는 꼭 필요한 경우에 한해 제한적으로 사용
- 변수의 유효 범위를 최대한 좁게 만들어 변수의 부작용 억제
- 전역 변수 최대한 사용 금지
- 변수보다 상수를 사용해 값의 변경을 억제
- 목적과 의미를 가지는 이름으로 네이밍

### 템플릿 리터럴

- ES6부터 도입
- 멀티라인 문자열, 표현식 삽입, 태그드 템플릿 등 편리한 문자열 처리 기능 제공
- 런타임에 일반 문자열로 변환되어 처리
- 템플릿 리터럴은 벡틱 문자(\` \`)를 사용해 표현

```javascript
var template = `Template literal`;
console.log(template);
```

**1. 멀티라인 문자열**
- 일반 문자열 내에서 줄바꿈(개행)이 허용되지 않음
- 따라서 일반 문자열 내에서 백슬래시로(\\)로 시작하는 이스케이프 시퀀스를 사용

| 이스케이프 시퀀스 | 의미                                   |
| --------- | ------------------------------------ |
| \0        | Null                                 |
| \b        | 백스페이스                                |
| \f        | 폼 피드. 프린터로 출력할 경우 다음 페이지의 시작 지점으로 이동 |
| \n        | LF(Line Feed). 다음 행으로 이동             |
| \r        | CR(Carriage Return). 커서를 처음으로 이동     |
| \t        | 탭(수평)                                |
| \v        | 탭(수직)                                |
| \uXXXX    | 유니코드                                 |
| \\'       | 작은따옴표                                |
| \\"       | 큰따옴표                                 |
| \\\       | 백슬래시                                 |
- 템플릿 리터럴은 이스케이프 시퀀스를 사용하지 않고도 줄바꿈 허용, 공백도 허용

```javascript
var template = `<ul>
  <li><a href="#">Home</a></li>
</ul>`;

console.log(template);
```

![[스크린샷 2025-01-09 오후 2.44.42.png|350]]

**2. 표현식 삽입**

- 일반 문자열은 + 연산자를 사용해 연결
- 피연산자 중 하나라도 문자열이면 데이터 타입은 문자열이면서 순서에 맞춰 피연산자가 연결됨

```javascript
var first = 'Ung-mo';
var last = 'Lee';

// ES5: 문자열 연결
console.log('My name is ' + first + ' ' + last + '.');
```

- 템플릿 리터럴 내에서는 표현식 삽입을 통해 간단히 문자열 삽입
- ${ }으로 표현식 삽입 가능
- 가독성이 훨씬 더 좋아지고 사용법도 편리함

```javascript
var first = 'Ung-mo';
var last = 'Lee';

console.log(`My name is ${first} ${last}.`);
```

**3. 태그드 템플릿**

- 태그를 사용하면 템플릿 리터럴을 함수로 파싱
- 태그 함수의 첫 번째 인수는 문자열 값의 배열을 포함하고, 나머지 인수는 표현식과 관련

```javascript
var person = "Mike";
var age = 28;

function myTag(strings, personExp, ageExp) {
	var str0 = strings[0]; // "that "
	var str1 = strings[1]; // " is a "
	
	// 사실 이 예제의 string에서 표현식이 두 개 삽입되었으므로
	// ${age} 뒤에는 ''인 string이 존재하여
	// 기술적으로 strings 배열의 크기는 3이 됩니다.
	// 하지만 빈 string이므로 무시하겠습니다.
	// var str2 = strings[2];
	
	var ageStr;
	if (ageExp > 99) {
		ageStr = "centenarian";
	} else {
		ageStr = "youngster";
	}
	
	// 심지어 이 함수내에서도 template literal을 반환할 수 있습니다.
	return str0 + personExp + str1 + ageStr;
}

var output = myTag`that ${person} is a ${age}`;
console.log(output);
// that Mike is a youngster
```

- 태그드 템플릿으로 만든 함수를 호출할 때 인수 순서가 태그드 템플릿의 표현식 삽입값과 대응된다.

```javascript
function template(strings, ...keys) {
  return function (...values) {
    var dict = values[values.length - 1] || {};
    var result = [strings[0]];
    keys.forEach(function (key, i) {
      var value = Number.isInteger(key) ? values[key] : dict[key];
      result.push(value, strings[i + 1]);
    });
    return result.join("");
  };
}

var t1Closure = template`${0}${1}${0}!`;
t1Closure("Y", "A"); // "YAY!"
var t2Closure = template`${0} ${"foo"} ${"hh"}!`;
t2Closure("Hello", { foo: "World", hh: "hihi" }); // "Hello World!"
```

---
**참고 자료**

mdn web docs: https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Template_literals
