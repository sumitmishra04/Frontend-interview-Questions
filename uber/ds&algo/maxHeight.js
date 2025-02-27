class Solution {
    /**
     * @param {number[]} heights
     * @return {number}
     */
    maxArea(heights) {
        let i =0, j = heights.length -1 
        let maxWaters = 0
        while(i<=j) {
            maxWaters  = Math.max(maxWaters, Math.min(heights[i],heights[j]) * (j-i))
            if(heights[j] > heights[i]) {
                i++
            } else if (heights[i] > heights[j]) {
                j--
            } else {
                i++
                j--
            }
        }
        return maxWaters
    }
}

// Input: height = [1,7,2,5,4,7,3,6]

// Output: 36