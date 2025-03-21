class Solution {
    /**
     * @param {number} n
     * @return {number}
     */
    climbStairs(n) {
        if (n <= 2) return n
        let prev = 1
        let next = 2
        for (let i = 2; i < n; i++) {
            const current = prev + next
            prev = next
            next = current
        }
        return next
    }
}

// Time Complexity: O(n) — We iterate once from 3 to n.
// Space Complexity: O(1) — Only a few variables are used.