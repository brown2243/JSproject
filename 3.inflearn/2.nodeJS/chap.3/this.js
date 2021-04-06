console.log(this);
console.log(this === global);
console.log(this === module.exports);
function a() {
  console.log(this === global);
  console.log(this);
}
a();
