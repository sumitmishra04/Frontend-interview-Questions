function maxSumArray(array = [], size = 1) {
  let maxSum = -Infinity
  if (!array || array.length === 0) {
    return null
  }

  let sum = array.slice(0, size).reduce((prev, acc) => prev + acc, 0)
  maxSum = sum

  for (let i = size; i < array.length; i++) {
    sum += array[i] - array[i - size]
    maxSum = Math.max(maxSum, sum)
  }

  return maxSum
}

console.log(maxSumArray([2, 1, 5, 1, 3, 2], 3))
console.log(maxSumArray([], 3))
console.log(maxSumArray([2, 1, 5], 3))
console.log(maxSumArray([2, 1], 3))
