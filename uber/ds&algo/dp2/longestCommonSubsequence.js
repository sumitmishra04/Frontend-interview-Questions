class Solution {
    /**
     * @param {string} text1
     * @param {string} text2
     * @return {number}
     */
    // abfcdf abc
    longestCommonSubsequence(text1, text2) {
        function helper(i, j) {
            if (text1[i] === undefined || text2[j] === undefined) return 0
            if (text1[i] === text2[j]) return 1 + helper(i + 1, j + 1)
            else return Math.max(helper(i + 1, j), helper(i, j + 1))
        }
        return helper(0, 0)
    }
}


// MEMO
class Solution {
    /**
     * @param {string} text1
     * @param {string} text2
     * @return {number}
     */
    // abfcdf abc
    longestCommonSubsequence(text1, text2) {
        const memo = new Map()
        function helper(i, j) {
            if (i < 0 || j < 0) return 0
            const key = `${i}${j}`
            if (memo.get(key)) return memo.get(key)

            if (text1[i] === text2[j]) {
                memo.set(key, 1 + helper(i - 1, j - 1))
            }
            else {
                memo.set(key, Math.max(helper(i - 1, j), helper(i, j - 1)))
            }
            return memo.get(key)
        }
        return helper(text1.length - 1, text2.length - 1)
    }
}

// Time Complexity: O(m * n), since each unique(i, j) pair is computed once.
// Space Complexity: O(m * n), due to memoization storage.