// You should aim for a solution with O(V + E) time and O(V + E) space, where V is the number of courses (nodes) and E is the number of prerequisites (edges).
class Solution {
  /**
   * @param {number} numCourses
   * @param {number[][]} prerequisites
   * @return {boolean}
   */
  canFinish(numCourses, prerequisites) {
    const adj = new Map()
    const indegree = []

    for (let i = 0; i < numCourses; i++) {
        adj.set(i, []);
        indegree.push(0)
    }

    for(let [course, preReq] of prerequisites) {
        adj.get(preReq).push(course)
        indegree[course]++
    }

    let queue = []
     for (let i = 0; i < numCourses; i++) {
        if(indegree[i] === 0) queue.push(i)
     }
     let result = []
     let count = 0 

     while(queue.length>0) {
        const current = queue.shift();
        result.push(current)
        count++;

        for(let neighbor of adj.get(current)) {
            indegree[neighbor]--
            if(indegree[neighbor] === 0) {
                queue.push(neighbor)
            }
        }
    }
    return count === indegree.length;
  }
}
