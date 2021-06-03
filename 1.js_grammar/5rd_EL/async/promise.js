" use strict";

// 1. Producer
//    Promise 가 만들어지면 {}부분 executor부분이 자동으로 실행된다.
const promise = new Promise((resolve, reject) => {
  console.log("doing something...");
  setTimeout(() => {
    resolve("ellie");
    reject(new Error("error"));
  }, 2000);
});

// 2
promise
  .then((res) => {
    console.log(res);
  })
  .catch((err) => {
    console.log(err);
  })
  .finally(() => console.log("finally")); //나름 최신(then,catch가 끝난후 무조건 실행 됌)

// 3. Promise chaning
//    값 뿐만 아니라 다른 비동기적인 promise도 엮을 수 있다.
const fetchNumber = new Promise((resolve, reject) => {
  setTimeout(() => resolve(1), 1000);
});

fetchNumber
  .then((num) => num * 2)
  .then((num) => num * 3)
  .then((num) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => resolve(num - 1), 1000);
    });
  })
  .then((num) => console.log(num));

const getHen = () =>
  new Promise((res, err) => {
    setTimeout(() => res("🐓"), 1000);
  });

const getEgg = (hen) =>
  new Promise((res, err) => {
    setTimeout(() => res(`${hen} => 🥚`), 1000);
  });

const cook = (egg) =>
  new Promise((res, err) => {
    setTimeout(() => res(`${egg} => 🍥`), 1000);
  });

getHen()
  .then((hen) => getEgg(hen))
  .then((egg) => cook(egg))
  .then((meal) => console.log(meal));

//한가지만 받아서 전달하는 경우에는 아래처럼 생략이 가능하다
getHen().then(getEgg).then(cook).then(console.log);

getHen()
  .then(getEgg)
  .catch((error) => {
    return "🍕";
  }) //계란 받아올때 에러가 생기면 빵을 받아온다는 것
  .then(cook)
  .then(console.log);
