"use strict";

const arr1 = new Array();
const arr2 = [1, 2];

// 2. index position
const food = ["🍕", "🧀", "🥩"];
console.log(food.length);
console.log(food[0]);

// 3.
console.clear();
for (let i = 0; i < food.length; i++) {
  console.log(food[i]);
}

for (let f in food) {
  console.log(f);
}

for (let f of food) {
  console.log(f);
}

food.forEach((food, index) => console.log(food, index));

// 4. addtion, deletion, copy
//    push, pop(파이썬처럼 위치를 지정해서 빼는건 안됌 그냥 pop)
food.push("🍘", "🥠", "🥡");
console.log(food.pop());
console.log(food);

// shift(popleft), unshift(appendleft)
// push, pop 보다 엄청 느리다함 파이썬이랑 동일한듯 queue가 아니니까
console.log(food.shift());
console.log(food.unshift("🥨"));

// splice(1,3) 1~3까지 데이터 지움
console.clear();
console.log(food);
// food.splice(1, 1)
food.splice(1, 2);
console.log(food);
food.splice(1, 2, "🍣", "🥪");
console.log(food);

// combine two array
const food2 = ["🥚", "🥯"];
const newFood = food.concat(food2);
console.log(newFood);

// 5. Searching
console.log(newFood.indexOf("🥚"));
console.log(newFood.lastIndexOf("🥚"));
console.log(newFood.includes("🥚"));
