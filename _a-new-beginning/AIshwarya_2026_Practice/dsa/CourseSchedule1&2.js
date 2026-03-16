/*
Input: numCourses = 2, prerequisites = [[0,1]]

Output: true
course schedule 1
*/

function canFinish(numCourses, prerequisites) {
  const adj = Array.from({ length: numCourses}, () => [])
  for(let [a,b] of prerequisites){
    adj[b].push(a)
  }
  const state = new Array(numCourses).fill(0)
  // 0 unvisited
  // 1 visiting
  // 2 visited
  function dfs(course) {
    if(state[course] === 1) return true
    if(state[course] === 2) return false
    state[course] = 1
    for(let neighbour of adj[course]) {
      if(dfs(neighbour)) return true
    }
    state[course] = 2
    return false
  }
  for(let course = 0; course < numCourses; course++) {
    if(dfs(course)) return false
  }
  return true
}

//console.log(canFinish(2, [[0,1]]))

/*
⏱ Time Complexity
O(V + E)

V = numCourses
E = prerequisites.length

📦 Space Complexity
O(V + E)
*/


/*Course Schedule II*/
/* ordr of courses*/

function findOrder(numCourses, prerequisites) {
  const adj = Array.from({ length: numCourses }, () => [])
  const results = []
  for(let [a,b] of prerequisites) {
    adj[b].push(a)
  }
  const state = new Array(numCourses).fill(0)
  function dfs(course) {
    if(state[course] === 1) return false
    if(state[course] === 2) return true
    state[course] = 1
    for(let neighbour of adj[course]) {
      if(!dfs(neighbour)) return false
    }
    state[course] = 2
    results.push(course)
    return true
  }
  for(let i = 0; i < numCourses; i++) {
    if(!dfs(i)) return []
  }
  return results
}

console.log(findOrder(3, [[0,1],[1,2],[2,0]]))
