# JS 개념 및 문법 공부

https://ko.javascript.info/ 사이트를 메인으로 학습.

---

## 목차

---

1. 문법

   1. ES5
   2. ES6
   3. 자료구조와 자료형
   4. 함수 심화
   5. Object Basic
   6. ProtoType
   7. Class
   8. promise와 async, await
      <br />

2. JavaScripts 동작원리

---

## 문법

JavaScript 는 언어이고, ECMAScript 는 규격/표준이다.

### 1. ES5(2009)

- Array Method

  - isArray // 배열체크
  - forEach // 순회
  - map // 배열 내의 모든 요소에 주어진 함수를 호출한 결과를 새로운 배열을 반환.
  - filter // 주어진 함수의 테스트를 통과하는 모든 요소를 새로운 배열로 반환.
  - reduce // 배열의 각 요소에 대해 주어진 리듀서(reducer) 함수를 실행하고, 하나의 결과값을 반환.
  - some // 배열 안의 어떤 요소라도 주어진 판별 함수를 통과하는지 테스트.
  - every // 배열 안의 모든 요소가 주어진 판별 함수를 통과하는지 테스트.
  - indexOf // 주어진 value의 인덱스값 반환.

- Object Getter and Setter

  - Getters and Setters 프로퍼티를 지원합니다.

- Strict mode
  "use strict"를 통해 깨끗한 코드를 작성하는데 도움을 줍니다.

- JSON
  이전에는 주로 XML을 사용하다가, JSON 데이터포맷의 붐이 일어나면서 지원하게 됐습니다.

  - JSON.parse() // JSON 문자열의 구문을 분석하고, 그 결과에서 JavaScript 값이나 객체를 생성합니다
  - JSON.stringify() // JavaScript 값이나 객체를 JSON 문자열로 변환

ref https://codify.tistory.com/24

---

### 2. ES6(2015)

- 변수의 선언방식
  - 기존의 var는 함수형 스코프였지만 let, const는 블록 스코프
  - let 변수, const 상수
- 템플릿 리터럴
  - `${}`
- Arrow Functions
  - `const function = (Parameter) => {...}`
- Default Parameter Values // 함수의 파라메터에 기본값 설정
- Function Rest Parameter // 스프레드연산자
- Symbol
  - 자바스크립트는 객체 프로퍼티 키로 오직 문자형과 심볼형만을 허용합니다.
  - '심볼(symbol)'은 유일한 식별자(unique identifier)를 만들고 싶을 때 사용
  - https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Symbol
- module시스템
  - `import name from 경로`
  - `export default, export`
- Class
  - 하지만 내부적으로는 그대로 프로토타입을 따릅니다.
- `Promise` // 비동기 함수

ref https://velog.io/@bbio3o/JavaScript-ES5-ES6-%ED%8A%B9%EC%A7%95

<br />

#### 화살표 함수와 일반 함수의 차이

- 일반함수의 this는 자신을 가장 마지막으로 품고 있는 scope로 항상 변한다.
- 화살표함수는 this와 arguments를 바인딩 하지 않는다.

기존의 function 함수는 arguments를 사용하여 받아오는 인자들을 배열로 다음과 같이 사용할 수 있었다.

- arguments 객체는 모든 함수 내에서 이용 가능한 지역 변수입니다.
- arguments 객체를 사용하여 함수 내에서 모든 인수를 참조할 수 있습니다.

하지만 화살표 함수에서는 오류가 생기기 때문에 argumnets대신 rest parameter라는 구문을 사용한다.

      function funcName() { console.log(arg) } // [1, 2, 3]
      funcName(1, 2, 3);

      const funcName = (...arg) => { console.log(arg) } // [1, 2, 3]
      funcName(1, 2, 3);

화살표 함수로 정의한 함수는 상위 컨텍스트가 전역 컨텍스트이므로 window를 나타내고 function으로 정의한 함수는 자신을 정의한 객체를 나타낸다.
this가 없을 때는 new를 통해 객체 생성이 불가능하다.

    const obj = {
        a : () => {console.log(this)},       // Window
        b : function () {console.log(this)}  //{a: ƒ, b: ƒ}
    }

    new obj.a();  //obj.a is not a constructor
    new obj.b();  //b {}

https://velog.io/@leeeeunz/TIL-34.-Arrow-Function%EA%B3%BC-Function%EC%9D%98-%EC%B0%A8%EC%9D%B4

---

### 3. 자료구조와 자료형

1.  원시값의 메서드

    - 원시형의 종류
      - string
      - number
      - bigint
      - boolean
      - symbol
      - null
      - undefined

2.  숫자형
3.  문자열
4.  배열
5.  배열과 메서드
6.  iterable 객체

    1.  반복 가능한(iterable) 객체는 `[Symbol.iterator]` 메서드가 구현 되어있는 객체 입니다.
    2.  이터러블 이라는 개념을 사용하면 어떤 객체에든 for..of 반복문을 적용할 수 있습니다.
        <br />

7.  맵과 셋

    1.  맵(Map)은 키가 있는 데이터를 저장한다는 점에서 객체와 유사합니다. 다만, 맵은 키에 다양한 자료형을 허용한다는 점에서 차이가 있습니다.

        - new Map() – 맵을 만듭니다.
        - map.set(key, value) – key를 이용해 value를 저장합니다.
        - map.get(key) – key에 해당하는 값을 반환합니다. key가 존재하지 않으면 undefined를 반환합니다.
        - map.has(key) – key가 존재하면 true, 존재하지 않으면 false를 반환합니다.
        - map.delete(key) – key에 해당하는 값을 삭제합니다.
        - map.clear() – 맵 안의 모든 요소를 제거합니다.
        - map.size – 요소의 개수를 반환합니다.
        - map.keys() – 각 요소의 키를 모은 반복 가능한(iterable, 이터러블) 객체를 반환합니다.
        - map.values() – 각 요소의 값을 모은 이터러블 객체를 반환합니다.
        - map.entries() – 요소의 [키, 값]을 한 쌍으로 하는 이터러블 객체를 반환합니다. 이 이터러블 객체는 for..of반복문의 기초로 쓰입니다.

        ```
        let map = new Map();

        map.set('1', 'str1');   // 문자형 키
        map.set(1, 'num1');     // 숫자형 키
        map.set(true, 'bool1'); // 불린형 키

        // 객체는 키를 문자형으로 변환한다는 걸 기억하고 계신가요?
        // 맵은 키의 타입을 변환시키지 않고 그대로 유지합니다.
        // 따라서 아래의 코드는 출력되는 값이 다릅니다.
        alert( map.get(1)   ); // 'num1'
        alert( map.get('1') ); // 'str1'

        alert( map.size ); // 3
        ```

    2.  map[key]는 Map을 쓰는 바른 방법이 아닙니다.

        - map을 사용할 땐 map전용 메서드 set, get 등을 사용해야만 합니다.

    3.  맵은 값이 삽입된 순서대로 순회를 실시합니다. 객체가 프로퍼티 순서를 기억하지 못하는 것과는 다릅니다.
        <br />

8.  위크맵과 위크셋
9.  Object.keys, values, entries
10. 구조 분해 할당
11. Date 객체와 날짜
12. JSON과 메서드

---

### 4. 함수 심화

1. 재귀와 스택
2. 나머지 매개변수와 전개 문법

   1. 상당수의 자바스크립트 내장 함수는 인수의 개수에 제약을 두지 않습니다.
   2. 함수 정의 방법과 상관없이 함수에 넘겨주는 인수의 개수엔 제약이 없습니다.

      ```
        function sum(a, b) {
            return a + b;
        }

        alert( sum(1, 2, 3, 4, 5) );
        // error 발생 안함.
      ```

   3. 여분의 매개변수는 그 값들을 담을 배열 이름을 마침표 세 개 ...뒤에 붙여주면 함수 선언부에 포함시킬 수 있습니다.

      ```
      // 나머지 매개변수는 항상 마지막에 있어야 합니다.
      // args는 배열의 이름입니다.
      function sumAll(...args) {
           let sum = 0;
           for (let arg of args) sum += arg;
           return sum;
       }
       alert( sumAll(1, 2, 3) ); // 6
      ```

   4. arguemnts라는 특별한 유사 배열 객체(array-like object)를 이용하면 인덱스를 사용해 모든 인수에 접근할 수 있습니다.

      ```
      function showName() {
        alert( arguments.length );
        alert( arguments[0] );
        alert( arguments[1] );

      // arguments는 이터러블 객체이기 때문에
      // for(let arg of arguments) alert(arg); 를 사용해 인수를 나열할 수 있습니다.
      }

      // 2, Julius, Caesar가 출력됨
      showName("Julius", "Caesar");

      // 1, Bora, undefined가 출력됨(두 번째 인수는 없음)
      showName("Bora");
      ```

   5. spread 연산자...은 이터러블 객체를 인수 목록으로 전개합니다.
      <br />

