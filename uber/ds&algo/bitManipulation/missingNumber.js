class Solution {
    /**
     * @param {number[]} nums
     * @return {number}
     */
    missingNumber(nums) {
        const n = nums.length
        const totalSum = (n * (n + 1)) / 2
        return totalSum - nums.reduce((acc, curr) => acc + curr)

        // let xor = 0
        // const n = nums.length

        // for(let i = 0; i<=n; i++) {
        //     xor = xor ^ i
        // }

        // for(const num of nums) {
        //     xor = xor ^ num
        // }

        // return xor
    }
}
