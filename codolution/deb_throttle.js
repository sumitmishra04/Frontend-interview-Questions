// learn.codevolution.dev/courses/enrolled/1222162

https: function debounce(fn, delay) {
  let timer
  return function () {
    if (timer) {
      clearTimeout(timer)
    }
    timer = setTimeout(() => {
      fn.apply(this, arguments)
    }, delay)
  }
}

function throttle(fn, delay) {
  let throlled = false
  return function () {
    if (!throlled) {
      fn.apply(this, arguments)
      throlled = true
      setTimeout(() => {
        throlled = false
      }, delay)
    }
  }
}

const logger = function (data) {
  console.log("logs ", data)
}

const throlledLogger = throttle(logger, 0)
const debouncedLogger = debounce(logger, 500)
for (let i = 0; i < 10000; i++) {
  debouncedLogger(i)
}

// debouncedLogger(1)
// debouncedLogger(1)
// debouncedLogger(1)
// debouncedLogger(3)
