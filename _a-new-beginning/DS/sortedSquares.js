class Solution {
    /**
     * @param {number[]} nums
     * @return {number[]}
     */
    sortedSquares(nums) {
        const result = []
        let pos = nums.length - 1

        let i =0, j = nums.length - 1
        while(i<=j) {
            const leftNum = Math.abs(nums[i])
            const rightNum = Math.abs(nums[j])
            if(leftNum > rightNum) {
                result[pos] = leftNum**2
                pos--
                i++
            } else {
                result[pos] = rightNum**2
                pos--
                j--
            }
        }
        return result
    }
}
