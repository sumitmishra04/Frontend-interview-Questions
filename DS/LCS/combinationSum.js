function combinationSum(array, target) {
  const result = []
  function helper(array, target, index, result, combinations) {
    if (index === array.length) {
      if (target === 0) {
        result.push(temp)
      }
      return
    }

    if (array[index] < target) {
      combinations.push(array[index])
      helper(array, target - array[index], index, result, combinations)
      combinations.pop()
    }
    helper(array, target, index + 1, result, combinations)

    return result
  }
  helper(array, target, 0, result, [])

  return result
}

console.log(combinationSum([2, 3, 6, 7], 7))
