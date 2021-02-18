const express = require("express");
const path = require("path");

const app = express();

// 설정
app.set("port", process.env.PORT || 3000);

// 위에서 아래로 실행되기 때문에 범위가 넓은 미들웨어는 밑에다 배치해야함
// 공통 미들웨어
app.use((req, res, next) => {
  console.log("미들웨어 모든 요청에 실행되는 코드");
  next(); // 이게 있어야 다음이 실행됌
});

// 라우터 미들웨어
app.get(`/category/:name`, (req, res) => {
  res.send(`hello ${req.params.name}`);
});

app.get("/", (req, res) => {
  // res.sendFile(path.join(__dirname, "index.html"));
  res.setHeader("Content-Type", "text/plain");
  res.send("안녕 하세요");
  res.json({ hello: "silversla" });
});

app.get("/about", (req, res) => {
  res.send("EXPRESS ABOUT");
});

app.post("/", (req, res) => {
  res.send("hello express");
});

// app.get("*", (req, res) => {
//   res.send("Hello Every body");
// });

// 이것은 에러처리 미들웨어는 아니고 404 처리 미들웨어
app.use((req, res, next) => {
  res.status(200).send("404~~");
});
// 에러처리 미들웨어
// 에러 미들웨어는 반드시 4개의 인자가 들어가야한다!!!!(첫번째가 에러)

app.use((err, req, res, next) => {
  console.error(err);
  res.status(200).send("에러가 발생했습니다. 나중에 방문해라!");
});

app.listen(app.get("port"), () => {
  console.log("express 서버실행");
});
