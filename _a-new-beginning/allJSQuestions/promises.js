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

// Theory:

// add executor handlers to promise whose job is to take computed value from the client and save it in promise state and change the state to fulfilled and execute all then cbs providing them with the value.

// then cbs can be of several types which we need to handle.
// 1. empty then
// 2. then returns simple values
// 3. then returns another promise
// 4. there is an error in then



// promsie takes executer fn to start with and executes it right away
// *when executor fn is called by Promise, the resolve or reject converts pending status to fulfilled
// and runs all the callbacks added in then method.
// .then(fn) => Pending => fulfilled
// [fn] => iterate over this array and invoke every callback
// then wraps the fn in a promise so that chaining can be achieved.
// .then(() => new Promise((res) => res(fn())))

// *multiple instance recieves the same value.
// [fn1, fn2] => 
  // promise.then(fn1) promise.then(fn2)
// both fn will get the same resolve value which then can pass in thier own chain

// *initially all promise wait to get fulfiled to get the resolved value. once resolved then its marked
// fulfilled and any promise invoking it after being fulfilled will also receive the fulfilled value.
// p.then(fn1) setTimeout(() => {p.then(fn2) }, 3000) here fn2 will also recive the same fulfilled value as fn1 even if the p was alrrady maked fulfilled.
// take away, if fulfilled invoke pending then cb rightaway with the last resolved value.

// *second resolve has no impact and the state will point to the first resolved value. resolve(10) resolve(20) // output 10

// *resolve !== return. so any console log or synchronous code will still execute after or before resolve.

// *both catch and then cb could return a resolve or happy value or rejected or error value. based on what is the outcome, the next then or catch invocation will be decided.
// catch can output a happy promise and then will be invoked 
// then can throw error and catch will be invoked.
// so doesnt matter who is invoking, what matters is what is the nature of the output. if it is happy then then or else catch.
// this is true for executer fn as well. they can explicitly invoke resolve or reject or happy value or throw new error.

// *Direct handlers on the same promise fire before handlers on downstream derived promises.
// const p = Promise.reject('error');
// p.then().then().catch(() => console.log('chain catch'));
// p.catch(() => console.log('direct catch'));
// direct catch => chain catch


// ----------------------------------------------------------------------------------------
// ----------------------------------------------------------------------------------------
// ----------------------------------------------------------------------------------------
// Promise Polyfills
// so what are we seeing here?
// executer fn is immediately invoked. it passes its inner cb to the client method ie executer fn. 
// once the api call is completed in the executer method then cb consumes the value and brings it back to promise class and save it in its state 
// so that it can be passed to other consumers like future then or catch.
// so what promise actually does is it stores the value of the api call for eg in its class and the way it gets it is through cbs liek resolve or reject.
// so resolve and reject is nothing but an agent or slave that waits for the value to be computed by the client and then takes them to thier master ie promise.
// then master decides who to give that computed data.

class CustomPromise {
  constructor(executerFn) {
    // step 2
    executerFn(this.#_resolve.bind(this), this.#_reject.bind(this)) 
  }
  #_resolve(value){
    // step 5
    console.log(value)
  }
  #_reject(){}
}

function executer(resolve, reject) {
  // step 3
//   const response = fetch(users data api)
//   value = response.length  lets say its 10
   resolve(10) // pass this value to promise class // // step 4
}
function init() {
  return new CustomPromise(executer) // step 1 
}

init()

// ----------------------------------------------------------------------------------------
// ----------------------------------------------------------------------------------------
// ----------------------------------------------------------------------------------------
// Here we see one additional use case of try catch. it is done because the executer fn itself can break and we need a way to store the
// broken values just like the happy value. in the constructor try catch if the executor throws error then that error is caught by constructor's catch and 
// it saves that error in its state just like  happy resolve value
class CustomPromise {
  constructor(executerFn) {
    // step 2
    try {
    executerFn(this.#_resolve.bind(this), this.#_reject.bind(this)) 
    } catch(e) {
       this.#_reject.bind(e)
    }
  }
  #_resolve(value){
    // step 5
    console.log(value)
  }
  #_reject(){}
}

function executer(resolve, reject) {
  // step 3
  try {
   // const response = fetch(broken api)
  } catch(e) {
    reject(e)
  } 
}
function init() {
  return new CustomPromise(executer) // step 1 
}

init()



// ----------------------------------------------------------------------------------------
// ----------------------------------------------------------------------------------------
// ---------------------------------------------------------------------------------------- 
/// here we need state and value for the promise and when agent or slave is invoked from the executor, its job is to 
// change the state and save the value in the promise and put it in the micro task queue.
// resolutionHandler or rejectionHandler of then fn is wrapped by the promise 
// resolutionHandler for eg could end up outputting happy value or throw error. depending on what it does,
// the return from then cb will be of that type
// eg: response = fetch(api); data = response.json(); now  response.json() could be bad as well. in that case we need to return a 
// rejected promise otherwise resolved promise.
// resolutionHandler could also return undefined
const STATES = {
  PENDING: 'PENDING',
  FULFILLED: 'FULFILLED',
  REJECTED: 'REJECTED'
};

