class Solution {
    /**
     * @param {number} n - a positive integer
     * @return {number} - a positive integer
     */
    reverseBits(n) {
        const bnrStr = n.toString(2).padStart(32, '0')
        const bnrRev = bnrStr.split('').reverse().join('')
        return parseInt(bnrRev, 2) >>> 0
    }
}

// Time: O(1)
// Space: O(1)