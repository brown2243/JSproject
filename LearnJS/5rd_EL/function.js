//3. default 값 설정
function showMessage(message, from = "unknown") {
  console.log(`${message} by ${from}`);
}
// 파라메터 값 옆에 = "값" 정하면 default 값 됌

showMessage("Hello");
//4. Rest parameters
//   배열을 받아옴

function printAll(...args) {
  for (let i = 0; i < args.length; i++) {
    console.log(args[i]);
  }

  for (const arg of args) {
    console.log(arg);
  }
  args.forEach((arg) => console.log(arg));
}
printAll("dream", "coding", "ellie");
//함수는 object의 일종이다.

//5.scope
//밖에서는 안이 보이지 않고 안에서는 밖을 볼 수 있다.
//지역변수, 전역변수에 대한 설명

//6. return a value  더하기함수

//7. Early return, early exit
//조건이 맞지 않다면 빠르게 return 하게 만들어라
//연산 줄여 성능 향상을 노리는 듯
function upgradeUser(user) {
  if (user.point <= 10) {
    return;
  }
  // 함수 내용
}
//JS엔진은 선언된 것을 제일 먼저 처리하기 때문에
//함수도 호이스팅이 된다.
//선언된 함수를 선언한 위치와 상관없이 사용할 수 있다는 것

//8. 함수표현식 function expression
//화살표 함수 구현 전 모습 인듯
const print = function () {
  console.log("print");
};
print();
const printAgain = print;
printAgain();

//9. 콜백함수
function randomQuiz(answer, printYes, printNo) {
  if (answer === "love you") {
    printYes();
  } else {
    printNo();
  }
}
const printYes = () => {
  console.log("yes");
};
const printNo = () => {
  console.log("no");
};

randomQuiz("wrong", printYes, printNo);
randomQuiz("love you", printYes, printNo);

//10. 화살표 함수
const simplePrint = () => console.log("fgsadgsadg");
const add = (a, b) => a + b; //(파라메터), 블럭이 없으면 return X
const Mul = (a, b) => {
  return a * b;
};
//IIFE 선언함과 동시에 호출 하는 방법, 잘 안쓰인다 함
(function hello() {
  console.log("IIFE");
})();
