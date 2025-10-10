# Modern JavaScript - 7장. 연산자

### 연산자 우선순위

| 우선순위 | 연산자                                                                              |
| -------- | ----------------------------------------------------------------------------------- |
| 1        | ()                                                                                  |
| 2        | new(매개변수 존재), ., \[\](프로퍼티 접근), ()(함수 호출), ?.(옵셔널 체이닝 연산자) |
| 3        | new(매개변수 미존재)                                                                |
| 4        | x++, x--                                                                            |
| 5        | !x, +x, -x, ++x, --x, typeof, delete                                                |
| 6        | \*\*(이항 연산자 중 우선순위 가장 높음)                                             |
| 7        | \*, /, %                                                                            |
| 8        | +, -                                                                                |
| 9        | <, <=, >, >=, in, instanseof                                                        |
| 10       | \==, !=, =\==, !==                                                                  |
| 11       | ??(null 병합 연산자)                                                                |
| 12       | &&                                                                                  |
| 13       | \|\|                                                                                |
| 14       | ? ... : ... (삼항 연산자)                                                           |
| 15       | 할당 연산자(=, +=, -=, ...)                                                         |
| 16       | ,                                                                                   |

### 연산자 결합 순서

| 결합 순서  | 연산자                                                                                                  |
| ---------- | ------------------------------------------------------------------------------------------------------- |
| 좌항->우항 | +, -, /, %, <, <=, >, >=, &&, \|\|, ., \[\], (), ??, ?., in, instanceof                                 |
| 우항->좌항 | ++, --, 할당연산자(=, +=, -=, ...), !x, +x, -x, ++x, --x, typeof, delete, 삼항연산자(? ... : ...), \*\* |

### 동등 비교 연산자

- 암묵적 타입 변환으로 타입이 일치시킨 후 같은 값인지 비교
- 해당 연산자는 결과를 예측하기 어렵고 실수하기 쉬움

```javascript
5 == 5; // true
5 == "5"; // true
// 타입은 다르지만 암묵적 타입 변환을 통해 타입을 일치시키면 동등

"0" == ""; // false
0 == ""; // true
0 == "0"; // true
false == "false"; // false
false == "0"; // true
false == null; // false
false == undefined; // false
```

### 일치 비교 연산자

- 암묵적 타입 변환을 하지 않음
- 엄격한 비교 작업을 시행
- 덕분에 실행 결과를 쉽게 예측할 수 있고 더 좋은 코드를 작성할 수 있음

```javascript
5 == 5; // true
5 == "5"; // false
// 타입은 다르기 때문에 false

"0" == ""; // false
0 == ""; // false
0 == "0"; // false
false == "false"; // false
false == "0"; // false
false == null; // false
false == undefined; // false
```

- NaN과의 비교는 false

```javascript
NaN === NaN; // false
```

### Object.is() 메서드

- 일치 비교 연산자와 비슷한 동작
- 아래 Case만 차이를 보임

```javascript
-0 === +0; // true
Object.is(-0, +0); // false

NaN === NaN; // false
Object.is(NaN, NaN); // true
```

### typeof 연산자

- 피연산자의 데이터 타입을 문자열로 반환
- "string", "number", "boolean", "undefined", "symbol", "object", "function" 중 하나 반환
- null에 대한 연산 결과는 "object"

### 지수 연산자(\*\*)

- 좌항의 피연산자: 밑(base), 우항의 피연산자: 지수(exponent)
- 예를 들어서 2 \*\* 3은 2의 세제곱과 동일
- Math.pow() 메서드와 같은 결과를 반환
- 지수 연산자가 가독성이 좋음
- 주의점은 해당 연산자는 우결합성을 가짐

```javascript
2 ** (3 ** 2);
2 ** (3 ** 2);
Math.pow(2, Math.pow(3, 2));
```

- 밑, 혹은 지수가 음수이면 괄호로 묶어서 계산

```javascript
-5 ** 2;
// SyntaxError: Unary operator used immediately before exponentiation expression.
// Parenthesis must be used to disambiguate operator precedence

(-5) ** 2;  // 25
```
