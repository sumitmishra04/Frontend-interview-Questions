/*================================================================================================
implement a function called once which executes a function only once.

const add = function (a, b, c) {
  return a + b + c;
};

function once() {
    let called = false
    let result 
    return function(...args) {
        if(called) {
            return result
        }
        called = true
        result = add.apply(this, args)
        return result
    }
}


const onceAdd = once(add);
console.log(onceAdd(1, 2, 3));
console.log(onceAdd(1, 2, 1));
console.log(onceAdd(1, 2, 2));
================================================================================================*/

/*================================================================================================
Implement counter

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

================================================================================================*/

/*================================================================================================
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
funcs[0]() // Output: ?
funcs[1]() // Output: ?

Using var in a loop does not create a new variable each iteration, so all functions close over the same variable.

🔹 var is function-scoped, not block-scoped.

There is only one copy of the variable i shared by all functions.

After the loop finishes, i becomes 5.

All pushed functions reference the same i, not a new one per iteration.
================================================================================================*/

/*================================================================================================
memoise a function

function fibonacci(n) {
  if (n <= 1) {
    return n
  }
  return fibonacci(n - 1) + fibonacci(n - 2)
}

function memoize(fn) {
    const cache = new Map()
    return function(...args) {
        const key = JSON.stringify(args)
        if(cache.has(key)) {
            return cache.get(key)
        } else {
            cache.set(key, fn.apply(this, args))
            return cache.get(key)
        }
    }
}
const memoizedFibonacci = memoize(fibonacci)

console.log(memoizedFibonacci(5)) // Output: ?
console.log(memoizedFibonacci(8)) // Output: ?
console.log(memoizedFibonacci(5)) // Output: ?
console.log(memoizedFibonacci(10)) // Output: ?
console.log(memoizedFibonacci(8)) // Output: ?
================================================================================================*/

/*================================================================================================
function createIdGenerator() {
    const map = new Map()
    return function(key) {
        map.set(key, (map.get(key)||0) + 1)
        return `${key}${map.get(key)}`
    }
}

const idGenerator = createIdGenerator();

console.log(idGenerator("user")); // user1
console.log(idGenerator("user")); // user2
console.log(idGenerator("product")); // product1
console.log(idGenerator("user")); // user3
================================================================================================*/
