class Solution {
    /**
     * @param {number[][]} intervals
     * @param {number[]} newInterval
     * @return {number[][]}
     */
    insert(intervals, newInterval) {
        const result = []
        let [newStart, newEnd] = newInterval
        let i = 0, n = intervals.length
        while(i<n && intervals[i][1] < newStart) {
            result.push(intervals[i])
            i++
        }
        while(i<n && intervals[i][0] <= newEnd) {
            newStart = Math.min(intervals[i][0], newStart)
            newEnd = Math.max(intervals[i][1], newEnd)
            i++
        }
        result.push([newStart, newEnd])
        while(i<n) {
            result.push(intervals[i])
            i++
        }
        return result
    }
}
