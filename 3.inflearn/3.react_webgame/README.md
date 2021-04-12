# Inflearn 제로초님의 웹 게임을 만들며 배우는 REACT 강좌

강의 링크 : https://www.inflearn.com/course/web-game-react/dashboard

## 수강 이유

- React를 더 자세히 공부하고 싶어서

---

처음 이 강좌를 공부할 때는 create-react-app으로 공부했었음(mywork)

---

## Chap.1 구구단

### 1.1 리액트를 왜 쓰는가

React.createClass -> Class -> Hooks

사용자 인터페이스를 만들기 위한 JS 라이브러리

SPA(single page Application)을 만들기 위해

- app의 느낌을 웹으로 구현
- 새로고침 없음 -> 사용자 경험이 좋아짐
- 기존에는 데이터와 화면을 일치시키는 게 어려웠음
- 컴포넌트화로 중복을 줄여줌

### 1.2 첫 리액트 컴포넌트

Web-pack는 React를 Html이 실행할 수 있는 쪼개진 JS파일로 만들어 준다.

- react, react-dom을 불러오고
- react element를 선언하고
- 내용을 채운다음, div root에 render함

```
<html>
  <head> </head>
  <body>
    <div id="root"></div>
    <script
      crossorigin
      src="https://unpkg.com/react@16/umd/react.development.js"
    ></script>
    <script
      crossorigin
      src="https://unpkg.com/react-dom@16/umd/react-dom.development.js"
    ></script>
    <script>
      "use strict";

      const e = React.createElement;

      class LikeButton extends React.Component {
        constructor(props) {
          super(props);
          this.state = { liked: false };
        }

        render() {
          if (this.state.liked) {
            return "You liked this.";
          }

          return e(
            "button",
             null,
            "Like"
          );
        }
      }
    </script>
    <script>
      ReactDOM.render(e(LikeButton), document.querySelector("#root"));
    </script>
  </body>
</html>
```

### 1.3 HTML 속성과 상태(state)

html 속성을 넣어줄 수 있다.

```
   render() {
          if (this.state.liked) {
            return "You liked this.";
          }

          return e(
            "button",
               { onClick: () => console.log('clicked')},
               // 이 자리에 속성을 넣어줄 수 있음
            "Like"
          );
        }
```

상태란 바뀔 수 있는 여지가 있는 부분을 지칭함

```
      class LikeButton extends React.Component {
        constructor(props) {
          super(props);
          this.state = { liked: false };
        }
```

### 1.4 JSX와 바벨(babel)

- 위의 원시적 react가 가독성이 좋지는 않다.
- js파일에서는 html 태그를 사용할 수 없는데
- 이를 해결하기 위해서 바벨이 필요함
- 바벨은 최신문법이나 실험적문법을 JS파일에서 사용할 수 있게 해줌
  ```
  <script src="https://unpkg.com/babel-standalone@6/babel.min.js"></script>
   <script type="text/babel">
    // 여기서 사용할 수 있음
   </script>
  ```
- 그래서 나온게 JSX(js + XML) 문법
- html태그를 js과 같이 씀

```
return e(
            "button",
               { onClick: () => console.log('clicked')},
               // 이 자리에 속성을 넣어줄 수 있음
            "Like"
          );
return <button
            type='submut'
            onClick={() => console.log('clicked')}
            >
            Like</button>

ReactDOM.render(e(LikeButton), document.querySelector("#root"));
ReactDOM.render(<LikeButton />, document.querySelector("#root"));
```

### 1.5 첫 번째 Q & A

### 1.6 구구단 리액트로 만들기

### 1.7 클래스 메서드

### 1.8 Fragment와 기타 팁들

### 1.9 함수형 setState

### 1.10 ref

---

## Chap.2 끝말잇기

### 2.1 React Hooks 사용하기

### 2.2 Class와 Hooks 비교하기

### 2.3 웹팩 설치하기

### 2.4 모듈 시스템과 웹팩 설정

### 2.5 웹팩으로 빌드하기

### 2.6 구구단 웹팩으로 빌드하기

### 2.7 @babel/preset-env와 plugins

### 2.8 끝말잇기 Class 만들기

### 2.9 웹팩 dev server와 핫 로딩

### 2.10 끝말잇기 Hooks로 전환하기

---

## Chap.3 숫자야구

### 3.1 import와 require 비교

### 3.2 리액트 반복문(map)

### 3.3 리액트 반복문(key)

### 3.4 컴포넌트 분리와 props

### 3.5 주석과 메서드 바인딩

### 3.6 숫자야구 만들기

### 3.7 Q&A

### 3.8 숫자야구 Hooks로 전환하기

### 3.9 React DevTools

### 3.10 shouldComponentUpdate

### 3.11 PureComponent와 React.memo

### 3.12 React.createRef

### 3.13 props와 state 연결하기

---

## Chap.4 반응속도체크

### 4.1 React 조건문

### 4.2 setTimeout 넣어 반응 속도 체크

### 4.3 성능체크와 Q&A

### 4.4 반응속도체크 Hooks로 전환하기

### 4.5 return 내부에 for과 if 쓰기

---

## Chap.5 가위바위보

### 5.1 리액트 라이프사이클 소개

### 5.2 setInterval과 라이프사이클 연동하기

### 5.3 가위바위보 게임 만들기

### 5.4 고차 함수와 Q&amp;A

### 5.5 Hooks와 useEffect

### 5.6 클래스와 Hooks 라이프사이클 비교

---

## Chap.6 로또 추첨기

### 6.1 로또 추첨기 컴포넌트

### 6.2 setTimeout 여러 번 사용하기

### 6.3 componentDidUpdate

### 6.4 useEffect로 업데이트 감지하기

### 6.5 useMemo와 useCallback

### 6.6 Hooks에 대한 자잘한 팁들

---

## Chap.7 틱택토

### 7.1 틱택토와 useRedcuer 소개

### 7.2 reducer, action. dispatch의 관계

### 7.3 action 만들어 dispatch 하기

### 7.4 틱택토 구현하기

### 7.5 테이블 최적화하기

---

## Chap.8 지뢰찾기

### 8.1 Context API 소개와 지뢰찾기

### 8.2 createContext와 Provider

### 8.3 useContext 사용해 지뢰 칸 렌더링

### 8.4 왼쪽 오른쪽 클릭 로직 작성하기

### 8.5 지뢰 개수 표시하기

### 8.6 빈 칸들 한 번에 열기

### 8.7 승리 조건 체크와 타이머

### 8.8 Context api 최적화

---
