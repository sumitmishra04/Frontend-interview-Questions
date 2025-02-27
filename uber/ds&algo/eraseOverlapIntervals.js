class Solution {
    /**
     * @param {number[][]} intervals
     * @return {number}
     */
    eraseOverlapIntervals(intervals) {
        if(intervals.length === 0) return 0
        intervals.sort((a,b) => a[1] - b[1])
        let count = 0
        let prev = intervals[0]
        for(let i = 1;i<intervals.length;i++) {
            if(intervals[i][0] < prev[1]) {
                count++
            } else {
                prev = intervals[i]
            }
        }
        return count
    }
}
