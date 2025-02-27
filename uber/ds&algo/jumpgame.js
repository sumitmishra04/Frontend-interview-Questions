class Solution {
    /**
     * @param {number[]} nums
     * @return {boolean}
     */
    canJump(nums) {
        let maxReachableIndex = 0
        for(let i =0;i<nums.length;i++) {
            if(i > maxReachableIndex) return false
            maxReachableIndex = Math.max(maxReachableIndex, i+nums[i])
            if(maxReachableIndex>= nums.length-1) return true
        }
    }
}
