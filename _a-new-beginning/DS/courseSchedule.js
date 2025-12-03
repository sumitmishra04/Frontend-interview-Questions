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
        adj.set(i, []); // adj: outgoing edges (prereq → next courses)
        indegree.push(0) // indegree[i]: how many prerequisites course i has
    }

    for(let [course, preReq] of prerequisites) {
        adj.get(preReq).push(course)
        indegree[course]++
    }

    let queue = []
     for (let i = 0; i < numCourses; i++) {
        if(indegree[i] === 0) queue.push(i)
        // Zero-indegree = no prerequisites.
        // These are starting points for your topological order.
        // Complexity: O(V)
     }
     let result = []

     while(queue.length>0) {
        const current = queue.shift();
        result.push(current)

        for(let neighbor of adj.get(current)) {
            indegree[neighbor]--
            if(indegree[neighbor] === 0) {
                queue.push(neighbor)
            }
        }
    }
    return result.length === indegree.length;
  }
}

// ⭐ Final Complexity Proof
// Time
// Build graph: O(V + E)
// BFS topological sort: O(V + E)
// Total → O(V + E)
// Space
// Adjacency list: O(V + E)
// Indegree array: O(V)
// Queue: O(V)
// Total → O(V + E)