function threeSum(nums) {
    nums.sort((a, b) => a - b);  // Sort the array to enable two-pointer technique
    const result = [];

    for (let i = 0; i < nums.length - 2; i++) {
        if (i > 0 && nums[i] === nums[i - 1]) continue;  // Skip duplicates

        let left = i + 1, right = nums.length - 1;

        while (left < right) {
            const sum = nums[i] + nums[left] + nums[right];

            if (sum === 0) {
                result.push([nums[i], nums[left], nums[right]]);
                left++;
                right--;

                while (left < right && nums[left] === nums[left - 1]) left++;  // Skip duplicate left values
                while (left < right && nums[right] === nums[right + 1]) right--;  // Skip duplicate right values
            } else if (sum < 0) {
                left++;  // Need a bigger sum, move left pointer
            } else {
                right--;  // Need a smaller sum, move right pointer
            }
        }
    }

    return result;
}




// Input: nums = [-1,0,1,2,-1,-4]

// Output: [[-1,-1,2],[-1,0,1]]