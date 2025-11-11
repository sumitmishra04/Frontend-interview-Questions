class Solution {
    /**
     * @param {number[]} nums
     * @return {number}
     */
    rob(nums) {
        if (nums.length === 0) return 0
        if (nums.length === 1) return nums[0]
        if (nums.length === 2) return Math.max(nums[0], nums[1])

        function robLinear(arr) {
            const dp = Array(arr.length)
            dp[0] = arr[0]
            dp[1] = Math.max(dp[0], arr[1])
            for (let i = 2; i < arr.length; i++) {
                dp[i] = Math.max(dp[i - 1], dp[i - 2] + arr[i])
            }
            return dp[arr.length - 1]
        }
        const excludeFirstHouse = robLinear(nums.slice(1))
        const excludeLastHouse = robLinear(nums.slice(0, nums.length - 1))

        return Math.max(excludeFirstHouse, excludeLastHouse)
    }
}
