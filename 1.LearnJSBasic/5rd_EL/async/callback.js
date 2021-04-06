" use strict";

// 자바는 동기적이다.
// 호이스팅이 된 이후 부터 코드가 하나하나씩 실행된다.
// 비동기방식은 언제 코드가 실행될 지 예측할 수 없다.
console.log(1);
setTimeout(() => console.log(2), 2000); // 지정된 시간 이후 실행되는 함수
// 이러한 함수를 콜백이라 함.
console.log(3);

// 콜백도 2가지로 나뉨
// 동기적으로 실행되는 콜백과 예상할 수 없는 비동기적 콜백

function printImmed(print) {
  print();
}
printImmed(() => {
  console.log("hello");
});

// 비동기
function printWithDelay(print, timeout) {
  setTimeout(print, timeout);
}
printWithDelay(() => console.log("async callback"), 2000);

// callback 지옥 예시
class UserStorage {
  loginUser(id, password, onSuccess, onError) {
    setTimeout(() => {
      if (
        (id === "ellie" && password === "dream") ||
        (id === "coder" && password === "acadamy")
      ) {
        onSuccess(id);
      } else {
        onError(new Error("not found"));
      }
    }, 2000);
  }

  getRoles(user, onSuccess, onError) {
    setTimeout(() => {
      if (user === "ellie") {
        onSuccess({ name: "ellie", role: "admin" });
      } else {
        onError(new Error("not found"));
      }
    }, 2000);
  }
}

// 복잡하긴 하네
const userStorage = new UserStorage();
const id = prompt("enter your id");
const password = prompt("enter your password");
userStorage.loginUser(
  id,
  password,
  (user) => {
    userStorage.getRoles(
      user,
      (userWithRole) => {
        alert(
          `Hello ${userWithRole.name}, you have a ${userWithRole.role} role`
        );
      },
      (error) => console.log(error)
    );
  },
  (error) => console.log(error)
);
