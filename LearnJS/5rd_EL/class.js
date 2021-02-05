"use strict";

// 1. Class
class Person {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }

  speak() {
    console.log(`${this.name}: hello!!`);
  }
}

const ellie = new Person("ellie", 20);
ellie.speak();

//2. Getter and Setter
//   getter와 setter가 존재 하는 이유는 사용자가 값을 마음대로 지정하는게
//   오류를 만들 수 있기 때문 (ex. age = -1)
class User {
  constructor(firstName, lastName, age) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.age = age;
  }
  get age() {
    return this._age;
  }
  set age(value) {
    // if (value < 0) {
    //   throw Error("age cannot be negative");
    // }
    this._age = value < 0 ? 0 : value;
  }
}
// getter와 setter가 존재 하는 이유는 사용자가 값을 마음대로 지정하는게
// 오류를 만들 수 있기 때문 (ex. age = -1)
// _를 붙이는 이유는 콜스택 초과 오류때문
// get age를 정의하는 순간 age를 부를 때 값을 직접 호출 하는게 아니라
// getter를 set age를 정의하는 순간 age를 정의할 때 직접 정의하는게 아니라
// set 함수를 호출
// 솔직히 왜이렇게 만들어져 있는지 모르겠다.
// 위의 이유로 콜스택 초과 오류를 피하기 위해, _같은걸 붙여줌

//3. Field(public, private)
//   적용 된지 얼마 안되서 현재 대부분 브라우저에서 지원 X
//   보면 볼수록 자바 클래스랑 매우 비슷하다.
class Experiment {
  publicField = 2;
  #privateField = 0;
}
const experiment = new Experiment();
console.log(experiment.publicField);
console.log(experiment.privateField);

//4. Static
//   3번과 같이 현재 사용하기 무리
//   데이터에 상관없이 클래스가 가지고 있는 동일한 값이나 반복되는 매서드는
//   static이라는 키워드를 붙이면 오브젝트가 아닌 클래스에 연동

class Article {
  static publisher = "Dream Coding";
  constructor(articleNumber) {
    this.articleNumber = articleNumber;
  }
  static printPublisher() {
    console.log(Article.publisher);
  }
}
const article1 = new Article(1);
const article2 = new Article(2);

console.log(article1.publisher); // undefined
console.log(Article.publisher); // 'dream coding' 출력

Article.printPublisher(); // 출력
// article1.printPublisher(); // 에러발생

//5. Inheritance 상속
class Shape {
  constructor(width, height, color) {
    this.width = width;
    this.height = height;
    this.color = color;
  }
  draw() {
    console.log(`drawing ${this.color} color`);
  }
  getArea() {
    return this.width * this.height;
  }
}

class Rectangle extends Shape {} //extend
class Triangle extends Shape {
  getArea() {
    //override
    return (this.width * this.height) / 2;
  }
}

const rectangle = new Rectangle(20, 20, "blue");
rectangle.draw();
console.log(rectangle.getArea());

const triangle = new Triangle(20, 20, "red");
triangle.draw();
console.log(triangle.getArea());

//6. Class checking : instanceOf
//   아래 예시들로 보아 큰 줄기에 해당되면 True
console.log(rectangle instanceof Rectangle);
console.log(triangle instanceof Rectangle);
console.log(triangle instanceof Triangle);
console.log(triangle instanceof Shape);
console.log(triangle instanceof Object);
//JS의 모든 Class는 Object를 상속한 것

//JS Switch문 형태
// function name(command, a,b){
//   switch(command){
//     case '':
//       return
//     case '' :
//       return
//     default:

//   }
// }
