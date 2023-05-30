function LCS(str1, str2) {
  function helper(index1, index2) {
    if (index1 < 0 || index2 < 0) {
      return 0
    }

    if (str1[index1] === str2[index2]) {
      return 1 + helper(index1 - 1, index2 - 1)
    }

    return Math.max(helper(index1 - 1, index2), helper(index1, index2 - 1))
  }

  return helper(str1.length - 1, str2.length - 1)
}

function LCS_DP(str1, str2) {
  const dp = Array(str1.length).fill(Array(str2.length).fill(-1))

  function helper(index1, index2) {
    if (index1 < 0 || index2 < 0) {
      return 0
    }
    console.log(dp)

    if (dp[index1][index2] !== -1) {
      return dp[index1][index2]
    }

    if (str1[index1] === str2[index2]) {
      return (dp[index1][index2] = 1 + helper(index1 - 1, index2 - 1))
    } else {
      return (dp[index1][index2] = Math.max(
        helper(index1 - 1, index2),
        helper(index1, index2 - 1)
      ))
    }
  }

  return helper(str1.length - 1, str2.length - 1)
}

console.log(LCS_DP("sumit", "tey"))
