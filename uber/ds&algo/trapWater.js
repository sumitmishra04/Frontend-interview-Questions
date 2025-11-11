class Solution {
    /**
     * @param {number[]} height
     * @return {number}
     */
    trap(height) {
        const prefixMax = Array(height.length).fill(0)
        const suffixMax = Array(height.length).fill(0)
        prefixMax[0]= height[0]
        suffixMax[suffixMax.length -1] = height.at(-1)

        for(let i = 1; i< height.length;i++) {
            prefixMax[i] = Math.max(height[i], prefixMax[i-1])
        }

        for(let i = height.length-2; i>=0;i--) {
            suffixMax[i] = Math.max(height[i], suffixMax[i+1])
        }

        let totalWater = 0

        for(let i = 0; i<height.length; i++) {
            totalWater += Math.min(prefixMax[i], suffixMax[i]) - height[i]
        }

        return totalWater
    }
}
