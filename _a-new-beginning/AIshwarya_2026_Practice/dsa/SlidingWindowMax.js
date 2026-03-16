/*
Input: nums = [1,2,1,0,4,2,6], k = 3

Output: [2,2,4,4,6]

You are given an array of integers nums and an integer k. There is a sliding window of size k that starts at the left edge of the array. The window slides one position to the right until it reaches the right edge of the array.

Return a list that contains the maximum element in the window at each step.
*/

function maxSlidingWindow(nums, k) {
  const result = []
  const deque = []
  let left = 0
  for(let right = 0; right < nums.length; right++) {
    while(deque.length && deque[deque.length - 1] < nums[right]){
      deque.pop()
    }
    deque.push(nums[right])
    if(deque[0] < nums[left]) {
      deque.shift()
    }
    if(right - left + 1 === k) {
      result.push(deque[0])
      left++
    }
  }
  return result
}

console.log(maxSlidingWindow([1,2,1,0,4,2,6], 3))

// Optimal Solution (Monotonic Deque) — O(n)