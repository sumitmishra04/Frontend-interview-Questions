function index(arr) {
  let start = 0;
  let end = arr.length ;
  while (start <= end) {
    let mid = Math.floor((start + end) / 2);
    if (
      mid === 0 ||
      mid === arr.length - 1 ||
      (arr[mid] > arr[mid - 1] && arr[mid] > arr[mid + 1])
    ) {
      return mid;
    } else if (arr[mid] < arr[mid - 1]) {
      end = mid - 1;
    } else {
      start = mid;
    }
  }
}

console.log(index([7, 6, 5, 9]));
