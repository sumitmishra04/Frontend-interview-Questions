function BinarySearchFloor(arr, target) {
  let start = 0;
  let end = arr.length - 1;
  let floor = -1;
  while (start <= end) {
      const mid = Math.floor((start + end) / 2)
    if (target === arr[mid]) {
      return arr[mid];
    } else if (target < arr[mid]) {
      end = mid - 1;
    } else {
      floor = arr[mid];
      start = mid + 1;
    }
  }
  return floor
}
console.log(BinarySearchFloor([1, 3, 9, 15, 15, 18, 21], 25));


function BinarySearchCeil(arr, target) {
    let start = 0;
    let end = arr.length - 1;
    let floor = -1;
    while (start <= end) {
        const mid = Math.floor((start + end) / 2)
      if (target === arr[mid]) {
        return arr[mid];
      } else if (target < arr[mid]) {
        floor = arr[mid];
        end = mid - 1;
      } else {
        start = mid + 1;
      }
    }
    return floor
  }
  
  console.log(BinarySearchCeil([1, 3, 9, 15, 15, 18, 21], 10));
  

