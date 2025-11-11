// https://github.com/codeface99/promises-interview-questions/blob/main/src/problems/problem4.ts
// https://www.youtube.com/watch?v=SCHK40yvIdM

/*
Concept 0.1 – What is a Promise?

A Promise is an object representing a future value.
It has exactly three states:

pending (initial)

fulfilled (resolved)

rejected

Once a promise changes state (pending → fulfilled or pending → rejected), it can never change again (immutable state).
*/


/**
 
Does each .then() run immediately when you write it?

No. .then callbacks are not executed when JavaScript reaches that line of code.
They are registered to be run later, placed into the microtask queue, and will only execute:

after the current call stack is empty

and after the promise settles (resolved or rejected)

✅ Even if the promise is already resolved synchronously, .then() callbacks will still run asynchronously via the microtask queue.

📌 What value is passed from one .then to the next?

✔ Whatever you return from the previous .then callback is automatically wrapped in a Promise and passed to the next .then.

If you return a value, it becomes the next .then input.

If you return a promise, the next .then waits for it to resolve.

If you return nothing, undefined is passed.
 */

/**
 console.log("1");

setTimeout(() => {
  console.log("2");
}, 0);

Promise.resolve()
  .then(() => {
    console.log("3");
    setTimeout(() => {
      console.log("4");
    }, 0);
  })
  .then(() => {
    console.log("5");
  });

console.log("6");

 */

/**
convert callback into promise

function fetchData(callback) {
  setTimeout(() => {
    callback("data received");
  }, 1000);
}


function fetchData() {
  return new Promise((resolve) => {
    setTimeout(() => {
     resolve("data received");
  }, 1000);
  })
}


function fetchData() {
  return new Promise((resolve, reject) => {
    const num = Math.floor(Math.random() * 2)
    if(num === 0) {
            resolve('success')
    } else {
        reject('error')
    }
  })
}

.catch not only handles errors, it also transforms rejection into fulfillment if it returns a value.
*/

/*
Basic retry::

function retry(fn, n) {
   return fn().catch(e => {
        if(n === 0) {
            return Promise.reject(e)
        }
        return retry(fn, n-1)
    })
}
*/

/*
// fn should accept a promise and reject it if not successful in time passed

function withTimeout(promise, ms) {
    let timer 
    const rejectedPromise = new Promise((_, reject) => {
        timer = setTimeout(() => {
            reject("Timeout")
            }, ms)
    })
    return Promise.race([rejectedPromise,promise ]).finally(() => {
        clearTimeout(timer)
    })
}

const slowPromise = new Promise((resolve) => {
  setTimeout(() => resolve("done"), 2000);
});

withTimeout(slowPromise, 1000)
  .then(console.log)
  .catch(console.error); // should print "Timeout"

*/

/*
You need to implement a function that repeatedly executes an asynchronous operation (like a network request or database call) until it succeeds or the maximum number of retries is reached.
Each retry should:
Wait for a specific delay before trying again.
Double the delay time after every failed attempt (exponential backoff).
Stop retrying once the retry limit is reached and reject the promise with the last encountered error.
Requirements:
The function should take three arguments:
fn: a function returning a Promise (the async operation to perform).
retries: how many times to retry after the first failure.
delay: initial wait time (in milliseconds) before the first retry.
If fn resolves successfully, return its result immediately.
If fn rejects:
Wait for delay milliseconds.
Retry the same function with retries - 1.
Double the delay each time (so wait delay, then delay * 2, then delay * 4, etc.).
If all retries fail, reject the final promise with the last error.
Example behavior:
Suppose fn fails twice before succeeding:
First call → fails immediately
Wait delay ms → second call → fails again
Wait delay * 2 ms → third call → succeeds
→ function finally resolves with success value.
If fn keeps failing beyond allowed retries, the promise rejects with the last error.

function retryWithBackoff(fn, retries, delay) {
    let timer
    return fn().then(data => {
           return data
        }).catch(e => {
                if(retries === 0) {
                   return Promise.reject(e)
                }
                return new Promise((resolve) => setTimeout(() => resolve(), delay)).then(() => {
                    return retryWithBackoff(fn, retries -1 , delay * 2)
                    })
            }) 
}
*/


/*
function retryWithBackoffAndTimeout(fn, retries, delay, timeout) {
    let timer
    const timeoutPromise = new Promise((_, reject) => {
        timer = setTimeout(() => {
            reject('Timout')}, timeout)
        })
    return Promise.race([fn(), timeoutPromise]).then(data => {
           return data
        }).catch(e => {
                if(retries === 0) {
                   return Promise.reject(e)
                }
                return new Promise((resolve) => setTimeout(() => resolve(), delay)).then(() => {
                    return retryWithBackoffAndTimeout(fn, retries -1 , delay * 2, timeout)
                    })
            }).finally(() => {
                clearTimeout(timer)
            })
}
*/

/*
Promise.any
Must return a new Promise

Loop through the input promises

Resolve immediately on first fulfillment

Track rejections

If all are rejected → reject with AggregateError

function promiseAny(promises) {
    const result = []
        return new Promise((resolve,reject) => {
            promises.forEach((promise, index) => {
                Promise.resolve(promise).then(resolve).catch(e => {
                   result[index] = e
                   if(result.length === promises.length) {
                    reject(result)
                   } 
                })
            })
        })
    }


*/


