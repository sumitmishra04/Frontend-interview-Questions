function findMin(nums) {
    let start = 0, end = nums.length -1, mid = Math.floor((start+end)/2)
    while(start<end) {
        mid = Math.floor((start+end)/2)
        if(nums[start] < nums[end]) {
            return nums[start]
        }
        else if(nums[mid] > nums[end]){
            start = mid+1
        } else {
            end = mid;
        }
    } 
    return nums[start]
}

console.log(findMin([1,2,3,4,5,0]))
console.log(findMin([2,3,4,5,0,1]))
console.log(findMin([3,4,5,0,1,2]))
console.log(findMin([4,5,0,1,2,3]))
console.log(findMin([5,0,1,2,3,4]))
console.log(findMin([0,1,2,3,4,5]))
console.log(findMin([0,1,2,3,4,5]))
