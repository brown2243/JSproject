// 콜백
// const fs = require("fs");

// fs.readFile("./read.txt", (err, data) => {
//   if (err) throw err;
//   console.log(data);
//   console.log(data.toString());
// });

// 프로미스
const fs = require("fs").promises;

fs.readFile("./read.txt")
  .then((data) => {
    console.log(data);
    console.log(data.toString());
  })
  .catch((err) => {
    throw err;
  });
