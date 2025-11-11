class Solution {
    /**
     * @param {number[]} hand
     * @param {number} groupSize
     * @return {boolean}
     */
    isNStraightHand(hand, groupSize) {
        if (hand.length % groupSize !== 0) return false
        const map = new Map()
        for (let num of hand) {
            map.set(num, (map.get(num) || 0) + 1)
        }
        hand.sort((a, b) => a - b)
        for (let num of hand) {
            if (map.get(num) === 0) continue

            for (let i = 0; i < groupSize; i++) {
                const currendCard = num + i
                if (!map.get(currendCard)) return false
                map.set(currendCard, (map.get(currendCard) || 0) - 1)
            }
        }
        return true
    }
}
