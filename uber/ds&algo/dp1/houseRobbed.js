class Solution {
    /**
     * @param {number[]} nums
     * @return {number}
     */
    rob(nums) {
        if (nums.length === 0) return 0
        if (nums.length === 1) return nums[0]
        if (nums.length === 2) return Math.max(nums[0], nums[1])
        const dp = Array(nums.length)
        dp[0] = nums[0]
        dp[1] = Math.max(nums[0], nums[1])

        for (let i = 2; i < nums.length; i++) {
            dp[i] = Math.max(dp[i - 2] + nums[i], dp[i - 1])
        }
        return dp[nums.length - 1]
    }
}
// Time Complexity: O(n), where n is the length of nums. We iterate through the list once.
// Space Complexity: O(n) due to the dp array.
class Solution {
    /**
     * @param {number[]} nums
     * @return {number}
     */
    rob(nums) {
        if (nums.length === 0) return 0
        if (nums.length === 1) return nums[0]
        if (nums.length === 2) return Math.max(nums[0], nums[1])
        let prev = nums[0]
        let next = Math.max(prev, nums[1])

        for (let i = 2; i < nums.length; i++) {
            const current = Math.max(prev + nums[i], next)
            prev = next
            next = current
        }
        return next
    }
}
