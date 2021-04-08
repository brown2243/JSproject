# Node.js 교과서 - 기본부터 프로젝트 실습까지

강의 링크 : https://www.inflearn.com/course/%EB%85%B8%EB%93%9C-%EA%B5%90%EA%B3%BC%EC%84%9C/dashboard

## 수강 이유

- Javascripts 학습에 도움이 될 것 같아서
- JS로 다 해보고 싶어서

---

## Chap.1 노드 시작하기

### 노드의 정의

**Node.js는 크롬 V8 자바스크립트 엔진으로 빌드 된 자바 스크립트 실행기**
서버의 역활도 수행할 수 있다.(**서버가 아님**)

노드는 V8과 libuv를 내부적으로 포함
V8 엔진: 오픈 소스 자바스크립트 엔진] -> 속도 문제 개선
libuv: 노드의 특성인 이벤트 기반, 비동기 I/O 모델을 구현한 라이브러리

싱글 쓰레드 비동기모델로, 인기를 끌게 되었다.(멀티쓰레딩은 코딩이 복잡함)

---

### 노드의 특성

#### 1. 이벤트 기반

이벤트가 발생할 때 미리 지정해둔 작업을 수행하는 방식
이벤트의 예: 클릭, 네트워크 요청, 타이머 등
이벤트 리스너: 이벤트를 등록하는 함수
콜백 함수: 이벤트가 발생했을 때 실행될 함수

시스템 -> 이벤트 발생 -> 이벤트 리스너 -> 등록된 콜백 함수 호출
<br />

#### 2. 논블로킹 I/O

논 블로킹: 오래 걸리는 함수를 백그라운드로 보내서 다음 코드가 먼저 실행되게 하고, 나중에 오래 걸리는 함수를 실행

- 논 블로킹 방식 하에서 일부 코드는 백그라운드에서 병렬로 실행됨
- 일부 코드: I/O 작업(파일 시스템 접근, 네트워크 요청), 압축, 암호화 등
- 나머지 코드는 블로킹 방식으로 실행됨
- I/O 작업이 많을 때 노드 활용성이 극대화

노드에서는 동기이면서 블록킹, 비동기이면서 논 블록킹이다.

- 동기와 비동기: 백그라운드 작업 완료 확인 여부
- 블로킹과 논 블로킹: 함수가 바로 return 되는지 여부

**동기일 때는 코드가 순차적으로, 비동기일 때는 순차적으로 실행 되지 않는다.**
<br />

#### 3. 프로세스와 스레드

프로세스: 운영체제에서 할당하는 작업의 단위, 프로세스 간 자원 공유X
스레드: 프로세스 내에서 실행되는 작업의 단위, 부모 프로세스 자원 공유

크롬이라는 프로세스에서 각각의 탭(스레드)가 돌아간다
노드는 탭을 하나만 뛰울수 있다고 보면 됌

노드 프로세스는 멀티 스레드이지만 직접 다룰 수 있는 스레드는 하나이기 때문에 싱글 스레드라고 표현
14 버전 이후부터는 멀티 스레드 사용가능
<br />

#### 4. 싱글 스레드

싱글 스레드라 주어진 일을 하나밖에 처리하지 못함 -> 비효율
그래서 논 블로킹 모델을 채택하여 일부 코드(I/O)를 백그라운드(다른 프로세스)에서 실행 가능
요청을 먼저 받고, 완료될 때 응답함
I/O 관련 코드가 아닌 경우 싱글 스레드, 블로킹 모델과 같음
<br />

#### 5. 멀티 스레드 모델과의 비교

- 싱글 스레드 모델은 에러를 처리하지 못하는 경우 멈춤
  프로그래밍 난이도 쉽고, CPU, 메모리 자원 적게 사용

- 멀티 스레드 모델은 에러 발생 시 새로운 스레드를 생성하여 극복
  단, 새로운 스레드 생성이나 놀고 있는 스레드 처리에 비용 발생
  프로그래밍 난이도 어려움
  스레드 수만큼 자원을 많이 사용함

<br />

---

### 노드의 역활

#### 1. 서버로서의 노드

- 서버: 네트워크를 통해 클라이언트에 정보나 서비스를 제공하는 컴퓨터 또는 프로그램
- 클라이언트: 서버에 요청을 보내는 주체(브라우저, 데스크탑 프로그램, 모바일 앱, 다른 서버에 요청을 보내는 서버)

<br />

#### 2. 서버외의 노드

자바스크립트 런타임이기 때문에 용도가 서버에만 한정되지 않음
웹, 모바일, 데스크탑 애플리케이션에도 사용
웹 프레임워크: Angular, React, Vue, Meteor 등
모바일 앱 프레임워크: React Native
데스크탑 개발 도구: Electron(Atom, Slack, VSCode, Discord 등 제작)
위 프레임워크가 노드 기반으로 동작함
<br />

---

---

## Chap.2 자바 스크립트 문법

### 2.1 호출 스택, 이벤트 루프

#### 1. 호출 스택

호출 스택(함수의 호출, 자료구조의 스택)

- Anonymous은 가상의 전역 컨텍스트(항상 있다고 생각하는게 좋음)
- 함수 호출 순서대로 쌓이고, 역순으로 실행됨
- 함수 실행이 완료되면 스택에서 빠짐

<br />

#### 2. 이벤트 루프

**자바스크립트 동작원리**

이벤트 루프 구조(호출스택, 백그라운드, 태스크 큐)

- 이벤트 루프: 이벤트 발생(setTimeout 등) 시 호출할 콜백 함수들(위의 예제에서는 run)을 관리하고, 호출할 순서를 결정하는 역할
- 백그라운드: 타이머나 I/O 작업 콜백, 이벤트 리스너들이 대기하는 공간. 여러 작업이 동시에 실행될 수 있음
- 태스크 큐: 이벤트 발생 후 호출되어야 할 콜백 함수들이 순서대로 기다리는 공간

비동기 함수는 호출 스택으로 가자마자 즉시 백그라운드로 이동 -> 작업이 완료 or 시간 되면 태스크 큐로 이동 -> 호출스택이 비었으면 태스크 큐에서 순서대로 넘어감 -> 실행

태스크 큐에서 호출 스택으로 함수를 보내는 순서는 순차적이 아닌 우선순위가 있다.
ex ) promise.then/catch, process.nextTick는 settimeout보다 우선순위가 높음
프로미스 함수는 내부는 동기이고 then 부터 비동기.
<br />

---

### 2.2 ES2015 문법

#### 1. const, let

const 는 상수, let은 변수
const, let과 var의 가장 큰 차이점은 블록 스코프(var는 함수 스코프)이다.

<br />

#### 2. 템플릿 문자열

백틱 문자열 안에 ${변수} 처럼 사용

