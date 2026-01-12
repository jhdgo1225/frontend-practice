# Modern JavaScript - 14장. 전역 변수의 문제점

### 변수의 생명 주기

1. 지역 변수

   - 지역 변수의 생명 주기는 함수의 생명 주기와 일치
   - 함수가 끝나면 지역 변수의 유효성 소멸

2. 전역 변수

   - 전역 변수의 생명 주기는 전역 객체의 생명 주기와 일치
   - 전역 객체가 끝나면 전역 변수의 유효성 소멸

### 전역 변수 문제점

1. 암묵적 결합
   - 모든 코드가 전역 변수를 참조하고 변경할 수 있음
   - 변수의 유효 범위가 커지면 코드의 가독성은 떨어지고 상태 변경의 위험성 증가
2. 긴 생명 주기
   - 메모리 리스스 사용량 증가
   - var 같은 경우 변수 이름이 중복되면 의도치 않은 재할당 발생
3. 스코프 체인 상에서 중첩 발생
   - 중첩의 정도가 심한 스코프에서 전역 변수를 참조하면 전역 변수를 검색하는 시간이 느림
4. 네임스페이스 오염
   - 파일이 분리되어 있어도 같은 전역 스코프를 공유
   - 동일한 이름의 변수가 존재하면 변경 가능성 증가

### 전역 변수 대체 방법

1. 즉시 실행 함수

   - 모든 코드 즉시 실행 함수로 감싸면 모든 변수는 즉시 실행 함수의 지역 변수가 된다.

2. 네임스페이스 객체

   - 전역에 네임스페이스 역할을 수행할 객체를 생성하여 전역 변수처럼 사용하고 싶은 변수를 프로퍼티에 추가

   ```javascript
   var MYAPP = {}; // 전역 네임스페이스 객체

   MYAPP.name = "Lee";

   console.log(MYAPP.name); // Lee
   ```

   - 네임스페이스 객체에 또 다른 네임스페이스 객체를 프로퍼티로 추가해서 네임스페이스를 계층적으로 구성

   ```javascript
   var MYAPP = {}; // 전역 네임스페이스 객체

   MYAPP.person = {
     name: "Lee",
     address: "Seoul",
   };

   console.log(MYAPP.person.name); // Lee
   ```

3. 모듈 패턴

   - 클래스를 모방해서 관련이 있는 변수와 함수를 모아 즉시 실행 함수로 감싸 하나의 모듈을 만드는 방식이다.
   - 자바스크립트의 강력한 기능인 클로저를 기반으로 동작한다.
   - 클래스 기반 객체지향 프로그래밍 언어에선 접근 제한자(public, private, pretected)를 사용해 캡슐화 가능
   - 프로토타입 기반 객체지향 프로그래밍 언어인 자바스크립트는 접근 제한자를 지원하지 않기 때문에 아래와 같은 모듈 패턴으로 변수는 노출하지 않으면서 클래스의 인스턴스처럼 사용할 수 있음
   - 모듈 패턴을 구현하기 위해서 클로저 개념을 이해해야 한다.

   ```javascript
   var Counter = (function () {
     // private 변수
     var num = 0;

     // 외부로 공개할 데이터나 메서드를 프로퍼티로 추가한 객체 반환
     return {
       increase() {
         return ++num;
       },
       decrease() {
         return --num;
       },
     };
   })();

   console.log(Counter.num);

   console.log(Counter.increase());
   console.log(Counter.increase());
   console.log(Counter.decrease());
   console.log(Counter.decrease());
   ```

4. ES6 모듈

   - ES6 모듈은 파일 자체의 독자적인 모듈 스코프를 제공
   - 모듈 내에서 var 키워드로 선언한 변수는 더는 전역 변수가 아니며 window 객체 프로퍼티도 아니다.
   - 아래와 같이 사용하면 javascript 파일 자체가 하나의 모듈이 된다.

   ```html
   <script type="module" src="lib.mjs"></script>
   <script type="module" src="app.mjs"></script>
   ```
