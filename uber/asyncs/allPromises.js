// Create a function getData that returns a Promise which resolves to the string "Hello, Promises!" after 2 seconds.
function getData() {
    return new Promise((resolve, reject) => {
        const random = Math.floor(Math.random() * 2)
        setTimeout(() => {
            // if (random % 2 === 0) {
            //     resolve("Hello, Promises!")
            // } else {
            //     reject("Something went wrong!")
            // }
            resolve("Hello, Promises!")

        }, 200);
    })
}

// getData().then(val => {
//     return new Promise((resolve) => {
//         setTimeout(() => {
//             resolve(val + " Let's learn more!")
//         }, 1000)
//     })

// }).then(console.log).catch(console.log)

function fetchAllData() {
    return Promise.all([getData(), getData(), getData()])
}

// fetchAllData().then(console.log).catch(console.log)

function fetchAllData2() {
    return Promise.allSettled([getData(), getData(), getData()])
}

// fetchAllData2().then(console.log).catch(console.log)

// Problem 7(Executing Promises in Sequence using reduce)
// Now, modify fetchAllData so that:

// It calls getData() three times in sequence(one after another).
// Use.reduce() to chain the promises so that each call waits for the previous one to finish.
// Collect all results in an array and log them at the end.

function fetchAllData3() {
    const tasks = [getData, getData, getData]
    return tasks.reduce((acc, curr) => {
        return acc.then(results => {
            return curr().then(result => [...results, result])
        })
    }, Promise.resolve([]))
}

async function easyFetchAllData3() {
    const tasks = [getData, getData, getData];
    const results = [];

    for (const task of tasks) {
        results.push(await task());  // Ensures sequential execution
    }

    return results;
}
// fetchAllData3().then(console.log).catch(console.log)

function concurrent(promises, limit) {
    const results = []
    let taskIndex = 0;
    let runningTasks = 0;

    return new Promise((resolve, reject) => {
        function runNext() {
            if (taskIndex === promises.length && runningTasks === 0) {
                resolve(results)
            }

            while (runningTasks < limit && taskIndex < promises.length) {
                const task = promises[taskIndex]
                taskIndex++
                runningTasks++

                task().then(res => {
                    results.push(res)
                }).catch(err => results.push(`Error: ${err}`))
                    .finally(() => {
                        runningTasks--;
                        runNext();
                    });
            }
        }
        runNext()

    })
}
const promises = [getData, getData, getData, getData, getData]
// concurrent(promises, 2).then(console.log).catch(console.log)

function choppedArray(list, size) {
    let i = 0;
    const result = []
    while (i < list.length) {
        result.push(list.slice(i, i + size))
        i = i + size
    }
    return result
}

function mapLimit(promises, batchSize) {
    const choppedarray = choppedArray(promises, batchSize)
    return choppedarray.reduce((acc, curr) => {
        return acc.then(accVal => {
            return Promise.all(curr.map(task => task())).then(vals => {
                return [...accVal, vals]
            })
        })
    }, Promise.resolve([]))
}
// mapLimit(promises, 2).then(console.log).catch(console.log)

function throttlePromises(tasks, delay) {
    return tasks.reduce((acc, curr) => {
        return acc.then(accVal => {
            return new Promise((resolve, reject) => {
                return curr().then(currVal => {
                    console.log('currVal', currVal)
                    setTimeout(() => {
                        resolve([...accVal, currVal])
                    }, delay);
                })
            })

        })
    }, Promise.resolve([]))
}
// throttlePromises(promises, 500).then(console.log).catch(console.log)

function choppedArray2(list, size) {
    let i = 0;
    const tempArray = [...list]
    const result = []
    while (i < list.length) {
        result.push(tempArray.slice(i, i + size))
        i = i + size
    }
    return result
}

function throttledMapLimit(promises, limit, delay) {
    const choppedArray = choppedArray2(promises, limit)
    return choppedArray.reduce((acc, tasks) => {
        return acc.then(accVal => {
            return Promise.all(tasks.map(t => t())).then(values => {
                return new Promise((resolve, reject) => {
                    setTimeout(() => {
                        resolve([...accVal, ...values])
                    }, delay);
                })
            })
        })
    }, Promise.resolve([]))
}

// throttledMapLimit(promises, 2, 1000).then(console.log).catch(console.log)

