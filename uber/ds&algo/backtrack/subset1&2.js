class Solution {
    /**
     * @param {number[]} nums
     * @return {number[][]}
     */
    subsetsWithDup(nums) {
        nums.sort((a, b) => a - b); 
        const result = []

        function backtrack(start, currentSubset) {
            result.push([...currentSubset])

            for(let i = start; i<nums.length; i++) {
                if(i> start && nums[i] === nums[i-1]) continue;
                currentSubset.push(nums[i])
                backtrack(i+1, currentSubset)
                currentSubset.pop()
            }
        }
        backtrack(0, [])
        return result
    }
}
