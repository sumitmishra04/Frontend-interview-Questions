// create memoised sqaure fn
const computeSquare = function (num) {
  return num * num
}

const add = function (a, b, c) {
  return a + b + c
}

const memo = function (cb) {
  const cachedNums = new Map()
  return function (...args) {
    if (cachedNums.get(args.toString())) {
      return cachedNums.get(args.toString())
    }
    for (let i = 0; i < 100000000; i++) {
      cachedNums.set(args.toString(), cb(...args))
    }
    return cachedNums.get(args.toString())
  }
}

const memoisedSquare = memo(computeSquare)
const memoisedAdd = memo(add)
// console.log(memoisedSquare(2));
// console.log(memoisedSquare(2));
// console.log(memoisedAdd(2, 3, 4));
// console.log(memoisedAdd(2, 3, 4));

const once = function (cb) {
  let called = false
  let res
  return function (...args) {
    if (!called) {
      res = cb(...args)
      called = true
      return res
    }
    return res
  }
}

const onceAdd = once(add)
console.log(onceAdd(1, 2, 3))
console.log(onceAdd(1, 2, 1))
console.log(onceAdd(1, 2, 2))
