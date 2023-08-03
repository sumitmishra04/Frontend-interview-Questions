// We need then because then knows what to do when the promise is marked fulfilled.
// Two callbacks are passed to then as arguments. These callbacks have the implementations of what to do
// when a promise is rejected or resolved.
// Then simply calls them based on a flag that resembles the promise state
// if the promise is still executing, then the success/fail callbacks are pushed to an array so that when resolve/reject is called,
// they use these success/fail cb array to execute fulfilled states.

// We need resolve/reject to mark the state of promise as done and also execute all the callbacks that are waiting to be executed.

class MyPromise {
  constructor() {
    this.isDone = false
    this.result = null
    this.callbacks = []
  }

  then(onFulfilled, onRejected) {
    if (this.isDone) {
      console.log("then if")
      if (this.result instanceof Error) {
        onRejected(this.result)
      } else {
        onFulfilled(this.result)
      }
    } else {
      console.log("then else")
      this.callbacks.push({ onFulfilled, onRejected })
    }
  }

  // this result is an outcome of some async actions for eg
  // this result is first saved in the state using resolve method
  // then when 'then' is called, it refers the same state variable of result to pass to the onFull or onRej cb
  resolve(result) {
    if (!this.isDone) {
      this.isDone = true
      this.result = result
      console.log("resolve", this.callbacks)
      this.callbacks.forEach(({ onFulfilled }) => onFulfilled(result))
      // for async time taking promises, these callbacks are hydrated in the then method, and is used here to call the onFulfilled cb
    }
  }

  reject(result) {
    if (!this.isDone) {
      this.isDone = true
      this.result = result
      this.callbacks.forEach(({ onRejected }) => onRejected(result))
    }
  }
}

const promise = new MyPromise()

promise.resolve(100)
promise.reject(200)
promise.then(console.log).then(console.log)
