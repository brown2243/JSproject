"use strict";

// 1. Object to Json
let json = JSON.stringify(["apple", "banana"]);
console.log(json);

// 함수,JS에만 있는 특별한 데이터(symbol등)는  제외된다.
const rabbit = {
  name: "tori",
  color: "white",
  size: null,
  birthDate: new Date(),
  jump: () => {
    console.log(`${name} can jump`);
  },
};

let r = JSON.stringify(rabbit);
console.log(r);

r = JSON.stringify(rabbit, ["name", "color"]);
console.log(r);

r = JSON.stringify(rabbit, (key, value) => {
  console.log(`key: ${key}, value: ${value}`);
  return key === "birthDate" ? new Date(value) : value;
});
console.log(r);
// 2. JSON to Object
const obj = JSON.parse(r);
console.log(obj);
console.log(rabbit.birthDate.getDate()); //함수
console.log(obj.birthDate); //데이터 변환과정에서 String으로 변환됌