<br />

#### 3. 객체 리터럴

훨씬 간결한 문법으로 객체 리터럴 표현 가능

- 객체의 메서드에 :function을 붙이지 않아도 됨
- { sayNode: sayNode }와 같은 것을 { sayNode }로 축약 가능
- [변수 + 값] 등으로 동적 속성명을 객체 속성 명으로 사용 가능

안써봐서 체감이 잘...

<br />

#### 4. 화살표 함수

const func = () => {}
**화살표 함수가 기존 function() {}을 대체하는 건 아님(this가 달라짐)**
일반 function안의 this는 자신을 가장 마지막으로 품고 있는 scope로 항상 변한다.
화살표 함수는 this와 arguments를 바인딩 하지 않는다.

https://velog.io/@leeeeunz/TIL-34.-Arrow-Function%EA%B3%BC-Function%EC%9D%98-%EC%B0%A8%EC%9D%B4

<br />

#### 5. 비구조화 할당

this가 사용 될 때는 사용하면 문제가 생길 수 있음

```
// 기존
const example = {a : 123, b:{c:135,d:146}}
const a = example.a
const d = example.b.d

const arr = [1,2,3,4,5]
const x = arr[0]
const y = arr[1]
const z = arr[4]

// 비구조화 할당
const {a, b:{d}} = example

const [x,y,,,z] = arr
```

<br />

#### 6. Class

프로토타입 문법을 깔끔하게 작성할 수 있는 Class 문법 도입
Constructor(생성자), Extends(상속) 등을 깔끔하게 처리할 수 있음
코드가 그룹화되어 가독성이 향상됨.

<br />

#### 7. Promise

- 프로미스: 내용이 실행은 되었지만 결과를 아직 반환하지 않은 객체
- Then을 붙이면 결과를 반환함
- 실행이 완료되지 않았으면 완료된 후에 Then 내부 함수가 실행됨
- Resolve(성공리턴값) -> then으로 연결
- Reject(실패리턴값) -> catch로 연결
- Finally 부분은 무조건 실행됨

- Promise.all(배열): 여러 개의 프로미스를 동시에 실행, 하나라도 실패하면 catch로 감
- allSettled로 실패한 것만 추려낼 수 있음

<br />

#### 8. async/await

- 변수 = await 프로미스인 경우 프로미스가 resolve된 값이 변수에 저장
- 변수 await 값인 경우 그 값이 변수에 저장
- await는 항상 async 함수로 감싸져야 사용가능 했으나 요즘은 top-lv await가 생김
- 에러 처리를 위해 try catch로 감싸주어야 함
- Async 함수는 항상 promise를 반환(return)

<br />

---

### 2.3 Front-end JS

#### 1. AJAX

서버로 요청을 보내는 코드

- 라이브러리 없이는 브라우저가 지원하는 XMLHttpRequest 객체 이용했지만
- 요즘은 대부분 AJAX 요청 시 Axios 라이브러리를 사용하는 게 편함.
- HTTP Method를 사용
  <br />

#### 2. FormData

HTML form 태그에 담긴 데이터를 AJAX요청으로 보내고 싶은 경우

- Append로 데이터를 하나씩 추가
- Has로 데이터 존재 여부 확인
- Get으로 데이터 조회
- getAll로 데이터 모두 조회
- delete로 데이터 삭제
- set으로 데이터 수정

<br />

#### 3. encodeURIComponent, decodeURIComponent

- 가끔 주소창에 한글 입력하면 서버가 처리하지 못하는 경우 발생
  encodeURIComponent로 한글 감싸줘서 처리
- decodeURIComponent로 서버에서 한글 해석

<br />

#### 4. data attribute와 dataset

HTML 태그에 데이터를 저장하는 방법

- 서버의 데이터를 프런트엔드로 내려줄 때 사용
- 태그 속성으로 data-속성명
- 자바스크립트에서 태그.dataset.속성명으로 접근 가능
  - data-user-job -> dataset.userJob
  - data-id -> dataset.id
- 반대로 자바스크립트 dataset에 값을 넣으면 data-속성이 생김
  - dataset.monthSalary = 10000 -> data-month-salary=“10000”

<br />

---

---

## Chap.3 노드 기능

### 3.1 REPL 사용하기

cmd에서 node라고 치면 REPL 콘솔 사용가능

- 자바스크립트는 스크립트 언어라서 즉석에서 코드를 실행할 수 있음
- REPL이라는 콘솔 제공
- R(Read), E(Evaluate), P(Print), L(Loop)

---

### 3.2 JS 파일 실행하기

자바스크립트 파일을 만들어 통째로 코드를 실행하는 방법

- 아무 폴더(디렉터리)에서 helloWorld.js를 만들어보자
- node [자바스크립트 파일 경로]로 실행
- 실행 결괏값이 출력됨

---

### 3.3 모듈로 만들기

#### 1. 모듈

노드는 자바스크립트 코드를 모듈로 만들 수 있음
모듈: 특정한 기능을 하는 함수나 변수들의 집합
모듈로 만들면 여러 프로그램에서 재사용 가능

<br />

#### 2. 모듈 만들어보기

파일 끝에 module.exports로 모듈로 만들 값을 지정
다른 파일에서 require(파일 경로)로 그 모듈의 내용 가져올 수 있음

```
// 1번 파일
const odd = '홀수'
const even = '짝수'
module.exports = {odd,even}
// 2번 파일
const {odd, even} = require(1번파일 경로)

```

- const { odd, even } 부분은 module.exports를 구조분해 할당한 것임(2장 참고)

<br />

#### 3. ES2015 모듈

- 자바스크립트 자체 모듈 시스템 문법이 생김(import from)
- 노드에서 모듈이 먼저 생기고 JS에서 생겼기 때문에 둘이 일치하지 않음
- 기존의 모든 코드를 수정할 수 없어 노드는 module.exports랑 require 계속 사용중
- export default를 사용하면 import from 사용가능

<br />

---

### 3.4 노드 내장 객체 알아보기

많기 때문에 외우기 보다는, 필요하다면 찾아서 사용하자.

#### 1. global

- 노드의 전역 객체
- 브라우저의 window같은 역할
- 모든 파일에서 접근 가능
- window처럼 생략도 가능(console, require도 global의 속성)

<br />

#### 2. global 속성 공유

- global 속성에 값을 대입하면 다른 파일에서도 사용 가능
- 이렇게 하면 나중에 유지보수 문제로 권장되지 않음

<br />

#### 3. console 객체

브라우저의 console 객체와 매우 유사

- console.time, console.timeEnd: 시간 로깅
- console.error: 에러 로깅
- console.log: 평범한 로그
- console.dir: 객체 로깅
- console.trace: 호출스택 로깅

<br />

#### 4. 타이머 메서드

