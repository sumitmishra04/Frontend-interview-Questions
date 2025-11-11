class Solution {
    /**
     * @param {string} s
     * @return {number}
     */
    lengthOfLongestSubstring(s) {
        let longestSubstr = 0
        let str = new Set()
        let i = 0 , j = 0
        while(j < s.length) {
            while(str.has(s[j])) {
                str.delete(s[i])
                i++
            } 
            str.add(s[j])
            longestSubstr = Math.max(str.size, longestSubstr)
            j++
        }
        return longestSubstr
    }
}

// pwwkew : 3