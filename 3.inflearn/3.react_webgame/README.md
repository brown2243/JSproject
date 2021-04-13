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

로직은

- first, second를 Math.random()으로 구해줌
- 맞추면 result값에 정답, value초기화, first와 second 변경
- 맞추면 result값에 오답, value초기화

### 1.7 클래스 메서드

JSX에서 html이랑 js를 섞어쓰지말자.
메서드로 위로 빼자.

```
<script type="text/babel">
      class GuGuDan extends React.Component {
        state = {
          first: Math.ceil(Math.random() * 9),
          second: Math.ceil(Math.random() * 9),
          value: "",
          result: "",
        };

        onSubmit = (e) => {
          e.preventDefault();
          if (
            parseInt(this.state.value) ===
            this.state.first * this.state.second
          ) {
            this.setState((prevState) => {
              return {
                result: "정답: " + prevState.value,
                first: Math.ceil(Math.random() * 9),
                second: Math.ceil(Math.random() * 9),
                value: "",
              };
            });
          } else {
            this.setState({
              result: "땡",
              value: "",
            });
          }
          this.input.focus();
        };

        onChange = (e) => {
          this.setState({ value: e.target.value });
        };

        input;

        onRefInput = (c) => {
          this.input = c;
        };

        // 컨텐츠
        render() {
          return (
            <React.Fragment>
              <div>
                {this.state.first} 곱하기 {this.state.second}는?
              </div>
              <form onSubmit={this.onSubmit}>
                <input
                  ref={this.onRefInput}
                  type="number"
                  value={this.state.value}
                  onChange={this.onChange}
                />
                <button>입력!</button>
              </form>
              <div>{this.state.result}</div>
            </React.Fragment>
          );
        }
      }
    </script>
```

### 1.8 Fragment와 기타 팁들

- Fragment 는 그냥 빈 태그임
  - `<React.Fragment>, <Fragment>, <>`
- 빈태그가 있으면 좋은 이유는 react는 반드시 하나의 태그로 묶여있어야 하기 때문
  (리액트에서는 태그 여러개를 하나의 태그로 묶어주어야 하는 이유는 Virtual DOM에서 컴포넌트 변화를 감지할 때 효율적으로 비교하기 위해 컴포넌트 내부는 Tree 구조를 띄고 있어야 한다는 규칙이 있기 때문입니다.) https://hyungjun7.tistory.com/4

### 1.9 함수형 setState

- setState는 두가지 형태가 있음

  - 일반 setState(새값)
  - 함수형 setState((prev) => {})
    이렇게 쓰면 이전 값을 가져올 수 있음 prev는 이전 값
    counter 예제에서

    ```
    setState({
      value: this.state.value + 1
    })
    // 아래가 낫다. setState가 비동기 함수이기 때문.
    // this.state가 들어가야 한다면, 함수형을 쓰자.
    setState((prev) => {
      value: prev.value + 1
    })
    ```

### 1.10 ref

React에서 JS로 직접 돔 조작을 하는 것은 권장되지 않는다.
대신 ref를 사용해서 비슷하게 할 수 있음

```
// JS
document.querySelector('input').focus()
// React
  input;
  <input ref={(c) => {this.input = c}} />
  input.focus()
```

---

## Chap.2 끝말잇기

### 2.1 React Hooks 사용하기

함수형 컴포넌트가 대세

- react 개발팀이 Class형 컴포넌트 대신 함수형 컴포넌트 사용 권장.
- 코드가 더욱 간결

```
// state 넣는 방법차이
class Gugudan extends Component {
   state = {
          first: Math.ceil(Math.random() * 9),
          second: Math.ceil(Math.random() * 9),
          value: "",
          result: "",
        };
}
// useState를 사용
const GuGuDan = () => {
  const [first, setFirst] = useState(Math.ceil(Math.random() * 9));
  const [second, setSecond] = useState(Math.ceil(Math.random() * 9));
  const [value, setValue] = useState("");
  const [result, setResult] = useState("");
  const inputEl = useRef(null);
}
```

