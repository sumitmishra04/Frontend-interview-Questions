console.log(foo)

var foo = 10

function foo() {
  console.log("Hello from function foo!")
}

console.log(foo) 


// ---------------------------------------------
console.log(a) // Output: ?

var a = 5

function b() {
  console.log(a) // Output: ?
  var a = 20
}

b()

console.log(a) // Output: ?
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