function promiseWaterfall(promises, initialValue) {
    return promises.reduce((acc, curr) => {
        return acc.then(accVal => {
            return curr(accVal).then(currVal => {
                return currVal
            })
        })
    }, Promise.resolve(initialValue))
}
function task1(val) { return Promise.resolve(val + 1); }
function task2(val) { return Promise.resolve(val * 2); }
function task3(val) { return Promise.resolve(val - 3); }

// promiseWaterfall([task1, task2, task3], 5).then(console.log); 

function promiseAny(promises) {
    const errors = []
    let count = 0
    return new Promise((resolve, reject) => {
        promises.forEach(p => {
            p.then(resolve).catch(e => {
                errors.push(e)
                count++
                if (count == promises.length) {
                    reject(new AggregateError(errors, "All promises failed"))
                }
            })
        })
    })
}


function task1() { return new Promise((_, reject) => setTimeout(() => reject("Task 1 failed"), 300)); }
function task2() { return new Promise((_, reject) => setTimeout(() => reject("Task 2 failed"), 500)); }
function task3() { return new Promise((_, reject) => setTimeout(() => reject("Task 3 failed"), 100)); }

// promiseAny([task1(), task2(), task3()])
//     .then(console.log)  // Expected: "Task 2 succeeded"
//     .catch(console.log);


function promiseFirst(promises, timeout) {
    return new Promise((resolve, reject) => {
        const timer = setTimeout(() => {
            reject("timedout")
        }, timeout);
        promises.forEach(p => {
            p.then((v) => {
                clearTimeout(timer)
                resolve(v)
            })
        })
    })
}

function task1() { return new Promise(resolve => setTimeout(() => resolve("Task 1 succeeded"), 300)); }
function task2() { return new Promise(resolve => setTimeout(() => resolve("Task 2 succeeded"), 500)); }

// promiseFirst([task1(), task2()], 200)
//     .then(console.log)  // Expected: Rejects with "Timeout reached"
//     .catch(console.log);

// promiseFirst([task1(), task2()], 400)
//     .then(console.log)  // Expected: "Task 1 succeeded"
//     .catch(console.log);


function promiseSeries(promises) {
    return promises.reduce((acc, curr) => {
        return acc.then(accVal => {
            return curr().then(currVal => {
                return [...accVal, currVal]
            }
            )
        })
    }, Promise.resolve([]))
}

function task1() { return new Promise(resolve => setTimeout(() => resolve("Task 1"), 300)); }
function task2() { return new Promise(resolve => setTimeout(() => resolve("Task 2"), 500)); }

// promiseSeries([task1, task2])
//     .then(console.log);


function promiseRetry(task, attempts, delay) {
    let count = 1
    function helper() {
        return new Promise((resolve, reject) => {
            task().then((v) => {
                resolve(v)
            }).catch(e => {
                if (count >= attempts - 1) {
                    reject(e)
                    return
                }
                count++
                setTimeout(() => {
                    helper().then(resolve).catch(reject)
                }, delay);
            })
        })
    }
    return helper()
}


let attempt = 0;
function unreliableTask() {
    return new Promise((resolve, reject) => {
        attempt++;
        if (attempt === 3) resolve("Success on attempt 3");
        else reject(`Failed on attempt ${attempt}`);
    });
}

// promiseRetry(unreliableTask, 5, 1000)
//     .then((v) => {
//         console.log("RESOLVED", v)
//         console.log(v)
//     }) // Expected: "Success on attempt 3"
//     .catch(console.log); // If all attempts fail, logs the last error


// Implement promiseTimeout(task, timeout), which rejects if the task doesn't complete in the given time.
function promiseTimeout(promise, delay) {
    return new Promise((resolve, reject) => {
        const timer = setTimeout(() => {
            reject('Too slow')
        }, delay);
        promise.then(value => {
            clearTimeout(timer)
            resolve(value)
        }).catch((e) => {
            clearTimeout(timer)
            reject(e)
        })
    })
}

function promiseTimeout2(promise, delay) {
    return Promise.race([promise, new Promise((_, reject) =>
        setTimeout(() => reject('Too slow'), delay)
    )]);
}

function slowTask() {
    return new Promise(resolve => setTimeout(() => resolve("Finished!"), 3000));
}

promiseTimeout(slowTask(), 2000)
    .then(console.log) // Should reject with "Timeout exceeded"
    .catch(console.log);