함수형 컴포넌트에서 상태관리를 위해 Hooks를 사용

### 2.2 Class와 Hooks 비교하기

class는 1.7에 있음
차이점

- setState => useState
- ref는 current를 붙여줘야함 `ex)_ ref.current.focus()`
- Class형에서는 state가 바뀌면 render함수가 재실행 됐지만
- Function형에서는 state가 바뀌면 컴포넌트 전체가 재실행 된다.

함수형 구구단

```
  <script type="text/babel">
      "use strict";
      const GuGuDan = () => {
        const [first, setFirst] = React.useState(Math.ceil(Math.random() * 9));
        const [second, setSecond] = React.useState(
          Math.ceil(Math.random() * 9)
        );
        const [value, setValue] = React.useState("");
        const [result, setResult] = React.useState("");
        const inputEl = React.useRef(null);

        const onSubmitForm = (e) => {
          e.preventDefault();
          if (parseInt(value) === first * second) {
            setResult("정답");
            setFirst(Math.ceil(Math.random() * 9));
            setSecond(Math.ceil(Math.random() * 9));
            setValue("");
            inputEl.current.focus();
          } else {
            setResult("땡");
            setValue("");
            inputEl.current.focus();
          }
        };
        return (
          <React.Fragment>
            <div>
              {first} 곱하기 {second}는?
            </div>
            <form onSubmit={onSubmitForm}>
              <input
                ref={inputEl}
                type="number"
                value={value}
                onChange={(e) => setValue(e.target.value)}
              />
              <button>입력!</button>
            </form>
            <div id="result">{result}</div>
          </React.Fragment>
        );
      };
    </script>
```

### 2.3 웹팩 설치하기

웹팩이란 시스템은 여러개의 js파일을 한방에 합쳐 하나의 js파일로 만들어 준다.
가독성과 생산성을 높이기 위함.

- npm init // 초기셋팅을 해줌
- npm i react react-dom //react, react-dom 설치
- npm i -D webpack webpack-cli // react에 필요한 webpack 설치(-D는 개발용(실제 서비스에서는 web-pack이 필요없음))

```
"dependencies": {
    "react": "^17.0.1",
    "react-dom": "^17.0.1"
  },
  "devDependencies": {
    "webpack": "^5.3.2",
    "webpack-cli": "^4.1.0",
  }
```

설치 된 모듈은 이렇게 불러올 수 있다.

```
const React = require('react');
const ReactDom = require('react-dom');
```

create-react-app은 이러한 웹팩설정 +알파를 다 해준다.
세부설정을 바꾸려면 eject를 해줘야함

- https://medium.com/@jsh901220/create-react-app%EC%97%90%EC%84%9C-eject%EC%82%AC%EC%9A%A9%EC%95%88%ED%95%98%EA%B8%B0-customize-cra-react-app-rewired-10a83522ace0
- https://blog.grotesq.com/post/691

### 2.4 모듈 시스템과 웹팩 설정

- 노드의 모듈 시스템
- 쪼갠 파일에서 사용하려면 가져와야함
- exports를 해줘야 다른 파일에서도 사용할 수 있음

```
const React = require('react');
const { Component } = React;

class WordRelay extends Component {
  ...
}

module.exports = WordRelay;
```

여러 js파일을 하나로 합쳐 html파일에 불러줌(여기서 웹팩이 필요)

```
// webpack.config.js 로 다 돌아감
const path = require('path'); // 노드 경로 모듈
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');

module.exports = {
  name: 'word-relay-dev', // 이름
  mode: 'development',    // 모드 개발용, 서비스 'production'
  devtool: 'eval',        // 빠르게 함(?)

  entry: {  // **입력**
    app: ['./client', './WordRely.jsx'] =>

    app: './client' // 다른파일이 불러오는 파일은 적어줄 필요없다.
                    // 확장자 다 적기 귀찮으면 resolve에다 등록.
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  output: { // **출력**
    path: path.join(__dirname, 'dist'), // 현재폴더 안에 dist
    filename: 'app.js',
  },
};

```

