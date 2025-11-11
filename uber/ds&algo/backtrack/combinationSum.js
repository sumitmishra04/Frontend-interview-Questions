class Solution {
    /**
     * @param {number[]} nums
     * @param {number} target
     * @returns {number[][]}
     */
    combinationSum(nums, target) {
        const result = []
        function backtrack(start, combinationSumArray, currentTarget) {
            if(currentTarget === 0) result.push([...combinationSumArray])
            if(currentTarget < 0) return
            for(let i = start; i<nums.length; i++) {
                combinationSumArray.push(nums[i])
                backtrack(i, combinationSumArray, currentTarget - nums[i])
                combinationSumArray.pop()
            }
        }
        backtrack(0, [], target)
        return result
    }
}
