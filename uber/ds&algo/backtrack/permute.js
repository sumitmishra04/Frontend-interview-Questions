class Solution {
    /**
     * @param {number[]} nums
     * @return {number[][]}
     */
    permute(nums) {
        const results = []
        function swap(nums, idx1, idx2) {
            const temp = nums[idx2]
            nums[idx2] = nums[idx1]
            nums[idx1] = temp
        }

        function backtrack(start, nums, results) {
            if (start === nums.length) {
                results.push([...nums])
            }
            for (let i = start; i < nums.length; i++) {
                swap(nums, i, start)
                backtrack(start + 1, nums, results)
                swap(nums, i, start)
            }
        }
        backtrack(0, nums, results)
        return results
    }
}
const s = new Solution()
console.log(s.permute([1, 2, 3]))
console.log(s.permute(['a', 'b', 'c']))