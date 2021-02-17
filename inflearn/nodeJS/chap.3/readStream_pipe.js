const fs = require("fs");
const zlib = require("zlib");

const readStream = fs.createReadStream("./read3.txt", { highWaterMark: 16 });
const writeStream = fs.createWriteStream("./write4.txt.gz");
const zlibStream = zlib.createGzip();
readStream.pipe(zlibStream).pipe(writeStream);
