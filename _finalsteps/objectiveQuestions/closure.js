function outer() {
  let count = 0

  return function inner() {
    count++
    console.log("Count:", count)
  }
}

const innerFunc1 = outer()
const innerFunc2 = outer()

// innerFunc1() // Output: ?
// innerFunc1() // Output: ?
// innerFunc2()

function createCounter() {
  let count = 0

  return {
    increment: function () {
      count++
    },
    decrement: function () {
      count--
    },
    getCount: function () {
      return count
    },
  }
}

const counter1 = createCounter()
const counter2 = createCounter()

counter1.increment()
counter1.increment()
counter2.increment()
counter1.decrement()

// console.log(counter1.getCount()) // Output: ?
// console.log(counter2.getCount()) // Output: ?

function outer() {
  const name = "Alice"

  function inner() {
    console.log("Hello, " + name)
  }

  return inner
}

const greet = outer()
// greet() // Output: ?

function outer() {
  const arr = []

  for (var i = 0; i < 5; i++) {
    arr.push(function () {
      console.log(i)
    })
  }

  return arr
}

const funcs = outer()
// funcs[0]() // Output: ?
// funcs[1]() // Output: ?

function countdown(start) {
  let counter = start

  return function () {
    if (counter === 0) {
      console.log("GO!")
    } else {
      console.log(counter)
      counter--
    }
  }
}

const count = countdown(5)
// count() // Output: ?
// count() // Output: ?
// count() // Output: ?
// count() // Output: ?
// count() // Output: ?

function memoize(func) {
  const cache = {}

  return function (n) {
    if (n in cache) {
      console.log("Fetching from cache:", n)
      return cache[n]
    } else {
      console.log("Calculating result:", n)
      const result = func(n)
      cache[n] = result
      return result
    }
  }
}

function fibonacci(n) {
  if (n <= 1) {
    return n
  }
  return fibonacci(n - 1) + fibonacci(n - 2)
}

const memoizedFibonacci = memoize(fibonacci)

console.log(memoizedFibonacci(5)) // Output: ?
console.log(memoizedFibonacci(8)) // Output: ?
console.log(memoizedFibonacci(5)) // Output: ?
console.log(memoizedFibonacci(10)) // Output: ?
console.log(memoizedFibonacci(8)) // Output: ?
