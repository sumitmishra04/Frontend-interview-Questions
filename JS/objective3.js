// cover toptal
// https://jsvault.com/function-bind
// chatgpt based questions on this
// a better understanding of prototypes and constructor
// jsinfo all pages quick scan and questions
// github.com/sadanandpai/javascript-code-challenges/blob/main/challenges/async-challenges.md
// event loop

var b = 1
function outer() {
  var b = 2
  function inner() {
    var b
    b++
    b = 3
    console.log(b)
  }
  inner()
}
outer()
