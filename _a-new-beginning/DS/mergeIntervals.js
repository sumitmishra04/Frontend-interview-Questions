class Solution {
    /**
     * @param {number[][]} intervals
     * @return {number[][]}
     */
    merge(intervals) {
        if(intervals.length === 0) return []
        intervals.sort((a,b) => a[0] - b[0])
        const result = [intervals[0]]
        for(let i = 1; i<intervals.length;i++) {
            const current = intervals[i]
            const prev  = result.at(-1)

            if(prev[1] >= current[0]) {
                prev[1] = Math.max(prev[1], current[1])
            } else {
                result.push(current)
            }
        }
        return result
    }
}