- set 메서드에 clear 메서드가 대응됨
- set 메서드의 리턴 값(아이디)을 clear 메서드에 넣어 취소

- setTimeout(콜백 함수, 밀리초): 주어진 밀리초(1000분의 1초) 이후에 콜백 함수를 실행합니다.
- setInterval(콜백 함수, 밀리초): 주어진 밀리초마다 콜백 함수를 반복 실행합니다.
- setImmediate(콜백 함수): 콜백 함수를 즉시 실행합니다.

- clearTimeout(아이디): setTimeout을 취소합니다.
- clearInterval(아이디): setInterval을 취소합니다.
- clearImmediate(아이디): setImmediate를 취소합니다.

<br />

#### 5. filename, dirname

브라우저와 다르게 노드에서는 사용자의 컴퓨터 파일에 접근 가능 하다.

```
__filename: 현재 파일 경로
__dirname: 현재 폴더(디렉터리) 경로
console.log(__filename)
console.log(__dirname)
```

path와 조합해서 많이 쓰임

<br />

#### 6. module, exports

exports에 객체의 속성이 아닌 다른 값을 대입하면 참조 관계가 깨짐

```
const odd = '홀수'
const even = '짝수'

// module.exports = {odd,even}

exports.odd = odd
exports.even = even
동일하게 동작함.
module.exports === exports === {}

```

<br />

#### 7. this

- 노드에서 this를 사용할 때 주의점이 있음
- 최상위 스코프의 this는 module.exports를 가리킴
- 그 외에는 브라우저의 자바스크립트와 동일
- 함수 선언문 내부의 this는 global(전역) 객체를 가리킴

```
console.log(this) // {}
console.log(this === module.exports) // true
console.log(this === exports) // true
function whatisThis(){
  console.log('function', this === exports, this === global)
}
whatisThis() // false, true
```

<br />

#### 8. process

현재 실행중인 노드 프로세스에 대한 정보를 담고 있음

```
process.version
process.arch
process.platform
process.pid
process.uptime()
process.execPath
process.cwd()
process.cpuUsage()
...
```

process.env

- 비밀키(데이터베이스 비밀번호, 서드파티 앱 키 등)를 보관하는 용도로도 쓰임
- 환경 변수는 process.env로 접근 가능
- 일부 환경 변수는 노드 실행 시 영향을 미침

process.nextTick(콜백)

- 이벤트 루프가 다른 콜백 함수들보다 nextTick의 콜백 함수를 우선적으로 처리함

process.exit(코드)

- 현재의 프로세스를 멈춤
- 코드가 없거나 0이면 정상 종료

<br />

---

### 3.5 노드 내장 모듈 사용하기

#### 1. os

운영체제의 정보를 담고 있음

```
os.arch() // process.arch와 동일합니다.
os.platform() // process.platform과 동일합니다.
os.type() // 운영체제의 종류를 보여줍니다.
os.uptime() // 운영체제 부팅 이후 흐른 시간(초)을 보여줍니다.
            // process.uptime() 노드의 실행 시간이었습니다.
os.hostname() // 컴퓨터의 이름을 보여줍니다.
os.release() // 운영체제의 버전을 보여줍니다.
os.homedir() // 홈 디렉터리 경로를 보여줍니다.
os.tmpdir() // 임시 파일 저장 경로를 보여줍니다.
os.cpus() // 컴퓨터의 코어 정보를 보여줍니다.
os.freemem() // 사용 가능한 메모리(RAM)를 보여줍니다.
os.totalmem() // 전체 메모리 용량을 보여줍니다.
```

<br />

#### 2. path

폴더와 파일의 경로를 쉽게 조작하도록 도와주는 모듈
join과 resolve의 차이: resolve는 /를 절대경로로 처리, join은 상대경로로 처리

```
path.sep // 경로의 구분자입니다. Windows는 \, POSIX는 /입니다.
path.delimiter // 환경 변수의 구분자입니다. process.env.PATH를 입력하면 여러 개의 경로가 이 구분자로 구분되어 있습니다. Windows는 세미콜론(;)이고 POSIX는 콜론(:)입니다.
path.dirname(경로) // 파일이 위치한 폴더 경로를 보여줍니다.
path.extname(경로) // 파일의 확장자를 보여줍니다.
path.basename(경로, 확장자) // 파일의 이름(확장자 포함)을 보여줍니다. 파일의 이름만 표시하고 싶다면 basename의 두 번째 인자로 파일의 확장자를 넣어주면 됩니다.
path.parse(경로) // 파일 경로를 root, dir, base, ext, name으로 분리합니다.
path.format(객체) // path.parse()한 객체를 파일 경로로 합칩니다.
path.normalize(경로) // /나 \를 실수로 여러 번 사용했거나 혼용했을 때 정상적인 경로로 변환해줍니다.
path.isAbsolute(경로) // 파일의 경로가 절대경로인지 상대경로인지 true나 false로 알려줍니다.
path.relative(기준경로, 비교경로) // 경로를 두 개 넣으면 첫 번째 경로에서 두 번째 경로로 가는 방법을 알려줍니다.
path.join(경로, .. .) // 여러 인자를 넣으면 하나의 경로로 합쳐줍니다. 상대경로인 ..(부모 디렉터리)과 .(현 위치)도 알아서 처리해줍니다.
path.resolve(경로, .. .) // path.join()과 비슷하지만 차이가 있습니다. 차이점은 다음에 나오는 Note에서 설명합니다.

```

<br />

#### 3. url 모듈

