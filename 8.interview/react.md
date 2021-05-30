# React.js

#### React의 원리, 특징, 장단점이 무엇인가? ★

#### SPA(Single Page Application), Virtual DOM에 대해 자세히 설명해달라. ★

기존의 웹은 브라우저는 단지 보여주기만 할 뿐, 요청한 웹 문서에 대한 처리는 전부 서버에서 담당했다

과거에는 서버에 담긴 .jsp파일이 있다면, 서버는 자바코드를 통해 데이터베이스와 연결해 데이터를 가져와 이 .jsp파일에 담긴 결과물을 html처럼 만들어준 후, 사용자에게 보내주었다.

그런데, 어떻게 프론트엔드에서 자바스크립트로 이걸 해결할 수 있을까?

REST API 는 간단하게 말하자면 URL를 통해 서버에게 어떤 행위를 요청하고 응답받는 것이다.

- 프론트는 자바스크립트와 URL을 이용해서 서버에게 데이터를 요청하고 응답받는다.
- SPA에서는 웹 페이지가 자바스크립트로 인해 렌더링된다.
- 서버는 URL을 통해 들어온 요청에 대한 응답만 해주면 되고, 이때 METHOD를 살핀다.
- METHOD 종류로는 GET, POST, PATCH, PUT, DELETE 등이 있다.

SPA는 Single Page Application의 약자이다.
말 그대로, 한 개의 페이지로 이루어진 애플리케이션이라는 의미이다.

- app의 느낌을 웹으로 구현
- 새로고침 없음 -> 사용자 경험이 좋아짐
- 기존에는 데이터와 화면을 일치시키는 게 어려웠음
- 컴포넌트화로 중복을 줄여줌

Virtual DOM에서 컴포넌트 변화를 감지할 때 효율적으로 비교하기 위해 컴포넌트 내부는 Tree 구조를 띄고 있어야 한다는 규칙이 있기 때문입니다.

#### CSR(Client Side Rendering)과 SSR(Server Side Rendering)의 차이가 무엇인가?

서버 사이드 렌더링과 싱글 페이지 애플리케이션의 차이점?
(꼬리 질문) 서버 사이드 렌더링이나 SPA로 각각 구현해 본 경험이 있는지?

원래 web은 SSR이었음 react, vue, angular 3대장이 나오고
SPA, CSR가 유행했는데 CSR의 단점 때문에 다시 SSR이 주목받는 중

- CSR client side rendering

html에는 id=root 와 JS link만 들어있고 비어있다
처음에는 빈화면이 보임. 그 후 로직과 화면 전부를 받아옴
단점

1. 첫 로딩속도가 길다.
2. LOW SEO 검색엔진 최적화가 힘들다.
   SEO는 HTML파일을 보고 적절한 페이지가 검색되게끔 하는데
   html이 텅 비어있기 때문. (현재 구글은 개선되었다.)

- SSR server side rendering

Client 요청 > Server 는 요청받은 데이터를 넣어, 응답할 HTML 을 만들어줌 > Client 로 전달
단점

1. 새로고침
2. 템플릿 중복 로딩 -> 서버과부하
3. 인터렉티브 효과의 버벅임 발생가능성

#### React의 Class와 Hooks의 차이를 설명해달라.

클래스형 :

- state, lifeCycle 관련 기능사용 가능하다.
- 메모리 자원을 함수형 컴포넌트보다 조금 더 사용한다.
- 임의 메서드를 정의할 수 있다.

함수형 :

- state, lifeCycle 관련 기능사용 불가능 [Hook을 통해 해결 됨]
- 메모리 자원을 함수형 컴포넌트보다 덜 사용한다.
- 컴포넌트 선언이 편하다.

함수형 컴포넌트에서 state와 Life Cycle의 feature들을 사용할 수 있게 해줌
useState, useEffect, useReducer, useContext

프로젝트가 고도화되고 유지보수가 어려워지자 나오게 됌
클래스 컴포넌트에는 상태관리나 라이프사이클의 기능이 있지만, 함수 컴포넌트에는 그 기능이 없었다.
하지만 Hook이 생기면서 함수 컴포넌트에서도 State를 이용하여 상태관리나 라이프사이클 함수를 사용하는 것이 가능졌다!🥳

Basic Hooks는 usestate, useEffect, useContext, useRef, useMemo

useState 는 컴포넌트 내에서 상태를 관리할 수 있게 도와줍니다.

useEffect는 함수형 컴포넌트 안에서 side-effect 를 처리하는 걸 도와줍니다. Side-effect 란 data fetching, DOM 조작 등을 일컫습니다.

class 형 컴포넌트의 라이프사이클함수와 관련이 있습니다.
기본적으로 처음 컴포넌트가 마운트가 될 때, 한 번 작동하게 되고(componentDidMount), 두 번째 인수가 주어지지 않는다면 스테이트가 변화할 때 마다, 렌더링이 다시 이루어진다.(componentDidUpdate).
그리고 useEffect() 함수 내에서 리턴을 통해 componentWillUnmount 라이프사이클도 사용할 수 있다.

결국 useEffect() 함수는 componentDidMount, componentDidUpdate, componentWillUnmount 라이프사이클이 합쳐져 있다고 볼 수 있다.

useContext는 데이터를 props 로 전달하지 않고도 컴포넌트 트리 전체에 전달할 수 있습니다.

