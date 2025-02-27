function findMin(nums, target) {
    let left = 0, right = nums.length - 1;
    
    while (left <= right) {
        let mid = Math.floor((left + right) / 2);
        
        if (nums[mid] === target) return nums[mid];
        
        // Check if the left half is sorted
        if (nums[left] <= nums[mid]) {
            if (target >= nums[left] && target < nums[mid]) {
                right = mid - 1; // Search left
            } else {
                left = mid + 1; // Search right
            }
        } 
        // Otherwise, the right half is sorted
        else {
            if (target > nums[mid] && target <= nums[right]) {
                left = mid + 1; // Search right
            } else {
                right = mid - 1; // Search left
            }
        }
    }
    
    return -1;
}
console.log(findMin([4,5,0,1,2,3], 4))

console.log(findMin([1,2,3,4,5,0], 4))
console.log(findMin([2,3,4,5,0,1], 4))
console.log(findMin([3,4,5,0,1,2], 4))
console.log(findMin([4,5,0,1,2,3], 4))
console.log(findMin([5,0,1,2,3,4], 4))
console.log(findMin([0,1,2,3,4,5], 4))
console.log(findMin([0,1,2,3,4,5], 4))