3. 변수의 유효범위와 클로저

   1. const, let의 범위는 블록단위이다.
   2. 함수 내부에서 선언한 함수는 ‘중첩(nested)’ 함수라고 부릅니다.
      ```
        function sayHiBye(firstName, lastName) {
          // 헬퍼(helper) 중첩 함수
          function getFullName() {
            return firstName + " " + lastName;
          }
        alert( "Hello, " + getFullName() );
        alert( "Bye, " + getFullName() );
      }
      ```
   3. 렉시컬 환경

      1. 변수

         - 자바스크립트에선 실행 중인 함수, 코드 블록 {...}, 스크립트 전체는 렉시컬 환경(Lexical Environment) 이라 불리는 내부 숨김 연관 객체(internal hidden associated object)를 갖습니다.
         - 렉시컬 환경 객체는 두 부분으로 구성됩니다.
           1. 환경 레코드(Environment Record) – 모든 지역 변수를 프로퍼티로 저장하고 있는 객체입니다. this 값과 같은 기타 정보도 여기에 저장됩니다.
           2. 외부 렉시컬 환경(Outer Lexical Environment) 에 대한 참조 외부 코드와 연관됨
         - **변수는 특수 내부 객체인 환경 레코드의 프로퍼티**일 뿐입니다. '변수를 가져오거나 변경’하는 것은 '환경 레코드의 프로퍼티를 가져오거나 변경’함을 의미합니다.
         - 전역 렉시컬 환경은 외부 참조를 갖지 않습니다.
         - **렉시컬 환경은 명세서에서 자바스크립트가 어떻게 동작하는지 설명하는 데 쓰이는 ‘이론상의’ 객체입니다. 따라서 코드를 사용해 직접 렉시컬 환경을 얻거나 조작하는 것은 불가능**합니다.
           <br />

      2. 함수 선언

         - 함수 선언문(function declaration)으로 선언한 함수는 일반 변수와는 달리 바로 초기화된다는 점에서 차이가 있습니다.
         - **함수 선언문으로 선언한 함수는 렉시컬 환경이 만들어지는 즉시 사용할 수 있습니다.** 변수는 let을 만나 선언이 될 때까지 사용할 수 없지만 말이죠.
         - `let say = function(name)...`같이 함수를 변수에 할당한 함수 표현식(Function Expression)은 해당하지 않습니다.
           <br />

      3. 내부와 외부 렉시컬 환경

         - 함수를 호출해 실행하면 새로운 렉시컬 환경이 자동으로 만들어집니다. 이 렉시컬 환경엔 함수 호출 시 넘겨받은 매개변수와 함수의 지역 변수가 저장됩니다.
         - 함수가 호출 중인 동안은 호출 중인 함수를 위한 내부 렉시컬 환경과 내부 렉시컬 환경이 가리키는 외부(전역) 렉시컬 환경 두 개를 갖게 됩니다.
           ```
             let phrase= 'hello'
             function say(name){
               alert(`${phrase} , ${name})
             }
             say("John") // hello , John
             // 함수의 렉시컬 환경 = name = John
             // 외부(전역) 렉시컬 환경 = phrase: 'hello', say : function
             // 함수 내부의 환경엔 phrase가 없지만 외부 참조로 값을 가져옴.
           ```
           <br />

      4. 반환 함수

         ```
           function makeCounter() {
             let count = 0;

             return function() {
               return count++;
             };
           }
           let counter = makeCounter();
         ```

         - makeCounter()를 호출하면 호출할 때마다 새로운 렉시컬 환경 객체가 만들어집니다. 그리고 이 렉시컬 환경 개체엔 makeCounter를 실행하는데 필요한 변수들이 저장됩니다.
         - 여기서 중요한 **사실은 모든 함수는 함수가 생성된 곳의 렉시컬 환경을 기억한다는 점**입니다. 함수는 `[[Environment]]`라 불리는 숨김 프로퍼티를 갖는데, 여기에 함수가 만들어진 곳의 렉시컬 환경에 대한 참조가 저장됩니다.
         - 따라서 `counter.[[Environment]]`엔 {count: 0}이 있는 렉시컬 환경에 대한 참조가 저장됩니다. 호출 장소와 상관없이 함수가 자신이 태어난 곳을 기억할 수 있는 건 바로 `[[Environment]]` 프로퍼티 덕분입니다. `[[Environment]]`는 함수가 생성될 때 딱 한 번 그 값이 세팅됩니다. 그리고 이 값은 영원히 변하지 않습니다.
         - 위의 예제에서`counter()`를 실행하면 1씩 올라갑니다. 처음에는 이해가 잘 안됐는데, `makeCounter()()`는 항상 0으로 나오는 걸 봤을 때, `let counter = makeCounter()`에서만 makeCounter()가 실행된거고, 그 이후 `counter()`는 익명함수가 실행되는데 makeCounter()가 실행 되지 않았음에도, 함수가 처음 생성 됬을 때, Environment에 count = 0 으로 저장되어있었기에 count++가 가능.
           <br />

      5. **클로저**

         - 클로저는 외부 변수를 기억하고 이 외부 변수에 접근할 수 있는 함수를 의미합니다. 자바스크립트에선 모든 함수가 자연스럽게 클로저가 됩니다. 예외가 하나 있긴 한데 자세한 내용은 'new Function' 문법에서 다루도록 하겠습니다.
         - 자바스크립트의 함수는 숨김 프로퍼티인 `[[Environment]]`를 이용해 자신이 어디서 만들어졌는지를 기억합니다. 함수 내부의 코드는 `[[Environment]]`를 사용해 외부 변수에 접근합니다.
         - 프런트엔드 개발자 채용 인터뷰에서 "클로저가 무엇입니까?"라는 질문을 받으면, 클로저의 정의를 말하고 자바스크립트에서 왜 모든 함수가 클로저인지에 관해 설명하면 될 것 같습니다. 이때 `[[Environment]]` 프로퍼티와 렉시컬 환경이 어떤 방식으로 동작하는지에 대한 설명을 덧붙이면 좋습니다.
           <br />

      6. 가비지 컬렉션

         - 함수 호출이 끝나면 함수에 대응하는 렉시컬 환경이 메모리에서 제거됩니다. 함수와 관련된 변수들은 이때 모두 사라지죠. 함수 호출이 끝나면 관련 변수를 참조할 수 없는 이유가 바로 여기에 있습니다
         - 자바스크립트에서 모든 객체는 도달 가능한 상태일 때만 메모리에 유지됩니다.
         - 그런데 호출이 끝난 후에도 여전히 도달 가능한 중첩 함수가 있을 수 있습니다. 이때는 이 중첩함수의 `[[Environment]]` 프로퍼티에 외부 함수 렉시컬 환경에 대한 정보가 저장됩니다. 도달 가능한 상태가 되는 것이죠.`
         - f()를 여러 번 호출하고 그 결과를 어딘가에 저장하는 경우, 호출 시 만들어지는 각 렉시컬 환경 모두가 메모리에 유지된다는 점입니다. 아래 예시를 실행하면 3개의 렉시컬 환경이 만들어지는데, 각 렉시컬 환경은 메모리에서 삭제되지 않습니다.

           ```
           function f() {
             let value = 123;

             return function() {
               alert(value);
             }
           }

           let g = f(); // g가 살아있는 동안엔 연관 렉시컬 환경도 메모리에 살아있습니다.

           g = null; // 도달할 수 없는 상태가 되었으므로 메모리에서 삭제됩니다.
           ```

           함수 호출은 끝났지만 렉시컬 환경이 메모리에 유지되는 이유는 바로 이 때문입니다.
           <br />

      7. 최적화 프로세스
         - 함수가 살아있는 동안엔 이론상으론 모든 외부 변수 역시 메모리에 유지되어야 하지만
         - 실제로는 자바스크립트 엔진이 이를 지속해서 최적화합니다. 자바스크립트 엔진은 변수 사용을 분석하고 외부 변수가 사용되지 않는다고 판단되면 이를 메모리에서 제거합니다.
         - **디버깅 시, 최적화 과정에서 제거된 변수를 사용할 수 없다는 점은 V8 엔진(Chrome, Opera에서 쓰임)의 주요 부작용입니다.**
           <br />

4. 오래된 'var'
   1. 'var’는 블록 스코프가 없습니다.
      - var로 선언한 변수의 스코프는 함수 스코프이거나 전역 스코프입니다. 블록 기준으로 스코프가 생기지 않기 때문에 블록 밖에서 접근 가능합니다.
        <br />
   2. 선언하기 전 사용할 수 있는 ‘var’
      - var 선언은 함수가 시작될 때 처리됩니다. 전역에서 선언한 변수라면 스크립트가 시작될 때 처리되죠.
        ```
        // 둘다 동일하게 동작합니다
        // 1번 (let, const는 에러남)
        function sayHi() {
          phrase = "Hello";
          alert(phrase);
          var phrase;
        }
        sayHi();
        // 2번
        function sayHi() {
          var phrase;
          phrase = "Hello";
          alert(phrase);
        }
        sayHi();
        ```
        <br />
   3. 이렇게 변수가 끌어올려 지는 현상을 '호이스팅(hoisting)'이라고 부릅니다. var로 선언한 모든 변수는 함수의 최상위로 ‘끌어 올려지기(hoisted)’ 때문입니다.
      - 선언은 호이스팅 되지만 할당은 호이스팅 되지 않습니다.
      - var로 선언한 변수는 어디서든 참조할 수 있습니다. 하지만 변수에 무언가를 할당하기 전까진 값이 undefined이죠.
        <br />
5. 전역 객체

   - 전역 객체를 사용하면 어디서나 사용 가능한 변수나 함수를 만들 수 있습니다. 전역 객체는 언어 자체나 호스트 환경에 기본 내장되어 있는 경우가 많습니다.

   - 브라우저 환경에선 전역 객체를 window, Node.js 환경에선 global라고 부르는데, 각 호스트 환경마다 부르는 이름은 다릅니다.

   - 전역 객체의 모든 프로퍼티는 아래와 같이 직접 접근할 수 있습니다.
     ```
       alert("Hello");
       // 위와 동일하게 동작합니다.
       window.alert("Hello");
     ```
   - let이나 const가 아닌 var로 선언한 전역 함수나 전역 변수는 전역 객체의 프로퍼티가 됩니다. 이 방법은 쓰지 않으시길 바랍니다.

     ```
     var gVar = 5;
     alert(window.gVar); // 5 (var로 선언한 변수는 전역 객체 window의 프로퍼티가 됩니다)

     let gLet = 5;
     alert(window.gLet); // undefined (let으로 선언한 변수는 전역 객체의 프로퍼티가 되지 않습니다.)
     ```

   - 중요한 변수라서 모든 곳에서 사용할 수 있게 하려면, 아래와 같이 전역 객체에 직접 프로퍼티를 추가해 주시기 바랍니다.

     ```
     // 모든 스크립트에서 현재 사용자(current user)에 접근할 수 있게 이를 전역 객체에 추가함
       window.currentUser = {
         name: "John"
       };

       // 아래와 같은 방법으로 모든 스크립트에서 currentUser에 접근할 수 있음
       alert(currentUser.name);  // John

       // 지역 변수 'currentUser'가 있다면
       // 지역 변수와 충돌 없이 전역 객체 window에서 이를 명시적으로 가져올 수 있음
       alert(window.currentUser.name); // John
     ```

     <br />

6. 객체로서의 함수와 기명 함수 표현식

   1. 모든 값은 자료형을 가지고 있는데, 함수는 객체입니다.
      함수는 호출이 가능한(callable) '행동 객체’라고 이해하면 쉽습니다.
   2. ‘name’ 프로퍼티

      ```
      function sayHi() {
        alert("Hi");
      }
      alert(sayHi.name); // sayHi

      let sayHi = function() {
        alert("Hi");
      };
      alert(sayHi.name); // sayHi (익명 함수이지만 이름이 있네요!)
      ```

      자바스크립트 명세서에서 정의된 이 기능을 'contextual name’이라고 부릅니다. 이름이 없는 함수의 이름을 지정할 땐 컨텍스트에서 이름을 가져오죠.

   3. length 프로퍼티
      내장 프로퍼티 length는 함수 매개변수의 개수를 반환합니다. 예시를 살펴봅시다.

      ```
      function f1(a) {}
      function f2(a, b) {}
      function many(a, b, ...more) {}

      alert(f1.length); // 1
      alert(f2.length); // 2
      alert(many.length); // 2
      ```

      <br />

7. 'new Function' 문법

   1. new Function 문법을 사용하면 함수를 만들 수 있습니다.
      `let func = new Function ([arg1, arg2, ...argN], functionBody);`
   2. new Function를 이용해 함수를 만들면 함수의 `[[Environment]]` 프로퍼티가 현재 렉시컬 환경이 아닌 전역 렉시켤 환경을 참조하게 됩니다.
      <br />