useRef는 JS의 querySelecter처럼 특정 돔을 선택해야 할 때 사용합니다.
(class형 컴포넌트에서는 createRef)
// input.current.focus()
컴포넌트 안에서 조회 및 수정하는 변수를 관리
스크롤위치, window 함수(settimeout, setinterval) 값은 컴포넌트 변수로 관리 불가능 하고, useRef를 통해 잡은 값으로 관리 가능하다
이 값을 바꾼다고 컴포넌트가 리렌더링 되지 않음
react의 state는 상태변경 함수를 호출 -> 렌더링 이후 업데이트 된 상태 조회 방식인데, useRef로 관리하는 state는 상태 변경 이후 렌더링 없이 바로 상태 조회

useMemo
성능최적화를 위해 연산된 값을 재사용할 수 있게함

useReducer
redux의 주요부분을 가져옴
(redux는 각 컴포넌트들이 개별적으로 관리하던 state를 상태관리 전용장소(store)에서 관리하고 각 컴포넌트는 그걸 보여주기만 한다.
state에 직접 접근하면 안되고 Action이라는 오브젝트를 통해서 접근 가능)
소규모 앱에서는 useContext와 함께 redux를 대체가능(대규모는 불가)
하지만 비동기적 작업이 힘들기 때문에 redux를 완전 대체 불가

#### Props, State에 대해 설명해달라.

state (상태) : 컴포넌트 내에서 동적으로 변경되는 값
props는 (함수 매개변수처럼) 컴포넌트에 전달되는 반면, state는 (함수 내 선언된 변수처럼) 컴포넌트 안에서 관리된다는 차이가 있다

#### Props가 컴포넌트간에 전달받는 것이라고 했는데 자식에서 부모로도 전달할 수 있는가?

원칙적으로는 전달할 수 없다. 하위컴포넌트에서 props 값을 state로 저장한 다음 상위컴포넌트로 보낼 수 있다.

#### React에서 state의 불변성을 유지하라는 말이 있는데 이에 대해 설명해달라.

여기서 불변성은, 메모리 영역에서의 직접적인 변경이 불가능하다는 뜻이다. (재할당은 가능하다)

기존 state의 불변성을 지켜주어야만, 리액트 컴포넌트에서 상태가 업데이트가 됐음을 감지 할 수 있고 이에 따라 필요한 리렌더링이 진행되기 때문이다.

이는 함수형프로그래밍과도 연관이 있는 개념(react가 class형에서 hooks로 넘어가는 이유)

수정 불가능한 변수는 다양한 장점을 갖고 있는데, 그중 두 가지만 알아보자
변수가 수정 불가능하면 함수에서 side effect가 발생할 확률이 낮아진다. side effect가 없는 것만으로도 프로그램의 복잡도가 상당히 줄어든다.

state에 배열이나 오브젝트가 들어가 있다면, 그 안의 내용이 바뀌어도 리렌더링 되지 않는다(내부의 값이 바뀐거지 배열이나 오브젝트가 직접 변경 된게 아님). 그러면 react는 reRendering을 하지 않고, 새로운 값을 포함한 뷰를 새로 그리지 않는다.
그래서 불변성을 유지한다는 말은 데이터에 변화가 있을 때 기존의 것은 변화하지 않고 새로운 것을 만들어준다는 의미

```
// bad
const arr = [1,2,3,4]
arr.push(5) // 배열에 5가 추가되었지만 react는 모름
// good
const arr = [1,2,3,4]
const newArr = [...arr, 5]
```

#### Flux 디자인 패턴을 아는가? (Redux)

#### Redux에 대해 설명해달라. ★

#### React가 렌더링을 수행하는 시점은 다음과 같다.

1. Props가 변경되었을 때
2. State가 변경되었을 때
3. forceUpdate() 를 실행하였을 때
4. 부모 컴포넌트가 렌더링되었을 때
   React에서 1번,2번의 경우 정확하게는 setState가 실행되었을 때이다.(state, props가 변경되지 않아도)

#### 컴포넌트 생명주기(라이프사이클)

constructor -> ref -> render -> componentDidMount ->
(setState/props 변경) -> shouldComponentUpdate(true) -> reRendering -> componentDidUpdate ->
(부모가 컴포넌트를 제거할 때) -> componentWillUnmount -> 소멸

// 컴포넌트의 생애 = 라이프사이클
componentDidMount() {
// 컴포넌트가 첫 렌더링 된 후
}

componentDidUpdate() {
// 두번째 렌더링부터 실행
}

componentWillUnmount() {
// 컴포넌트가 제거 되기 직전
}

# Next.js

####

####

####

####

####

####

####

NextJS의 장점
직관적 라우팅 시스템
pre-rendering static generation(정적페이지 생성) + server side rendering 둘다 지원

Next.JS의 모든 페이지는 사전 렌더링(pre_rendering)
더 좋은 퍼포먼스, 검색엔진최적화(SEO)

1. 정적 생성
2. Server Side Rendering(SSR)

차이점은 언제 html 파일을 생성하는 가

[정적 생성]

- 프로젝트가 빌드하는 시점에 html 파일들이 생성
- 모든 요청에 재사용
- 퍼포먼스의 이유로, Next.js는 정적 생성을 추천
- 정적 생성된 페이지들은 CDN에 캐시
- getStaticProps / getStaticPaths
- 대부분은 정적 생성이 좋음
  ex) 마케팅페이지, 블로그게시물, 제품목록, 도움말, 문서...

[서버사이드 렌더링]

- 매 요청마다 html을 생성
- 항상 최신 상태 유지
- getServerSideProps
  ex) 관리자 페이지, 분석차트...

유저가 페이지 요청을 하기전에 미리 만들어놔도 상관이 없다면
정적 생성이다.
