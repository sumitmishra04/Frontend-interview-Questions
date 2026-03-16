/*
Input: s = "ababd"

Output: "bab"
*/
function longestPalindrome(s) {
  let start = 0
  let end = 0
  let maxLength = 0
  function getPalindrome(isEven) {
   let l = 0, r = 0
   for(let i = 0; i < s.length; i++) {
    if(isEven) {
      l = i
      r = i + 1
    } else {
      l = i
      r = i
    }
    while(l >= 0 && r < s.length && s[l] === s[r]) {
      if(r - l > end - start) {
         start = l
         end = r
      }
      maxLength = Math.max(maxLength, r - l + 1)
      l--
      r++
    }
   }
    
  }
  getPalindrome(true)
  getPalindrome(false)
  return s.substring(start, end + 1)
}

console.log('>>>', longestPalindrome("ababadddddddd"))

// Complexity O(n^2)