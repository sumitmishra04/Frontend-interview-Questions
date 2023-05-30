// function findSubsequences(s) {
//   const subsequences = []
//   function helper(curr, index) {
//     if (index === s.length) {
//       subsequences.push(curr)
//       return
//     }
//     helper(curr + s[index], index + 1)
//     helper(curr, index + 1)
//   }
//   helper("", 0)
//   return subsequences
// }

// // Example usage
// let string = "abcdefghi"
// let result = findSubsequences(string)
// console.log(result)

// function findNumSubsequences(array) {
//   const subsequences = []
//   function helper(curr, index) {
//     if (index === array.length) {
//       subsequences.push(curr)
//       return
//     }
//     helper(curr.concat(array[index]), index + 1)
//     helper(curr, index + 1)
//   }
//   helper([], 0)
//   return subsequences
// }

// let array = [1, 2, 3]
// let value = findNumSubsequences(array)
// console.log(value)

// function findSubsequencesThatAddsTo(array, target) {
//   const subsequences = []

//   function helper(curr, currSum, index) {
//     if (index === array.length) {
//       if (currSum === target) {
//         subsequences.push(curr)
//         return true
//       }
//       return false
//     }
//     if (helper(curr.concat(array[index]), currSum + array[index], index + 1)) {
//       return
//     }
//     if (helper(curr, currSum, index + 1)) {
//       return
//     }
//   }
//   helper([], 0, 0)
//   return subsequences
// }

function findSubsequencesCountThatAddsTo(array, target) {
  function helper(curr, currSum, index) {
    if (currSum > target) {
      return 0
    }
    if (index === array.length) {
      if (currSum === target) {
        return 1
      }
      return 0
    }
    return (
      helper(curr.concat(array[index]), currSum + array[index], index + 1) +
      helper(curr, currSum, index + 1)
    )
  }
  return helper([], 0, 0)
}
console.log(findSubsequencesCountThatAddsTo([1, 2, 3, 4, 5, 6], 2))
