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
   8. 비동기함수
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
- Promise // 비동기 함수

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
4. 오래된 'var'
5. 전역 객체
6. 객체로서의 함수와 기명 함수 표현식
7. 'new Function' 문법
8. setTimeout과 setInterval을 이용한 호출 스케줄링
9. call/apply와 데코레이터, 포워딩
10. 함수 바인딩
11. 화살표 함수 다시 살펴보기

---

### 5. Object Basic

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

JS는 class가 없었지만, ES6때 추가 되었음. semantic-sugar이지만 가독성 향상.

클래스는 특정 객체를 생성하기 위해 변수와 메소드를 정의하는 일종의 틀이고 그 틀로 생성한 객체는 인스턴스다.(메모리 할당)

자세한 내용은 https://ko.javascript.info/class 참고.

---

### 8. 비동기 함수

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
