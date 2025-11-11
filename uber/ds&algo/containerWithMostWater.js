class Solution {
    /**
     * @param {number[]} heights
     * @return {number}
     */
    maxArea(heights) {
        let i =0, j = heights.length -1 
        let maxWaters = 0
        while(i<j) {
            const totalWater = Math.min(heights[i], heights[j]) * (j-i)
            maxWaters = Math.max(maxWaters, totalWater)
            if(heights[j] > heights[i]) {
                i++
            } else {
                j--
            }
        }
        return maxWaters
    }
}
