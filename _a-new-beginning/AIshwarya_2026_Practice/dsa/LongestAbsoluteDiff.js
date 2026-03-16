/*Input: nums = [8,2,4,7], limit = 4
Output: 2 */

var longestSubarray = function(nums, limit) {
 let result = 0
 let maxDeque = []
 let minDeque = []
 let l = 0
 for(let r = 0; r < nums.length; r++){
  while(maxDeque.length && maxDeque[maxDeque.length - 1] < nums[r]) {
    maxDeque.pop()
  }
  maxDeque.push(nums[r])
  while(minDeque.length && minDeque[minDeque.length - 1] > nums[r]) {
    minDeque.pop()
  }
  minDeque.push(nums[r])
  while(maxDeque[0] - minDeque[0] > limit) {
    if(maxDeque[0] === nums[l]) maxDeque.shift()
    if(minDeque[0] === nums[l]) minDeque.shift()
    l++
  }
  result = Math.max(result, r - l + 1)
 }
 return result
}

console.log(longestSubarray([8,2,4,7],4))

/*
O(n) as every element inserted in queue only once
*/