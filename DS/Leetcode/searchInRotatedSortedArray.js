class Solution {
  /**
   * @param {number[]} nums
   * @param {number} target
   * @return {number}
   */
  search(nums, target) {
  let left = 0, right = nums.length - 1;

  while (left <= right) {
      let mid = Math.floor((left + right) / 2);

      if (nums[mid] === target) return mid; // Found target

      // Check if left half is sorted
      if (nums[left] <= nums[mid]) {
          if (nums[left] <= target && target < nums[mid]) {
              right = mid - 1; // Search left half
          } else {
              left = mid + 1; // Search right half
          }
      } 
      // Right half is sorted
      else {
          if (nums[mid] < target && target <= nums[right]) {
              left = mid + 1; // Search right half
          } else {
              right = mid - 1; // Search left half
          }
      }
  }
  return -1; 
  }
}


console.log(search([1, 4, 6, 8, 11, 13, 15], 13));
console.log(search([1, 4, 6, 8, 11, 13, 15], 4));
console.log(search([1, 4, 6, 8, 11, 13, 15], 1));
console.log(search([1, 4, 6, 8, 11, 13, 15], 15));
console.log(search([1, 4, 6, 8, 11, 13, 15], 8));
console.log(search([1, 4, 6, 8, 11, 13, 15], 81));
