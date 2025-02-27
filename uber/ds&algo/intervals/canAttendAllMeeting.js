// Given an array of meeting time interval objects consisting of start and end times [[start_1,end_1],[start_2,end_2],...] (start_i < end_i), determine if a person could add all meetings to their schedule without any conflicts.

// Input: intervals = [(0,30),(5,10),(15,20)]: false


// just sort the array by start time
// and check for elements if the next start time is after the previous end time

class Solution {
    /**
     * @param {Interval[]} intervals
     * @returns {boolean}
     */
    canAttendMeetings(intervals) {
        if(intervals.length ===0) return true 
        intervals.sort((a,b) => a.start-b.start)
        let prevEnd = intervals[0].end

        for(let i =1;i<intervals.length;i++) {
            if(intervals[i].start < prevEnd) {
                return false
            } else {
                prevEnd = intervals[i].end
            }
        }
        return true
    }
}
