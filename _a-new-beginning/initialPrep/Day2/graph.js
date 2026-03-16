class Graph {
        constructor() {
            this.adjacencyList = {}
        }
        addVertex(vertex) {
            if(!this.adjacencyList[vertex]) this.adjacencyList[vertex] = []
        }
        addEdge(v1, v2) {
            this.adjacencyList[v1].push(v2)
            this.adjacencyList[v2].push(v1)
        }
        removeEdge(v1, v2) {
            this.adjacencyList[v1] = this.adjacencyList[v1].filter(vertex => vertex !== v2)
            this.adjacencyList[v2] = this.adjacencyList[v2].filter(vertex => vertex !== v1)
        }
        removeVertex(v1) {
            this.adjacencyList[v1].forEach(vertex => {
                this.removeEdge(v1, vertex)
            })
            delete this.adjacencyList[v1]
        }
        dfs(v) {
            const result = []
            const seen = {}
            function helper(v){
                if(!v) return null
                result.push(v)
                seen[v] = true
                this.adjacencyList[v].forEach(neighbour => {
                    if(!seen[neighbour]) {
                        return helper(neighbour)
                    }
                })
            }
            helper(v)
            return result
        }

        bfs(v) {
            const queue = [v]
            const result = []
            let currentVertex
            const visited = {}
            visited[v] = true
            
            while(queue.length){
                 currentVertex = queue.shift();
                 result.push(currentVertex);

                 this.adjacencyList[currentVertex].forEach(neighbour => {
                    if(!visited[neighbour]) {
                        visited[neighbour] = true
                        queue.push(neighbour)
                    }
                 })
            }
            return result   
        }
}

// DFS (vertex) :
//     if vertex in empty
//         return (this is base ease)
//     add vertex to results list 
//     mark vertex as visited
//     for each neighbor in vertex's neighbours:
//         if neighbor is not visited:
//             recursively call DFS on nelghbour