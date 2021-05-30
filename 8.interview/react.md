# React.js

#### React의 원리, 특징, 장단점이 무엇인가? ★

1. 특징

   1. component
      Component를 사용해서 효율적으로 재사용이 가능하고 높고 유지보수가 용이
      Component는 UI를 구성하는 개별적인 뷰 단위로 전체 앱은 각 Component들이 결합해서 만들어 지게 되는데 무엇보다 각 Component들은 앱의 다른 부분, 또는 다른 앱에서 쉽게 재사용이 가능하다.
   2. JSX
      JSX라 하며 JavaScript를 확장한 문법입니다. UI가 어떻게 생겨야 하는지 설명하기 위해 React와 함께 사용할 것을 권장합니다.
      순수 js로 html요소를 다 작성해야하는 불편함을 JSX문법을 사용하면 html 형식으로 작성할수 있음
   3. Virtual DOM
      HTML은 브라우저가 문서 객체 모델(DOM)을 구성하기 위해 따라야 하는 절차라고 말할 수 있습니다. HTML 문서를 이루는 엘리먼트는 브라우저가 HTML 문서를 읽어 들이면 DOM 엘리먼트가 되고, 이 DOM이 화면에 사용자 인터페이스를 표시합니다.

      리액트는 이러한 DOM 엘리먼트를 직접 조작하지 않습니다. 대신 가상 DOM을 다루며 리액트가 가상 DOM을 생성하고 브라우저가 이를 렌더링하도록 하는 방식을 따릅니다. 이러한 가상 DOM을 리액트 엘리먼트라고 합니다. 리액트 엘리먼트는개념상 HTML 엘리먼트와 비슷하지만 실제로는 자바스크립트 객체입니다. 따라서 HTML의 DOM API를 직접 다루는 것보다 자바스크립트 객체인 리액트 엘리먼트를 직접 다루는 편이 훨씬 빠릅니다.

2. 장단점

   1. 장점
      ■ Component를 사용해서 효율적으로 재사용이 가능하고 높고 유지보수가 용이
      Component는 UI를 구성하는 개별적인 뷰 단위로 전체 앱은 각 Component들이 결합해서 만들어 지게 되는데 무엇보다 각 Component들은 앱의 다른 부분, 또는 다른 앱에서 쉽게 재사용이 가능하다.

      ■ 생태계가 넓고, 다양한 라이브러리 사용 가능
      개발을 하다보면 막히는 부분, 오류가 있는 부분이 많은데 Vue에 비해 사용자가 많고, 역시 Facebook에서 만들었다보니 확실히 커뮤니티나 자료가 굉장히 방대하다.

      virtual DOM을 활용하여 빠른 렌더링이 가능
      DOM은 브라우저가 화면을 그리기위한 정보를 담고있는 문서 객체이다. JQuery처럼 실제 DOM을 변경할 경우, 변경할 부분이 일부분이더라도 DOM 전체를 다시 렌더링해야하고, 이는 성능 저하로 직결된다는 단점이 있다.
      React는 렌더링 시 Virtual DOM, 즉 가상 DOM을 먼저 만든다. 그 후 실제 DOM과 비교를 하여 변경이 있는 부분(하위 컴포넌트)만 대체를 하기 때문에 리소스 낭비를 줄일 수 있다.

   2. 단점
      ■ 프레임워크의 MVC 와 비교하였을때 V(View)만을 관리한다.
      View 부분만을 관리하기 때문에 다른 부분은 써드파티 라이브러리(Third party library, 패키지)를 이용하거나 직접 구현해야한다.

      ■ 진입장벽이 낮지많은 않다.순수 JavaScript의 개념을 잘 알고 있을 필요가 있고 React는 inline-template 과 JSX 를 사용하는데, 처음에는 적응이 어려울 수도 있다.

#### SPA(Single Page Application)에 대해

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

#### Virtual DOM에 대해 자세히 설명해달라. ★

■ 가상 DOM (Virtual DOM)

브라우저가 작동하는 원리는 DOM Tree -> CSS -> render Tree -> rayout -> painting(스크린에 정보가 나타남)

DOM에 변화생기면, 렌더트리를 재생성하고 (그러면 모든 요소들의 스타일이 다시 계산됩니다) 레이아웃을 만들고 페인팅을 하는 과정이 다시 반복되는거죠.

복잡한 SPA(싱글 페이지 어플리케이션) 에서는 DOM 조작이 많이 발생해요. 그 뜻은 그 변화를 적용하기 위해 브라우저가 많이 연산을 해야한단 소리고, 전체적인 프로세스를 비효율적으로 만듭니다.

