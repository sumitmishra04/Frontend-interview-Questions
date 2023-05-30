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
}

let g = new Graph()
g.addVertex("Dallas")
g.addVertex("Tokyo")
g.addVertex("Aspen")
g.addVertex("Los Angeles")
g.addVertex("Hong Kong")
g.addEdge("Dallas", "Tokyo")
g.addEdge("Dallas", "Aspen")
g.addEdge("Hong Kong", "Tokyo")
g.addEdge("Hong Kong", "Dallas")
g.addEdge("Los Angeles", "Hong Kong")
g.addEdge("Los Angeles", "Aspen")
console.log(g.adjacencyList)
g.removeVertex("Los Angeles")
console.log(g.adjacencyList)