인터넷 주소를 쉽게 조작하도록 도와주는 모듈
url 처리에 크게 두 가지 방식이 있음(기존 노드 방식 vs WHATWG 방식
아래 그림에서 가운데 주소를 기준으로 위쪽은 기존 노드 방식, 아래쪽은 WHATWG 방식

- |protocol| auth | hostname | port |pathname | query | hash
- |https://| user : pass|@sub.host.com:| 8080 |/p/a/t/h |?query=string|#hash

```
url.parse(주소) //  주소를 분해합니다. WHATWG 방식과 비교하면 username과 password대신 auth 속성이 있고, searchParams 대신 query가 있습니다.
url.format(객체) //  WHATWG 방식의 url과 기존 노드의 url 모두 사용할 수 있습니다. 분해되었던 url 객체를 다시 원래 상태로 조립합니다.

```

searchParams

- WHATWG 방식에서 쿼리스트링(search) 부분 처리를 도와주는 객체

```
getAll(키) // 키에 해당하는 모든 값들을 가져옵니다. category 키에는 두 가지 값, 즉 nodejs와 javascript의 값이 들어 있습니다.
get(키) // 키에 해당하는 첫 번째 값만 가져옵니다.
has(키) // 해당 키가 있는지 없는지를 검사합니다.
keys() // searchParams의 모든 키를 반복기(iterator, ES2015 문법) 객체로 가져옵니다.
values() // searchParams의 모든 값을 반복기 객체로 가져옵니다.
append(키, 값) // 해당 키를 추가합니다. 같은 키의 값이 있다면 유지하고 하나 더 추가합니다.
set(키, 값) // append와 비슷하지만 같은 키의 값들을 모두 지우고 새로 추가합니다.
delete(키) // 해당 키를 제거합니다.
toString() // 조작한 searchParams 객체를 다시 문자열로 만듭니다. 이 문자열을 search에 대입하면 주소 객체에 반영됩니다.
```

querystring

기존 노드 방식에서는 url querystring을 querystring 모듈로 처리

```
querystring.parse(쿼리) // url의 query 부분을 자바스크립트 객체로 분해해줍니다.
querystring.stringify(객체) // 분해된 query 객체를 문자열로 다시 조립해줍니다.
```

<br />

---

### 3.6 파일 시스템 접근하기

#### 1. fs

파일 시스템에 접근하는 모듈

- 파일/폴더 생성, 삭제, 읽기, 쓰기 가능
- 웹 브라우저에서는 제한적이었으나 노드는 권한을 가지고 있음
- 파일 읽기 예제(결과의 버퍼는 뒤에서 설명함)

```
const fs = require('fs')
const fs = require('fs').promises // 프로미스 방식, 추천
```

- fs.access(경로, 옵션, 콜백): 폴더나 파일에 접근할 수 있는지를 체크합니다. 두 번째 인자로 상수들을 넣었습니다. F_OK는 파일 존재 여부, R_OK는 읽기 권한 여부, W_OK는 쓰기 권한 여부를 체크합니다. 파일/폴더나 권한이 없다면 에러가 발생하는데, 파일/폴더가 없을 때의 에러 코드는 ENOENT입니다.
- fs.mkdir(경로, 콜백): 폴더를 만드는 메서드입니다. 이미 폴더가 있다면 에러가 발생하므로 먼저 access() 메서드를 호출해서 확인하는 것이 중요합니다.
- fs.open(경로, 옵션, 콜백): 파일의 아이디(fd 변수)를 가져오는 메서드입니다. 파일이 없다면 파일을 생성한 뒤 그 아이디를 가져옵니다. 가져온 아이디를 사용해 fs.read()나 fs.write()로 읽거나 쓸 수 있습니다. 두 번째 인자로 어떤 동작을 할 것인지 설정할 수 있습니다. 쓰려면 w, 읽으려면 r, 기존 파일에 추가하려면 a입니다. 예제에서는 w로 설정했으므로 파일이 없을 때 새로 만들 수 있었습니다. r이었다면 에러가 발생하였을 것입니다.
- fs.rename(기존 경로, 새 경로, 콜백): 파일의 이름을 바꾸는 메서드입니다. 기존 파일 위치와 새로운 파일 위치를 적어주면 됩니다. 반드시 같은 폴더를 지정할 필요는 없으므로 잘라내기 같은 기능을 할 수도 있습니다.

- fs.readdir(경로, 콜백): 폴더 안의 내용물을 확인할 수 있습니다. 배열 안에 내부 파일과 폴더명이 나옵니다.
- fs.unlink(경로, 콜백): 파일을 지울 수 있습니다. 파일이 없다면 에러가 발생하므로 먼저 파일이 있는지를 꼭 확인해야 합니다.
- fs.rmdir(경로, 콜백): 폴더를 지울 수 있습니다. 폴더 안에 파일이 있다면 에러가 발생하므로 먼저 내부 파일을 모두 지우고 호출해야 합니다

<br />

#### 2. 버퍼와 스트림

버퍼: 일정한 크기로 모아두는 데이터

- 일정한 크기가 되면 한 번에 처리
- 버퍼링: 버퍼에 데이터가 찰 때까지 모으는 작업

노드에서는 Buffer 객체 사용

```
const buffer = Buffer.from("String")
Buffer.from(문자열): 문자열을 버퍼로 바꿀 수 있습니다. length 속성은 버퍼의 크기를 알려줍니다. 바이트 단위입니다.
Buffer.toString(버퍼): 버퍼를 다시 문자열로 바꿀 수 있습니다. 이때 base64나 hex를 인자로 넣으면 해당 인코딩으로도 변환할 수 있습니다.
Buffer.concat(배열): 배열 안에 든 버퍼들을 하나로 합칩니다.
Buffer.alloc(바이트): 빈 버퍼를 생성합니다. 바이트를 인자로 지정해주면 해당 크기의 버퍼가 생성됩니다.
```

스트림: 데이터의 흐름

- 일정한 크기로 나눠서 여러 번에 걸쳐서 처리
- 버퍼(또는 청크)의 크기를 작게 만들어서 주기적으로 데이터를 전달
- 스트리밍: 일정한 크기의 데이터를 지속적으로 전달하는 작업

```
const fs = require('fs')
const readStream = fs.createReadStream(파일경로, 옵션객체)
// data(chunk 전달), end(전달 완료), error(에러 발생) 이벤트 리스너와 같이 사용

const writeStream = fs.createWriteStream(파일경로)
// write로 chunk 입력, end로 스트림 종료

```

<br />

---

### 3.7 이벤트 이해하기

#### 1. 이벤트 만들고 호출하기

events 모듈로 커스텀 이벤트를 만들 수 있음

```
on(이벤트명, 콜백) // 이벤트 이름과 이벤트 발생 시의 콜백을 연결해줍니다. 이렇게 연결하는 동작을 이벤트 리스닝이라고 부릅니다. event2처럼 이벤트 하나에 이벤트 여러 개를 달아줄 수도 있습니다.
addListener(이벤트명, 콜백) // on과 기능이 같습니다.
emit(이벤트명) // 이벤트를 호출하는 메서드입니다. 이벤트 이름을 인자로 넣어주면 미리 등록해뒀던 이벤트 콜백이 실행됩니다.
once(이벤트명, 콜백) // 한 번만 실행되는 이벤트입니다. myEvent.emit('event3')을 두 번 연속 호출했지만 콜백이 한 번만 실행됩니다.
removeAllListeners(이벤트명) // 이벤트에 연결된 모든 이벤트 리스너를 제거합니다.event4가 호출되기 전에 리스너를 제거했으므로 event4의 콜백은 호출되지 않습니다.
removeListener(이벤트명, 리스너) // 이벤트에 연결된 리스너를 하나씩 제거합니다. 역시event5의 콜백도 호출되지 않습니다.
off(이벤트명, 콜백) // 노드 10 버전에서 추가된 메서드로, removeListener와 기능이 같습니다.
listenerCount(이벤트명) // 현재 리스너가 몇 개 연결되어 있는지 확인합니다.

```

<br />

---

### 3.8 예외 처리하기

#### 1. 예외 처리

예외(Exception): 처리하지 못한 에러

- 노드 프로세스/스레드를 멈춤
- 노드는 기본적으로 싱글 스레드라 스레드가 멈춘다는 것은 프로세스가 멈추는 것
- 에러 처리는 필수

<br />

#### 2. try / catch

기본적으로 try catch문으로 예외를 처리
에러가 발생할 만한 곳을 try catch로 감쌈

<br />

#### 3. 노드 비동기 메서드의 에러

노드 비동기 메서드의 에러는 따로 처리하지 않아도 됨
콜백 함수에서 에러 객체 제공

<br />

#### 4. Promise의 에러

프로미스의 에러는 따로 처리하지 않아도 됨

<br />

#### 5. 예측 불가능한 에러 처리하기

최후의 수단으로 사용
콜백 함수의 동작이 보장되지 않음
따라서 복구 작업용으로 쓰는 것은 부적합
에러 내용 기록 용으로만 쓰는 게 좋음

```
.on('uncaughtException')
```

<br />

---

---

## Chap.4 http 모듈로 서버 만들기

### 4.1 요청과 응답 이해하기

#### 1. 서버와 클라이언트

서버와 클라이언트의 관계

- 클라이언트가 서버로 요청(request)을 보냄
- 서버는 요청을 처리
- 처리 후 클라이언트로 응답(response)을 보냄

<br />

#### 2. Node로 http 서버 만들기

```
const http = require('http')
http.createServer((req,res) => {
  // 여기에 내용
  // req는 요청, res는 응답
})
```

<br />

#### 3. 8080 포트에 연결하기

```
const http = require('http')
http.createServer((req,res) => {
  // req는 요청, res는 응답
  res.writeHead(200, {'Content-Type' : 'text/html; charset=utf-8' })
  res.write('<h1>Hello Node!</h1>)
  res.end('<p>Hello Server!</p>')
})
  .listen(8080, () => {
    console.log('8080 Port is ready')
  })

```

<br />

#### 4. localhost 와 포트

localhost는 컴퓨터 내부 주소로 외부에서 접근이 불가능하다.
포트는 서버 내에서 프로세스를 구분하는 번호

- 기본적으로 http 서버는 80번 포트 사용(생략가능, https는 443)
- ex)\_ www.gilbut.com:80 -> www.github.com
- 다른 포트로 데이터베이스나 다른 서버 동시에 연결 가능

