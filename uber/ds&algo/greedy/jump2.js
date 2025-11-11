class Solution {
    /**
     * @param {number[]} nums
     * @return {number}
     */
    jump(nums) {
        if (nums.length <= 1) return 0;
        let maxReachable = 0, count = 0
        for(let i =0;i<nums.length;i++) {
            if(i+nums[i] > maxReachable) {
                count++
                maxReachable= i+nums[i]
            }
            if(maxReachable>=nums.length-1) {
                break
            }
        }
        return count
    }
}