### 2.5 웹팩으로 빌드하기

2가지 방법이 있다.

1. package.js에 scripts를 등록
   ```
   // package.js
     ...
     "scripts": {
       "dev": "webpack"
     },
   ```
2. npx webpack 치면 실행 됨

빌드하면 entry를 읽어서 output 한 파일로 만들어줌.
웹팩 자체는 복잡하지 않지만 설정이 많아서 복잡도가 올라간다.

JSX를 웹팩이 이해하려면 바벨이 필요함.
바벨 안에서도 JSX를 설정 해줘야 함

```
// package.js
"devDependencies": {
    "@babel/core": "^7.12.3",        // 바벨의 기본적인 기능 포함
    "@babel/preset-env": "^7.12.1",  // 최신문법을 브라우저에 맞춰 옛날문법으로 변환
    "@babel/preset-react": "^7.12.1",// JSX 지원
    "@babel/plugin-proposal-class-properties": "^7.4.0",
     // 클래스 프로퍼티를 사용할 수 있도록 도와주는 바벨 플러그인입니다.
    "babel-loader": "^8.1.0",        // 바벨과 웹팩을 연결해준다.
    ...
}
```

참조

- 웹팩 관련 https://velog.io/@padakim/Webpack4-for-React-%EB%A6%AC%EC%95%A1%ED%8A%B8%EB%A5%BC-%EC%9C%84%ED%95%9C-%EC%9B%B9%ED%8C%A94-1-
- 웹팩 관련 https://lejewk.github.io/react-webpack-babel/

- devtool 관련 링크 https://perfectacle.github.io/2016/11/14/Webpack-devtool-option-Performance

### 2.6 구구단 웹팩으로 빌드하기

```
const path = require('path');
const webpack = require('webpack');

module.exports = {
  name: 'word-relay-dev', // 이름
  mode: 'development',    // 모드 개발용, 서비스 'production'
  devtool: 'eval',        // 개발은 eval, production은 hidden-source-map

  entry: {  // **입력**
    app: './client' // 다른파일이 불러오는 파일은 적어줄 필요없다.
                    // 확장자 다 적기 귀찮으면 resolve에다 등록.
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  // entry에 있는 파일을 읽고 거기에 모듈을 적용한 후 아웃풋에 뺀다.
  module: {
    rules: [{ // 여러 규칙들을 정할 수 있다(배열).
      test: /\.jsx?$/,        // jsx파일에 룰을 적용하겠다.
      loader: 'babel-loader', // loader를 'babel-loader' 사용
      options: {              // 바벨의 옵션
        presets: ['@babel/preset-env','@babel/preset-react'],
        plugins: ['@babel/plugin-proposal-class-properties'],
      },
    }],
   },
  output: { // **출력**
    path: path.join(__dirname, 'dist'), // 현재폴더 안에 dist
    filename: 'app.js',
  },
};
```

### 2.7 @babel/preset-env와 plugins

option의 preset은 plugin의 집합이다.

```
 options: {
        presets: ['@babel/preset-env','@babel/preset-react'],

        // preset이 플러그인들의 집합이다 보니 거기에 또 설정이 필요할 수 있음.
        // 만약 '@babel/preset-env'에 설정을 적용하고 싶다면
        // 배열을 만들어 첫요소에 이름, 두번째에 설정

        presets: [['@babel/preset-env', {
          targets:{ // https://github.com/browserslist/browserslist 참고 링크
            browsers : ['> 5% in KR','last 2 chrome versions'],
          },
        }],'@babel/preset-react'],
        plugins: ['@babel/plugin-proposal-class-properties'],
      },
```

그리고 plugins은 다른 plugins도 있음
위에 플러그인 말고 추가적으로 뭘 더하고싶다면 아래의 위치에서 사용가능

```
const webpack = require("webpack");

  ...
  module: {...},
  plugins:[
    new webpack.LoaderOptionsPlugin({debug:true}), // ex
    //
  ],
  output : {...}
```

