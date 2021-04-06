// 프로미스
const fs = require("fs").promises;

fs.writeFile("./write.txt", "파일작성 가즈아~~~")
  .then(() => {
    fs.readFile("./write.txt").then((data) => console.log(data.toString()));
  })
  .catch((err) => {
    throw err;
  });
