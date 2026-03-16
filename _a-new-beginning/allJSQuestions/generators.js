// A generator is a function that can pause and resume.

function* myGen() {
  console.log("A")
  yield 1
  console.log("B")
  yield 2
  console.log("C")
  return 3
}
const g = myGen() // This gives you a generator object, not the result.
g.next() // A and returns { value: 1, done: false } // Every next() resumes the function until the next yield.

g.next()
// prints "B"
// returns { value: 2, done: false }

g.next()
// prints "C"
// returns { value: 3, done: true }

g.next()
// returns { value: undefined, done: true }


function* calc() {
  const x = yield 1
  const y = yield 2
  return x + y
}

const c = calc()
c.next()       // → { value: 1 }
c.next(10)     // x = 10
c.next(20)     // y = 20 → return x+y → 30
// Why is this weird?
// Because x gets its value from the next next() call, not the current one.

// This confuses everyone at first — completely normal.

function* foo() {
  const a = yield "step1"
  const b = yield "step2"
  const c = yield "step3"
  return [a, b, c]
}

const f = foo()
f.next()
// { value: "step1", done: false }

f.next(10)
// { value: "step2", done: false }

f.next(20)
// { value: "step3", done: false }

f.next(30)
// { value: [10, 20, 30], done: true }

f.next()
// { value: undefined, done: true }

// FLatten array
function* flatten(arr) {
  for (const item of arr) {
    if (Array.isArray(item)) {
      yield* flatten(item)     // delegate to inner generator
    } else {
      yield item               // yield value
    }
  }
}

const result = [...flatten([1, [2, [3, 4], 5], 6])]
console.log(result)
// [1, 2, 3, 4, 5, 6]

function* flatten(arr, depth = 1) {
  for (const item of arr) {
    if (Array.isArray(item) && depth > 0) {
      yield* flatten(item, depth === Infinity ? Infinity : depth - 1)
    } else {
      yield item
    }
  }
}

const arr = [1, [2, [3, [4]]], 5]

console.log([...flatten(arr, 1)]) // [1, 2, [3, [4]], 5]
console.log([...flatten(arr, 2)]) // [1, 2, 3, [4], 5]
console.log([...flatten(arr, 3)]) // [1, 2, 3, 4, 5]
console.log([...flatten(arr, Infinity)]) // full deep flatten
