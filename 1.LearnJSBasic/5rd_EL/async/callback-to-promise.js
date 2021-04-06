" use strict";

class UserStorage {
  loginUser(id, password) {
    return new Promise((res, err) => {
      setTimeout(() => {
        if (
          (id === "ellie" && password === "dream") ||
          (id === "coder" && password === "acadamy")
        ) {
          res(id);
        } else {
          err(new Error("not found"));
        }
      }, 2000);
    });
  }

  getRoles(user) {
    return new Promise((res, err) => {
      setTimeout(() => {
        if (user === "ellie") {
          res({ name: "ellie", role: "admin" });
        } else {
          err(new Error("not found"));
        }
      }, 1000);
    });
  }
}

// 복잡하긴 하네
const userStorage = new UserStorage();
const id = prompt("enter your id");
const password = prompt("enter your password");
userStorage
  .loginUser(id, password)
  .then(userStorage.getRoles) //인자가 똑같으면 생략가능
  .then((user) => alert(`Hello ${user.name}, you have a ${user.role} role`))
  .catch(console.log);