만약에 뷰에 변화가 있다면, 그 변화는 실제 DOM 에 적용되기전에 가상의 DOM 에 먼저 적용시키고 그 최종적인 결과를 실제 DOM 으로 전달해줍니다. 실제 DOM에 적용되기 전에 Virtual DOM에 적용시키고 최종 결과만 실제 DOM에 전달합니다. 따라서 20개의 변화가 있다면 Virtual DOM은 변화된 부분만 가려내어 실제 DOM에 전달하고 실제 DOM은 그 변화를 1회로 인식하여 단 한번의 렌더링 과정만 거치게 됩니다. 이로써, 브라우저 내에서 발생하는 연산의 양을 줄이면서 성능이 개선되는 것 이지요.

#### CSR(Client Side Rendering)과 SSR(Server Side Rendering)의 차이가 무엇인가?

서버 사이드 렌더링과 싱글 페이지 애플리케이션의 차이점?
(꼬리 질문) 서버 사이드 렌더링이나 SPA로 각각 구현해 본 경험이 있는지?

CSR의 과정 :

- 서버가 브라우저에게 응답을 보냄 -> 브라우저는 JS를 다운 받음 -> 브라우저는 리액트를 실행 -> 페이지가 보여지고 상호작용 함

SSR의 과정 :

- 서버가 브라우저에게 HTML 응답 랜더링하기 위한 준비가 되었다고 보냄 -> 브라우저가 페이지랜더링, 페이지가 보여지고 브라우저는 JS 다운받음 -> 브라우저 리액트 실행 -> 페이지 상호작용 가능

CSR은 마지막 단계 전까지 화면에 보여지지가 않고 로딩중 / SSR은 미리 페이지가 보여진다.
즉, CSR은 초기로딩속도가 느리긴하지만, 화면전환에 있어서 클라이언트에서 이루어져서 빠른 전환이 가능
SSR은 초기로딩속도가 빨라서 사용자가 느끼기엔 좋지만, JS가 다운받아지는 동안은 동작 하지않음. 그리고 화면전환에 있어서 서버에 요청해야하므로 서버에 부담을 줄 수 있음.

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

대규모 어플리케이션에서 보다 일관된 데이터 관리를 하기 위해서였습니다.

기존의 어플리케이션 환경에서 보편적으로 사용되는 패턴은 MVC였습니다. Model에 데이터를 정의해 두고, Controller를 이용해 Model 데이터를 생성 / 조회 / 수정 / 삭제(CRUD)하고, 변경된 데이터는 View에 출력되면서 사용자에게 전달됩니다.

Controller => model <- -> view

이 패턴의 문제점은 어플리케이션의 규모가 커질수록 데이터 흐름의 복잡도가 무지막지하게 늘어난다는 것이었습니다. 예를 들어 칼럼 게시판을 만든다고 칩시다. 이 게시판 UI의 가장 큰 특징은 자신이 최근에 남긴 댓글이 우측 사이드바에 실시간으로 떠오른다는 것입니다.

만일 유저 A가 새 글을 쓰고 유저 B가 댓글을 작성했는데, 마음이 바뀐 A가 글을 5분만에 삭제했다면 어떻게 될까요? 공교롭게도 B가 사이트를 떠나지도 않고 새로고침도 하지 않은 채 창을 내버려뒀다면, 이 게시판은 어떻게 B의 댓글이 지워졌음을 반영할 수 있을까요? 게다가, 사이트 헤더에 이 게시판의 전체 댓글 수를 실시간으로 집계하는 카운터가 달려 있다면?

Flux 패턴 살펴보기
facebook은 이 문제를 해결하기 위해 flux라는 패턴을 만들었습니다. Model이 View를 반영하고, View가 Model을 변경하는 양방향 데이터 흐름에서 벗어나 단방향으로만 데이터를 변경할 수 있도록 만든 건데요.

우선 ‘단방향 데이터 흐름’이 어떻게 이루어지는지를 알아봅시다.

action -> dispatcher -> model -> view

Action / Action Creator
액션은 데이터의 상태를 변경할 수 있는 명령어 카드와 같습니다. 액션 생성자는 새로 발생한 액션의 타입과 데이터 페이로드를 액션 메시지로 묶어 디스패쳐로 전달합니다.

Dispatcher
디스패쳐는 액션 메시지를 감지하는 순간 그것을 각 스토어에 전달합니다. 전달은 콜백 함수로 이루어지며, 등록되어 있는 모든 스토어로 페이로드를 전달할 수 있습니다. 이때 스토어가 서로를 의존하고 있다면 (학생의 개인정보를 담은 스토어와 모든 학생의 수학 점수만을 담은 스토어를 예로 들 수 있겠군요) 특정 스토어가 업데이트되기를 기다리게 해주는 waitFor()를 사용할 수 있습니다.

Store (Model)
스토어는 어플리케이션의 상태와, 상태를 변경할 수 있는 메서드를 가지고 있습니다. 어떤 타입의 액션이 날아왔느냐에 따라 메서드를 다르게 적용해 상태를 변경하게 됩니다.