<br />

#### 5. 이벤트 리스너 붙이기

```
const http = require('http')
const server = http.createServer((req,res) => {
  // req는 요청, res는 응답
  res.writeHead(200, {'Content-Type' : 'text/html; charset=utf-8' })
  res.write('<h1>Hello Node!</h1>)
  res.end('<p>Hello Server!</p>')
})
server.listen(8080)

server.on('listening',()=> {
  console.log('server is ready')
})
server.on('error',(err) => {
  console.error(err)
})

```

<br />

#### 6. 한 번에 여러 개의 서버 실행하기

createServer를 여러 번 호출하면 됨.
단, 두 서버의 포트를 다르게 지정해야 함
<br />

#### 7. html 읽어서 전송하기

fs 모듈로 html을 읽어서 전송하자
write가 버퍼도 전송 가능

```
const http = require('http')
const fs = require('fs').promises

const server = http.createServer(async (req,res) => {
  try {
    const data = await fs.readFile(html파일 경로)
    res.writeHead(200, {'Content-Type' : 'text/html; charset=utf-8' })
    res.end(data)
  } catch(err) {
    res.writeHead(500, {'Content-Type' : 'text/html; charset=utf-8' })
    res.end(err.message)
  }
})
server.listen(8080)

server.on('listening',()=> {
  console.log('server is ready')
})
server.on('error',(err) => {
  console.error(err)
})

```

<br />

---

### 4.2 REST API 와 ROUTERING

#### 1. REST API

서버에 요청을 보낼 때는 주소를 통해 요청의 내용을 표현

- /index.html이면 index.html을 보내달라는 뜻
- 항상 html을 요구할 필요는 없음
- 서버가 이해하기 쉬운 주소가 좋음

REST API(Representational State Transfer)

- 서버의 자원을 정의하고 자원에 대한 주소를 지정하는 방법
- /user이면 사용자 정보에 관한 정보를 요청하는 것
- /post면 게시글에 관련된 자원을 요청하는 것

HTTP 요청 메서드

- GET: 서버 자원을 가져오려고 할 때 사용
- POST: 서버에 자원을 새로 등록하고자 할 때 사용(또는 뭘 써야할 지 애매할 때)
- PUT: 서버의 자원을 요청에 들어있는 자원으로 치환하고자할 때 사용
- PATCH: 서버 자원의 일부만 수정하고자 할 때 사용
- DELETE: 서버의 자원을 삭제하고자할 때 사용

<br />

#### 2. HTTP 프로토콜

클라이언트가 누구든 서버와 HTTP 프로토콜로 소통 가능

RESTful server

- REST API를 사용한 주소 체계를 이용하는 서버
- GET /user는 사용자를 조회하는 요청, POST /user는 사용자를 등록하는 요청

<br />

---

### 4.3 쿠키와 세션 이해하기

#### 1. 쿠키의 필요성

요청에는 한 가지 단점이 있음

- 누가 요청을 보냈는지 모름(IP 주소와 브라우저 정보 정도만 앎)
- 로그인을 구현하면 됨
- 쿠키와 세션이 필요

쿠키: 키=값의 쌍

- name=zerocho
- 매 요청마다 서버에 동봉해서 보냄
- 서버는 쿠키를 읽어 누구인지 파악

쿠키 넣는 것을 직접 구현

- writeHead: 요청 헤더에 입력하는 메서드
- Set-Cookie: 브라우저에게 쿠키를 설정하라고 명령

http 요청과 응답은 헤더와 본문을 가짐

- 헤더는 요청 또는 응답에 대한 정보를 가짐
- 본문은 주고받는 실제 데이터
- 쿠키는 부가적인 정보이므로 헤더에 저장

<br />

#### 2. http 상태코드

writeHead 메서드에 첫 번째 인수로 넣은 값
요청이 성공했는지 실패했는지를 알려줌