8. setTimeout과 setInterval을 이용한 호출 스케줄링
9. call/apply와 데코레이터, 포워딩

   1. 코드 변경 없이 캐싱 기능 추가하기

      ```
        function slow(x) {
          // CPU 집약적인 작업이 여기에 올 수 있습니다.
          alert(`slow(${x})을/를 호출함`);
          return x;
        }
        // 데코레이터 함수를 만들고 cache라는 map에 결과값 저장.
        function cachingDecorator(func) {
          let cache = new Map();

          return function(x) {
            if (cache.has(x)) {    // cache에 해당 키가 있으면
              return cache.get(x); // 대응하는 값을 cache에서 읽어옵니다.
            }

            let result = func(x);  // 그렇지 않은 경우엔 func를 호출하고,

            cache.set(x, result);  // 그 결과를 캐싱(저장)합니다.
            return result;
          };
        }

        slow = cachingDecorator(slow);

        alert( slow(1) ); // slow(1)이 저장되었습니다.
        alert( "다시 호출: " + slow(1) ); // 동일한 결과

        alert( slow(2) ); // slow(2)가 저장되었습니다.
        alert( "다시 호출: " + slow(2) ); // 윗줄과 동일한 결과
      ```

      - cachingDecorator같이 인수로 받은 함수의 행동을 변경시켜주는 함수를 데코레이터(decorator) 라고 부릅니다.

      - 모든 함수를 대상으로 cachingDecorator를 호출 할 수 있는데, 이때 반환되는 것은 캐싱 래퍼입니다. 함수에 cachingDecorator를 적용하기만 하면 캐싱이 가능한 함수를 원하는 만큼 구현할 수 있기 때문에 데코레이터 함수는 아주 유용하게 사용됩니다.

      - 캐싱 관련 코드를 함수 코드와 분리할 수 있기 때문에 함수의 코드가 간결해진다는 장점도 있습니다.

      - 아래 그림에서 볼 수 있듯이 cachingDecorator(func)를 호출하면 ‘래퍼(wrapper)’, function(x)이 반환됩니다. 래퍼 function(x)는 func(x)의 호출 결과를 캐싱 로직으로 감쌉니다(wrapping).

10. 함수 바인딩

- setTimeout에 메서드를 전달할 때처럼, 객체 메서드를 콜백으로 전달할 때 ’this 정보가 사라지는’ 문제가 생깁니다.

- 브라우저 환경에서 setTimeout 메서드는 조금 특별한 방식으로 동작합니다. 인수로 전달받은 함수를 호출할 때, this에 window를 할당합니다(Node.js 환경에선 this가 타이머 객체가 되는데, 여기선 중요하지 않으므로 넘어가겠습니다). 따라서 위 예시의 this.firstName은 window.firstName가 되는데, window 객체엔 firstName이 없으므로 undefined가 출력됩니다. 다른 유사한 사례에서도 대부분 this는 undefined가 됩니다.

- 1. 래퍼
  - `setTimeout(() => user.sayHi(), 1000); // Hello, John!`
- 2. 바인드

  - bind를 적용한 함수의 컨텍스트는 완전히 고정됩니다. 한번 고정되면 바꿀 방법이 없습니다. // 두번 써도 안됌(첫 번째로 고정)
  - `let boundFunc = func.bind(context);`

    ```
    let user = {
      firstName: "John"
    };

    function func() {
      alert(this.firstName);
    }

    let funcUser = func.bind(user);
    funcUser(); // John
    //////////////////////////////////////////////
    let user = {
      firstName: "John",
      sayHi() {
        alert(`Hello, ${this.firstName}!`);
      }
    };
    let sayHi = user.sayHi.bind(user); // (*)
    // 이제 객체 없이도 객체 메서드를 호출할 수 있습니다.
    sayHi(); // Hello, John!
    setTimeout(sayHi, 1000); // Hello, John!
    // 1초 이내에 user 값이 변화해도
    // sayHi는 기존 값을 사용합니다.
    user = {
      sayHi() { alert("또 다른 사용자!"); }
    };
    ```

- 부분 적용

  - `let bound = func.bind(context, [arg1], [arg2], ...);`

    ```
    function mul(a, b) {
      return a * b;
    }

    let double = mul.bind(null, 2);

    alert( double(3) ); // = mul(2, 3) = 6
    alert( double(4) ); // = mul(2, 4) = 8
    alert( double(5) ); // = mul(2, 5) = 10
    ```

  - 그런데 부분 함수는 왜 만드는 걸까요?

    가독성이 좋은 이름(double, triple)을 가진 독립 함수를 만들 수 있다는 이점 때문입니다. 게다가 bind를 사용해 첫 번째 인수를 고정할 수 있기 때문에 매번 인수를 전달할 필요도 없어지죠.

11. 화살표 함수 다시 살펴보기

---

### 5. Object Basic 객체: 기본

1. 객체

- 대괄호 표기법
  - 여러 단어를 조합해 프로퍼티 키를 만든 경우엔, 점 표기법을 사용해 프로퍼티 값을 읽을 수 없습니다.
    ```
    // 문법 에러가 발생합니다.
    user.likes birds = true
    // 대괄호 표기법
    let user = {};
    // set
    user["likes birds"] = true;
    // get
    alert(user["likes birds"]); // true
    // delete
    delete user["likes birds"];
    ```
- 계산 된 프로퍼티
  객체를 만들 때 객체 리터럴 안의 프로퍼티 키가 대괄호로 둘러싸여 있는 경우, 이를 계산된 프로퍼티(computed property) 라고 부릅니다.

  ```
  let fruit = prompt("어떤 과일을 구매하시겠습니까?", "apple");

  let bag = {
    [fruit]: 5, // 변수 fruit에서 프로퍼티 이름을 동적으로 받아 옵니다.
  };

  alert( bag.apple ); // fruit에 "apple"이 할당되었다면, 5가 출력됩니다.
  ```

  위 예시에서 `[fruit]`는 프로퍼티 이름을 변수 fruit에서 가져오겠다는 것을 의미합니다.

  사용자가 프롬프트 대화상자에 apple을 입력했다면 bag엔 {apple: 5}가 할당되었을 겁니다.

- 객체 정렬 방식
  - 정수프로퍼티는 자동 정렬 됩니다.
  - 키가 정수가 아닌 경우엔 작성된 순서대로 프로퍼티가 나열됩니다.

2. 참조에 의한 객체 복사

- 원시값(문자열, 숫자, 불린 값)은 ‘값 그대로’ 저장·할당되고 복사됩니다.
- 객체와 원시 타입의 근본적인 차이 중 하나는 **객체는 ‘참조에 의해(by reference)’ 저장되고 복사**된다는 것입니다.
- 객체 복사, 병합과 Object.assign

  - 객체 복사

    ```
    let user = {
    name: "John",
    age: 30
    };

    let clone = {}; // 새로운 빈 객체

    // 빈 객체에 user 프로퍼티 전부를 복사해 넣습니다.
    for (let key in user) {
    clone[key] = user[key];
    }
    // 이제 clone은 완전히 독립적인 복제본이 되었습니다.
    clone.name = "Pete"; // clone의 데이터를 변경합니다.
    alert( user.name ); // 기존 객체에는 여전히 John이 있습니다.
    ```

  - `assign` 메서드를 사용해 여러 객체를 하나로 병합하는 예시를 살펴봅시다.

    - 목표 객체에 동일한 이름을 가진 프로퍼티가 있는 경우엔, 기존 값이 덮어씌워 집니다.

      ```
      let user = { name: "John" };

      let permissions1 = { canView: true };
      let permissions2 = { canEdit: true };

      // permissions1과 permissions2의 프로퍼티를 user로 복사합니다.
      Object.assign(user, permissions1, permissions2);

      // now user = { name: "John", canView: true, canEdit: true }
      ```

- 객체의 '진짜 복사본’을 만들려면 '얕은 복사(shallow copy)'를 가능하게 해주는 Object.assign이나 '깊은 복사’를 가능하게 해주는 \_.cloneDeep(obj)를 사용하면 됩니다. 이때 얕은 복사본은 중첩 객체를 처리하지 못한다는 점을 기억해 두시기 바랍니다.

3. 가비지 컬렉션

- 자바스크립트는 도달 가능성(reachability) 이라는 개념을 사용해 메모리 관리를 수행합니다.

  - ‘도달 가능한(reachable)’ 값은 쉽게 말해 어떻게든 접근하거나 사용할 수 있는 값을 의미합니다. 도달 가능한 값은 메모리에서 삭제되지 않습니다.

  - 아래 소개해 드릴 값들은 그 태생부터 도달 가능하기 때문에, 명백한 이유 없이는 삭제되지 않습니다.

    - 현재 함수의 지역 변수와 매개변수
    - 중첩 함수의 체인에 있는 함수에서 사용되는 변수와 매개변수
    - 전역 변수
    - 기타 등등
    - 이런 값은 루트(root) 라고 부릅니다.

  - 루트가 참조하는 값이나 체이닝으로 루트에서 참조할 수 있는 값은 도달 가능한 값이 됩니다.

- 내부 알고리즘

  - 가비지 컬렉션’은 대개 다음 단계를 거쳐 수행됩니다.

    - 가비지 컬렉터는 루트(root) 정보를 수집하고 이를 ‘mark(기억)’ 합니다.
    - 루트가 참조하고 있는 모든 객체를 방문하고 이것들을 ‘mark’ 합니다.
    - mark 된 모든 객체에 방문하고 그 객체들이 참조하는 객체도 mark 합니다. 한번 방문한 객체는 전부 mark 하기 때문에 같은 객체를 다시 방문하는 일은 없습니다.
    - 루트에서 도달 가능한 모든 객체를 방문할 때까지 위 과정을 반복합니다.
    - mark 되지 않은 모든 객체를 메모리에서 삭제합니다.

  - bfs랑 비슷해보인다.

- 요약

  - 가비지 컬렉션은 엔진이 자동으로 수행하므로 개발자는 이를 억지로 실행하거나 막을 수 없습니다.
  - 객체는 도달 가능한 상태일 때 메모리에 남습니다.

  - 참조된다고 해서 도달 가능한 것은 아닙니다. 서로 연결된 객체들도 도달 불가능할 수 있습니다.

4. 메서드와 'this'

- 객체 프로퍼티에 할당된 함수를 메서드(method) 라고 부릅니다.

- 메서드 단축 구문

  ```
  // 아래 두 객체는 동일하게 동작합니다.
  user = {
    sayHi: function() {
      alert("Hello");
    }
  };
  // 단축 구문을 사용하니 더 깔끔해 보이네요.
  // "sayHi: function()"과 동일합니다.
  user = {
    sayHi() {
      alert("Hello");
    }
  };
  ```