/*
🎯 Goal of Promise.allSettled

Accept array of promises (or values)

Wait until all are either fulfilled or rejected

Return an array of objects in the same order:

{ status: "fulfilled", value: result }

{ status: "rejected", reason: error }

Never short-circuits like all or any

Always resolves, never rejects.


function allSettled(promises) {
  // your code
  const result = []
  let total = promises.length
  return new Promise((resolve, reject) => {
    promises.forEach((p, index) => {
        Promise.resolve(p).then(v => {
        result[index]={ status: "fulfilled", value: v }
        total--
    }).catch(e => {
        result[index]={ status: "rejected", reason: e }
        total--
    }).finally(() => {
        if(total === 0) {
        resolve(result)
        }
        })
        })
    
  })
}


*/



/*
Requirements:

It resolves/rejects as fast as the first promise settles.
If a non-promise value is passed, treat it as an immediately resolved promise.
function promiseRace(promises) {
    return new Promise((resolve, reject) => {
        promises.forEach(p => {
            Promise.resolve(p).then(resolve).catch(reject)
            })
        })
}

*/



/*
Requirements:

Takes an array of promises/values
Resolves with an array of results only if all succeed
Rejects immediately on the first error
Results maintain order of input

function promiseAll(promises) {
  const result = []
  let total = promises.length

  return new Promise((resolve, reject) => {
    promises.forEach((p, index) => {
        Promise.resolve(p).then(v => {
            result[index] = v
            total--
            if(total === 0) {
                resolve(result)
            }
            }).catch(reject)
        
        })
    })
}


*/


/*
Implement a Promise Pool (limit concurrency)

Example: Process 100 URLs but only 3 at a time to avoid overloading server.


async function pool(promises, limit) {

    const result = []
    let index = 0
    async function worker() {
        while(index <promises.length) {
            const currentIndex = index
            const task = promises[currentIndex]
            index++
            try {
              const data = await task()
              result[currentIndex] = data
            } catch(e) {
              result[currentIndex] = e
            } 
        }
    }

    let workers = []
    for(let i =0; i<limit;i++) {
    workers.push(worker())
}

await Promise.all(workers)

return result

}



  const urls = [
    'https://jsonplaceholder.typicode.com/todos/1',
    'https://jsonplaceholder.typicode.com/todos/2',
    'https://jsonplaceholder.typicode.com/todos/3',
    'https://jsonplaceholder.typicode.com/todos/4',
    'https://jsonplaceholder.typicode.com/todos/5',
  ];

  fetchwithConcurrencyLimit(urls, 2).then((data) => {
    console.log('data fetched =>', data);
  });
*/



/*
/*
 * Problem Statement:
 * Implement a polyfill for `Promise.any()` which:
 * - Resolves with the value of the first promise that fulfills.
 * - Rejects with an `AggregateError` if all promises reject.
 * 
 * 
function promiseAny<T>(promises: Array<Promise<T>>) {
  return new Promise((resolve, reject) => {
    let rejectedCount = 0;
    const errors: Array<Error> = [];

    // Iterate over each promise in the input array
    promises.forEach((promise, index) => {
      Promise.resolve(promise)
        .then(resolve)
        .catch((error: Error) => {
          rejectedCount++;
          errors[index] = error;

          if (rejectedCount === promises.length) {
            reject(new AggregateError(errors, "All promises were rejected"));
          }
        });
    });
  });
}

const p1 = new Promise((resolve, reject) => setTimeout(reject, 100, "Error 1"));
const p2 = new Promise((resolve, reject) => setTimeout(reject, 200, "Error 2"));
const p3 = new Promise((resolve, reject) =>
  setTimeout(resolve, 150, "Success 3")
);
const p4 = new Promise((resolve, reject) =>
  setTimeout(resolve, 50, "Success 4")
);

promiseAny([p1, p2, p3, p4])
  .then((value) => console.log("Promise fulfilled with:", value))
  .catch((error) => console.error("All promises were rejected:", error));
*/


/**
 * Array.prototype.chopByLimit = function (size) {
    const tempArray = [...this]
    let i = 0;
    const result = []
    while(i<tempArray.length) {
        result.push(tempArray.slice(i, i+size))
        i=i+size
    }
    return result
}


function getNameById(id, callback) {
  // simulating async request
  const randomRequestTime = Math.floor(Math.random() * 100) + 200;

  setTimeout(() => {
    callback("User" + id);
  }, randomRequestTime);
}

function mapLimit(inputs, limit, iterateeFn, callback) {
  const choppedInput = inputs.chopByLimit(limit)
  const output= choppedInput.reduce((acc, curr)=>{
      return acc.then(totalResult => {
          return new Promise((resolve) => {
        const temp = []
          curr.forEach(p => {
              iterateeFn(p, (value) => {
                  temp.push(value)
                    if(temp.length === curr.length) {
                              resolve([...totalResult, ...temp])
                    }
              })
            })
          })
      })
  }, Promise.resolve([])) 
  
  return output.then(data=>callback(data))
}
//example: 
mapLimit([1, 2, 3, 4, 5], 2, getNameById, (allResults) => {
  console.log("output", allResults); // ["User1", "User2", "User3", "User4", "User5"]
});
 */