- 2XX: 성공을 알리는 상태 코드입니다. 대표적으로 200(성공), 201(작성됨)이 많이 사용됩니다.
- 3XX: 리다이렉션(다른 페이지로 이동)을 알리는 상태 코드입니다. 어떤 주소를 입력했는데 다른 주소의 페이지로 넘어갈 때 이 코드가 사용됩니다. 대표적으로 301(영구 이동), 302(임시 이동)가 있습니다.
- 4XX: 요청 오류를 나타냅니다. 요청 자체에 오류가 있을 때 표시됩니다. 대표적으로 401(권한 없음), 403(금지됨), 404(찾을 수 없음)가 있습니다.
- 5XX: 서버 오류를 나타냅니다. 요청은 제대로 왔지만 서버에 오류가 생겼을 때 발생합니다. 이 오류가 뜨지 않게 주의해서 프로그래밍해야 합니다. 이 오류를 클라이언트로 res.writeHead로 직접 보내는 경우는 없고, 예기치 못한 에러 발생 시 서버가 알아서 5XX대 코드를 보냅니다. 500(내부 서버 오류), 502(불량 게이트웨이), 503(서비스를 사용할 수 없음)이 자주 사용됩니다.

<br />

#### 3. 쿠키

parseCookies: 쿠키 문자열을 객체로 변환

- Set-Cookie 시 다양한 옵션이 있음
  쿠키명=쿠키값: 기본적인 쿠키의 값입니다. mycookie=test 또는 name=zerocho 같이 설정합니다.
- Expires=날짜: 만료 기한입니다. 이 기한이 지나면 쿠키가 제거됩니다. 기본값은 클라이언트가 종료될 때까지입니다.
- Max-age=초: Expires와 비슷하지만 날짜 대신 초를 입력할 수 있습니다. 해당 초가 지나면 쿠기가 제거됩니다. Expires보다 우선합니다.
- Domain=도메인명: 쿠키가 전송될 도메인을 특정할 수 있습니다. 기본값은 현재 도메인입니다.
- Path=URL: 쿠키가 전송될 URL을 특정할 수 있습니다. 기본값은 ‘/’이고 이 경우 모든 URL에서 쿠키를 전송할 수 있습니다.
- Secure: HTTPS일 경우에만 쿠키가 전송됩니다.
- HttpOnly: 설정 시 자바스크립트에서 쿠키에 접근할 수 없습니다. 쿠키 조작을 방지하기 위해 설정하는 것이 좋습니다.

<br />

#### 4. 세션

쿠키의 정보는 노출되고 수정되는 위험이 있음

- 중요한 정보는 서버에서 관리하고 클라이언트에는 세션 키만 제공
- 서버에 세션 객체(session) 생성 후, uniqueInt(키)를 만들어 속성명으로 사용
- 속성 값에 정보 저장하고 uniqueInt를 클라이언트에 보냄

직접 구현하지말고 있는 걸 사용하자
<br />

---

### 4.4 https, http2

#### 1. https

웹 서버에 SSL 암호화를 추가하는 모듈

- 오고 가는 데이터를 암호화해서 중간에 다른 사람이 요청을 가로채더라도 내용을 확인할 수 없음
- 요즘에는 https 적용이 필수(개인 정보가 있는 곳은 특히)

<br />

#### 2. https 서버

http 서버를 https 서버로 암호화를 위해 인증서가 필요한데 발급받아야 함

createServer가 인자를 두 개 받음

- 첫 번째 인자는 인증서와 관련된 옵션 객체
- pem, crt, key 등 인증서를 구입할 때 얻을 수 있는 파일 넣기
- 두 번째 인자는 서버 로직

<br />

#### 3. http2

SSL 암호화와 더불어 최신 HTTP 프로토콜인 http/2를 사용하는 모듈

- 요청 및 응답 방식이 기존 http/1.1보다 개선됨
- 웹의 속도도 개선됨

<br />

#### 4. http2 서버

https 모듈을 http2로, createServer 메서드를 createSecureServer 메서드로

<br />

---

### 4.5 cluster

#### 1. cluster

기본적으로 싱글 스레드인 노드가 CPU 코어를 모두 사용할 수 있게 해주는 모듈

- 포트를 공유하는 노드 프로세스를 여러 개 둘 수 있음
- 요청이 많이 들어왔을 때 병렬로 실행된 서버의 개수만큼 요청이 분산됨
- 서버에 무리가 덜 감
- 코어가 8개인 서버가 있을 때: 보통은 코어 하나만 활용
- cluster로 코어 하나당 노드 프로세스 하나를 배정 가능
- 성능이 8배가 되는 것은 아니지만 개선됨
- 단점: 컴퓨터 자원(메모리, 세션 등) 공유 못 함
- Redis 등 별도 서버로 해결

---

---

## Chap.5 Package Manager

### 5.1 Npm 알아보기

#### 1. NPM 이란

Node Package Manager 노드의 패키지 매니저

- 다른 사람들이 만든 소스 코드들을 모아둔 저장소
- 남의 코드를 사용하여 프로그래밍 가능
- 이미 있는 기능을 다시 구현할 필요가 없어 효율적
- 오픈 소스 생태계를 구성중

- 패키지: npm에 업로드된 노드 모듈
- 모듈이 다른 모듈을 사용할 수 있듯 패키지도 다른 패키지를 사용할 수 있음
- 의존 관계라고 부름

<br />

---

### 5.2 package.json 패키지 관리하기

#### 1. package.json

현재 프로젝트에 대한 정보와 사용 중인 패키지에 대한 정보를 담은 파일

- 같은 패키지라도 버전별로 기능이 다를 수 있으므로 버전을 기록해두어야 함
- 동일한 버전을 설치하지 않으면 문제가 생길 수 있음
- 노드 프로젝트 시작 전 package.json부터 만들고 시작함(npm init)

패키지를 설치하려면 npm install (여러개도 동시에 설치가능 morgan cookie-parser ...)

개발용 패키지 설치도 가능

- npm install --save-dev 패키지명 또는 npm i -D 패키지명
- devDependencies에 추가됨

글로벌 설치

- npm install --global 패키지명 또는 npm i -g 패키지명
- 모든 프로젝트와 콘솔에서 패키지를 사용할 수 있음
- 예제는 rm –rf(리눅스의 삭제 명령)를 흉내내는 rimraf 패키지의 글로벌 설치
- npx로 글로벌 설치 없이 글로벌 명령어 사용 가능

<br />

#### 2. package.json 속성들

