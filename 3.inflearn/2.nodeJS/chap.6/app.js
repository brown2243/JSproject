const express = require("express");
const morgan = require("morgan");
const path = require("path");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const multer = require("multer");

const app = express();

// 설정
app.set("port", process.env.PORT || 3000);

// 요청과 응답을 기록하는 morgan 라우터
app.use(morgan("dev"));
// 실무에서는 combined를 사용한다함. 좀 더 자세하게 나옴
// app.use(morgan("combined"));

// 쿠키파서
app.use(cookieParser());
// 아래처럼 암호화하면 cookies 대신 signedCookies사용해야함
app.use(cookieParser("password"));

// 예전에 바디파서의 기능들이 익스프레스로 들어옴
// 이런 미들웨어들은 순서가 중요함
app.use("요청경로", express.static("실제경로"));
app.use("/", express.static(path.join(__dirname, "public")));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

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

app.get("/", (req, res, next) => {
  req.cookies; // 알아서 파싱해줌 ex)_ {mycookie: 'test}
  // // req.signedCookies;
  res.cookie("name", encodeURIComponent(name), {
    expires: new Date(),
    httpOnly: true,
    path: "/",
  });
  // res.clearCookie("name", encodeURIComponent(name), {
  //   httpOnly: true,
  //   path: "/",
  // });
  res.sendFile(path.join(__dirname, "index.html"));
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
