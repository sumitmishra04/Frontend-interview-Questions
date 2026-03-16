// Build a controlled counter utility using JavaScript closures.

// Implement a function createCounter(start) that returns an object with the following three methods:

// increment(): increases the counter by 1
// decrement(): decreases the counter by 1
// reset(): resets the counter to the original start value

function createCounter(start) {
  let originalStartValue = start
  let startValue = start
  function increment() {
    startValue = start + 1
    return startValue
  }
  function decrement() {
    startValue = start - 1
    return startValue
  }
  function reset() {
    startValue = originalStartValue
    return startValue
  }
  return { increment, decrement, reset }
}

const counter = createCounter(10)
console.log(counter.increment())
console.log(counter.decrement())
console.log(counter.reset())