- 메서드와 `this`

  - 메서드는 객체에 저장된 정보에 접근할 수 있어야 제 역할을 할 수 있습니다. 모든 메서드가 그런 건 아니지만, 대부분의 메서드가 객체 프로퍼티의 값을 활용합니다.

  - user.sayHi()의 내부 코드에서 객체 user에 저장된 이름(name)을 이용해 인사말을 만드는 경우가 이런 경우에 속합니다.

  - 메서드 내부에서 this 키워드를 사용하면 객체에 접근할 수 있습니다.

  - 이때 '점 앞’의 this는 객체를 나타냅니다. 정확히는 메서드를 호출할 때 사용된 객체를 나타내죠.

- 자유로운 `this`

  - this 값은 런타임에 결정됩니다. 컨텍스트에 따라 달라지죠.
  - 동일한 함수라도 다른 객체에서 호출했다면 'this’가 참조하는 값이 달라집니다.

- 객체 없이 호출하기: this == undefined

  - 객체가 없어도 함수를 호출할 수 있습니다.

  ```
  function sayHi() {
    alert(this);
  }

  sayHi(); // undefined
  // 위와 같은 코드를 엄격 모드에서 실행하면, this엔 undefined가 할당됩니다.
  // this.name으로 name에 접근하려고 하면 에러가 발생하죠.
  ```

  - 그런데 엄격 모드가 아닐 때는 this가 전역 객체를 참조합니다. 브라우저 환경에선 window라는 전역 객체를 참조하죠. 이런 동작 차이는 "use strict"가 도입된 배경이기도 합니다. 전역 객체는 전역 객체에서 자세히 다룰 예정입니다.
    <br />

- 화살표 함수는 일반 함수와는 달리 ‘고유한’ this를 가지지 않습니다. 화살표 함수에서 this를 참조하면, 화살표 함수가 아닌 ‘평범한’ 외부 함수에서 this 값을 가져옵니다.

5. 'new' 연산자와 생성자 함수

- 생성자 함수

  - 생성자 함수(constructor function)와 일반 함수에 기술적인 차이는 없습니다. 다만 생성자 함수는 아래 두 관례를 따릅니다.

  - 함수 이름의 첫 글자는 대문자로 시작합니다.
  - 반드시 "new" 연산자를 붙여 실행합니다.

  ```
  function User(name) {
    this.name = name;
    this.isAdmin = false;
  }

  let user = new User("Jack");

  alert(user.name); // Jack
  alert(user.isAdmin); // false
  ```

  - new User(...)를 써서 함수를 실행하면 아래와 같은 알고리즘이 동작합니다.

    - 빈 객체를 만들어 this에 할당합니다.
    - 함수 본문을 실행합니다.
    - this에 새로운 프로퍼티를 추가해 this를 수정합니다.
    - this를 반환합니다.

- 생성자의 의의는 바로 여기에 있습니다. 재사용할 수 있는 객체 생성 코드를 구현하는 것이죠.

6. 옵셔널 체이닝 '?.'

- 옵셔널 체이닝(optional chaining) ?.을 사용하면 프로퍼티가 없는 중첩 객체를 에러 없이 안전하게 접근할 수 있습니다. (신기)

  ```
  let user = {}; // 주소 정보가 없는 사용자

  alert(user.address.street); // TypeError: Cannot read property 'street' of undefined
  // 기존 방식
  alert( user && user.address && user.address.street ); // undefined, 에러가 발생하지 않습니다.
  // 옵셔널 체이닝 ?.
  alert( user?.address?.street ); // undefined, 에러가 발생하지 않습니다.
  ```

- 옵셔널 체이닝을 남용하지 마세요.

  - ?.는 존재하지 않아도 괜찮은 대상에만 사용해야 합니다.

  - 사용자 주소를 다루는 위 예시에서 논리상 user는 반드시 있어야 하는데 address는 필수값이 아닙니다. 그러니 user.address?.street를 사용하는 것이 바람직합니다.

  - 실수로 인해 user에 값을 할당하지 않았다면 바로 알아낼 수 있도록 해야 합니다. 그렇지 않으면 에러를 조기에 발견하지 못하고 디버깅이 어려워집니다.

- `?.`앞의 변수는 꼭 선언되어 있어야 합니다.

7. 심볼형

// 사실 알고는 있는데, 써보질 않으니 딱히 와닿지 않는 자료형

- 자바스크립트는 객체 프로퍼티 키로 오직 문자형과 심볼형만을 허용합니다.
- 심볼형 키를 사용할 때의 이점에 대해 살펴보도록 하겠습니다.

  - '심볼(symbol)'은 유일한 식별자(unique identifier)를 만들고 싶을 때 사용합니다.
    ```
    let id = Symbol();
    // 심볼 id에는 "id"라는 설명이 붙습니다.
    let id = Symbol("id");
    ```
  - 심볼은 유일성이 보장되는 자료형이기 때문에, 설명이 동일한 심볼을 여러 개 만들어도 각 심볼값은 다릅니다. 심볼에 붙이는 설명(심볼 이름)은 어떤 것에도 영향을 주지 않는 이름표 역할만을 합니다.

    ```
    let id1 = Symbol("id");
    let id2 = Symbol("id");

    alert(id1 == id2); // false
    ```

- '숨김' 프로퍼티

  - 심볼을 이용하면 ‘숨김(hidden)’ 프로퍼티를 만들 수 있습니다. 숨김 프로퍼티는 외부 코드에서 접근이 불가능하고 값도 덮어쓸 수 없는 프로퍼티입니다.
  - 서드파티 코드에서 가지고 온 객체는 함부로 새로운 프로퍼티를 추가할 수 없습니다. 그런데 심볼은 서드파티 코드에서 접근할 수 없기 때문에, 심볼을 사용하면 서드파티 코드가 모르게 user에 식별자를 부여할 수 있습니다.

- 객체 리터럴 {...}을 사용해 객체를 만든 경우, 대괄호를 사용해 심볼형 키를 만들어야 합니다.

  ```
  let id = Symbol("id");

  let user = {
    name: "John",
    [id]: 123 // "id": 123은 안됨
  };
  ```

- 심볼은 for…in 에서 배제됩니다

- 전역 심볼

  - 앞서 살펴본 것처럼, 심볼은 이름이 같더라도 모두 별개로 취급됩니다.
  - 그런데 이름이 같은 심볼이 같은 개체를 가리키길 원하는 경우도 가끔 있습니다. 애플리케이션 곳곳에서 심볼 "id"를 이용해 특정 프로퍼티에 접근해야 한다고 가정해 봅시다.
  - 전역 심볼 레지스트리(global symbol registry) 는 이런 경우를 위해 만들어졌습니다. 전역 심볼 레지스트리 안에 심볼을 만들고 해당 심볼에 접근하면, 이름이 같은 경우 항상 동일한 심볼을 반환해줍니다.
  - 레지스트리 안에 있는 심볼을 읽거나, 새로운 심볼을 생성하려면 Symbol.for(key)를 사용하면 됩니다.
  - 이 메서드를 호출하면 이름이 key인 심볼을 반환합니다. 조건에 맞는 심볼이 레지스트리 안에 없으면 새로운 심볼 Symbol(key)을 만들고 레지스트리 안에 저장합니다.

  ```
  // 전역 레지스트리에서 심볼을 읽습니다.
  let id = Symbol.for("id"); // 심볼이 존재하지 않으면 새로운 심볼을 만듭니다.

  // 동일한 이름을 이용해 심볼을 다시 읽습니다(좀 더 멀리 떨어진 코드에서도 가능합니다).
  let idAgain = Symbol.for("id");

  // 두 심볼은 같습니다.
  alert( id === idAgain ); // true
  ```

- Symbol.keyFor

  - `Symbol.keyFor`는 전역 심볼 레지스트리를 뒤져서 해당 심볼의 이름을 얻어냅니다. 검색 범위가 전역 심볼 레지스트리이기 때문에 전역 심볼이 아닌 심볼에는 사용할 수 없습니다. 전역 심볼이 아닌 인자가 넘어오면 `Symbol.keyFor`는 `undefined`를 반환합니다.

    ```
    // 이름을 이용해 심볼을 찾음
    let sym = Symbol.for("name");
    let sym2 = Symbol.for("id");

    // 심볼을 이용해 이름을 얻음
    alert( Symbol.keyFor(sym) ); // name
    alert( Symbol.keyFor(sym2) ); // id
    ```

  - 전역 심볼이 아닌 모든 심볼은 `description` 프로퍼티가 있습니다. 일반 심볼에서 이름을 얻고 싶으면 `description` 프로퍼티를 사용하면 됩니다.

- 시스템 심볼

  - '시스템 심볼(system symbol)'은 자바스크립트 내부에서 사용되는 심볼입니다. 시스템 심볼을 활용하면 객체를 미세 조정할 수 있습니다.

- 요약

  - Symbol은 원시형 데이터로, 유일무이한 식별자를 만드는 데 사용됩니다.

  - Symbol()을 호출하면 심볼을 만들 수 있습니다. 설명(이름)은 선택적으로 추가할 수 있습니다.

  - 심볼은 이름이 같더라도 값이 항상 다릅니다. 이름이 같을 때 값도 같길 원한다면 전역 레지스트리를 사용해야 합니다. Symbol.for(key)는 key라는 이름을 가진 전역 심볼을 반환합니다. key라는 이름을 가진 전역 심볼이 없으면 새로운 전역 심볼을 만들어줍니다. key가 같다면 Symbol.for는 어디서 호출하든 상관없이 항상 같은 심볼을 반환해 줍니다.

  - 심볼의 주요 유스 케이스는 다음과 같습니다.

    - 객체의 ‘숨김’ 프로퍼티 – 외부 스크립트나 라이브러리에 ‘속한’ 객체에 새로운 프로퍼티를 추가해 주고 싶다면 심볼을 만들고, 이를 프로퍼티 키로 사용하면 됩니다. 키가 심볼인 경우엔 for..in의 대상이 되지 않아서 의도치 않게 프로퍼티가 수정되는 것을 예방할 수 있습니다. 외부 스크립트나 라이브러리는 심볼 정보를 갖고 있지 않아서 프로퍼티에 직접 접근하는 것도 불가능합니다. 심볼형 키를 사용하면 프로퍼티가 우연히라도 사용되거나 덮어씌워 지는 걸 예방할 수 있습니다.

    - 이런 특징을 이용하면 원하는 것을 객체 안에 ‘은밀하게’ 숨길 수 있습니다. 외부 스크립트에선 우리가 숨긴 것을 절대 볼 수 없습니다.

  - 자바스크립트 내부에서 사용되는 시스템 심볼은 Symbol.\*로 접근할 수 있습니다. 시스템 심볼을 이용하면 내장 메서드 등의 기본 동작을 입맛대로 변경할 수 있습니다. iterable 객체에선 Symbol.iterator를, 객체를 원시형으로 변환하기에선 Symbol.toPrimitive이 어떻게 사용되는지 알아보겠습니다.

  - 사실 심볼을 완전히 숨길 방법은 없습니다. 내장 메서드 Object.getOwnPropertySymbols(obj)를 사용하면 모든 심볼을 볼 수 있고, 메서드 Reflect.ownKeys(obj)는 심볼형 키를 포함한 객체의 모든 키를 반환해줍니다. 그런데 대부분의 라이브러리, 내장 함수 등은 이런 메서드를 사용하지 않습니다.

