"use strict";

// async & await
// clear style of using promise
// 무조건 promise보다 좋은 것은 아니고 상황에 따라간다함
// promise는 보니까 callback보단 무조건 좋은 것 같다.
// 내가 써봤을 때 도 이해가 쉬운 편 이었고

// 1. async
async function fetchUser() {
  return "ellie";
}

const user = fetchUser();
user.then(console.log);
console.log(user);

// 2. await

function delay(ms) {
  return new Promise((res) => setTimeout(res, ms));
}

async function getPizza() {
  await delay(2000);
  return "🍕";
}
async function getBurger() {
  await delay(1000);
  return "🍔";
}

// function getBurger() {
//   return delay(3000).then(() => "🍔");
// }
// ---------------------------------

// function pickFood() {
//   return getPizza().then((pizza) => {
//     return getBurger().then((burger) => `${pizza}+${burger}`);
//   });
// }
// pickFood().then(console.log);

//다만 이렇게 작성하면 직렬적으로 코드가 실행 됌
// Pizza 1초 burger 1초 = 2초
// async function pickFood() {
//   try {
//     const pizza = await getPizza();
//     const burger = await getBurger();
//   } catch {}
//   return `${pizza} + ${burger}`;
// }
// pickFood().then(console.log);

// 이렇게 작성하면 병렬적으로 실행 됌
// 피자 1초, 버거 1초 동시 진행
// 하지만 이 방법 말고 다른 방법을 사용한다 함
async function pickFood() {
  const pizzaPromise = getPizza();
  const burgerPromise = getBurger();
  const pizza = await pizzaPromise;
  const burger = await burgerPromise;
  return `${pizza} + ${burger}`;
}
pickFood().then(console.log);

//promiseAPI의 ALL사용
function pickAllFood() {
  return Promise.all([getPizza(), getBurger()]).then((foods) =>
    foods.join(" + ")
  );
}
pickAllFood().then(console.log);

function pickOnlyOne() {
  return Promise.race([getPizza(), getBurger()]);
}
pickOnlyOne().then(console.log);
