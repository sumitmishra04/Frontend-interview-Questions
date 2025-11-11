class Solution {
    /**
     * @param {string} s
     * @return {number}
     */
    numDecodings(s) {
        if (s.length === 0 || s[0] === '0') return 0;
        const dp = Array(s.length + 1).fill(0)
        dp[0] = 1
        dp[1] = s[0] === '0' ? 0 : 1
        for (let i = 2; i <= s.length; i++) {
            const oneDigit = parseInt(s.slice(i - 1, i))
            const twoDigit = parseInt(s.slice(i - 2, i))
            if (oneDigit >= 1) {
                dp[i] += dp[i - 1];
            }
            if (twoDigit >= 10 && twoDigit <= 26) {
                dp[i] += dp[i - 2];
            }
        }

        return dp[s.length]
    }
}

// Time Complexity: O(n), where n is the length of the string s.
// Space Complexity: O(1), optimized for constant space.