8. 객체를 원시형으로 변환하기
   // 중요도가 떨어지는 부분.

`obj1 + obj2` 처럼 객체끼리 더하는 연산을 하거나, 객체끼리 빼는 연산을 하면, 이 모든 경우에 자동 형 변환이 일어납니다. 객체는 원시값으로 변환되고, 그 후 의도한 연산이 수행됩니다.

- 객체는 논리 평가 시 true를 반환합니다. 단 하나의 예외도 없죠. 따라서 객체는 숫자형이나 문자형으로만 형 변환이 일어난다고 생각하시면 됩니다.
- 숫자형으로의 형 변환은 객체끼리 빼는 연산을 할 때나 수학 관련 함수를 적용할 때 일어납니다. 객체 Date끼리 차감하면(date1 - date2) 두 날짜의 시간 차이가 반환됩니다. Date에 대해선 Date 객체와 날짜에서 다룰 예정입니다.
- 문자형으로의 형 변환은 대개 alert(obj)같이 객체를 출력하려고 할 때 일어납니다.

---

### 6. ProtoType

#### 사전 준비

#### 프로퍼티 플래그와 설명자

객체엔 프로퍼티가 저장됩니다.

지금까진 프로퍼티를 단순히 ‘키-값’ 쌍의 관점에서만 다뤘습니다. 그런데 사실 프로퍼티는 우리가 생각했던 것보다 더 유연하고 강력한 자료구조입니다.
객체 프로퍼티는 값(value) 과 함께 플래그(flag)라 불리는 특별한 속성 세 가지를 갖습니다.

- writable – true이면 값을 수정할 수 있습니다. 그렇지 않다면 읽기만 가능합니다.
- enumerable – true이면 반복문을 사용해 나열할 수 있습니다. 그렇지 않다면 반복문을 사용해 나열할 수 없습니다.
- configurable – true이면 프로퍼티 삭제나 플래그 수정이 가능합니다. 그렇지 않다면 프로퍼티 삭제와 플래그 수정이 불가능합니다.

Object.getOwnPropertyDescriptor메서드를 사용하면 특정 프로퍼티에 대한 정보를 모두 얻을 수 있습니다.
`let descriptor = Object.getOwnPropertyDescriptor(obj, propertyName);`

`Object.defineProperty(obj, descriptors)` : 프로퍼티 1개를 정의할 수 있습니다.
`Object.defineProperties(obj, descriptors)` : 프로퍼티 여러 개를 한 번에 정의할 수 있습니다.

```
Object.defineProperties(obj, {
  prop1: descriptor1,
  prop2: descriptor2
  // ...
});
```

#### 프로퍼티 getter와 setter

객체의 프로퍼티는 두 종류로 나뉩니다.

1. 데이터 프로퍼티(data property)
2. 접근자 프로퍼티(accessor property)
   - 접근자 프로퍼티의 본질은 함수
   - 이 함수는 값을 획득(get)하고 설정(set)하는 역할을 담당
   - 외부 코드에서는 함수가 아닌 일반적인 프로퍼티처럼 보임

getter와 setter
접근자 프로퍼티는 'getter(획득자)'와 ‘setter(설정자)’ 메서드로 표현됩니다. 객체 리터럴 안에서 getter와 setter 메서드는 get과 set으로 나타낼 수 있습니다.

```
//접근자 프로퍼티엔 설명자 value와 writable가 없는 대신에 get과 set이라는 함수가 있습니다.
let user = {
  name: "John",
  surname: "Smith",

  get fullName() {
    return `${this.name} ${this.surname}`;
  },

  set fullName(value) {
    [this.name, this.surname] = value.split(" ");
  }
};

// 주어진 값을 사용해 set fullName이 실행됩니다.
user.fullName = "Alice Cooper";

alert(user.name); // Alice
alert(user.surname); // Cooper
```

이렇게 getter와 setter 메서드를 구현하면 객체엔 `fullName`이라는 '가상’의 프로퍼티가 생깁니다. 가상의 프로퍼티는 읽고 쓸 순 있지만 실제로는 존재하지 않습니다.

아래 예시에선 name을 위한 setter를 만들어 user의 이름이 너무 짧아지는 걸 방지하고 있습니다. 실제 값은 별도의 프로퍼티 \_name에 저장됩니다.

```
let user = {
  get name() {
    return this._name;
  },

  set name(value) {
    if (value.length < 4) {
      alert("입력하신 값이 너무 짧습니다. 네 글자 이상으로 구성된 이름을 입력하세요.");
      return;
    }
    this._name = value;
  }
};

user.name = "Pete";
alert(user.name); // Pete

user.name = ""; // 너무 짧은 이름을 할당하려 함
```

user의 이름은 \_name에 저장되고, 프로퍼티에 접근하는 것은 getter와 setter를 통해 이뤄집니다.

기술적으론 외부 코드에서 user.\_name을 사용해 이름에 바로 접근할 수 있습니다. 그러나 밑줄 "\_" 로 시작하는 프로퍼티는 객체 내부에서만 활용하고, 외부에서는 건드리지 않는 것이 관습입니다.

---

### 프로토타입과 프로토타입 상속

#### ProtoType 상속

자바스크립트는 ProtoType언어이고 ES6의 Class도 내부는 Prototype으로 작동함.

프로토타입은 `[[Prototype]]`이 참조하는 객체, 즉 자신을 만들어낸 객체의 원형을 뜻한다.

Prototype Link - 자신을 만들어낸 객체의 원형 // 클래스의 틀
Prototype Object - 자신을 통해 만들어질 객체의 원형 // 인스턴스

\_\_proto\_\_ - 자신을 만들어낸 객체의 원형과 연결된 속성이다.

```
let animal = {
eats: true
};
let rabbit = {
jumps: true
};

rabbit.__proto__ = animal;
// console 함수가 rabbit.eats 프로퍼티를 읽으려 했는데, rabbit엔 eats라는 프로퍼티가 없습니다.
// 이때 자바스크립트는 [[Prototype]]이 참조하고 있는 객체인 animal에서 eats를 얻어냅니다.

console.log(rabbit.eats); // true
```

- “rabbit의 프로토타입은 animal입니다.” 혹은 "rabbit은 animal을 상속받는다."라고 말 할 수 있게 되었습니다.

프로토타입 체이닝엔 두 가지 제약사항이 있습니다.

- 순환 참조(circular reference)는 허용되지 않습니다.
- \_\_proto\_\_의 값은 객체나 null만 가능합니다. 다른 자료형은 무시됩니다.
- 여기에 더하여 객체엔 오직 하나의 `[[Prototype]]`만 있을 수 있다는 당연한 제약도 있습니다. 객체는 두 개의 객체를 상속받지 못합니다.

쓸 때는 프로토타입을 사용하지 않습니다.
프로토타입은 프로퍼티를 읽을 때만 사용합니다.
프로퍼티를 추가, 수정하거나 지우는 연산은 객체에 직접 해야 합니다.
`obj`에서 프로퍼티를 읽거나 메서드를 호출하려는데 해당하는 프로퍼티나 메서드가 없으면 자바스크립트는 프로토타입에서 프로퍼티나 메서드를 찾습니다.

```
let user = {
  name: "John",
  surname: "Smith",

  set fullName(value) {
    [this.name, this.surname] = value.split(" ");
  },

  get fullName() {
    return `${this.name} ${this.surname}`;
  }
};

let admin = {
  __proto__: user,
  isAdmin: true
};

// admin.fullName은 프로토타입(user)에 있는 getter 함수(get fullName)를 호출
alert(admin.fullName); // John Smith

// 할당 연산은 프로토타입에 있는 setter 함수(set fullName)를 호출합니다.
admin.fullName = "Alice Cooper";

alert(admin.fullName); // Alice Cooper , state of admin modified
alert(user.fullName); // John Smith , state of user protected
```

여기서 this는 메서드를 객체에서 호출했든 프로토타입에서 호출했든 상관없이 언제나 . 앞에 있는 객체가 됩니다.
admin.fullName=으로 setter 함수를 호출할 때, this는 user가 아닌 admin이 되죠.

```
// 추가 예시
let animal = {
  walk() {
    if (!this.isSleeping) {
      alert(`동물이 걸어갑니다.`);
    }
  },
  sleep() {
    this.isSleeping = true;
  }
};

let rabbit = {
  name: "하얀 토끼",
  __proto__: animal
};

// rabbit의 프로퍼티 isSleeping을 true로 변경합니다.
rabbit.sleep();

alert(rabbit.isSleeping); // true
alert(animal.isSleeping); // undefined (프로토타입에는 isSleeping이라는 프로퍼티가 없습니다.)
```

`rabbit` 말고도 `bird`, `snake` 등이 `animal`을 상속받는다고 해봅시다. 이 객체들도 `rabbit`처럼 `animal`에 구현된 메서드를 사용할 수 있겠죠. 이때 상속받은 메서드의 this는 `animal`이 아닌 실제 메서드가 호출되는 시점의 점(.) 앞에 있는 객체가 됩니다. 따라서 this에 데이터를 쓰면 `animal`이 아닌 해당 객체의 상태가 변화합니다.

- 모던 엔진에선 객체에서 프로퍼티를 가져오는 것과 객체의 프로토타입에서 프로퍼티를 가져오는 것 사이에 성능적인 차이가 없습니다.
- 모던 엔진은 프로퍼티가 어디서 발견됐는지 기억하고 있다가 다음 요청 시 이 정보를 재사용합니다.

---

#### 함수의 prototype 프로퍼티

함수.prototype에서 "prototype"은 함수에 정의된 일반 프로퍼티라는 점에 주의해 주시기 바랍니다.

```
let animal = {
  eats: true
};

function Rabbit(name) {
  this.name = name;
}

Rabbit.prototype = animal;
// new Rabbit을 호출해 만든 새로운 객체의 [[Prototype]]을 animal로 설정.
let rabbit = new Rabbit("White Rabbit"); //  rabbit.__proto__ == animal

alert( rabbit.eats ); // true
```

- F.prototype은 new F를 호출할 때만 사용.
- new F를 호출해 새롭게 만든 객체의 `[[Prototype]]`을 할당.

F.prototype 프로퍼티가 바뀌면

- new F로 만들어지는 새로운 객체는 변경된 `[[Prototype]]`를 갖게 됩니다.
- 다만, 기존 객체의 `[[Prototype]]`은 그대로 유지됩니다.

<br />
개발자가 할당하지 않더라도 모든 함수는 "prototype" 프로퍼티를 갖습니다.