웹팩이 워낙 설정이 많아서 복잡하지만 아래 5가지가 핵심.

- Entry // 시작하는파일
- Output // 결과가 어떻게 될지
- Loaders // module
- Plugins // 추가적으로 하고싶은 작업
- mode // 모드

### 2.8 끝말잇기 Class 만들기

로직

- 현재의 단어의 마지막글자와 입력단어의 첫글자가 일치하면 OK

```
const React = require('react');
const { Component } = React;

class WordRelay extends Component {
  state = {
    word: '제로초',
    value: '',
    result: '',
  };

  onSubmitForm = (e) => {
    e.preventDefault();
    if (this.state.word[this.state.word.length - 1] === this.state.value[0]) {
      this.setState({
        result: '정답',
        word: this.state.value,
        value: '',
      });
      this.input.focus();
    } else {
      this.setState({
        result: '오답',
        value: '',
      });
      this.input.focus();
    }
  };

  onChangeInput = (e) => {
    this.setState({ value: e.target.value });
  };

  input; // this.input을 생성

  onRefInput = (c) => {
    this.input = c;
  };

  render() {
    return (
      <>
        <div>{this.state.word}</div>
          <form onSubmit={this.onSubmitForm}>
            <input ref={this.onRefInput}
                  value={this.state.value}
                  onChange={this.onChangeInput} />
            <button>클릭</button>
          </form>
        <div>{this.state.result}</div>
      </>
    );
  }
}

module.exports = WordRelay;
```

### 2.9 웹팩 dev server와 핫 로딩

hot reloading하는 두 패키지
react-refresh, @pmmmwh/react-refresh-webpack-plugin
개발용 서버 패키지 webpack-dev-server
개발용으로 설치
그리고 명령어를 바꿔줌

```
// package.js
...
 "scripts": {
    // 기존에는 "webpack-dev-server --hot"
    "dev": "webpack serve --env development"
  },
  "devDependencies": {
    ...
    "react-refresh": "^0.9.0",
    "@pmmmwh/react-refresh-webpack-plugin": "^0.4.3",
    "webpack-dev-server": "^3.11.0"
  }
```

```
// webpack.config.js
const ReactRefreshWebpackPlugin = require("@pmmmwh/react-refresh-webpack-plugin");
...
module: {
    rules: [
      {
        test: /\.jsx?$/,
        loader: "babel-loader",
        options: {
          presets: [
            [
              "@babel/preset-env",
              {
                targets: { browsers: ["last 2 chrome versions"] },
                debug: true,
              },
            ],
            "@babel/preset-react",
          ],
          plugins: ["react-refresh/babel"], // 여기
        },
        exclude: path.join(__dirname, "node_modules"),
      },
    ],
  },
plugins: [new ReactRefreshWebpackPlugin()],
...
// dev 서버 설정
  output: {
    path: path.join(__dirname, "dist"),
    filename: "[name].js",
    publicPath: "/dist",
  },
  devServer: {
    publicPath: "/dist",
    hot: true,
  },
```

npm run dev 치면 8080포트에서 작동

### 2.10 끝말잇기 Hooks로 전환하기

2.8에 class형 있다.

```
// 함수형
const React = require('react');
const { useState } = require('react');

const WordRelay = () => {
  const [word, setWord] = useState('제로초');
  const [value, setValue] = useState('');
  const [result, setResult] = useState('');
  const inputEl = React.useRef(null);

  const onSubmitForm = (e) => {
    e.preventDefault();
    if (word[word.length - 1] === value[0]) {
      setResult('딩동댕');
      setWord(value);
      setValue('');
      inputEl.current.focus();
    } else {
      setResult('땡');
      setValue('');
      inputEl.current.focus();
    }
  };

  return (
    <>
      <div>{word}</div>
      <form onSubmit={onSubmitForm}>
        <input
          ref={inputEl}
          value={value}
          onChange={(e) => setValue(e.currentTarget.value)}
        />
        <button>입력!</button>
      </form>
      <div>{result}</div>
    </>
  );
};

module.exports = WordRelay;
```

