// github.com/sadanandpai/javascript-code-challenges/blob/main/challenges/async-challenges.md
// Q1) Print numbers from 10 to 1 with delay of 1 second between each value being printed using setTimeout using pre ES6 features only
// Q2) Write a utility which prints numbers starting from an initial value and increment in steps which can be
//    started and stopped by the user, any number of times
// Q3) promise.all
// Q4) deepCopy from polyfill.js
// Q5) isNan from polyfill.js
// Q6) isInt from polyfill.js
// Q7) call, apply bind : cab: https://medium.com/developers-arena/how-to-create-a-polyfill-for-call-apply-and-bind-917ae110edc3
// Q8) jsinfo all pages quick scan and questions
// Q9) find if a property is inherited from another or not
// 10) debounce and throttling

https: function print() {
  for (let i = 10; i > 0; i--) {
    setTimeout(() => {
      console.log(i)
    }, (10 - i) * 1000)
  }
}
// print()

function increment(num) {
  this.num = num
  this.timer
  this.start = function (num) {
    this.timer = setTimeout(() => {
      console.log(num)
      this.start(num + 1)
    }, 1000)
  }
  this.stop = function (num) {
    clearTimeout(this.timer)
  }
}

const timer = new increment()
timer.start(1)
setTimeout(() => {
  timer.stop()
}, 5000)
