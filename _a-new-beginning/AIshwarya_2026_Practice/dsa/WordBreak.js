/*Given a string s and a dictionary of strings wordDict, 
return true if s can be segmented into a 
space-separated sequence of dictionary words.
*/
/*
neetcode "neet" "code"
*/

function wordBreak(s, wordDict) {
  const n = s.length
  const dp = new Array(n + 1).fill(false)
  dp[0] = true
  const wordSet = new Set(wordDict)
  for(let i = 1; i <= n; i++){
    for(let j = 0; j < i; j++) {
      if(dp[j] && wordSet.has(s.substring(j,i))) {
        dp[i] = true
        break
      }
    }
  }
  return dp[n]
}

console.log('>>>>', wordBreak("neetcode", ["neet", "code"]))

// O(n * m * k)

// Where:

// n = length of string

// m = number of words

// k = max word length