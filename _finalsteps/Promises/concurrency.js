async function parallelLimit(tasks, limit) {
  const results = [];
  let runningTasks = 0;
  let taskIndex = 0;

  return new Promise((resolve) => {
    function runNext() {
      if (taskIndex >= tasks.length && runningTasks === 0) {
        return resolve(results); // All tasks are done
      }

      while (runningTasks < limit && taskIndex < tasks.length) {
        const task = tasks[taskIndex];
        taskIndex++;
        runningTasks++;

        task().then((result) => {
          results.push(result); // Store based on completion order
          runningTasks--;
          runNext();
        });
      }
    }

    runNext(); // Start execution
  });
}


// Test cases
const tasks = [
  () => new Promise(resolve => setTimeout(() => resolve(1), 100)),
  () => new Promise(resolve => setTimeout(() => resolve(2), 200)),
  () => new Promise(resolve => setTimeout(() => resolve(3), 300)),
  () => new Promise(resolve => setTimeout(() => resolve(4), 150)),
  () => new Promise(resolve => setTimeout(() => resolve(5), 250))
];

// Run with limit of 2 concurrent tasks
parallelLimit(tasks, 2).then(results => {
  console.log(results); // Expected Output: [1, 4, 2, 5, 3]
});
