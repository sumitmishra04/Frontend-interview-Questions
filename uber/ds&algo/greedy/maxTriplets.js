class Solution {
    /**
     * @param {number[][]} triplets
     * @param {number[]} target
     * @return {boolean}
     */
    mergeTriplets(triplets, target) {
        const maxTriplets = Array(3).fill(-Infinity)

        for (let [x, y, z] of triplets) {
            if (x > target[0] || y > target[1] || z > target[2]) continue
            maxTriplets[0] = Math.max(maxTriplets[0], x)
            maxTriplets[1] = Math.max(maxTriplets[1], y)
            maxTriplets[2] = Math.max(maxTriplets[2], z)
        }
        return maxTriplets[0] === target[0] &&
            maxTriplets[1] === target[1] &&
            maxTriplets[2] === target[2];
    }
}
