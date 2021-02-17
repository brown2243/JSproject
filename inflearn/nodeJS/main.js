const http = require("http");
const fs = require("fs");
const url = require("url");
const { CLIENT_RENEG_WINDOW } = require("tls");

const app = http.createServer((request, response) => {
  let _url = request.url;
  let queryData = url.urls(_url, true).query;

  console.log(_url, queryData);
  if (_url == "/") {
    _url = "/index.html";
  }
  if (_url == "/favicon.ico") {
    return response.writeHead(404);
  }
  response.writeHead(200);
  response.end(fs.readFileSync(__dirname + _url));
  //   console.log(__dirname + url);
  //   response.end("egoing : " + url);
});

app.listen(5000);

function oneMore() {
  console.log("one more");
}

function run() {
  console.log("run-run");
  setTimeout(() => {
    console.log("wow");
  }, 0);
  new Promise((res) => {
    res("hi");
  }).then(console.log);
  oneMore();
}
setTimeout(run, 2000);
