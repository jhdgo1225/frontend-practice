/**
 * #5.2 Lib Configuration
 */
// lib: ["ES6", "DOM"] -> document가 브라우저 API라는 것을 인식함
// lib: ["ES6"] -> document 인식 못 함. NodeJS API만 인식함
// document;
// window;
// Math.fround(1.2);
// Math는 자바스크립트 빌트인 객체이기 때문에 환경에 상관없이 타입스크립트가 인식한다.

import { init, exit } from "./myPackage";

init({ debug: true, url: "hi" });

exit(1);
