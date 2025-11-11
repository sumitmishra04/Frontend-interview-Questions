class Solution {
    /**
     * @param {number} n
     * @return {number[]}
     */
    countBits(n) {
        const result = Array(n + 1).fill(0)
        for (let i = 1; i < result.length; i++) {
            let bitNum = i
            let count = 0
            while (bitNum !== 0) {
                count++
                bitNum = bitNum & bitNum - 1
            }
            result[i] = count
            count = 0
        }
        return result
    }
}
