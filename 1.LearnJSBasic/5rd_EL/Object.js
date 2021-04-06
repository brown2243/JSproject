"use strict";

//Object 만드는 법
const obj1 = {};
const obj2 = new Object();

//JS에서는 이미 선언한 Object의 값을 나중에 추가,변경,삭제 할 수 있다.
//이게 언어냐...?
const ellie = { name: "ellie", age: 4 };
console.log(ellie);
ellie.hasJob = true; //추가
console.log(ellie);
ellie.name = "ed"; //변경
delete ellie.hasJob; //삭제
console.log(ellie);

//Object는 key 와 value의 집합체이다.(파이썬 딕셔너리의 리스트)

// 2. 출력방식 computed properties
console.log(ellie.name);
console.log(ellie["name"]);
ellie.hasJob = true; //?????
console.log(ellie.hasJob);

// 3. Property value shorthand
const person1 = { name: "bob", age: 2 };
const person2 = { name: "asd", age: 3 };
const person3 = { name: "bob", age: 2 };
const person4 = makePerson("aff", 23);
const person5 = new Person("fff", 341);
console.log(person4);
console.log(person5);
// class 와 유사 (예전에 class가 없을 때 사용 됌)
function makePerson(name, age) {
  return {
    name,
    age,
  };
}

// 4. constructor 함수
function Person(name, age) {
  this.name = name;
  this.age = age;
}

// 5. 해당키가 오브젝트에 있는지 확인
console.log("name" in person1);

// 6. for .. in vs for .. of
console.clear();
for (let key in ellie) {
  console.log(key);
}

const list = [1, 2, 3, 4, 5];
for (let value of list) {
  console.log(value);
}

// 7. cloning
const user1 = { name: "ellie", age: 20 };
const user2 = user1; //이 방법
console.log(user1);
user2.name = "si";
console.log(user2);
const user3 = Object.assign({}, user1); // assign
console.log(user3);
