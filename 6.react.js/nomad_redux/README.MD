# 노마드 코더 Redux 기본강의

## 0 INTRODUCTION

### 0.1 🚨 Read this First 🚨

### 0.2 Introduction (01:33)

Redux : 기본적으로 Javascript application들의 state(상태)를 관리하는 방법

- React와 많이 사용하면서 유명해졌으나, React에 의존하는 라이브러리는 아님.

### 0.3 Requirements (02:45)

Why was Redux created and why we should use Redux
바닐라JS, react로 각각 프로젝트를 만든 후, Redux를 사용하는 방식으로 수업 진행

### 0.4 Project Setup (02:37)

## 1 PURE REDUX: COUNTER

### 1.0 Vanilla Counter (05:59)

간단한 Counter app

### 1.1 Store and Reducer (09:13)

바닐라 심플 redux

**store는 데이터(state)를 넣는 곳**
state === app에서 변경되는 data
여기서는 counter

redux는 data를 관리하는 역활을 위해 만들어짐

createStore()는 파라메터로 함수(리듀서)를 받아야함

**리듀서는 데이터를 수정하는 함수다**

```
console.log(countStore);
// Object
// @@observable: ƒ observable()
// dispatch: ƒ dispatch(action)
// getState: ƒ getState()
// replaceReducer: ƒ replaceReducer(nextReducer)
// subscribe: ƒ subscribe(listener)
// __proto__: Object
```

1. 리듀서가 data를 바꿔줌
2. 뭘 return 하든 app안에 있는 data가 됌.

기본적으로 data는 store안에만 존재
modifier or reducer만 변경가능

### 1.2 Actions (08:56)

`store.dispatch({type:"action"})` -> reducer에 작성 된 action대로 data를 변경

### 1.3 Subscriptions (04:42)

`countStore.subscribe(onChange)`
store에 변화가 있으면 subscribe메서드가 인자의 함수 실행(데이터 변경 감지)

### 1.4 Recap Refactor (06:03)

1. switch문 better than if else
2. action값을 상수로 등록해서 String 입력실수방지
   1. 이렇게 하면 action 실행전에 오타 체크 가능

reducer가 데이터를 수정하고 return 하는 모든 값은 store에 저장되는 data.

## 2 PURE REDUX: TO DO LIST

### 2.0 Vanilla ToDo (06:47)

현재 app은 dataless. UI만 변경, 작성한 내용을 저장할 수가 없음.

**Never mutate state**
**Never mutate state**
**Never mutate state**

### 2.1 State Mutation (05:37)

three principles of redux

1. Single source of truth
   The global state of your application is stored in an object tree within a single store.
2. State is read-only
   The only way to change the state is to emit an action, an object describing what happened.
3. Changes are made with pure functions
   To specify how the state tree is transformed by actions, you write pure reducers. it means no mutate!

**배열을 수정하지말고 새 배열을 return**

### 2.2 Delete To Do (08:14)

dispatch에 넣는 객체도 함수로 만들게 함 -> app을 작은 단위의 함수로 쪼개는 중

### 2.3 Delete To Do part Two (05:12)

**Never mutate state**
**Never mutate state**
**Never mutate state**

use filter instead of splice

### 2.4 Conclusions (04:42)

1. action만 return하는 action_creator함수
2. no mutate

## 3 REACT REDUX

### 3.0 Setup (06:25)

세팅

### 3.1 Connecting the Store (04:52)

store.subscribe()
redux-react : react에서 store의 변동사항에 대해 subscribe 할때

```
import { Provider } from "react-redux";
   ...
    <Provider store={store}>
      <App />
    </Provider>
```

### 3.2 mapStateToProps (07:50)

react-redux
connect 는 컴포넌트들을 스토어에 연결시켜줌

mapStateToProps 는 함수고, (state, ownProps)로 호출
`connect(mapStateToProps)(Home);`
mapStateToProps 가 return 하는 것은 2번째 인자 컴포넌트의 props가 됌

### 3.3 mapDispatchToProps (06:09)

`connect(mapStateToProps, mapDispatchToProps)(Home);`
or
`connect(null, mapDispatchToProps)(Home);`
`function mapDispatchToProps(dispatch,){}`

### 3.4 Deleting To Do (07:14)

### 3.5 Detail Screen (06:01)

### 3.6 Conclusions (01:51)

## 4 REDUX TOOLKIT (BONUS)

### 4.0 Redux Toolkit (02:17)

리덕스에서는 반복해서 작성해야하는 보일러플레이트가 많은데,
코드 작성량을 줄이는데 도움을 줄 toolkit!

### 4.1 createAction (06:16)

### 4.2 createReducer (07:52)

### 4.3 configureStore (07:13)

### 4.4 createSlice (05:56)

### 4.5 Conclusions (02:28)
