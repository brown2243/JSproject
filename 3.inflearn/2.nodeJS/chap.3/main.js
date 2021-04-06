// const value = require("./var");
// const { odd, even } = require("./var");

import { odd, even } from("./var");

function checkOddEven(number) {
  if (number % 2 === 0) {
    return even;
  } else {
    return odd;
  }
}
module.exports = checkOddEven;