- package name: 패키지의 이름입니다. package.json의 name 속성에 저장됩니다.
- version: 패키지의 버전입니다. npm의 버전은 다소 엄격하게 관리됩니다. 5.3절에서 다룹니다.
- entry point: 자바스크립트 실행 파일 진입점입니다. 보통 마지막으로 module.exports를 하는 파일을 지정합니다. package.json의 main 속성에 저장됩니다.
- test command: 코드를 테스트할 때 입력할 명령어를 의미합니다. package.json scripts 속성 안의 test 속성에 저장됩니다.
- git repository: 코드를 저장해둔 Git 저장소 주소를 의미합니다. 나중에 소스에 문제가 생겼을 때 사용자들이 이 저장소에 방문해 문제를 제기할 수도 있고, 코드 수정본을 올릴 수도 있습니다. package.json의 repository 속성에 저장됩니다.
- keywords: 키워드는 npm 공식 홈페이지(https://npmjs.com)에서 패키지를 쉽게 찾을 수 있게 해줍니다. package.json의 keywords 속성에 저장됩니다.
- license: 해당 패키지의 라이선스를 넣어주면 됩니다.

<br />

#### 3. npm 스크립트

package.json 파일 안의 scripts 부분보고
npm run [스크립트명] 하면 실행가능(start같은경우 run 생략 가능)
<br />

#### 4. node_modules

npm install 시 node_modules 폴더 생성

- 내부에 설치한 패키지들이 들어 있음
- express 외에도 express와 의존 관계가 있는 패키지들이 모두 설치됨

package-lock.json도 생성되어 패키지 간 의존 관계를 명확하게 표시함

<br />

---

### 5.3 패키지 버전 이해하기

#### 1. SemVer

노드 패키지의 버전은 SemVer(유의적 버저닝) 방식을 따름
Major(주 버전), Minor(부 버전), Patch(수 버전)

- 노드에서는 배포를 할 때 항상 버전을 올려야 함
- Major는 하위 버전과 호환되지 않은 수정 사항이 생겼을 때 올림
- Minor는 하위 버전과 호환되는 수정 사항이 생겼을 때 올림
- Patch는 기능에 버그를 해결했을 때 올림

ex)\_ 1.0.7 -> 1(major 호환X).0(Minor호환O).7(간단한 수정)

<br />

#### 2. 버전기호 사용하기

버전 앞에 기호를 붙여 의미를 더함

- ^1.1.1: 패키지 업데이트 시 minor 버전까지만 업데이트 됨(2.0.0버전은 안 됨)
- ~1.1.1: 패키지 업데이트 시 patch버전까지만 업데이트 됨(1.2.0버전은 안 됨)
- > =, <=, >, <는 이상, 이하, 초과, 미만.
- @latest는 최신 버전을 설치하라는 의미
- 실험적인 버전이 존재한다면 @next로 실험적인 버전 설치 가능(불안정함)
- 각 버전마다 부가적으로 알파/베타/RC 버전이 존재할 수도 있음(1.1.1-alpha.0, 2.0.0-beta.1, 2.0.0-rc.0)

<br />

---

### 5.4 기타 npm 명렁어

####

npm version 버전: package.json의 버전을 올림(Git에 커밋도 함)

npm deprecate [패키지명][버전] [메시지]: 패키지를 설치할 때 경고 메시지를 띄우게 함(오류가 있는 패키지에 적용)
npm publish: 자신이 만든 패키지를 배포
npm unpublish --force: 자신이 만든 패키지를 배포 중단(배포 후 72시간 내에만 가능)
다른 사람이 내 패키지를 사용하고 있는데 배포가 중단되면 문제가 생기기 때문
기타 명령어는 https://docs.npmjs.com의 CLI Commands에서 확인

<br />

---

---

## Chap.6 Express Web Server

### 6.1 Express 시작하기

#### 1. Express 소개

http 모듈로 웹 서버를 만들 때 코드가 보기 좋지 않고, 확장성도 떨어짐
프레임워크로 해결
대표적인 것이 Express(익스프레스), Koa(코아), Hapi(하피)
코드 관리도 용이하고 편의성이 많이 높아짐

<br />

#### 2. package.json 만들기

직접 만들거나 npm init 명령어 생성
nodemon이 소스 코드 변경 시 서버를
재시작해줌

<br />

#### 3. app.js 작성하기

서버 구동의 핵심이 되는 파일
app.set(‘port’, 포트)로 서버가 실행될 포트 지정
app.get(‘주소’, 라우터)로 GET 요청이 올 때 어떤 동작을 할지 지정
app.listen(‘포트’, 콜백)으로 몇 번 포트에서 서버를 실행할지 지정

```
const express = require('express')
const path = require('path')
const app = express()

app.set('port', process.env.PORT || 3000)
app.get('/', (req, res) => {
//  res.send("Hello Express!")
    res.sendFile(path.join(__dirname, '/index.html') // html
})
app.listen(app.get('port'), () => {
  console.log(app.get('port'), '번 포트에서 대기중')
})
```

<br />

---

### 6.2 자주 사용하는 미들웨어

#### 1. 미들웨어

익스프레스는 미들웨어로 구성됨

- 요청과 응답의 중간에 위치하여 미들웨어
- app.use(미들웨어)로 장착
- 위에서 아래로 순서대로 실행됨.
- 미들웨어는 req, res, next가 매개변수인 함수
- req: 요청, res: 응답 조작 가능
- next()로 다음 미들웨어로 넘어감.

EX

- app.use(미들웨어) : 모든 요청에서 미들웨어 실행
- app.use('/abc', 미들웨어) : abc로 시작하는 요청에서 미들웨어 실행
- app.post('/abc', 미들웨어) : abc로 시작하는 POST요청에서 미들웨어 실행

<br />

#### 2. 에러처리 미들웨어

에러가 발생하면 에러 처리 미들웨어로

- err, req, rs, next까지 매개변수가 4개
- 첫 번째 err에는 에러가 관한 정보가 담김
- res.status 메서드로 HTTP 상태 코드를 지정 가능(기본값 200)
- 에러 처리 미들웨어를 안 연결해도 익스프레스가 에러를 알아서 처리해주긴 함.
- 특별한 경우가 아니면 가장 아래에 위치하도록 함.

<br />

#### 3. 자주 쓰는 미들웨어

morgan, cookie-parser, express-session 설치

<br />

#### 4. dotenv

.env 파일을 읽어서 process.env로 만듦

- dot(점) + env
- process.env.COOKIE_SECRET에 cookiesecret 값이 할당됨(키=값 형식)
- 비밀 키들을 소스 코드에 그대로 적어두면 소스 코드가 유출되었을 때 비밀 키도 같이 유출됨
- .env 파일에 비밀 키들을 모아두고 .env 파일만 잘 관리하면 됨

<br />

#### 5. morgan

서버로 들어온 요청과 응답을 기록해주는 미들웨어
로그의 자세한 정도 선택 가능(dev, tiny, short, common, combined)

예시) GET / 200 51.267 ms – 1539
순서대로 HTTP요청 요청주소 상태코드 응답속도 – 응답바이트
개발환경에서는 dev, 배포환경에서는 combined를 애용함

```
app.use(morgan('dev'))
```

<br />

#### 6. static

정적인 파일들을 제공하는 미들웨어
app.use('요청경로',express.static('실제경로'))
app.use('/',express.static(path.join(\_\_dirname, 'public')))