---

## Chap.3 숫자야구

### 3.1 import와 require 비교

- import와 require

  - import from은 ES6의 js 모듈시스템
  - require은 nodeJS의 모듈시스템

- 이 강좌에서 숫자야구를 처음 알았는데 룰은
  - 보통 4개의 숫자를 정하고
  - 위치와 숫자가 맞으면 스트라이크
  - 위치가 다르면 볼
  - 4 스트라이크(다 맞춤)는 홈런
  - 10번의 기회를 준다.

### 3.2 리액트 반복문(map)

class 컴포넌트에서 화살표함수를 안쓰면 constructor를 다시 써야함
그래서 화살표함수가 권장된다.

React에서 반복문을 사용하려면 ES5 map함수를 사용하면 된다.
반복되는 컴포넌트를 효율적으로 작성 가능.

```
// ex
  <ul>
      {tries.map((v, i) => {
        return <Try key={`${i + 1}차 시도 :`} tryInfo={v} />
      })}
  </ul>
```

### 3.3 리액트 반복문(key)

반복문으로 컴포넌트를 처리할 때 react가 key를 보고 중복체크를 한다.
고로, key를 안 넣어주면 에러가 발생한다.
중복되지 않는 값(고유한 값)을 key로 넣어주자.

### 3.4 컴포넌트 분리와 props

컴포넌트를 분리하는 이유는

1. 가독성도 좋아지고
2. 재사용성도 있고
3. 성능최적화에도 좋기 때문이다.

코드가 길어진다면 컴포넌트를 분리 하는게 좋다.

props는 부모에게서 받은 값이다.
하위컴포넌트에서 상속받은 props를 변경할 수 없다.

```
// 상위컴포넌트
// tries 배열의 개별 값 v를 tryInfo에 담아서 props로 넘김
  <ul>
      {tries.map((v, i) => {
        return <Try key={`${i + 1}차 시도 :`} tryInfo={v} />
      })}
  </ul>
```

```
// 하위컴포넌트
// this.props.tryInfo.try 하면 기니까
// 간결하게 구조분해 해서 사용const { tryInfo } = this.props

import React, { Component } from 'react';

class Try extends Component {
  render() {
    const { tryInfo } = this.props;
    return (
      <li>
        <div>{tryInfo.try}</div>
        <div>{tryInfo.result}</div>
      </li>
    );
  }
}

export default Try;
```

### 3.5 주석과 메서드 바인딩

프로젝트가 고도화 되서 단순히 하위컴포넌트에 props를 전달하는 방식이 버거워 질때(ex\_ 상위 -> 전달 -> 전달 -> 전달 -> 사용)
사용하는 것이 Redux, Context, Mobx 같은 것들이다.
개별 컴포넌트의 상태관리가 아닌 통합 상태관리 방법론.

class형 컴포넌트에서 constructor 부분 없이
메서드가 화살표 함수가 아니면 this가 undefined가 되어 에러발생

```
// ok
onChangeInput = (e) => {
    this.setState({
      value: e.target.value,
    });
  };
// wrong
onChangeInput(e){
    this.setState({
      value: e.target.value,
    });
  };
```

이를 해결 하려면

```
...{
  constructor(props){
    super(props)
  }
  ...
  this.onChangeInput.bind(this) // 이렇게 해줘야함
}
```

그냥 class 컴포넌트의 메서드는 화살표함수를 쓰자 ^^.

### 3.6 숫자야구 만들기

- mywork - src - component - NumberBaseball
- 3.숫자야구

### 3.7 Q&A

getNumbers 함수를 따로 뺐는데 사실 class 안에 있어도 상관없음.
다만 this를 안쓰면 따로 빼도 아무문제 없고, 다른 곳에서도 사용가능 하다.

제로초는 Redux or Mobx 사용을 권장.

### 3.8 숫자야구 Hooks로 전환하기

