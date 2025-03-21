class Solution {
    /**
     * @param {number[]} cost
     * @return {number}
     */
    minCostClimbingStairs(cost) {
        let prevCost = 0;
        let nextCost = 0;
        for (let i = 2; i <= cost.length; i++) {
            const currentCost = Math.min(cost[i - 2] + prevCost, cost[i - 1] + nextCost)
            prevCost = nextCost
            nextCost = currentCost
        }
        return nextCost
    }
}

// Time Complexity: O(n) — We traverse the cost array once.
// Space Complexity: O(1) — Constant space used.