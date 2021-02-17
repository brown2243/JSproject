// 프로미스
// const fs = require("fs").promises;

// fs.writeFile("./write.txt", "파일작성 가즈아~~~")
//   .then(() => {
//     fs.readFile("./write.txt").then((data) => console.log(data.toString()));
//   })
//   .catch((err) => {
//     throw err;
//   });

const fs = require("fs");
fs.readFile("./read.txt", (err, data) => {
  if (err) throw err;

  console.log("1번 :", data.toString());
});
fs.readFile("./read.txt", (err, data) => {
  if (err) throw err;

  console.log("2번 :", data.toString());
});
fs.readFile("./read.txt", (err, data) => {
  if (err) throw err;

  console.log("3번 :", data.toString());
});
fs.readFile("./read.txt", (err, data) => {
  if (err) throw err;

  console.log("4번 :", data.toString());
});
