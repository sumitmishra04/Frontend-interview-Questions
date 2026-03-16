//https://www.youtube.com/watch?v=S_A6dTyabYw&list=PLQOMi2yb4hF0xc__bNw-S9WIwK9fWdvgM

const STATES = {
  PENDING: 'PENDING',
  FULFILLED: 'FULFILLED',
  REJECTED: 'REJECTED'
}
class CustomPromise {
  #value = void 0
   #state = STATES.PENDING
   #resolveHandlers = []
   #rejectHandlers = []
   constructor(executorFn) {
    this.resolve = this.#_resolve.bind(this)
    this.reject = this.#_reject.bind(this)
    try {
    executorFn(this.resolve,this.reject)
    } catch(err) {
      this.reject(err)
    }
   }

   #_reject(value) {
    queueMicrotask(() => {
    if(this.#state !== STATES.PENDING) {
      return
    }
    this.#value = value
    this.#state = STATES.REJECTED
    this.#runRejectHandlers()
    })
   }

   #_resolve(value) {
    queueMicrotask(() => {
    if(this.#state !== STATES.PENDING) {
      return
    }
    this.#value = value
    this.#state = STATES.FULFILLED
    this.#runResolveHandlers()
    })
   }

   #runResolveHandlers() {
    if(this.#resolveHandlers.length) {
      this.#resolveHandlers.forEach(handler => handler(this.#value))
      this.#resolveHandlers = []
    }
   }

   #runRejectHandlers() {
    if(this.#rejectHandlers.length) {
      this.#rejectHandlers.forEach(handler => handler(this.#value))
      this.#rejectHandlers = []
    }
   }

   then(resolveHandler,rejectHandler) {
    // then returns a new promise
    // if function not present resolve directly
    // put try catch to handle resolve and reject
    // if function is passed calc the value
    // if passed function is promise -> do then 
    // if error reject in catch block
     return new CustomPromise((resolve,reject) => {
      const thenHandler = (result) => {
        if(!resolveHandler) {
          return resolve(result)
        }
        try {
         const val = resolveHandler(result)
         if(val instanceof CustomPromise) {
          val.then(resolve,reject)
         } else {
          return resolve(val)
         }
        } catch(err) {
          return reject(err)
        }
      }
      this.#resolveHandlers.push(thenHandler)
      const catchHandler = (result) => {
        if(!rejectHandler) {
          return reject(result)
        }
        try {
         const val = rejectHandler(result)
         if(val instanceof CustomPromise) {
          val.then(resolve,reject)
         } else {
          return resolve(val)
         }
        } catch(err) {
          return reject(err)
        }
      }
      this.#rejectHandlers.push(catchHandler)
      if(this.#state === STATES.FULFILLED) {
        this.#runResolveHandlers()
      } else if(this.#state === STATES.REJECTED) {
        this.#runRejectHandlers()
      }
    })
   }

   catch(rejectHandler) {
     return this.then(null,rejectHandler)
   }
}


// for original promise
// function init(shouldReject = false) {
//   return new CustomPromise((resolve, reject) => {
//     setTimeout(() => {
//       if (shouldReject) reject('failed')
//       else resolve(10)
//     }, 0)
//   })
// }

// init().then(val => console.log('resolve:', val + 1))


function PromiseAll(promises) {
   return new Promise((resolve,reject) => {
    const result = []
    let completed = 0
    if(promises.length === 0) {
      resolve([])
      return
    }
    promises.forEach((promise,index) =>{
      Promise.resolve(promise).then(value => {
        result[index] = value
        completed++
        if(completed === promises.length) {
          resolve(result)
        }
      }).catch(reject)
    })
   })
}

// const p1 = Promise.resolve(1);
// const p2 = new Promise((res) => setTimeout(() => res(2), 1000));
// const p3 = Promise.resolve(3);

// PromiseAll([p1, p2, p3]).then(console.log);

function PromiseRace(promises) {
  return new Promise((resolve,reject) => {
    promises.forEach((promise,index) => {
      Promise.resolve(promise)
        .then(resolve)
        .catch(reject);
    })
  })
}

// const p1 = new Promise(res => setTimeout(() => res("A"), 1000));
// const p2 = new Promise(res => setTimeout(() => res("B"), 500));

// promiseRace([p1, p2]).then(console.log);

// MapAsyncLimit

function mapLimit(inputs,limit,itereteeFn) {
  return new Promise((resolve,reject) => {
  if(inputs.length === 0) {
    return resolve([])
  }
   const results = []
   let inProgress = 0
   let currIdx = 0
   let completed = 0
   let hasError = false
   function launchNext() {
   if(completed === inputs.length) {
    return resolve(results)
   }
   while(inProgress < limit && currIdx < inputs.length) {
    let idx = currIdx++
    inProgress++
    Promise.resolve(itereteeFn(inputs[idx]))
    .then((result) => {
       results[idx] = result
       inProgress--
       completed++
       launchNext()
    }).catch((err) => {
       hasError = true
       reject(err)
    })
   }
   }
   launchNext()
  })
}

function getUserById(id) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve("User" + id);
    }, Math.random() * 1000);
  });
}

mapLimit([1,2,3,4,5], 2, getUserById)
  .then((res) => console.log(res))
  .catch(console.error);