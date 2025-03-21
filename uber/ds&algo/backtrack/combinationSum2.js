class Solution {
    /**
     * @param {number[]} nums
     * @param {number} target
     * @returns {number[][]}
     */
    combinationSum2(nums, target) {
        nums.sort((a,b)=> a-b)
        const result = []
        function backtrack(start, combinationSumArray, currentTarget) {
            if(currentTarget === 0) result.push([...combinationSumArray])
            if(currentTarget < 0) return
            for(let i = start; i<nums.length; i++) {
                if(i>start && nums[i] === nums[i-1]) continue
                combinationSumArray.push(nums[i])
                backtrack(i+1, combinationSumArray, currentTarget - nums[i])
                combinationSumArray.pop()
            }
        }
        backtrack(0, [], target)
        return result
    }
}
