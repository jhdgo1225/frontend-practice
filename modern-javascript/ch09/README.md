# Modern JavaScript - 9장. 타입 변환과 단축 평가

### 암묵적 타입 변환(implicit coercion)

- 자바스크립트 엔진이 표현식을 평가할 때 코드의 문맥을 고려하여 암묵적으로 타입을 강제 변환
- **타입 강제 변환(type coercion)**이라고도 부름

**문자열 타입으로 변환**

```javascript
// 숫자 타입
0 + ''               // "0"
-0 + ''              // "0"
1 + ''               // "1"
-1 + ''              // "-1"
NaN + ''             // "NaN"
Infinity + ''        // "Infinity"
-Infinity + ''       // "-Infinity"

// 불리언 타입
true + ''            // "true"
false + ''           // "false"

// null 타입
null + ''            // "null"

// undefined 타입
undefined + ''       // "undefined"

// 심벌 타입
(Symbol()) + ''      // "TypeError: Cannot convert a Symbol value to a string"

// 객체 타입
({}) + ''            // "[object Object]"
Math + ''            // "[object Math]"
[] + ''              // ""
[10, 20] + ''        // "10,20"
(function(){}) + ''  // "function(){}"
Array + ''           // "function Array() { [native code] }"
```

**숫자 타입으로 변환**
- 산술 연산자 표현식을 평가하기 위해 숫자 타입이 아닌 모든 피연산자를 암묵적으로 변환

```javascript
1 - '1'    // 0
1 * '10'   // 10
1 / 'one'  // NaN
```

- 비교 연산자도 숫자 타입이 아닌 피연산자를 암묵적으로 변환

```javascript
// 비교 연산자
'1' > 0       // true
```

- +단항 연산자도 마찬가지

```javascript
// 문자열 타입
+''           // 0
+'0'          // 0
+'1'
+'string'

// 불리언 타입
+true         // 1
+false        // 0

// null 타입
+null         // 0

// undefined 타입
+undefined    // NaN

// 심벌 타입
+Symbol()     // TypeError: Cannot convert a Symbol value to a number

// 객체 타입
+{}              // NaN
+[]              // 0
+[10, 20]        // NaN
+(function(){})  // NaN
```
**불리언 타입으로 변환**

```javascript
// Falsy(거짓으로 평가되는 값)
if (!false) console.log(false + ' is falsy value');
if (!undefined) console.log(undefined + ' is falsy value');
if (!null) console.log(null + ' is falsy value');
if (!0) console.log(0 + ' is falsy value');
if (!NaN) console.log(NaN + ' is falsy value');
if (!'') console.log('' + ' is falsy value');

// Falsy값 이외의 값은 모두 Truthy(참으로 평가되는 값)
```

### 명시적 타입 변환

**문자열 타입으로 변환**

```javascript
// 1. String 생성자 함수를 new 연산자 없이 호출
// 숫자 타입 -> 문자열 타입
String(1);         // "1"
String(NaN);       // "NaN"
String(Infinity);  // "Infinity"
// 불리언 타입 -> 문자열 타입
String(true);      // "true"
String(false);     // "false"

// 2. Object.prototype.toString 메서드를 사용
// 숫자 타입 -> 문자열 타입
(1).toString();         // "1"
(NaN).toString();       // "NaN"
(Infinity).toString();  // "Infinity"
// 불리언 타입 -> 문자열 타입
(true).toString();      // "true"
(false).toString();     // "false"

// 3. 문자열 연결 연산자 이용
// 숫자 타입 -> 문자열 타입
1 + ''          // "1"
NaN + ''        // "NaN"
Infinity + ''   // "Infinity"
// 불리언 타입 -> 문자열 타입
true + ''       // "true"
false + ''      // "false"
```

**숫자 타입으로 변환**

```javascript
// 1. Number 생성자 함수를 new 연산자 없이 호출
// 문자열 타입 -> 숫자 타입
Number('0');       // 0
Number('-1');      // -1
Number('10.53');   // 10.53
// 불리언 타입 -> 숫자 타입
Number(true);      // 1
Number(false);     // 0

// 2. parseInt, parseFloat 함수 사용(문자열만 변환 가능)
// 문자열 타입 -> 숫자 타입
parseInt('0');        // 0
parseInt('-1');       // -1
parseFloat('10.53');  // 10.53

// 3. + 단항 산술 연산자 이용
// 문자열 타입 -> 숫자 타입
+'0';        // 0
+'-1';       // -1
+'10.53';    // 10.53
// 불리언 타입 -> 숫자 타입
+true;       // 1
+false;      // 0

// 4. * 산술 연산자 이용
// 문자열 타입 -> 숫자 타입
'0' * 1;      // 0
'-1' * 1;     // -1
'10.53' * 1;  // 10.53
// 불리언 타입 -> 숫자 타입
true * 1;     // 1
false * 1;    // 0
```

**불리언 타입으로 변환**

```javascript
// 1. Boolean 생성자 함수를 new 연산자 없이 호출
// 문자열 타입 -> 불리언 타입
Boolean('x');      // true
Boolean('');       // false
Boolean('false');  // true
// 숫자 타입 -> 불리언 타입
Boolean(0);         // false
Boolean(1);         // true
Boolean(NaN);       // false
Boolean(Infinity);  // true
// null 타입 -> 불리언 타입
Boolean(null)       // false
// undefined 타입 -> 불리언 타입
Boolean(undefined)  // false
// 객체 타입 -> 불리언 타입
Boolean({})         // true
Boolean([])         // true


// 2. ! 부정 논리 연산자를 두 번 사용
// 문자열 타입 -> 불리언 타입
!!'x';      // true
!!'';       // false
!!'false';  // true
// 숫자 타입 -> 불리언 타입
!!0;         // false
!!1;         // true
!!NaN;       // false
!!Infinity;  // true
// null 타입 -> 불리언 타입
!!null       // false
// undefined 타입 -> 불리언 타입
!!undefined  // false
// 객체 타입 -> 불리언 타입
!!{}         // true
!![]         // true
```

### 타입 변환 참고 사항

- 암묵적 타입 변환 코드를 작성한 사람이 결과값을 예측하지 못 한다면 에러가 발생할 확률이 높다.
- 모든 타입 변환을 명시적으로 작성하는 것은 때론 가독성 면에서 암시적 타입 변환보다 좋지 않을 수 있다.
- **자신이 작성한 코드가 암묵적 타입 변환이 발생하는지, 발생한다면 어떤 타입의 어떤 값으로 반환되는지, 그리고 타입 변환된 값으로 표현식이 어떻게 평가될 것인지 예측 가능해야 한다.**