- class형 컴포넌트 => function 컴포넌트
- state => useState
- ref => useRef
  ...

### 3.9 React DevTools

크롬 확장 프로그램
react개발에 도움이 되니 사용 권장.

### 3.10 shouldComponentUpdate

- React가 렌더링을 수행하는 시점은 다음과 같다.

  1. Props가 변경되었을 때
  2. State가 변경되었을 때
  3. forceUpdate() 를 실행하였을 때
  4. 부모 컴포넌트가 렌더링되었을 때

- React에서 1번,2번의 경우 정확하게는 setState가 실행되었을 때이다.(state, props가 변경되지 않아도)

  - React는 state에 배열이나 오브젝트가 직접 변경된다면 변경된 것을 모른다.
  - 이부분은 불변성과 연관이 있다.
  - 그래서 react가 알수 있도록 새로운 배열이나, 오브젝트를 setState로 넣어주어야함
    - setState(기존의 것을 펼치고, 새값을 추가).

<!-- - 렌더함수가 리렌더링 되기에 변경되는 부분과 상관없는 부분도 저절로 리렌더링이 되는데 이것은 성능 저하로 이어진다. -->

setState가 실행 되었을 때, 값이 변한게 없다면 class형 컴포넌트에서는 shouldComponentUpdate로 리렌더링을 방지할 수 있다.

```
shouldComponentUpdate(nextProps, nextState, nextContext){
  // 조건 넣고 return 값이 true면 렌더링, false 면 pass
}
```

항상 최적화를 고려하자.

### 3.11 PureComponent와 React.memo

- 클래스형 컴포넌트
  한가지 편한 방법은 Component를 PureComponent로 바꾸는 것이다.
  `class Name extends PureComponent {...}`

  PureComponent는 shouldComponentUpdate를 구현해놓은 component이다.

  - setState가 실행되어도 값이 그대로라면 리렌더링을 하지 않는다.
  - 다만 state값이 배열, 오브젝트같은 경우라면
    <br />

component를 쓰고 shouldComponentUpdate로 커스티마이징 하는 경우도 많다.

- 함수형 컴포넌트
  React.memo가 있음.

  ```
  // 이렇게 작성하면 state나 props가 변경되지 않으면 리렌더링 안함.
  import React, { memo } from 'react';

  const Try = memo(({tryInfo}) => {
    return (
      <li>
        <div>{tryInfo.try}</div>
        <div>{tryInfo.result}</div>
      </li>
    );
  });
  export default Try;
  ```

자식들이 전부 pureComponent나 memo가 적용되어 있다면 부모도 적용할 수 있다.

### 3.12 React.createRef

```
class형에서는 ref를 이렇게 넣어줌
inputRef
onInputRef = (c) => {this.inputRef = c}
...
<input ref={this.onInputRef} />

// hook이 훨씬 간편
const inputRef = useRef(null)
<input ref={inputRef} />
```

```
// React.createRef 예제
// 사용할 땐 useRef처럼 current 사용해야 함
import {createRef} from 'react
...
inputRef = createRef()
<input ref={this.inputRef} />
```

함수형으로 하면 자유도가 더 높지만, createRef가 깔끔하다.

### 3.13 props와 state 연결하기

위에도 언급했듯 props는 자식 컴포넌트에서 변경하면 안된다.  
부모에서 바꿔줘야함.

바꿔줘야 할 땐 props를 state로 연결해서 바꿔야함.

- state를 선언하고 초기값에 props값을 넣어줌
- state를 변경

Context설명

- 컴포넌트구조가 A -> B -> C 일 때
- C 컴포넌트에 A컴포넌트 값을 props로 넘기려면 B 컴포넌트는 그 값을 사용하지 않더라도 B 컴포넌트를 지나가야 한다.

- 만약 컴포넌트 구조가 복잡해진다면 A -> B -> C -> D -> E... 어지럽다.
- props를 가지고 있으면 사용하지 않더라도 props가 변경되면 렌더링 됨(비효율)
- A 에서 E를 한방에 줄수있다면 그게 더 효율적이다.
- 그런 일을 하는게 Context고 Redux는 Context의 응용이다.

