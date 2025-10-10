# Modern JavaScript - 2장. 자바스크립트란?

### 언어 특징

- 가볍고, 인터프리팅되면서, 일급 함수로 실시간 컴파일되는 언어
- 웹 용 스크립트 언어이면서 브라우저 환경이 아닌 Node.js, Apache CouchDB, Adobe Acrobat에서도 사용 가능
- 자바스크립트 엔진이 탑재되었다면 자바스크립트를 실행
- 프로토타입 기반의 멀티 페러다임(절차 지향 + 객체 지향 + 함수형 프로그래밍) 언어
- 싱글 스레드로 처리하고 동적 언어를 지원

### 자바스크립트를 배워야 하는 이유

- FE 영역, BE 영역 각각에 대한 지식을 기반으로 FE 영역의 WebAPIs, BE 영역의 Node.js API를 사용하여 프로그램을 구현
- 각 브라우저에서 지원하는 자바스크립트 엔진에 적용된 자바스크립트 문법은 ECMAScript 표준에 따라 구현됨
- 브라우저 별로 표준 버전이 다를 수 있고, 같은 ES 버전이라도 지원하는 기능이 다를 수 있기 때문에 해당 버전의 표준에서 효과적으로 쓸 수 있는 문법과 그렇지 않은 문법들을 잘 활용해야 함
- FE Framework(React, Vue, Angular), BE Framework(Nest, Express)를 활용하려면 자바스크립트를 반드시 익혀야 함

### 자바스크립트 엔진

- 자바스크립트를 실행하는 프로그램 혹은 인터프리터
- 엔진 개발로 인해 브라우저에만 국한되지 않고 Node.js, Electron, React Native 등의 프로젝트와 그 이외의 프로그램에서도 사용 가능
- 엔진 구성 요소
  - 메모리 힙(Memory Heap)
  - 호출 스택(Call Stack)
  - 실행 컨텍스트
  - 이벤트 루프(Event Loop)

<div align="center">
	<img src="../images/ch02-js-engine-runtime.png" alt="자바스크립트 엔진" width="420" />
</div>

### ECMAScript

- ECMA 인터내셔널 기관의 공식 자바스크립트 표준
- 1996년까지 각 브라우저마다 자바스크립트 문법이 서로 차이가 컸음
- 호환성이 최악이여서 특정 브라우저에서 가능하지만 다른 브라우저에 대해 웹페이지가 정상 동작하지 않는 **크로스 브라우징 이슈**가 발생
- ECMA 기관은 모든 브라우저에서 정상적으로 동작하기 위해 자바스크립트를 표준화함. 표준화된 자바스크립트를 ECMAScript라 부름

| 버전                  | 출시연도 | 특징                                                                                                                                                                                 |
| --------------------- | -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| ES1                   | 1997     | 초판                                                                                                                                                                                 |
| ES2                   | 1998     | ISO/IEC 16262 국제 표준과 동일한 규격을 적용                                                                                                                                         |
| ES3                   | 1999     | 정규 표현식, try ... catch                                                                                                                                                           |
| ES5                   | 2009     | HTML5와 함께 출현한 표준안<br>JSON, strict mode, 접근자 프로퍼티, 프로퍼티 어트리뷰터 제어, 향상된 배열 조작 기능(forEach, map, filter, reduce, some, every)                         |
| ES6(ECMAScript 2015)  | 2015     | let/const, 클래스, 화살표 함수, 템플릿 리터럴, 디스트럭처링 할당, 스프레드 문법, rest 파라미터, 심벌, 프로미스, Map/Set, 이터러블, for ... of, 제너레이터, Proxy, 모듈 import/export |
| ES7(ECMAScript 2016)  | 2016     | 지수(\*\*) 연산자, Array.prototype.includes, String.prototype.includes                                                                                                               |
| ES8(ECMAScript 2017)  | 2017     | async/await, Object 정적 메서드(Object.values, Object.entries, Object.getOwnPropertyDescriptors)                                                                                     |
| ES9(ECMAScript 2018)  | 2018     | Object rest/spread 프로퍼티, Promise.prototype.finally, async generator, for await ... of                                                                                            |
| ES10(ECMAScript 2019) | 2019     | Object.fromEntries, Array.prototype.flat, Array.prototype.flatMap, optional catch binding                                                                                            |
| ES11(ECMAScript 2020) | 2020     | String.prototype.matchAll, BigInt, globalThis, Promise.allSettled, null 병합 연산자, 옵셔널 체이닝 연산자, for ... in enumeration order                                              |

---

**참고 사이트**

- 위키피디아: https://developer.mozilla.org/ko/docs/Web/JavaScript
- 드림코딩: https://academy.dream-coding.com/

**사진 출처**

- 자바스크립트 엔진 구조: https://joshua1988.github.io/web-development/translation/javascript/how-js-works-inside-engine/
