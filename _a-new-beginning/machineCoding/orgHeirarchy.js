function isValidOrganization(relationships) {
  if (!relationships || relationships.length === 0) return false;

  const graph = new Map();
  const indegree = new Map();

  // Build graph + indegree map
  for (const [manager, subordinate] of relationships) {
    if (manager === subordinate) return false; 

    if (!graph.has(manager)) graph.set(manager, []);
    graph.get(manager).push(subordinate);

    if (!indegree.has(manager)) indegree.set(manager, 0);
    indegree.set(subordinate, (indegree.get(subordinate) || 0) + 1);
  }

  // Find leaders
  const queue = [];
  for (const [person, deg] of indegree.entries()) {
    if (deg === 0) queue.push(person);
  }

  if (queue.length !== 1) return false; // must be one leader

  // Kahn's algorithm
  let visitedCount = 0;
  while (queue.length) {
    const manager = queue.shift();
    visitedCount++;

    for (const subordinate of graph.get(manager) || []) {
      indegree.set(subordinate, indegree.get(subordinate) - 1);
      if (indegree.get(subordinate) === 0) {
        queue.push(subordinate);
      }
    }
  }
 
  // If all nodes were visited → connected & acyclic
  return visitedCount === indegree.size
}

console.log(isValidOrganization([
  ["A", "B"],
  ["A", "C"],
  ["B", "D"],
]));