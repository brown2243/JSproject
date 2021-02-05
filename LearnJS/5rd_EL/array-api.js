"use strict";
{
  const fruits = ["apple", "banana", "orange"];
  let ans = fruits.join(" and ");
  console.log(ans);
}
{
  const food = "🍕,🍔,🍟,🌭";
  const ans = food.split(",");
  console.log(ans);
}
{
  const array = [1, 2, 3, 4, 5];
  array.reverse();
  console.log(array);
}
{
  const array = [1, 2, 3, 4, 5];
  const ans = array.splice(2, 5);
  console.log(ans);
}

{
  class Student {
    constructor(name, age, enrolled, score) {
      this.name = name;
      this.age = age;
      this.enrolled = enrolled;
      this.score = score;
    }
  }
  const students = [
    new Student("A", 29, true, 45),
    new Student("B", 28, false, 80),
    new Student("C", 30, true, 90),
    new Student("D", 40, false, 66),
    new Student("E", 18, true, 88),
  ];

  console.log(students);
  for (let s of students) {
    if (s.score >= 90) {
      console.log(s);
    }
  }
  let ans = students.find((student) => student.score === 90);
  console.log(ans);

  for (let s of students) {
    if (s.enrolled === true) {
      console.log(s);
    }
  }
  ans = students.filter((student) => student.enrolled === true); //중요
  console.log(ans);

  ans = students.map((student) => student.score); //중요
  console.log(ans);

  ans = students.some((student) => student.score < 50); //일부
  console.log(ans);

  ans = students.every((student) => student.score < 50); //전부
  console.log(ans);

  ans = !students.every((student) => student.score < 50); // !붙이면 반대로 값이 나옴
  console.log(ans);

  //
  ans = students.reduce((prev, curr) => {
    console.log("------");
    console.log(prev);
    console.log(curr);
    return prev + curr.score;
  }, 0);
  console.log(ans);
  //reduceRight는 반대로
  ans = students.reduceRight((prev, curr) => {
    console.log("------");
    console.log(prev);
    console.log(curr);
    return prev + curr.score;
  }, 0);
  console.log(ans);

  //
  ans = students.map((student) => student.score).join();
  console.log(ans);

  ans = students
    .map((student) => student.score)
    .filter((score) => score >= 50)
    .join();
  console.log(ans);

  //
  console.clear();
  ans = students
    .map((student) => student.score)
    .sort((a, b) => b - a) //역배열 (a - b) 정배열(정배열은 그냥써도됌)
    .join();
  console.log(ans);
}
