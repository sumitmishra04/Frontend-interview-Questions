/**
 * @param {number[][]} routes
 * @param {number} source
 * @param {number} target
 * @return {number}
 * Input: routes = [[1,2,7],[3,6,7]], source = 1, target = 6
Output: 2

 */
var numBusesToDestination = function(routes, source, target) {
  if(source === target) {
    return 0
  }
  const adj = new Map()
  for(let i = 0; i < routes.length; i++) {
    for(let stop of routes[i]){
      if(adj.has(stop)){
        adj.set(stop, [...adj.get(stop), i])
      } else {
        adj.set(stop, [i])
      }
    }
  }
  const visitedStops = new Set()
  const visitedBuses = new Set()
  const busCount = 0
  let queue = [source]
  while(queue.length > 0) {
    busCount++
    const nextQueue = []
    for(const stop of queue) {
      const buses = adj.get(stop) || []
      for(const busIdx of buses) {
        if(visitedBuses.has(busIdx)) continue
        visitedBuses.add(busIdx)
        const stops = routes[busIdx]
        for(const nextStop of stops) {
          if(nextStop === target) return busCount
          if(!visitedStops.has(nextStop)){
            visitedStops.add(nextStop)
            nextQueue.push(nextStop)
          }
        }
      }
    }
    queue = nextQueue
  }
  return -1
};


console.log('>>>', numBusesToDestination([[1,2,7],[3,6,7]], 1, 6))

/*
 Time complexity: O(N+M)
Building the graph: time complexity of O(N), where N is the total number of stops.

BFS traversal: The BFS traversal explores the graph to find the shortest path from the source stop to the target stop. 
The worst-case scenario occurs when the target stop is the farthest reachable stop, 
requiring a traversal of all stops. This leads to a time complexity of O(M), where M is the total number of stops in the graph.

*/