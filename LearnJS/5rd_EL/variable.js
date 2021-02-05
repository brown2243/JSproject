"use strict";

const count = 18n;
const size = 16.1;

console.log(`value : ${count}, type : ${typeof count}`);
console.log(`value : ${size}, type : ${typeof size}`);

const sb1 = Symbol("id");
const sb2 = Symbol("id");
console.log(sb1 === sb2, sb1, sb2);
console.log(`value : ${sb1.description.charAt(1)}, type : ${typeof sb1}`);

const st = { name: "STKIM", age: "28" };
console.log(st);
st = "king";
console.log(st);


div*3
