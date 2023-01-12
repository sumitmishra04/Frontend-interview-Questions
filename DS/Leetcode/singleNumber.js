function index(arr) {
  let singleNum = arr[0]
  for (let i = 1; i < arr.length; i++) {
    singleNum ^= arr[i]
  }
  return singleNum
}

console.log(index([4, 1, 3, 1, 4]));
console.log(index([4]));
console.log(index([4, 1, 1]));
