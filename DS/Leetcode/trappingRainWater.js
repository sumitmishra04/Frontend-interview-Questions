function index(arr) {
  let left = [arr[0]];
  let right = [];
  for (let i = 1; i < arr.length; i++) {
    left[i] = Math.max(left[i - 1], arr[i]);
  }
  for (let i = arr.length - 1; i > 0; i--) {
    if (i === arr.length - 1) {
      right[i] = arr[arr.length - 1];
    } else {
      right[i] = Math.max(right[i + 1], arr[i]);
    }
  }
  let ans = 0;
  for (let i = 0; i < arr.length; i++) {
    ans += Math.abs(Math.min(left[i], right[i]) - arr[i]);
  }
  return ans;
}
console.log(index([0, 1, 0, 2, 1, 0, 1, 3, 2, 1, 2, 1]));
