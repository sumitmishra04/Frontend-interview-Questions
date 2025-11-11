class Solution {
    /**
     * @param {number[]} cardPoints
     * @param {number} k
     * @return {number}
     */
    maxScore(cardPoints, k) {
        let leftIndex = 0, rightIndex = cardPoints.length - k
        let total = 0
        for(let i = rightIndex; i<cardPoints.length;i++) {
            total += cardPoints[i]
        }
        let res = total

        for(let i = rightIndex; i<cardPoints.length;i++) {
            total = total + cardPoints[leftIndex] - cardPoints[i]
            res = Math.max(total, res)
            leftIndex++
        }
        return res
    }
}
