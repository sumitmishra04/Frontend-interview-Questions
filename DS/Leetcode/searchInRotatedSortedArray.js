function search(nums, target) {
  let start = 0;
  let end = nums.length - 1;
  while (start <= end) {
    let mid = (start + end) / 2;
    if (nums[mid] === target) {
      return mid;
    } else if (nums[start] <= nums[mid]) {
      // left array sorted
      if (target >= nums[start] && target < nums[mid]) {
        // search target in the left array range
        end = mid - 1;
      } else {
        start = mid + 1;
      }
    } else {
      // right array sorted
      if (target > nums[mid] && target <= nums[end]) {
        // search target in the right array range
        start = mid + 1;
      } else {
        end = mid - 1;
      }
    }
  }
  return -1;
}

console.log(search([1, 4, 6, 8, 11, 13, 15], 13));
console.log(search([1, 4, 6, 8, 11, 13, 15], 4));
console.log(search([1, 4, 6, 8, 11, 13, 15], 1));
console.log(search([1, 4, 6, 8, 11, 13, 15], 15));
console.log(search([1, 4, 6, 8, 11, 13, 15], 8));
console.log(search([1, 4, 6, 8, 11, 13, 15], 81));