---

## Chap.4 반응속도체크

### 4.1 React 조건문

render함수 안에서는 for과 if를 못 쓴다. 다른 방식을 써야한다.

- for => map,reduce등 순회 메서드 사용
- if => 삼항연산자 {조건 ? true : false}

### 4.2 setTimeout 넣어 반응 속도 체크

로직은

- 상태를 3가지로 구분한다. 시작전, 시작, 클릭후
- 시작전으로 시작하고 setTimeout에 랜덤시간을 넣고
- setTimeout에는 시작전을 시작으로 바꾸는 함수를 넣음
- 시작하고 클릭을 하면 시작시간에서 클릭할 때 시간을 빼서 반응속도를 체크
- 반응속도를 배열에 넣어 평균 reduce로 구한다음 보여줌

코드는 4.반응속도체크, mywork- src - ResponseCheck 에 있음.

### 4.3 성능체크와 Q&A

reset기능은 반응속도 기록하는 배열 초기화.

### 4.4 반응속도체크 Hooks로 전환하기

코드는 4.반응속도체크, mywork- src - ResponseCheck 에 있음.

### 4.5 return 내부에 for과 if 쓰기

render함수 안의 return 내부에 for과 if를 쓰면 진짜 지저분해져서 권장 하지 않는다.
(jsx안에 함수를 선언하고 그 안에 쓴다는 말인듯.)

즉시 실행 함수를 선언하고 그안에 if와 for을 사용하는 방식.

---

## Chap.5 가위바위보

### 5.1 리액트 라이프사이클 소개

가위바위보 구현 로직은

- 가위 바위 보가 그려진 스프라이트 이미지를
  3분의 1 px 만큼 이동시키며 컴퓨터의 가위바위보 역활을 함
- 밑에 가위,바위,보 버튼으로 플레이어의 가위바위보 선택
- 승패 기록

React 라이프사이클(생애주기) 순서(class)

- constructor -> ref -> render -> componentDidMount ->
  (setState/props 변경) -> shouldComponentUpdate(true) -> reRendering -> componentDidUpdate ->
  (부모가 컴포넌트를 제거할 때) -> componentWillUnmount -> 소멸

- componentDidMount() {
  // 컴포넌트가 첫 렌더링 된 후
  }

- componentDidUpdate() {
  // 두번째 렌더링부터 실행
  }

- componentWillUnmount() {
  // 컴포넌트가 제거 되기 직전
  }

### 5.2 setInterval과 라이프사이클 연동하기

- componentDidMount() {
  // 컴포넌트가 첫 렌더링 된 후
  // 여기서 비동기 요청을 많이 함(html요소가 불러진 후기 때문에)
  }
- componentWillUnmount() {
  // 컴포넌트가 제거 되기 직전
  // 여기서는 비동기 요청 정리를 많이 함.
  }
- setInterval을 실행 했다면, setInterval을 clear하지 않으면 계속해서 반복함. 컴포넌트가 사라졌다 하더라도 계속 반복.
  만약 clear없이 컴포넌트가 없어졌다 다시 생긴다면, setInterval이 작동 중인데 한번 더 실행하기 때문에 두배 빠르게 반복 하는 셈.
  반복되는 것도 문제지만 메모리를 차지하기 때문에(메모리 누수)
  정리 해주는게 반드시 필요하다.

- 비동기 함수가 바깥의 함수를 참조하면 클로저 문제가 발생할 수 있음.

### 5.3 가위바위보 게임 만들기

코드 참조

### 5.4 고차 함수와 Q&amp;A

이부분은 아직도 잘 이해가 안됌

```
// 이렇게 작성되있는 코드를
onClickBtn = (choice) =>  {...}
...
<button ... onClick={(e)=> this.onClickBtn} />

// 이렇게 바꿀수 있다 함.
onClickBtn = (choice) => (e) => {...}
...
<button ... onClick={this.onClickBtn} />
```

