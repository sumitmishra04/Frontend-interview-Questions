class Solution {
    /**
     * @param {number[]} nums
     * @param {number} target
     * @return {number}
     */
    search(nums, target) {
        let left = 0, right = nums.length -1; 
        while(left<=right) {
            const mid = Math.floor((left+right)/2)
            if(target === nums[mid]) return mid
            else if(target < nums[mid]) right = mid -1
            else left = mid+1
        }
        return -1
    }

    search2D (matrix, target) {
        const rows = matrix.length, cols = matrix[0].length;
        let topRightCorner = 0, bottomLeftCorner = rows * cols - 1;

        while(topRightCorner<=bottomLeftCorner) {
            const mid = Math.floor((topRightCorner+bottomLeftCorner)/2)
            
            const row = Math.floor(mid / cols);
            const col = mid % cols;
            const midValue = matrix[row][col];

            if(target === midValue) return true
            else if(target < midValue) bottomLeftCorner = mid -1
            else topRightCorner = mid+1
        }
        return -1
    }
}
