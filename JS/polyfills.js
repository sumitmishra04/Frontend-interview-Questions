Array.prototype.myMap = function (cb) {
  const result = []
  for (let i = 0; i < this.length; i++) {
    result[i] = cb(this[i], i, this)
  }
  return result
}

console.log(
  [1, 2, 3, 4].myMap((value, index) => {
    return value * 2 * index
  })
)

Array.prototype.myFilter = function (cb) {
  const result = []
  for (let i = 0; i < this.length; i++) {
    const value = cb(this[i], i, this)
    if (value) {
      result.push(this[i])
    }
  }
  return result
}

console.log(
  [1, 2, 3, 4].myFilter((value) => {
    return value > 2
  })
)

Array.prototype.myReduce = function (cb, initialValue) {
  let computedResult = initialValue
  for (let i = 0; i < this.length; i++) {
    computedResult = cb(computedResult, this[i])
  }
  return computedResult
}

console.log(
  [1, 2, 3, 4].myReduce((acc, value) => {
    return acc + value
  }, 0)
)
