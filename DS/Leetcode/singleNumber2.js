function singleNumber2(nums) {
  nums.sort();
  if (nums[0] !== nums[1]) {
    return nums[0];
  }
  if (nums[nums.length - 2] !== nums[nums.length - 1]) {
    return nums[nums.length - 1];
  }
  for (let i = 1; i < nums.length; i = i + 3) {
    if (nums[i] !== nums[i - 1]) {
      return nums[i - 1];
    }
  }
}

console.log(singleNumber2([4, 1, 3, 3, 3, 1, 1]));
