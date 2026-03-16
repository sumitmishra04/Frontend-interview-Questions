/*Time & Space Complexity

Time: O(n log n) (sorting)

Space: O(n) (result list)*/


//give all non-overlapping intervals
/*
Input: intervals = [[1,3],[1,5],[6,7]]

Output: [[1,5],[6,7]]
*/
function merge(intervals) {
 if(intervals.length === 0) return []
 intervals.sort((a,b) => a[0] -b[0])
 const results = [intervals[0]]
 for(let i = 1; i < intervals.length; i++) {
  let curr = intervals[i]
  let last = results[results.length - 1]
  if(curr[0] < last[1]) {
    last[1] = Math.max(last[1],curr[1])
  } else {
    results.push(curr)
  }
 }
 return results
}

console.log(merge([[1,3],[1,5],[6,7]]))
