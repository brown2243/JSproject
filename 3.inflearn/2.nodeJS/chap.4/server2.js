const http = require("http");
const fs = require("fs").promises;

const server = http
  .createServer(async (req, res) => {
    try {
      res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
      // res.write("<h1>hello node</h1>");
      // res.write("<p>hello server</p>");
      // res.end("<p>hello ST</p>");
      const data = await fs.readFile("./server1.html");
      res.end(data);
    } catch (error) {
      console.log(error);
      res.writeHead(200, { "Content-Type": "text/plain; charset=utf-8" });
      res.end(error.message);
    }
  })
  .listen(8080);

server.on("listening", () => {
  console.log("8080포트에서 서버 대기 중");
});
server.on("error", (err) => {
  console.log(err);
});