View
React에 해당되는 부분입니다. 컨트롤러 뷰는 스토어에서 변경된 데이터를 가져와 모든 자식 뷰에게 데이터를 분배합니다. 데이터를 넘겨받은 뷰는 화면을 새로 렌더링합니다.

#### Redux에 대해 설명해달라. ★

아직 대규모 어플리케이션을 다룬 경험이 없기에 리덕스를 사용하진 않았지만 redux역활을 하는 hooks
useReducer, uesContext를 사용해봄

- reducer 함수는 action들의 이름과 실행사항을 포함하고 있다
- dispatch({type:action명, 변수}) `dispatch({ type: SET_WINNER, winner: 'O' })`
- reducer는 dispatch로 전달받은 action명에 해당하는 내용을 실행

```
const initialState = {count: 0};

function reducer(state, action) {
  switch (action.type) {
    case 'increment':
      return {count: state.count + 1};
    case 'decrement':
      return {count: state.count - 1};
    default:
      throw new Error();
  }
}

function Counter() {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <>
      Count: {state.count}
      <button onClick={() => dispatch({type: 'decrement'})}>-</button>
      <button onClick={() => dispatch({type: 'increment'})}>+</button>
    </>
  );
```

context를 이용하면, 트리 단계마다 명시적으로 props를 넘겨주지 않아도 많은 컴포넌트가 이러한 값을 공유하도록 할 수 있습니다.

```
const themes = {
  light: {
    foreground: "#000000",
    background: "#eeeeee"
  },
  dark: {
    foreground: "#ffffff",
    background: "#222222"
  }
};

const ThemeContext = React.createContext(themes.light);

function App() {
  return (
    <ThemeContext.Provider value={themes.dark}>
      <Toolbar />
    </ThemeContext.Provider>
  );
}

function Toolbar(props) {
  return (
    <div>
      <ThemedButton />
    </div>
  );
}

function ThemedButton() {
  const theme = useContext(ThemeContext);
  return (
    <button style={{ background: theme.background, color: theme.foreground }}>
      I am styled by theme context!
    </button>
  );
}
```

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

Next.js의 기본 구조는 다음처럼 구성됩니다.

|-- pages
| |-- \_document // HTML Document, Application Container, 각종 페이지 등을 작성한다.
| |-- \_app // Application Container. 공통의 레이아웃을 작성한다.
| |-- \_error // Error Page.
| |-- hello // Hello Page /hello로 시작되는 경로의 페이지 컴포넌트

`_app.js`는 client에서 띄우길 바라는 전체 컴포넌트의 레이아웃으로 이해하면 쉽습니다.
공통 레이아웃 이므로 최초에 실행되어 내부에 들어갈 컴포넌트들을 실행합니다.
지속적으로 띄울 레이아웃
페이지를 탐색 할 때 상태 유지
componentDidCatch를 사용하여 사용자 정의 오류 처리
추가 데이터를 페이지에 주입
글로벌 CSS 추가

`_document.js`는 SPA에서 시작점이 되는 index.html이라고 생각하면 됩니다.
서버에서만 렌더링되며 onClick과 같은 이벤트 핸들러가 동작하지 않습니다.

NextJS의 장점
직관적 라우팅 시스템 Dynamic Routes
동적라우팅이 필요한 컴포넌트의 파일명은 `[파일명].js`으로 정의

pre-rendering static generation(정적페이지 생성) + server side rendering 둘다 지원

Next.JS의 모든 페이지는 사전 렌더링(pre_rendering)
더 좋은 퍼포먼스, 검색엔진최적화(SEO)

1. 정적 생성
2. Server Side Rendering(SSR)

차이점은 언제 html 파일을 생성하는 가

[정적 생성]

작성한 page들의 모든 컴포넌트를 정적 HTML 파일로 build-time에 렌더링하여 준비시킨 뒤 각각의 페이지들이 요청할 때에 페이지에 해당하는 html파일들을 내어준다.
즉 컴포넌트 모든 html파일을 미리 렌더링해 놓고 대기시키는 것이다.

- 프로젝트가 빌드하는 시점에 html 파일들이 생성
- 모든 요청에 재사용
- 퍼포먼스의 이유로, Next.js는 정적 생성을 추천
- 정적 생성된 페이지들은 CDN에 캐시
- getStaticProps / getStaticPaths
- 대부분은 정적 생성이 좋음
  ex) 마케팅페이지, 블로그게시물, 제품목록, 도움말, 문서...

[서버사이드 렌더링]

페이지가 요청하는 순간에 그 페이지에 알맞은 컴포넌트를 정적 html파일로 렌더링하여 브라우저 내어준다.

- 매 요청마다 html을 생성
- 항상 최신 상태 유지
- getServerSideProps
  ex) 관리자 페이지, 분석차트...

유저가 페이지 요청을 하기전에 미리 만들어놔도 상관이 없다면
정적 생성이다.
