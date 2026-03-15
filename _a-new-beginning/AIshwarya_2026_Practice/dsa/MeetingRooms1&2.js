// MeetingRoom1
//Input: intervals = [(0,30),(5,10),(15,20)]

function canAttendMeetings(intervals) {
  intervals.sort((a,b) => a[0] - b[0])
  for(let i = 1; i < intervals.length; i++) {
    if(intervals[i][0] < intervals[i - 1][1]) {
      return false
    }
  }
  return true
}

console.log(canAttendMeetings([[0,30],[5,10],[15,20]]))

// MeetingRoom1
//Input: intervals = [(0,30),(5,10),(15,20)]


function minMeetingRooms(intervals) {
    const start = intervals.map(i => i[0]).sort((a,b) => a-b);
    const end = intervals.map(i => i[1]).sort((a,b) => a-b);

    let rooms = 0;
    let endPtr = 0;

    for (let i = 0; i < start.length; i++) {
        if (start[i] < end[endPtr]) {
            rooms++;
        } else {
            endPtr++;
        }
    }

    return rooms;
}

// nlogn