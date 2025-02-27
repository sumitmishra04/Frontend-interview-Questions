const STATE = {
    PENDING: 'pending',
    REJECTED: 'rejected',
    FULFILLED: 'fulfilled',
}
// REASON1
// then will push cbs in cb array ==> resolve will loop over it when fulfilled and store the value computed by api ==> send the value to each of then cb 
// If then is called before the promise is resolved/rejected, the callbacks are simply stored in #thenCbs or #catchCbs and later executed when resolve or reject is called.
// However, if then is called after the promise has already been resolved/rejected, the callbacks should be executed immediately.
// Calling this.#runCallbacks() ensures that the stored value (this.#value) is passed to any .then() callback, even if .then() was attached after the promise had settled.

// eg: 
// const promise = new MyPromise((res, rej) => {
//     setTimeout(() => res(42), 1000);
// });

// setTimeout(() => {
//     promise.then((val) => console.log('Delayed then:', val));
// }, 2000);


// REASON2
// We call this.#runCallbacks() inside #onResolve (and #onReject) to immediately execute all stored .then() or .catch() callbacks once the promise transitions from PENDING to FULFILLED or REJECTED.

// Why is this.#runCallbacks() called inside #onResolve?
// Ensures queued .then() callbacks run immediately upon resolution

// Callbacks are stored in #thenCbs when .then() is called.
// When the promise is resolved, #onResolve updates this.#value, marks the state as FULFILLED, and then triggers #runCallbacks() to execute all stored .then() callbacks.


// step 1: create constructors
// step 2: create exposing methods like then, catch and finally 
// step 3: create resolve and reject methods which will invoke all then cbs or catch cbs when resolved/rejected
// step 4: change state from pending to fulfilled or rejected when resolve or rejected is invoked



class MyPromise {
    #value = ''
    #thenCbs = []
    #catchCbs = []
    #state = STATE.PENDING

    constructor(cb) {
        try {
            cb(this.#onResolve.bind(this), this.#onReject.bind(this))
        } catch(err) {
            this.#onReject(err)
        }
    }

    #runCallbacks () {
        if(this.#state === STATE.FULFILLED) {
            this.#thenCbs.forEach(cb => {
                cb(this.#value)
            })
            this.#thenCbs = []
        }

        if(this.#state === STATE.REJECTED) {
            this.#catchCbs.forEach(cb => {
                cb(this.#value)
            })
            this.#catchCbs = []
        }
    }

  /// it is called when resolve is invoked. We save the value passed from resolve in the state variable so that it can be passed when then is invoked
    #onResolve (val) {
        queueMicrotask(() => {
            if(this.#state === STATE.PENDING) {
                if(val instanceof MyPromise) {
                    val.then(this.#onResolve.bind(this), this.#onReject.bind(this))
                    return
                }

                this.#value = val
                this.#state = STATE.FULFILLED
                this.#runCallbacks() // REASON2
            }
        })
    }

  /// it is called when reject is invoked.
    #onReject (val) {
        queueMicrotask(() => {
            if(this.#state === STATE.PENDING) {
                // val can be both simple value or a promise hence wait for it to get resolved
                if(val instanceof MyPromise) {
                    val.then(this.#onResolve.bind(this), this.#onReject.bind(this))
                    return
                }
                
                this.#value = val
                this.#state = STATE.REJECTED
                this.#runCallbacks()
            }
        })
    }

    then (thenCb, catchCb) {
        return new MyPromise((resolve, reject) => {
            // pushing coz promise.then can be called multiple times hence save all the cbs to be invoked when onResolve is resolved. Its not same as chaining thens.
            // If thenCb is null or undefined, the callback should not modify the result.
            // Instead, it simply forwards the previous result to the next .then().
            // promise.then().then(val => console.log(val));
            this.#thenCbs.push(result => {
                if(typeof thenCb !== "function") { // means catch invoked it. simply ignore and pass the value to the next then
                    resolve(result)
                    return
                }
                // then() callback might throw an error:
                // promise.then(() => {
                //     throw new Error("Something went wrong!");
                // });
                // If thenCb(result) throws an error, the promise should reject instead of silently failing.
                try {
                    resolve(thenCb(result))
                }catch(e) {
                    reject(e)
                }
            })
            

            this.#catchCbs.push(result => {
                if(typeof catchCb !== "function") { // means then invoked it. simply ignore and pass the value to the next catch
                    reject(result)
                    return
                }
                try {
                    resolve(catchCb(result))
                }catch(e) {
                    reject(e)
                }
            })
            
            this.#runCallbacks()   // why called here? REFER TOP COMMENT: REASON1
        })
        
        
    }

    catch (catchCb){
        return this.then(null, catchCb)
    }

    finally (cb){
        // finally do not return any value hence call with empty cb and then pass on the result to the chain next
        return this.then(result => {
            cb()
            return result
        }, result => {
            cb()
            throw result
        })
    }

    // const alreadyDone = MyPromise.resolve("Done");
    // alreadyDone.then(console.log); // Output: Done
    static resolve(value) {
        return new MyPromise((res, rej) => {
            res(value)
        })
    }

    static reject(value) {
        return new MyPromise((res, rej) => {
            rej(value)
        })
    }

    static all (promises) {
        return new MyPromise((res, rej) => {
            const result = []
            let completed = 0
            promises.forEach((prom, index) => {
                MyPromise.resolve(prom)
                .then((val) => {
                    completed++
                    result[index] = val
                    if(completed === promises.length) {
                        return res(result)
                    }
                })
                .catch(e => {
                    rej(e)
                })
            }) 
        })
    }

    static allSettled (promises) {
        return new MyPromise((res, rej) => {
            const result = []
            let completed = 0
            promises.forEach((prom, index) => {
                MyPromise.resolve(prom)
                .then((val) => {
                    result[index] = {status: STATE.FULFILLED, value: val}
                })
                .catch(e => {
                    result[index] = {status: STATE.REJECTED, reason: e}
                }).finally(() => {
                    completed++
                    if(completed === promises.length) {
                        return res(result)
                    }
                })
            }) 
        })
    }
    
    static race (promises) {
        return new MyPromise((res, rej) => {
            promises.forEach((prom, index) => {
                MyPromise.resolve(prom)
                .then(res)
                .catch(rej)
            }) 
        })
    }

    static any (promises) {
        const errors = []
        let rejected = 0
        return new MyPromise((res, rej) => {
            promises.forEach((prom, index) => {
                MyPromise.resolve(prom)
                .then(res)
                .catch(e => {
                    errors[index] = e
                    rejected++
                    if(rejected === promises.length) {
                        rej(errors)
                    }
                })
            }) 
        })
    }
}
// const promise = new MyPromise((res, rej) => {
//     rej(4)
// })

// promise.then(val => console.log(val*2)).catch((val)=>console.log(val))

// const p1 = MyPromise.resolve(10);
// const p2 = new MyPromise(res => setTimeout(() => res(20), 1000));
// const p3 = MyPromise.resolve(30);

// MyPromise.all([p1, p2, p3]).then(console.log); 

const p1 = MyPromise.reject(10);
const p2 = new MyPromise(res => setTimeout(() => res(20), 1000));
const p3 = MyPromise.resolve(30);

MyPromise.all([p1, p2, p3]).then(console.log).catch(console.log);