class Solution {
    /**
     * @param {string} s
     * @return {number}
     */
    lengthOfLongestSubstring(s) {
        let longestSubstr = 0
        let str = new Set()
        let i = 0 , j = 0
        while(i<s.length) {
            while(str.has(s[i])) {
             str.delete(s[j])
             j++
            }
            str.add(s[i])
            longestSubstr = Math.max(longestSubstr, str.size)
            i++
        }
        return longestSubstr
    }
}