constructor - 생성자로써, 자신을 만들어낸 객체와 연결된 속성이다.
prototype - 자신을 원형으로 만들어진 새로운 객체들과 연결된 속성이다.

기본 프로퍼티인 "prototype"은 constructor 프로퍼티 하나만 있는 객체를 가리키는데, 이 constructor 프로퍼티는 함수 자신을 가리킵니다.

```
function Rabbit() {}
// 기본 prototype:
// Rabbit.prototype = { constructor: Rabbit }

alert( Rabbit.prototype.constructor == Rabbit ); // true
```

함수의 기본 "prototype" 값을 다른 객체로 바꾸면 이 객체엔 "constructor"가 없어짐.

```
function Rabbit() {}
Rabbit.prototype = {
  jumps: true
};

let rabbit = new Rabbit();
alert(rabbit.constructor === Rabbit); // false
```

이런 상황을 방지하고 알맞은 constructor를 유지하려면 "prototype" 전체를 덮어쓰지 말고 기본 "prototype"에 원하는 프로퍼티를 추가/제거해야 합니다.

```
function Rabbit() {}
// Rabbit.prototype 전체를 덮어쓰지 말고
// 원하는 프로퍼티는 그냥 추가하세요.
Rabbit.prototype.jumps = true
// 이렇게 하면 기본 Rabbit.prototype.constructor가 유지됩니다.
```

---

#### 네이티브 프로토타입

```
let obj = {};

alert(obj.__proto__ === Object.prototype); // true

alert(obj.toString === obj.__proto__.toString); //true
alert(obj.toString === Object.prototype.toString); //true
```

```
let arr = [1, 2, 3];

// arr은 Array.prototype을 상속받았나요?
alert( arr.__proto__ === Array.prototype ); // true

// arr은 Object.prototype을 상속받았나요?
alert( arr.__proto__.__proto__ === Object.prototype ); // true

// 체인 맨 위엔 null이 있습니다.
alert( arr.__proto__.__proto__.__proto__ ); // null
```

네이티브 프로토타입을 수정할 수 있습니다. String.prototype에 메서드를 하나 추가하면 모든 문자열에서 해당 메서드를 사용할 수 있죠.

```
String.prototype.show = function() {
  alert(this);
};

"BOOM!".show(); // BOOM!
```

Array, function 등 전부 해당됩니다.
하지만 네이티브 프로토타입을 수정하는 것은 권장되지 않습니다.
<br />

**자바스크립트의 모든 객체는 Object 객체의 프로토타입을 기반으로 확장되었기 때문에 연결의 끝은 항상 Object 이다.**

---

#### 프로토타입 메서드와 `__proto__`가 없는 객체

이 절의 첫 번째 챕터에서 프로토타입을 설정하기 위한 모던한 방법이 있다고 언급했습니다.

`**proto**`는 브라우저를 대상으로 개발하고 있다면 다소 구식이기 때문에 더는 사용하지 않는 것이 좋습니다. 표준에도 관련 내용이 명시되어있습니다.

대신 아래와 같은 모던한 메서드들을 사용하는 것이 좋죠.

- Object.create(proto, descriptors) – `[[Prototype]]`이 proto를 참조하는 빈 객체를 만듭니다. 이때 프로퍼티 설명자를 추가로 넘길 수 있습니다.
- Object.getPrototypeOf(obj) – obj의 `[[Prototype]]`을 반환합니다.
- Object.setPrototypeOf(obj, proto) – obj의 `[[Prototype]]`이 proto가 되도록 설정합니다

```
let animal = {
  eats: true
};

// 프로토타입이 animal인 새로운 객체를 생성합니다.
let rabbit = Object.create(animal);

alert(rabbit.eats); // true
alert(Object.getPrototypeOf(rabbit) === animal); // true

Object.setPrototypeOf(rabbit, {}); // rabbit의 프로토타입을 {}으로 바꿉니다.

// Object.create에는 프로퍼티 설명자를 선택적으로 전달할 수 있습니다.
// 설명자를 이용해 새 객체에 프로퍼티를 추가해 보겠습니다.
let rabbit = Object.create(animal, {
  jumps: {
    value: true
  }
});

alert(rabbit.jumps); // true
```

Object.create를 사용하면 for..in을 사용해 프로퍼티를 복사하는 것보다 더 효과적으로 객체를 복제할 수 있습니다.

```
let clone = Object.create(Object.getPrototypeOf(obj), Object.getOwnPropertyDescriptors(obj));
```

Object.create를 호출하면 obj의 모든 프로퍼티를 포함한 완벽한 사본이 만들어집니다, 사본엔 열거 가능한 프로퍼티와 불가능한 프로퍼티, 데이터 프로퍼티, getter, setter 등 모든 프로퍼티가 복제됩니다. `[[Prototype]]`도 복제되죠.

**Object.setPrototypeOf나 obj.**proto**=를 써서 프로토타입을 그때그때 바꾸는 연산은 객체 프로퍼티 접근 관련 최적화를 망치기 때문에 매우 느립니다.**

reference

