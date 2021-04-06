const fs = require("fs");

const writeStream = fs.createWriteStream("./write2.txt");
writeStream.on("finish", () => {
  console.log("파일 쓰기 완료");
});
writeStream.write("이 글을 작성합니다\n");
writeStream.write("한번 더 작성합니다.");
writeStream.end();
