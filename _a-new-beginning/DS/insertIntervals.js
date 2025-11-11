class Solution {
    /**
     * @param {number[][]} intervals
     * @param {number[]} newInterval
     * @return {number[][]}
     */
    insert(intervals, newInterval) {
        let [newStart,newEnd] = newInterval
        let i = 0, n = intervals.length, result = []
        while(i<n && intervals[i][1] < newStart) {
           result.push(intervals[i])
           i++
        }
        while(i<n && intervals[i][0] < newEnd) {
            newStart = Math.min(newStart, intervals[i][0]) 
            newEnd = Math.max(newEnd, intervals[i][1])
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
