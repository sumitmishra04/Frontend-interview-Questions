/**
 * Definition of Interval:
 * class Interval {
 *   constructor(start, end) {
 *     this.start = start;
 *     this.end = end;
 *   }
 * }
 */

class Solution {
    /**
     * @param {Interval[]} intervals
     * @returns {number}
     */
    minMeetingRooms(intervals) {
        const start =[]
        const end =[]
        for(const interval of intervals) {
            start.push(interval.start)
            end.push(interval.end)
        }
        start.sort((a,b) => a-b)
        end.sort((a,b) => a-b)

        let count = 0, max = 0, i = 0, j = 0

        while(i<intervals.length && j < intervals.length) {
            if(start[i] < end[j]) {
                count++
                i++
            }
            else {
                count--
                j++
            }
            max = Math.max(max, count)
        }

        return max
    }
}
