function BinarySearchFirst(arr, target) {
  let start = 0;
  let end = arr.length - 1;
  let first = -1;
  while (start <= end) {
    let mid = Math.floor((start + end) / 2);
    if (target === arr[mid]) {
      first = mid;
      end = mid - 1;
    } else if (target < arr[mid]) {
      end = mid - 1;
    } else {
      start = mid + 1;
    }
  }
  return first;
}

function BinarySearchLast(arr, target) {
    let start = 0;
    let end = arr.length - 1;
    let last = -1;
    while (start <= end) {
      let mid = Math.floor((start + end) / 2);
      if (target === arr[mid]) {
        last = mid;
        start = mid + 1;
      } else if (target < arr[mid]) {
        end = mid - 1;
      } else {
        start = mid + 1;
      }
    }
    return last;
  }

console.log(BinarySearchFirst([1, 4, 4, 10, 10, 10, 15, 20], 10));
console.log(BinarySearchLast([1, 4, 4, 10, 10, 10, 15, 20], 10));
