const http = require("http");
const fs = require("fs");
const url = require("url");

const app = http.createServer((request, response) => {
  let _url = request.url;
  let queryData = url.parse(_url, true).query;

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