JS 함수패턴이고, 고차함수라고 함.

### 5.5 Hooks와 useEffect

Hooks에서 class 컴포넌트의 componentDidMount, componentDidUpdate,componentWillUnmount의 역활을 해주는 것이 useEffect이다.

```
  useEffect(() => {
    // componentDidMount, componentDidUpdate 대체 (1대1 대응 아님)
    interval.current = setInterval(changeHand, 1000);
    return () => {
      // componentWillUnmount 대체, cleanup부분
      clearInterval(interval.current);
    };
  }, [imgCoord]);
  // 2번째 배열의 값이 바뀌면 componentDidUpdate 작동(컴포넌트 업데이트)
  // 2번째 배열을 빈 배열이라면 사실상 componentDidMount와 같다.
```

ref https://rinae.dev/posts/a-complete-guide-to-useeffect-ko

### 5.6 클래스와 Hooks 라이프사이클 비교

- useEffect를 여러번 쓰는 경우도 있다.
- memo를 사용하자.
- 클래스에서는 가로단위로
- hooks에서는 세로단위로 생각하라는데
- 이부분은 잘 이해는 안된다...

```
//                        result, imgCoord, score
// componentDidMount
// componentDidUpdate
// componentWillUnmount

// componentDidMount() {
//   this.setState({
//     imgCoord: 3,
//     score: 1,
//     result: 2,
//   })
// }

// useEffect(() => {
//   setImgCoord();
//   setScore();
// }, [imgCoord, score]);
// useEffect(() => {
//   setResult();
// }, [result]);

```

---

## Chap.6 로또 추첨기

### 6.1 로또 추첨기 컴포넌트

- 제로초는 주로 반복문을 기점으로 컴포넌트를 분리한다 함.
- 제일 마지막 자식 컴포넌트는 퓨어컴포넌트가 좋음 or Memo처리
  (주로 화면 역활만 하기 때문)

### 6.2 setTimeout 여러 번 사용하기

반복문으로 setTimeout을 여러번 사용해서
번호가 하나씩 나오는 효과.

```
    for (let i = 0; i < winNumbers.length - 1; i++) {
      this.timeouts[i] = setTimeout(() => {
        this.setState((prevState) => {
          return {
            winBalls: [...prevState.winBalls, winNumbers[i]],
          };
        });
      }, (i + 1) * 1000);
    }
```

### 6.3 componentDidUpdate

라이프사이클에 맞춰서 코드를 작성하는 파트

```
  componentDidMount() {
    ...
  }

  componentDidUpdate(prevProps, prevState) {
    ...
  }

  componentWillUnmount() {
    ...
  }
```

componentDidUpdate는 잘못 작성하면 재앙이 발생할 수 있다.

### 6.4 useEffect로 업데이트 감지하기

설명자체는 다 위에서 했고, 코드를 적용하는 과정

```
useEffect(() => {
    console.log("useEffect");
    for (let i = 0; i < winNumbers.length - 1; i++) {
      timeouts.current[i] = setTimeout(() => {
        setWinBalls((prevBalls) => [...prevBalls, winNumbers[i]]);
      }, (i + 1) * 1000);
    }
    timeouts.current[6] = setTimeout(() => {
      setBonus(winNumbers[6]);
      setRedo(true);
    }, 7000);
    return () => {
      timeouts.current.forEach((v) => {
        clearTimeout(v);
      });
    };
  }, [timeouts.current]); // 빈 배열이면 componentDidMount와 동일
  // 배열에 요소가 있으면 componentDidMount랑 componentDidUpdate 둘 다 수행
```

### 6.5 useMemo와 useCallback

Hooks의 useMemo와 useCallback

- useMemo
  - 복잡한 함수 실행의 결과값을 기록하는 역활(복잡한 함수의 재실행 방지)
  - `const lottoNumbers = useMemo(() => getWinNumbers(), []);`
  - 이러면 useMemo가 getWinNumbers의 return 값을 기억함
- useCallback
  -

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

```

```
