class Solution {
    /**
     * @param {string} s
     * @return {number}
     */
    countSubstrings(s) {
        const result = []
        for (let char of s) {
            result.push(char)
        }
        function expandFromCenter(left, right) {
            while (left >= 0 && right < s.length && s[left] === s[right]) {
                result.push(s.substring(left, right))
                left--
                right++
            }
        }
        for (let i = 0; i < s.length; i++) {
            expandFromCenter(i - 1, i + 1)
            expandFromCenter(i, i + 1)
        }

        return result.length
    }
}