https://ko.javascript.info/object-properties
https://ko.javascript.info/prototypes
https://developer.mozilla.org/ko/docs/Web/JavaScript/Inheritance_and_the_prototype_chain
[출처: https://mygumi.tistory.com/312 [마이구미의 HelloWorld]](https://mygumi.tistory.com/312)

---

### 7. Class

JS는 class가 없었지만, ES6때 추가 되었음.

클래스는 특정 객체를 생성하기 위해 변수와 메소드를 정의하는 일종의 틀이고 그 틀로 생성한 객체는 인스턴스다.(메모리 할당)

1. 클래스와 기본 문법

   - 클래스는 다음과 같은 기본 문법을 사용해 만들 수 있습니다.

     ```
     class MyClass {
       // 여러 메서드를 정의할 수 있음
       constructor() { ... }
       method1() { ... }
       method2() { ... }
       method3() { ... }
       ...
     }
     ```

     - 객체의 기본 상태를 설정해주는 생성자 메서드 constructor()는 new에 의해 자동으로 호출되므로, 특별한 절차 없이 객체를 초기화 할 수 있습니다.
     - 메서드 사이엔 쉼표가 없습니다.

   - 클래스는 단순한 편의 문법이 아닙니다

     ```
     // class User와 동일한 기능을 하는 순수 함수를 만들어보겠습니다.

      // 1. 생성자 함수를 만듭니다.
      function User(name) {
        this.name = name;
      }
      // 모든 함수의 프로토타입은 'constructor' 프로퍼티를 기본으로 갖고 있기 때문에
      // constructor 프로퍼티를 명시적으로 만들 필요가 없습니다.

      // 2. prototype에 메서드를 추가합니다.
      User.prototype.sayHi = function() {
        alert(this.name);
      };

      // 사용법:
      let user = new User("John");
      user.sayHi();
     ```

     - `class`로 만든 함수엔 특수 내부 프로퍼티인 `[[FunctionKind]]`:"classConstructor"가 이름표처럼 붙습니다.
     - 이런 검증 과정이 있기 때문에 클래스 생성자를 new와 함께 호출하지 않으면 에러가 발생합니다.
     - 클래스 메서드는 열거할 수 없습니다(non-enumerable).
     - 클래스는 항상 엄격 모드로 실행됩니다(`use strict`).

2. 클래스 상속

   - 과거부터 JS는 proto 로 이 부분을 구현해왔음.

     ```
       class Rabbit extends Animal {
         hide() {
           alert(`${this.name} 이/가 숨었습니다!`);
         }
       }

       let rabbit = new Rabbit("흰 토끼");

       rabbit.run(5); // 흰 토끼 은/는 속도 5로 달립니다.
       rabbit.hide(); // 흰 토끼 이/가 숨었습니다!
     ```

   - 키워드 `super`는 이럴 때 사용합니다.

     - super.method(...)는 부모 클래스에 정의된 메서드, method를 호출합니다.
     - super(...)는 부모 생성자를 호출하는데, 자식 생성자 내부에서만 사용 할 수 있습니다.

     ```
     class Animal {
       constructor(name) {
         this.speed = 0;
         this.name = name;
       }
       run(speed) {
         this.speed = speed;
         alert(`${this.name}가 속도 ${this.speed}로 달립니다.`);
       }
       stop() {
         this.speed = 0;
         alert(`${this.name}가 멈췄습니다.`);
       }
     }
     class Rabbit extends Animal {
       hide() {
         alert(`${this.name}가 숨었습니다!`);
       }
       stop() {
         super.stop(); // 부모 클래스의 stop을 호출해 멈추고,
         this.hide(); // 숨습니다.
       }
     }
     let rabbit = new Rabbit("흰 토끼");

     rabbit.run(5); // 흰 토끼가 속도 5로 달립니다.
     rabbit.stop(); // 흰 토끼가 멈췄습니다. 흰 토끼가 숨었습니다!
     ```

     - 화살표 함수는 super를 지원하지 않습니다.
       `this`가 다르니, 어찌보면 당연한듯
       <br />

   - 생성자 오버라이딩
     - 명세서에 따르면, 클래스가 다른 클래스를 상속받고 `constructor`가 없는 경우엔 아래처럼 ‘비어있는’ `constructor`가 만들어집니다.
       ```
       class Rabbit extends Animal {
         // 자체 생성자가 없는 클래스를 상속받으면 자동으로 만들어짐
         constructor(...args) {
           super(...args);
         }
         //////////////////////////////////////
         ...
       }
       ```
     - 생성자는 기본적으로 부모 constructor를 호출합니다.
     - super(...)는 this를 사용하기 전에 반드시 호출해야 합니다.
       ```
        class Animal {
          constructor(name) {
            this.speed = 0;
            this.name = name;
          }
          // ...
        }
        class Rabbit extends Animal {
          constructor(name, earLength) {
            super(name);
            this.earLength = earLength;
          }
          // ...
        }
        // 이제 에러 없이 동작합니다.
        let rabbit = new Rabbit("흰 토끼", 10);
        alert(rabbit.name); // 흰 토끼
        alert(rabbit.earLength); // 10
       ```

3. 정적 메서드와 정적 프로퍼티

- `prototype`이 아닌 클래스 함수 자체에 메서드를 설정할 수도 있습니다. 이런 메서드를 정적(static) 메서드라고 부릅니다.

- 정적 메서드는 아래와 같이 클래스 안에서 static 키워드를 붙여 만들 수 있습니다.

  ```
  // 아래 2개는 동일
  class User {
    static staticMethod() {
      alert(this === User);
    }
  }

  User.staticMethod(); // true
  //////////////////////////////////////////////
  class User { }

  User.staticMethod = function() {
    alert(this === User);
  };

  User.staticMethod(); // true
  ```

- 정적 메서드는 어떤 특정한 객체가 아닌 클래스에 속한 함수를 구현하고자 할 때, 특정 클래스 인스턴스가 아닌 클래스 '전체’에 필요한 기능을 만들 때 사용할 수 있습니다.
- 정적 메서드는 클래스 선언부 안에 위치하고 앞에 static이라는 키워드가 붙습니다.
- 정적 프로퍼티도 물론 만들 수 있습니다. 정적 프로퍼티는 일반 클래스 프로퍼티와 유사하게 생겼는데 앞에 static이 붙는다는 점만 다릅니다.
- 정적 프로퍼티와 메서드는 상속됩니다.

4. private, protected 프로퍼티와 메서드

- 내부 인터페이스와 외부 인터페이스
  객체 지향 프로그래밍에서 프로퍼티와 메서드는 두 그룹으로 분류됩니다.

  - 내부 인터페이스(internal interface) – 동일한 클래스 내의 다른 메서드에선 접근할 수 있지만, 클래스 밖에선 접근할 수 없는 프로퍼티와 메서드
  - 외부 인터페이스(external interface) – 클래스 밖에서도 접근 가능한 프로퍼티와 메서드

- 자바스크립트에는 아래와 같은 두 가지 타입의 객체 필드(프로퍼티와 메서드)가 있습니다.

  - public: 어디서든지 접근할 수 있으며 외부 인터페이스를 구성합니다. 지금까지 다룬 프로퍼티와 메서드는 모두 public입니다.
  - private: 클래스 내부에서만 접근할 수 있으며 내부 인터페이스를 구성할 때 쓰입니다.

- 프로퍼티 보호하기

  - 예시 코드
    ```
    class CoffeeMachine {
      _waterAmount = 0;
      set waterAmount(value) {
        if (value < 0) throw new Error("물의 양은 음수가 될 수 없습니다.");
        this._waterAmount = value;
      }
      get waterAmount() {
        return this._waterAmount;
      }
      constructor(power) {
        this._power = power;
      }
    }
    // 커피 머신 생성
    let coffeeMachine = new CoffeeMachine(100);
    // 물 추가
    coffeeMachine.waterAmount = -10; // Error: 물의 양은 음수가 될 수 없습니다.
    ```
  - **protected 프로퍼티 명 앞엔 밑줄 \_이 붙습니다.**
  - 자바스크립트에서 강제한 사항은 아니지만, 밑줄은 프로그래머들 사이에서 외부 접근이 불가능한 프로퍼티나 메서드를 나타낼 때 씁니다.
  - waterAmount에 밑줄을 붙여 protected 프로퍼티로 만들어줍시다.

- 읽기 전용 프로퍼티
  - 읽기 전용 프로퍼티를 만들려면 setter(설정자)는 만들지 않고 getter(획득자)만 만들어야 합니다.
    ```
    class CoffeeMachine {
      // ...
      constructor(power) {
        this._power = power;
      }
      get power() {
        return this._power;
      }
    }
    // 커피 머신 생성
    let coffeeMachine = new CoffeeMachine(100);
    alert(`전력량이 ${coffeeMachine.power}인 커피머신을 만듭니다.`); // 전력량이 100인 커피머신을 만듭니다.
    coffeeMachine.power = 25; // Error (setter 없음)
    ```
- protected 필드는 상속됩니다.
- private 프로퍼티(최신문법)

  - private 프로퍼티와 메서드는 제안(proposal) 목록에 등재된 문법으로, 명세서에 등재되기 직전 상태입니다.

  - private 프로퍼티와 메서드는 #으로 시작합니다. #이 붙으면 클래스 안에서만 접근할 수 있습니다.

  - 물 용량 한도를 나타내는 private 프로퍼티 #waterLimit과 남아있는 물의 양을 확인해주는 private 메서드 #checkWater를 구현해봅시다.
    ```
    class CoffeeMachine {
      #waterLimit = 200;
      #checkWater(value) {
        if (value < 0) throw new Error("물의 양은 음수가 될 수 없습니다.");
        if (value > this.#waterLimit) throw new Error("물이 용량을 초과합니다.");
      }
    }
    let coffeeMachine = new CoffeeMachine();
    // 클래스 외부에서 private에 접근할 수 없음
    coffeeMachine.#checkWater(); // Error
    coffeeMachine.#waterLimit = 1000; // Error
    ```
  - `#`은 자바스크립트에서 지원하는 문법으로, private 필드를 의미합니다. private 필드는 클래스 외부나 자손 클래스에서 접근할 수 없습니다.
  - private 필드는 public 필드와 상충하지 않습니다. private 프로퍼티 #waterAmount와 public 프로퍼티 waterAmount를 동시에 가질 수 있습니다.

- **캡슐화 하는 이유**

  - 사용자가 자신의 발등을 찍지 않도록 보호
    커피 머신를 함께 사용하는 개발팀이 있다고 상상해봅시다. "Best CoffeeMachine"이라는 회사에서 만든 이 커피 머신은 현재 잘 작동하고 있지만, 보호 커버가 없어서 내부 인터페이스가 노출되어있는 상황입니다.
  - 교양있는 팀원들은 모두 설계 의도에 맞게 커피 머신을 사용합니다. 그런데 어느 날 John이라는 개발자가 자신의 능력을 과신하며 커피 머신 내부를 살짝 만지게 됩니다. 이틀 후, 커피 머신은 고장이 나버렸죠.
  - 커피 머신이 고장 난 건 John의 잘못이라기보다는, 보호 커버를 없애고 John이 마음대로 조작하도록 내버려 둔 사람의 잘못입니다.
  - 프로그래밍에서도 마찬가지입니다. 외부에서 의도치 않게 클래스를 조작하게 되면 그 결과는 예측할 수 없게 됩니다.

- **지원 가능**

  - 실제 개발 과정에서 일어나는 상황은 커피 머신 사례보다 훨씬 복잡합니다. 커피 머신은 한번 구매하면 끝이지만 실제 코드는 유지보수가 끊임없이 일어나기 때문입니다.
  - 내부 인터페이스를 엄격하게 구분하면, 클래스 개발자들은 사용자에게 알리지 않고도 자유롭게 내부 프로퍼티와 메서드들을 수정할 수 있습니다.
  - 내부 인터페이스가 엄격히 구분된 클래스를 만지고 있다면, 그 어떤 외부 코드도 내부 private 메서드에 의존하고 있지 않기 때문에 private 메서드의 이름을 안전하게 바꿀 수 있고, 매개변수를 변경하거나 없앨 수도 있다는 것을 알아 두면 됩니다.

- **복잡성 은닉**

  - 사람들은 간단한 것을 좋아합니다. 내부는 간단치 않더라도 최소한 외형은 간단해야 하죠.

- **protected 필드는 \*로 시작합니다**. \*은 자바스크립트에서 지원하는 문법은 아니지만, protected 필드를 나타낼 때 관습처럼 사용됩니다. 개발자는 protected 프로퍼티가 정의된 클래스와 해당 클래스를 상속받는 클래스에서만 \_가 붙은 필드에 접근해야 합니다.
- **private 필드는 #로 시작하며**, 자바스크립트에서 지원하는 문법입니다. #로 시작하는 필드는 해당 필드가 정의된 클래스 내부에서만 접근 가능합니다.

5. 내장 클래스 확장하기

- 배열, 맵 같은 내장 클래스도 확장 가능합니다.

  ```
  // 메서드 하나를 추가합니다(더 많이 추가하는 것도 가능).
  class PowerArray extends Array {
    isEmpty() {
      return this.length === 0;
    }
  }

  let arr = new PowerArray(1, 2, 5, 10, 50);
  alert(arr.isEmpty()); // false

  let filteredArr = arr.filter(item => item >= 10);
  alert(filteredArr); // 10, 50
  alert(filteredArr.isEmpty()); // false
  ```

6. 'instanceof'로 클래스 확인하기

- instanceof 연산자를 사용하면 객체가 특정 클래스에 속하는지 아닌지를 확인할 수 있습니다. instanceof는 상속 관계도 확인해줍니다.

  ```
  class Rabbit {}
  let rabbit = new Rabbit();
  // rabbit이 클래스 Rabbit의 객체인가요?
  alert( rabbit instanceof Rabbit ); // true
  ```

  - `instanceof`는 생성자 함수에서도 사용할 수 있습니다.
  - `Array` 같은 내장 클래스에도 사용할 수 있습니다.

    ```
    // 클래스가 아닌 생성자 함수
    function Rabbit() {}

    alert( new Rabbit() instanceof Rabbit ); // true
    let arr = [1, 2, 3];
    alert( arr instanceof Array ); // true
    alert( arr instanceof Object ); // true
    ```

7. 믹스인

- 자바스크립트는 단일상속만을 허용하는 언어입니다. 객체엔 단 하나의 `[[Prototype]]`만 있을 수 있고, 클래스는 클래스 하나만 상속받을 수 있습니다.
- 믹스인(mixin)을 다른 클래스를 상속받을 필요 없이 이들 클래스에 구현되어있는 메서드를 담고 있는 클래스라고 정의합니다.

- 자바스크립트에서 믹스인을 구현할 수 있는 가장 쉬운 방법은 유용한 메서드 여러 개가 담긴 객체를 하나 만드는 것입니다. 이렇게 하면 다수의 메서드를 원하는 클래스의 프로토타입에 쉽게 병합할 수 있습니다.
  ```
  // 믹스인
  let sayHiMixin = {
    sayHi() {
      alert(`Hello ${this.name}`);
    },
    sayBye() {
      alert(`Bye ${this.name}`);
    }
  };
  // 사용법:
  class User {
    constructor(name) {
      this.name = name;
    }
  }
  // 메서드 복사
  Object.assign(User.prototype, sayHiMixin);
  // 이제 User가 인사를 할 수 있습니다.
  new User("Dude").sayHi(); // Hello Dude!
  ```
- 믹스인 은 객체 지향 언어에서 범용적으로 쓰이는 용어로, 다른 클래스들의 메서드 조합을 포함하는 클래스를 의미합니다.

- 몇몇 언어는 다중상속을 허용합니다. 자바스크립트는 다중상속을 지원하지 않는데, 믹스인을 사용하면 메서드를 복사해 프로토타입에 구현할 수 있습니다.

---

### 8. Promise와 async, await

1. 콜백

`setTimeout`은 스케줄링에 사용되는 가장 대표적인 함수입니다.

무언가를 비동기적으로 수행하는 함수는 함수 내 동작이 모두 처리된 후 실행되어야 하는 함수가 들어갈 콜백을 인수로 반드시 제공해야 합니다.

- 콜백 지옥

  ```
  loadScript('1.js', function(error, script) {
      if (error) {
        handleError(error);
      } else {
        // ...
        loadScript('2.js', function(error, script) {
          if (error) {
            handleError(error);
          } else {
            // ...
            loadScript('3.js', function(error, script) {
              if (error) {
                handleError(error);
              } else {
                // 모든 스크립트가 로딩된 후, 실행 흐름이 이어집니다. (*)
              }
            });
          }
        })
      }
    });
  ```

  - 위 코드는 다음과 같이 동작합니다.

    - 1.js를 로드합니다. 그 후 에러가 없으면,
    - 2.js를 로드합니다. 그 후 에러가 없으면,
    - 3.js를 로드합니다. 그 후 에러가 없으면 (\*)로 표시한 줄에서 또 다른 작업을 수행합니다.

  - 호출이 계속 중첩되면서 코드가 깊어지고 있네요. 본문 중간중간 ...로 표시한 곳에 반복문과 조건문이 있는 코드가 들어가면 관리는 특히나 더 힘들어질 겁니다.

  - 이렇게 깊은 중첩 코드가 만들어내는 패턴은 소위 ‘콜백 지옥(callback hell)’ 혹은 '멸망의 피라미드(pyramid of doom)'라고 불립니다.

- 콜백으로 더 나은 코드
  ```
    loadScript('1.js', step1);
    function step1(error, script) {
      if (error) {
        handleError(error);
      } else {
        // ...
        loadScript('2.js', step2);
      }
    }
    function step2(error, script) {
      if (error) {
        handleError(error);
      } else {
        // ...
        loadScript('3.js', step3);
      }
    }
    function step3(error, script) {
      if (error) {
        handleError(error);
      } else {
        // 모든 스크립트가 로딩되면 다른 동작을 수행합니다. (*)
      }
    };
  ```
  - 이렇게 짜면 재사용 할 수가 없음.

2. `promise`

- `promise` 객체는 아래와 같은 문법으로 만들 수 있습니다

  ```
  let promise = new promise(function(resolve, reject) {
    // executor (제작 코드, '가수')
  });
  ```

  - executor에선 결과를 즉시 얻든, 늦게 얻든 상관없이 상황에 따라 인수로 넘겨준 콜백 중 하나를 반드시 호출해야 합니다.

    - resolve(value) — 일이 성공적으로 끝난 경우, 그 결과를 나타내는 value와 함께 호출
    - reject(error) — 에러 발생 시 에러 객체를 나타내는 error와 함께 호출
      <br />

  - new promise 생성자가 반환하는 promise 객체는 다음과 같은 내부 프로퍼티를 갖습니다.

    - state — 처음엔 "pending"(보류)이었다 resolve가 호출되면 fulfilled", reject가 호출되면 "rejected"로 변합니다.
    - result — 처음엔 undefined이었다, resolve(value)가 호출되면 value로, reject(error)가 호출되면 error로 변합니다.

    <br />

- 소비자: then, catch, finally
  - `.then`은 프라미스에서 가장 중요하고 기본이 되는 메서드입니다.
    - 첫 번째 인수는 프라미스가 이행되었을 때 실행되는 함수이고, 여기서 실행 결과를 받습니다.
    - 두 번째 인수는 프라미스가 거부되었을 때 실행되는 함수이고, 여기서 에러를 받습니다.
    - 작업이 성공적으로 처리된 경우만 다루고 싶다면 .then에 인수를 하나만 전달하면 됩니다.
  - `.catch`
    - 에러가 발생한 경우만 다루고 싶다면 .then(null, errorHandlingFunction)같이 null을 첫 번째 인수로 전달하면 됩니다. .catch(errorHandlingFunction)를 써도 되는데, .catch는 .then에 null을 전달하는 것과 동일하게 작동합니다.
    - .catch(f)는 문법이 간결하다는 점만 빼고 .then(null,f)과 완벽하게 같습니다.
  - `.finally`
    - try {...} catch {...}에 finally 절이 있는 것처럼, 프라미스에도 finally가 있습니다.
    - 프라미스가 처리되면(이행이나 거부) f가 항상 실행된다는 점에서 .finally(f) 호출은 .then(f, f)과 유사합니다.

3. `promise` 체이닝

- 프라미스 체이닝은 result가 .then 핸들러의 체인(사슬)을 통해 전달된다는 점에서 착안한 아이디어입니다.

  - 1초 후 최초 프라미스가 이행됩니다, – (\*)
  - 이후 .then 핸들러가 호출됩니다. –(\*\*)
  - 2에서 반환한 값은 다음 .then 핸들러에 전달됩니다. – (\*\*\*)
  - 이런 과정이 계속 이어집니다.

4. `promise`와 에러 핸들링

- 프라미스 체인은 에러를 잘 처리합니다. 프라미스가 거부되면 제어 흐름이 제일 가까운 rejection 핸들러로 넘어갑니다. 이는 실무에서 아주 유용하게 사용됩니다.
- `.then` 핸들러를 원하는 만큼 사용하다 마지막에 `.catch` 하나만 붙이면, `.then` 핸들러에서 발생한 모든 에러를 처리할 수 있습니다.
- 에러 발생 시, 회복할 방법이 없다면 .catch를 사용하지 않아도 괜찮습니다.

5. `promise` API
   Promise 클래스에는 5가지 정적 메서드가 있습니다.

- Promise.all

  - Promise.all은 여러 개의 프라미스를 동시에 실행시키고 모든 프라미스가 준비될 때까지 기다린 후 실행 됩니다.
  - 프라미스가 하나라도 거부되면 Promise.all은 즉시 거부되고 배열에 저장된 다른 프라미스의 결과는 완전히 잊힙니다. 이행된 프라미스의 결과도 무시되죠.
    `let promise = Promise.all([...promises...]);`

    ```
    let urls = [
      'https://api.github.com/users/iliakan',
      'https://api.github.com/users/remy',
      'https://api.github.com/users/jeresig'
    ];

    // fetch를 사용해 url을 프라미스로 매핑합니다.
    let requests = urls.map(url => fetch(url));

    // Promise.all은 모든 작업이 이행될 때까지 기다립니다.
    Promise.all(requests)
      .then(responses => responses.forEach(
        response => alert(`${response.url}: ${response.status}`)
      ));
      /////////////////////////////////////////////////
      // ex2
      let names = ['iliakan', 'remy', 'jeresig'];

      let requests = names.map(name => fetch(`https://api.github.com/users/${name}`));

      Promise.all(requests)
        .then(responses => {
          // 모든 응답이 성공적으로 이행되었습니다.
          for(let response of responses) {
            alert(`${response.url}: ${response.status}`); // 모든 url의 응답코드가 200입니다.
          }

          return responses;
        })
        // 응답 메시지가 담긴 배열을 response.json()로 매핑해, 내용을 읽습니다.
        .then(responses => Promise.all(responses.map(r => r.json())))
        // JSON 형태의 응답 메시지는 파싱 되어 배열 'users'에 저장됩니다.
        .then(users => users.forEach(user => alert(user.name)));
    ```

- Promise.allSettled

  - `Promise.all`은 프라미스가 하나라도 거절되면 전체를 거절합니다.
  - 반면, Promise.allSettled는 모든 프라미스가 처리될 때까지 기다립니다. 반환되는 배열은 다음과 같은 요소를 갖습니다.

    - 응답이 성공할 경우 – {status:"fulfilled", value:result}
    - 에러가 발생한 경우 – {status:"rejected", reason:error}

    ```
    let urls = [
      'https://api.github.com/users/iliakan',
      'https://api.github.com/users/remy',
      'https://no-such-url'
    ];

    Promise.allSettled(urls.map(url => fetch(url)))
      .then(results => { // (*)
        results.forEach((result, num) => {
          if (result.status == "fulfilled") {
            alert(`${urls[num]}: ${result.value.status}`);
          }
          if (result.status == "rejected") {
            alert(`${urls[num]}: ${result.reason}`);
          }
        });
      });

    [
      {status: 'fulfilled', value: ...응답...},
      {status: 'fulfilled', value: ...응답...},
      {status: 'rejected', reason: ...에러 객체...}
    ]
    ```

  - Promise.race
    - `Promise.race`는 `Promise.all`과 비슷합니다. 다만 가장 먼저 처리되는 프라미스의 결과(혹은 에러)를 반환합니다.
    - 왜 있는 걸까..?
  - Promise.reject
    - Promise.reject(error)는 결괏값이 error인 거부 상태 프라미스를 생성합니다.

6. `promise`화
   콜백을 받는 함수를 프라미스를 반환하는 함수로 바꾸는 것을 '프라미스화(promisification)'라고 합니다.

// 그냥 async / await 를 쓰면 됨

7. 마이크로태스크

- 비동기 작업을 처리하려면 적절한 관리가 필요합니다. 이를 위해 ECMA에선 PromiseJobs라는 내부 큐(internal queue)를 명시합니다. V8 엔진에선 이를 '마이크로태스크 큐(microtask queue)'라고 부르기 때문에 이 용어가 좀 더 선호됩니다.
  <br />
- 명세서의 설명을 살펴봅시다.

  - 마이크로태스크 큐는 먼저 들어온 작업을 먼저 실행합니다(FIFO, first-in-first-out).
  - 실행할 것이 아무것도 남아있지 않을 때만 마이크로태스크 큐에 있는 작업이 실행되기 시작합니다.

- 브라우저와 Node.js를 포함한 대부분의 자바스크립트 엔진에선, 마이크로태스크가 '이벤트 루프(event loop)'와 '매크로태스크(macrotask)'와 깊은 연관 관계를 맺습니다. 이 둘은 프라미스와는 직접적인 연관성이 없기 때문에, 이벤트 루프와 매크로·마이크로태스크에서 따로 다루도록 하겠습니다.

8. async와 await(ES2017)

- 최상단에서도 사용 될 수 있게, 업데이트 된걸로 앎
- function 앞에 async 키워드를 추가하면 두 가지 효과가 있습니다.
- 함수는 언제나 프라미스를 반환합니다.
- 함수 안에서 await를 사용할 수 있습니다.
- 프라미스 앞에 await 키워드를 붙이면 자바스크립트는 프라미스가 처리될 때까지 대기합니다. 처리가 완료되면 조건에 따라 아래와 같은 동작이 이어집니다.

- 에러 발생 – 예외가 생성됨(에러가 발생한 장소에서 throw error를 호출한 것과 동일함)
- 에러 미발생 – 프라미스 객체의 result 값을 반환
  async/await를 함께 사용하면 읽고, 쓰기 쉬운 비동기 코드를 작성할 수 있습니다.

- sync/await를 사용하면 promise.then/catch가 거의 필요 없습니다. 하지만 가끔 가장 바깥 스코프에서 비동기 처리가 필요할 때같이 promise.then/catch를 써야만 하는 경우가 생기기 때문에 async/await가 프라미스를 기반으로 한다는 사실을 알고 계셔야 합니다. 여러 작업이 있고, 이 작업들이 모두 완료될 때까지 기다리려면 Promise.all을 활용할 수 있다는 점도 알고 계시기 바랍니다.

---

---

## 자바스크립트 동작원리

### 이벤트루프

---

### this, 전역컨텍스트

---

---

### 호이스팅

---

참조

- https://velog.io/@decody/ES6-Sheetsheet
- https://ko.javascript.info/
- https://developer.mozilla.org/ko/
- https://www.zerocho.com/
- 그 외...
