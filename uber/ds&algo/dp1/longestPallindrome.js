class Solution {
    /**
     * @param {string} s
     * @return {string}
     */
    longestPalindrome(s) {
        if (s.length < 2) return s
        let start = 0
        let maxLength = 1
        function expandFromCenter(left, right) {
            while (left >= 0 && right < s.length && s[left] === s[right]) {
                if (right - left + 1 > maxLength) {
                    maxLength = right - left + 1
                    start = left
                }
                left--
                right++
            }
        }

        for (let i = 0; i < s.length; i++) {
            expandFromCenter(i - 1, i + 1)
            expandFromCenter(i, i + 1)
        }
        return s.substring(start, start + maxLength)
    }
}

// Time Complexity: O(n^2) — We expand around each character, resulting in a quadratic runtime.
