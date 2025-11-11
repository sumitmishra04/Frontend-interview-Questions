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
     * @returns {boolean}
     */
    canAttendMeetings(intervals) {
        if(intervals.length === 0) return true
        intervals.sort((a,b) => a.start - b.start)
        let previousMeeting = intervals[0]
        for(let i = 1; i<intervals.length; i++) {
            const currentMeeting = intervals[i]
            if(currentMeeting.start < previousMeeting.end) return false
            previousMeeting = currentMeeting
        }
        return true
    }
    
}
