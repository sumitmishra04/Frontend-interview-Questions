function MoveZeroes(arr) {
  let count = 0;
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] === 0) {
      arr.splice(i, 1);
      count++;
    }
  }
  for (let i = 0; i < count; i++) {
    arr[i] = arr.concat(0);
  }
  return arr;
}

var moveZeroes = function (nums) {
  var noOfzeros = 0;
  for (var i = 0; i < nums.length; i++) {
    if (nums[i] != 0 && noOfzeros > 0) {
      nums[i - noOfzeros] = nums[i];
      nums[i] = 0;
    } else if (nums[i] == 0) {
      noOfzeros++;
    }
  }
  return nums;
};
// console.log("res ", MoveZeroes([0, 1, 3, 0, 2, 1, 0]));
// console.log("res ", moveZeroes([0, 1, 3, 0, 2, 1, 0]));
console.log("res ", moveZeroes([0,1]));

