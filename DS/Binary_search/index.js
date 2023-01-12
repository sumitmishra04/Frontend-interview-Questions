function BinarySearch(arr, target) {
    let start = 0
    let end = arr.length - 1
    while(start<=end) {
        const mid = MAth.floor((start + end) / 2)
        if(target === arr[mid]) {
            return mid
        } else if(target < arr[mid]) {
            end = mid - 1
        } else {
            start = mid + 1
        }
    }
    return -1
}
console.log(BinarySearch([1,2,3], 3))
console.log(BinarySearch([3], 3))
console.log(BinarySearch([3,4,5], 3))
console.log(BinarySearch([1,2,3,4,5], 3))
console.log(BinarySearch([1,2,4,5], 3))
