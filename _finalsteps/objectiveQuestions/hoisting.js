// console.log(foo) // Output: [Function: foo]

// var foo = 10

// function foo() {
//   console.log("Hello from function foo!")
// }

// console.log(foo) // Output: 10

// console.log(a) // Output: ?

// ---------------------------------------------
// var a = 10

// function a() {
//   console.log("Hello!")
// }

// console.log(a) // Output: ?

// ---------------------------------------------
// console.log(a) // Output: ?

// var a = 5

// function b() {
//   console.log(a) // Output: ?
//   var a = 20
// }

// b()

// console.log(a) // Output: ?
// ---------------------------------------------
// ---------------------------------------------
function a() {
  console.log("A")
}

var a = 10

function test() {
  a() // Output: ?
  var a = function () {
    console.log("B")
  }
}

test()

// ---------------------------------------------
// ---------------------------------------------
// ---------------------------------------------
