function contigousSum(array = [], target = 0) {
  let sum = 0
  const results = []
  for (let i = 0, j = 0; j < array.length; j++) {
    const tempResult = []
    if (sum <= target) {
      sum += array[j]
      tempResult.push(array[j])

      if (sum === target) {
        results.push(tempResult)
        tempResult = []
      }
    } else {
      sum -= array[i] + array[j]
    }
  }
}

console.log(contigousSum([3, 4, 7, 2, 9, 5, 8, 1, 6], 16))
// console.log(contigousSum([], 3))
// console.log(contigousSum([2, 1, 5], 3))
// console.log(contigousSum([2, 1], 3))
