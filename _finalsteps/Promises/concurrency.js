function parallelLimit(tasks, limit) {
  return new Promise((resolve, reject) => {
    if (tasks.length === 0) {
      resolve([])
      return
    }

    const results = []
    let currentIndex = 0
    let runningTasks = 0

    function runNextTask() {
      if (currentIndex === tasks.length) {
        // All tasks have been processed, resolve with the results
        resolve(results)
        return
      }

      const taskIndex = currentIndex
      currentIndex++
      runningTasks++

      console.log("--", runningTasks)

      const currentTask = tasks[taskIndex]
      currentTask()
        .then((result) => {
          results[taskIndex] = result
        })
        .finally(() => {
          runningTasks--
          runNextTask()
        })
    }

    // Start initial tasks (up to the limit)
    for (let i = 0; i < limit && i < tasks.length; i++) {
      console.log("i", i)
      runNextTask()
    }
  })
}

// Example usage:
function asyncTask(id) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(`Task ${id} completed`)
    }, Math.floor(Math.random() * 2000))
  })
}

const tasks = []
for (let i = 1; i <= 10; i++) {
  tasks.push(() => asyncTask(i))
}

const parallelLimitValue = 3
parallelLimit(tasks, parallelLimitValue)
  .then((results) => {
    console.log("Results:", results)
  })
  .catch((error) => {
    console.error("Error:", error)
  })