- 인수로 정적 파일의 경로를 제공
- 파일이 있을 때 fs.readFile로 직접 읽을 필요 없음
- 요청하는 파일이 없으면 알아서 next를 호출해 다음 미들웨어로 넘어감
- 파일을 발견했다면 다음 미들웨어는 실행되지 않음

컨텐츠 요청 주소와 실제 컨텐츠의 경로를 다르게 만들 수 있음

- 요청 주소 localhost:3000/stylesheets/style.css
- 실제 컨텐츠 경로 /public/stylesheets/style.css
- 서버의 구조를 파악하기 어려워져서 보안에 도움이 됨

<br />

#### 7. body-parser

요청의 본문을 해석해주는 미들웨어

- 폼 데이터나 AJAX 요청의 데이터 처리
- json 미들웨어는 요청 본문이 json인 경우 해석, urlencoded 미들웨어는 폼 요청 해석
  ```
  app.use(express.json())
  app.use(express.urlencoded({extended: false}))
  ```
- put이나 patch, post 요청 시에 req.body에 프런트에서 온 데이터를 넣어줌

버퍼 데이터나 text 데이터일 때는 body-parser를 직접 설치해야 함

Multipart 데이터(이미지, 동영상 등)인 경우는 다른 미들웨어를 사용해야 함
multer 패키지(9장에서)

<br />

#### 8. cookie-parser

요청 헤더의 쿠키를 해석해주는 미들웨어

- parseCookies 함수와 기능 비슷
- req.cookies 안에 쿠키들이 들어있음

```
app.use(cookieParser(비밀키))
```

비밀 키로 쿠키 뒤에 서명을 붙여 내 서버가 만든 쿠키임을 검증할 수 있음

- 실제 쿠키 옵션들을 넣을 수 있음
- expires, domain, httpOnly, maxAge, path, secure, sameSite 등
- 지울 때는 clearCookie로(expires와 maxAge를 제외한 옵션들이 일치해야 함)

```
res.cookie('name','zerocho',{
  expires: new Date(Date.now()+900000),
  httpOnly : true,
  secure : true
})
res.clearCookie('name', 'zerocho', {httpOnly:true, secure : true})
```

<br />

#### 9. express-session

세션 관리용 미들웨어

```
app.use(session({
  resave:false,
  saveUninitialized:false,
  secret:process.env.COOKIE_SECRET,
  cookie:{
    httpOnly:true,
    secure:false,
  },
  name:'session-cookie',
}))
req.session.name = 'zerocho'
req.sessionID // 아이디 확인
req.session.destroy() // 세션 모두 제거

```

세션 쿠키에 대한 설정(secret: 쿠키 암호화, cookie: 세션 쿠키 옵션)
세션 쿠키는 앞에 s%3A가 붙은 후 암호화되어 프런트에 전송됨

resave: 요청이 왔을 때 세션에 수정사항이 생기지 않아도 다시 저장할지 여부
saveUninitialized: 세션에 저장할 내역이 없더라도 세션을 저장할지
req.session.save로 수동 저장도 가능하지만 할 일 거의 없음

<br />

#### 10. 미들웨어의 특성

req, res, next를 매개변수로 가지는 함수

```
app.use((req, res, next) => {
  console.log('모든 요청에 다 실행 됌')
  next()
})
```

<br />

#### 11. next

next를 호출해야 다음 코드로 넘어감

- next를 주석 처리하면 응답이 전송되지 않음
- 다음 미들웨어(라우터 미들웨어)로 넘어가지 않기 때문
- next에 인수로 값을 넣으면 에러 핸들러로 넘어감(‘route’인 경우 다음 라우터로)

<br />

#### 12. 미들웨어간 데이터 전달하기

req나 res 객체 안에 값을 넣어 데이터 전달 가능
app.set과의 차이점: app.set은 서버 내내 유지, req, res는 요청 하나 동안만 유지
req.body나 req.cookies같은 미들웨어의 데이터와 겹치지 않게 조심

```
app.use((req,res,next) => {
  req.data = '데이터 넣기'
  next()
}, (req,res,next) => {
  console.log(req.data)
  next()
})
```

<br />

#### 13. 미들웨어 확장하기

미들웨어 안에 미들웨어를 넣는 방법
아래 두 코드는 동일한 역할

```
app.use(morgan('dev'))
app.use((req,res,next) => {
  morgan('dev')(req,res,next)
})

```

<br />

#### 14. 멀티파트 데이터 형식

form 태그의 enctype이 multipart/form-data인 경우
body-parser로는 요청 본문을 해석할 수 없음
multer 패키지 필요
<br />

#### 15. multer

multer 함수를 호출
storage는 저장할 공간에 대한 정보
diskStorage는 하드디스크에 업로드 파일을 저장한다는 것
destination은 저장할 경로
filename은 저장할 파일명(파일명+날짜+확장자 형식)
Limits는 파일 개수나 파일 사이즈를 제한할 수 있음.

```
const multer = require('multer')

const upload = multer({
  storage:multer.diskStorage({
    destination(req,file,done){
      done(null,'uploads/')
    },
    filename(req,file,done){
      const ext = path.extname(file.originalname)
      done(null, path.basename(file.originalname, ext) + Date.now() + ext)
    },
  }),
  limits : {fileSize:5*1024*1024}
})

```

실제 서버 운영 시에는 서버 디스크 대신에 S3같은 스토리지 서비스에 저장하는 게 좋음
Storage 설정만 바꿔주면 됨

<br />

#### 16. multer 미들웨어들

single과 none, array, fields 미들웨어 존재

- single은 하나의 파일을 업로드할 때, none은 파일은 업로드하지 않을 때
- req.file 안에 업로드 정보 저장
- array와 fields는 여러 개의 파일을 업로드 할 때 사용
- array는 하나의 요청 body 이름 아래 여러 파일이 있는 경우
- fields는 여러 개의 요청 body 이름 아래 파일이 하나씩 있는 경우
- 두 경우 모두 업로드된 이미지 정보가 req.files 아래에 존재
  <br />

---

### 6.3 router 객체로 라우팅 분리하기

####

<br />

---

### 6.4 req, res 객체 살펴보기

####

<br />

---

### 6.5 템플릿 엔진 사용하기

####

<br />

---

---

## Chap. 8 MongoDB

### 8.1 NoSQL vs SQL

####

<br />

---

### 8.2 몽고디비, 컴퍼스 설치하기

####

<br />

---

### 8.3 데이터베이스, 컬렉션 생성하기

####

<br />

---

### 8.4 CRUD 작업하기

####

<br />

---

### 8.5 몽구스 사용하기

####

<br />

---

---

강의 진행률은 60% 정도고 현재 더 필요하지 않아 멈춘상황.
