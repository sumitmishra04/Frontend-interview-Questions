class Solution {
    /**
     * @param {number[]} nums
     * @return {number[]}
     */
    productExceptSelf(nums) {
        let leftProd = 1, rightProd = 1, result = []
        for(let i = 0; i < nums.length; i++) {
              result[i] = leftProd 
              leftProd *=   nums[i]
        }   
        for(let i = nums.length - 1; i>=0; i--) {
              result[i] *= rightProd
              rightProd *=  nums[i]
        }
        return result
    }
}
