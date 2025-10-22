function countDown(n) {
  if (n === 1) {
    console.log("Go!");

  console.log(n);
    return;
  }
  countDown(n - 1);
  console.log(n);
}

function sum(n) {
    if(n === 1) {
        return n
    }
   return n + sum(n-1) 
}


const tree = {
  name: "A",
  children: [
    { name: "B", children: [] },
    { 
      name: "C", 
      children: [
        { name: "E", children: [] },
        { name: "F", children: [] }
      ]
    },
    { name: "D", children: [] }
  ]
};

function printTree(node) {
   node.children.forEach(childNode => {
     printTree(childNode)
   })
   console.log(node.name)
}

function printTreeBFS(node) {
   let queue = [node]
   while(queue.length > 0) {
    const node = queue.shift()
    console.log(node.name)
    queue = queue.concat(node.children)
   }
}

// printTreeBFS(tree);

// console.log(sum(5))

const graph0 = {
  A: ["B", "C"],
  B: ["A", "D"],
  C: ["A", "D"],
  D: ["B", "C"]
};
const graph = {
  A: ['B'],
  B: ['C'],
  C: ['A'] // cycle!
}

//    A ── B
//    │   / │
//    │  /  │
//    │ /   │
//    C ─── D


function dfs(node, graph, visited = new Set()) {
  console.log(node)
  visited.add(node)
  for(let item of graph[node] || []) {
    if(!visited.has(item)) {
        dfs(item, graph, visited)
    }
  }
}

dfs("A", graph);
