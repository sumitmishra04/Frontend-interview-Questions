function doSomethingAsync(cb) {
  console.log("Hi")
  setTimeout(() => {
    console.log("Async task completed!")
    cb()
  }, 3000)
}

function afterTaskCompleted() {
  console.log("Callback function called!")
}

doSomethingAsync(afterTaskCompleted)

// window.addEventListener("click", myfunc) // hence myfunc is a callback function

// function findSum(a, b) {
//   return a + b
// }

// myfunc(findSum) // arguments
// // function definition
// function myfunc(a, b) {
//   // a, b are parameters of a function
//   console.log("hello world")
// }

// // function expression; arrow function
// const myfunc = () => {
//   console.log("hello world")
// }

// // function expression; anonymous function
// const myfunc = function () {
//   console.log("hello world")
// }

// // expression
// // variable = value
// const a = 10
// const func = () => {}
