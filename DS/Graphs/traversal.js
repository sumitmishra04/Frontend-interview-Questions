// cycle detection
// DFS -> visit neighbour before vsiting sibling
// BFS -> visit all of the neighbour of the same height/distance from the root before moving to the next level
function Graph() {
  this.adjacencyList = {}

  this.addVertex = function (vertexName) {
    if (!this.adjacencyList[vertexName]) {
      this.adjacencyList[vertexName] = []
    }
  }

  this.addEdge = function (v1, v2) {
    if (this.adjacencyList[v1] && this.adjacencyList[v2]) {
      this.adjacencyList[v1] = [...this.adjacencyList[v1], v2]
      this.adjacencyList[v2] = [...this.adjacencyList[v2], v1]
    }
  }

  this.removeEdge = function (v1, v2) {
    this.adjacencyList[v1] = this.adjacencyList[v1].filter((v) => v !== v2)
    this.adjacencyList[v2] = this.adjacencyList[v2].filter((v) => v !== v1)
  }

  this.removeVertex = function (vertextName) {
    while (this.adjacencyList[vertextName].length) {
      const removedVertex = this.adjacencyList[vertextName].pop()
      this.removeEdge(vertextName, removedVertex)
    }

    delete this.adjacencyList[vertextName]
  }

  this.dfs = function (vertex) {
    const result = []
    const visited = {}
    const self = this

    const dfsHelper = function (vertex) {
      if (!vertex) {
        return
      }
      visited[vertex] = true
      result.push(vertex)

      self.adjacencyList[vertex].forEach((neighbour) => {
        if (!visited[neighbour]) {
          dfsHelper(neighbour)
        }
      })
    }

    dfsHelper(vertex)
    return result
  }

  this.bfs = function (vertex) {
    const queue = [vertex]
    const visited = { [vertex]: true }
    const result = []

    while (queue.length) {
      const value = queue.shift()
      result.push(value)
      this.adjacencyList[value].forEach((neighbour) => {
        if (!visited[neighbour]) {
          visited[neighbour] = true
          queue.push(neighbour)
        }
      })
    }
    return result
  }
}

let g = new Graph()
g.addVertex("a")
g.addVertex("b")
g.addVertex("c")
g.addVertex("d")
g.addVertex("e")
g.addVertex("f")

g.addEdge("a", "b")
g.addEdge("a", "c")
g.addEdge("b", "d")
g.addEdge("c", "e")
g.addEdge("d", "e")
g.addEdge("d", "f")
g.addEdge("e", "f")

// console.log(g.dfs("a"))
console.log(g.bfs("a"))