class CustomPromise {
  #state = STATES.PENDING;
  #value = undefined;
  #resolutionHandlers = [];
  #rejectionHandlers = [];

  constructor(executor) {
    try {
      executor(this.#_resolve.bind(this), this.#_reject.bind(this));
    } catch (e) {
      this.#_reject(e);
    }
  }

  #_resolve(value) {
    queueMicrotask(() => {
      if (this.#state !== STATES.PENDING) return;

      this.#state = STATES.FULFILLED;
      this.#value = value;
      this.#runHandlers();
    });
  }

  #_reject(reason) {
    queueMicrotask(() => {
      if (this.#state !== STATES.PENDING) return;

      this.#state = STATES.REJECTED;
      this.#value = reason;
      this.#runHandlers();
    });
  }

  #runHandlers() {
    if (this.#state === STATES.FULFILLED) {
      this.#resolutionHandlers.forEach(h => h(this.#value));
      this.#resolutionHandlers = [];
      this.#rejectionHandlers = [];  // clear to avoid leaks
    } else if (this.#state === STATES.REJECTED) {
      this.#rejectionHandlers.forEach(h => h(this.#value));
      this.#resolutionHandlers = []; // clear to avoid leaks
      this.#rejectionHandlers = [];
    }
  }

  then(onFulfilled, onRejected) {
    return new CustomPromise((resolve, reject) => {
      const fulfilledHandler = (value) => {
        // case 1:
        if (!onFulfilled) return resolve(value);

        try {
          const result = onFulfilled(value);
          result instanceof CustomPromise ? result.then(resolve, reject) /** case 3 */ : resolve(result) // case 2;
        } catch (e) {
          reject(e); // case 4
        }
      };

      const rejectedHandler = (reason) => {
        if (!onRejected) return reject(reason);

        try {
          const result = onRejected(reason);
          result instanceof CustomPromise ? result.then(resolve, reject) : resolve(result);
        } catch (e) {
          reject(e);
        }
      };

//       "I'm not done yet. Save your success/failure handlers in a queue.
// When I finally resolve or reject, I’ll run them."
// Normal use case. handler stored → runs after resolve → after microtask.
// If the promise is pending, handlers are stored.

      if (this.#state === STATES.PENDING) {
        this.#resolutionHandlers.push(fulfilledHandler);
        this.#rejectionHandlers.push(rejectedHandler);
      } else {
        // “I’ve already completed. But I cannot run your handler immediately — according to the Promise spec, .then() MUST run handler in a future microtask. So I schedule it.”
        // const p = CustomPromise.resolve(10);
        // p.then(v => console.log("B", v));
        // console.log("C");
        // If the promise is already settled, handlers are executed asynchronously via microtask.

        queueMicrotask(() => {
          if (this.#state === STATES.FULFILLED) fulfilledHandler(this.#value);
          else rejectedHandler(this.#value);
        });
      }
    });
  }

  catch(onRejected) {
    return this.then(null, onRejected);
  }
}


/**
 
               ┌───────────────────────────────┐
PROMISE →      │          ON FULFILLED         │
               └───────────────────────────────┘
               │
               ├── (1) no handler → pass-through resolve
               ├── (2) handler returns value → resolve
               ├── (3) handler returns promise → adopt its state
               └── (4) handler throws → reject


               ┌───────────────────────────────┐
PROMISE →      │          ON REJECTED          │
               └───────────────────────────────┘
               │
               ├── (5) no handler → pass-through reject
               ├── (6) handler returns value → resolve
               ├── (7) handler returns promise → adopt its state
               └── (8) handler throws → reject

               polyfill handles exactly these 8 paths.
✅ PATH 1 — Original resolved, no onFulfilled provided
Promise.resolve(10)
  .then()          // empty
  .then(v => console.log(v)); // 10
  since the first .then() has no handler, the result is simply passed forward
  
  code: if(!onFulfilled) return resolve(value)

✅ PATH 2 — Original resolved, handler returns a normal value
Promise.resolve(10)
  .then(v => v + 5)
  .then(console.log);

Code:
const result = onFulfilled(value); => calls (v) => {return v + 5} with v as 10
resolve(result); // 15

✅ **PATH 3 — Original resolved, handler returns a promise
Promise.resolve(10)
  .then(v => new CustomPromise(res => {
     setTimeout(() => res(v + 1), 500);
  }))
  .then(console.log);

Code:
if(result instanceof CustomPromise) {
  result.then(resolve, reject);
}


❌ PATH 4 — Original resolved, handler throws error
Promise.resolve(10)
  .then(v => { throw "boom" })
  .catch(console.log)

code:
try {
   const data = resolutionHandler(value);
} catch(e) {
   return reject(e)
}


 */