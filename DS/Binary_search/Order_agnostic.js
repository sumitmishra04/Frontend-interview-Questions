function BinarySearch(arr, target) {
    let start = 0
    let end = arr.length - 1
    while(start <= end) {
        let mid = Math.floor((start + end) / 2)
        if(target === arr[mid]) {
            return mid
        } else if((arr[start] < arr[end] && target < arr[mid]) || (arr[start] > arr[end] && target > arr[mid])) {
            end = mid - 1
        } else {
            start = mid + 1
        }
    }
    return -1
}

console.log(BinarySearch([2, 8, 11, 19], 2))
console.log(BinarySearch([32, 28, 17, 9, 3], 9))