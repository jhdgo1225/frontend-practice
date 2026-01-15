# Modern JavaScript - 20장. strict mode

### strict mode

- 잠재적인 오류를 방지함으로써 안정적인 코드를 생산할 수 있게 지원하는 개발 모드
- ESLint 같은 린트 도구를 통해서도 strict mode와 유사한 효과를 얻을 수 있음

### strict mode 적용

- 전역의 선두 또는 함수 몸체의 선두에 'use strict';를 추가
- 전역의 선두에 추가하면 스크립트 전체에 strict mode가 적용됨

```javascript
"use strict";

function foo() {
  x = 10; // ReferenceError: x is not defined
}
foo();
```

- 함수 몸체의 선두에 추가하면 해당 함수와 중첩 함수에 strict mode가 적용됨

```javascript
function foo() {
  "use strict";

  x = 10; // ReferenceError: x is not defined
}
foo();
```

- 코드의 선두에 'use strict';를 위치시키지 않으면 strict mode가 제대로 동작하지 않음

```javascript
function foo() {
  x = 10; // 에러 발생 X
  ("use strict");
}
foo();
```

### strict mode 적용 주의사항

1. 전역에 strict mode 적용은 지양

   - 전역에 적용한 strict mode는 스크립트 단위로 적용함

   ```javascript
   <!DOCTYPE html>
   <html>
   <body>
   	<script>
   		'use strict';
   	</script>
   	<script>
   		x = 1;
   		console.log(x);  // 1
   	</script>
   	<script>
   		'use strict';

   		y = 1;  // ReferenceError: y is not defined
   		console.log(y);
   	</script>
   </body>
   </html>
   ```

   - strict mode는 다른 스크립트에 영향을 주지 않고 해당 스크립트에 한정되어 적용
   - strict mode 스크립트와 non-strict mode 스크립트를 혼용하는 것은 오류를 발생
   - 즉시 실행 함수로 스크립트 전체를 감싸서 스코프를 구분하고 즉시 실행 함수의 선두에 strict mode를 적용

2. 함수 단위로 strict mode 적용도 지양

   - 모든 함수에 일일이 strict mode를 적용하는 것은 번거로움
   - 그리고 strict mode가 적용된 함수가 참조할 함수 외부의 컨텍스트에 strict mode를 적용하지 않는다면 이 또한 문제가 발생

   ```javascript
   (function () {
     // non-strict mode
     var let = 10; // 에러 발생 X
     function foo() {
       "use strict";

       let = 20; // SyntaxError: Unexpected strict mode reserved word
     }
     foo();
   })();
   ```

   - 따라서 즉시 실행 함수로 감싼 스크립트 단위로 적용하는 것이 바람직

### strict mode가 발생시키는 에러

1. 암묵적 전역

   - 선언하지 않은 변수를 참조하면 ReferenceError 발생

   ```javascript
   (function () {
     "use strict";

     x = 1;
     console.log(x); // ReferenceError: x is not defined
   })();
   ```

2. 변수, 함수, 매개변수의 삭제

   - delete 연산자로 변수, 함수, 매개변수를 삭제하면 SyntaxError 발생

   ```javascript
   (function () {
     "use strict";

     var x = 1;
     delete x; // SyntaxError: Delete of an unqualified identifier in strict mode.

     function foo(a) {
       delete a; // SyntaxError: Delete of an unqualified identifier in strict mode.
     }
     delete foo; // SyntaxError: Delete of an unqualified identifier in strict mode.
   })();
   ```

3. 매개변수 이름 중복

   ```javascript
   (function () {
     "use strict";

     //SyntaxError: Duplicate parameter name not allowed in this context
     function foo(x, x) {
       return x + x;
     }
     console.log(foo(1, 2));
   })();
   ```

4. with 문의 사용

   ```javascript
   (function () {
     "use strict";

     // SyntaxError: Strict mode code may not include a with statement
     with ({ x: 1 }) {
       console.log(x);
     }
   })();
   ```

### strict mode 적용에 의한 변화

1. 일반 함수의 this

   - 기존에는 window 객체 정보를 출력
   - this에 undefined가 바인딩
   - 생성자 함수가 아닌 일반 함수 내부에서는 this를 사용할 필요가 없기 때문
   - 에러 발생 X

   ```javascript
   (function () {
     "use strict";

     function foo() {
       console.log(this); // undefined
     }
     foo();

     function Foo() {
       console.log(this); // Foo
     }
     new Foo();
   })();
   ```

2. arguments 객체

   - strict mode에서는 매개변수에 전달된 인수를 재할당하여 변경해도 arguments 객체에 반영되지 않음

   ```javascript
   (function (a) {
     "use strict";
     // 매개변수에 전달된 인수를 재할당하여 변경
     a = 2;

     // 변경된 인수가 arguments 객체에 반영되지 않음
     console.log(arguments);
   })(1);
   ```
