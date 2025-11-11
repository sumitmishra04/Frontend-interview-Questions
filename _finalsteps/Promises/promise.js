// https://www.youtube.com/watch?v=1l4wHWQCCIc
// promise executes > gets value as result > takes that value to onSuccess > stores this value in the state >
// which finally is delegated to the then
// while it executes and calls onSuccess, it stores some of the information about the state of the promise.

// PRINIPLES
/**
 * 1. promise should only expose then catch and finally
 * 2. multiple thens and catches should be handled
 * 3. these should only execute once
 * 4. if a promise is already resolved, then run all then or catch cbs at once.
 * 5. then can receive both then and catch
 * 6. promises can be chained in any order of then and catch.
 * 7. thens after catch should be called if chained
 * 8. a promise could return a promise or just a value
 */
/** STEP 1 */
class MyPromise {
  constructor(cb) {}
}

new MyPromise(cb);

// cb receives 2 params which the mypromise provides and we have the access to it in the mypromise obj

/** STEP 2 */
// param1 is onSuccess and param2 is onReject
class MyPromise {
  constructor(cb) {
    cb(this.param1, this.param2);
  }
}

new MyPromise(cb);

/** STEP 3 */
// cb is resposible for promise trigger and if it fails somehow we need to handle it through our fail cb
class MyPromise {
  constructor(cb) {
    try {
      cb(this.param1, this.param2);
    } catch (e) {
      this.param2(e);
    }
  }
}

new MyPromise(cb);

/** STEP 4 */
// both callbacks receives a value
class MyPromise {
  constructor(cb) {
    try {
      cb(this.param1, this.param2);
    } catch (e) {
      this.param2(e);
    }
  }

  param1(value) {}

  param2(value) {}
}

new MyPromise(cb);
// NOTE: value is the result of the execution of the promise. Once the value is executed, it is passed to
// the onSuccess and then onSuccess takes that value and pass it to the then so that user can handle the
// result of the promise exeution.

/** STEP 5 */
// by adding # symbol, we make these callbacks private as promise should only expose then, catch and finally
class MyPromise {
  constructor(cb) {
    try {
      cb(this.#onSuccess, this.#onReject);
    } catch (e) {
      this.param2(e);
    }
  }

  #onSuccess(value) {}

  #onReject(value) {}
}

new MyPromise(cb);

/** STEP 6 */
// then: receives a callback and this cb will be executed onSuccess one by one
class MyPromise {
  constructor(cb) {
    try {
      cb(this.#onSuccess, this.#onReject);
    } catch (e) {
      this.param2(e);
    }
  }

  #onSuccess(value) {}

  #onReject(value) {}

  then(cb) {
    this.#thenCbs.push(cb);
  }
}

new MyPromise(cb);
// NOTE: so then will help store cb that knows what to do when promise is resolved.
// And hence when there is success, success can access these stored cb and will execute one by one.

/** STEP 7 */
// prmoises also keep track of states like pending, fulfilled or rejected.
// to start with any promise will be in the pending state and then either fulfilled/rejected on settle
const STATE = {
  FULFILLED: "fullfiled",
  REJECTED: "rejected",
  PENDING: "pending",
};

class MyPromise {
  #thenCb = [];
  #state = STATE.PENDING;
  #value;

  constructor(cb) {
    try {
      cb(this.#onSuccess, this.#onReject);
    } catch (e) {
      this.param2(e);
    }
  }

  #onSuccess(value) {
    this.#value = value;
    this.#state = STATE.FULFILLED;
  }

  #onReject(value) {
    this.#value = value;
    this.#state = STATE.REJECTED;
  }

  then(cb) {
    this.#thenCbs.push(cb);
  }
}

new MyPromise(cb);

/** STEP 8 */
// this this.#state === STATE.PENDING ensures a basic promise nature that not more than one resolve or reject
// combined can be called since once onSuccess is called then immediately we set it state to fulfilled
// hence next time, if called again, the if condition wont work, thus ensuring single call to resolve and reject combined.

class MyPromise {
  #thenCb = [];
  #state = STATE.PENDING;
  #value;

  constructor(cb) {
    try {
      cb(this.#onSuccess, this.#onReject);
    } catch (e) {
      this.param2(e);
    }
  }

  #onSuccess(value) {
    if (this.#state === STATE.PENDING) {
      this.#value = value;
      this.#state = STATE.FULFILLED;
    }
  }

  #onReject(value) {
    if (this.#state === STATE.PENDING) {
      this.#value = value;
      this.#state = STATE.REJECTED;
    }
  }

  then(cb) {
    this.#thenCbs.push(cb);
  }
}

new MyPromise(cb);

/** STEP 9 */
// runCallbacks will execute all the thens cbs on success and all catch cbs on failure.
class MyPromise {
  #thenCb = [];
  #catchCb = [];
  #state = STATE.PENDING;
  #value;

  constructor(cb) {
    try {
      cb(this.#onSuccess, this.#onReject);
    } catch (e) {
      this.param2(e);
    }
  }

  #runCallbacks() {
    if (this.#state === STATE.FULFILLED) {
      this.#thenCb.forEach((cb) => {
        cb(this.#value);
      });
    }
    if (this.#state === STATE.REJECTED) {
      this.#catchCb.forEach((cb) => {
        cb(this.#value);
      });
    }
  }

  #onSuccess(value) {
    if (this.#state === STATE.PENDING) {
      this.#value = value;
      this.#state = STATE.FULFILLED;
      this.#runCallbacks();
    }
  }

  #onReject(value) {
    if (this.#state === STATE.PENDING) {
      this.#value = value;
      this.#state = STATE.REJECTED;
      this.#runCallbacks();
    }
  }

  then(cb) {
    this.#thenCbs.push(cb);
  }
}

new MyPromise(cb);

/** STEP 10 */
// By calling this.#runCallbacks() after registering a fulfillment or rejection handler, t
// he implementation ensures that if the promise is already settled (fulfilled or rejected),
// the corresponding handler will be executed immediately. This behavior aligns with the standard behavior
//of promises, where handlers are executed as soon as possible, whether they are attached
// before or after the promise has been settled.

// By emptying the #thenCb array inside #runCallbacks, we ensure that once the promise is resolved and
// the fulfillment handlers are executed, they won't be executed again for the same promise. This behavior
// aligns with the behavior of standard JavaScript promises, where fulfillment handlers are executed only once,
// and subsequent calls to then with the same promise won't re-execute the previously attached fulfillment
// handlers.

class MyPromise {
  #thenCb = [];
  #catchCb = [];
  #state = STATE.PENDING;
  #value;

  constructor(cb) {
    try {
      cb(this.#onSuccess, this.#onReject);
    } catch (e) {
      this.param2(e);
    }
  }

  #runCallbacks() {
    if (this.#state === STATE.FULFILLED) {
      this.#thenCb.forEach((cb) => {
        cb(this.#value);
      });

      this.#thenCb = [];
    }
    if (this.#state === STATE.REJECTED) {
      this.#catchCb.forEach((cb) => {
        cb(this.#value);
      });

      this.#catchCb = [];
    }
  }

  #onSuccess(value) {
    if (this.#state === STATE.PENDING) {
      this.#value = value;
      this.#state = STATE.FULFILLED;
      this.#runCallbacks();
    }
  }

  #onReject(value) {
    if (this.#state === STATE.PENDING) {
      this.#value = value;
      this.#state = STATE.REJECTED;
      this.#runCallbacks();
    }
  }

  then(cb) {
    this.#thenCbs.push(cb);
    this.#runCallbacks();
  }

  catch(cb) {
    this.#catchCb.push(cb);
    this.#runCallbacks();
  }
}

new MyPromise(cb);

/** STEP 10 */
// then is slightly different in a way that it can accept then and catch callbacks

class MyPromise {
  #thenCb = [];
  #catchCb = [];
  #state = STATE.PENDING;
  #value;

  constructor(cb) {
    try {
      cb(this.#onSuccess.bind(this), this.#onReject.bind(this));
    } catch (e) {
      this.#onReject(e);
    }
  }

  #runCallbacks() {
    if (this.#state === STATE.FULFILLED) {
      this.#thenCb.forEach((cb) => {
        cb(this.#value);
      });

      this.#thenCb = [];
    }
    if (this.#state === STATE.REJECTED) {
      this.#catchCb.forEach((cb) => {
        cb(this.#value);
      });

      this.#catchCb = [];
    }
  }

  #onSuccess(value) {
    if (this.#state === STATE.PENDING) {
      this.#value = value;
      this.#state = STATE.FULFILLED;
      this.#runCallbacks();
    }
  }

  #onReject(value) {
    if (this.#state === STATE.PENDING) {
      this.#value = value;
      this.#state = STATE.REJECTED;
      this.#runCallbacks();
    }
  }

  then(thenCb, catchCb) {
    if (thenCb) this.#thenCbs.push(thenCb);
    if (catchCb) this.#catchCb.push(catchCb);
    this.#runCallbacks();
  }

  catch(cb) {
    this.then(undefined, cb);
  }

  finally(cb) {
    cb();
  }
}

new MyPromise(cb);

/** STEP 11 */
// then is slightly different in a way that it can accept then and catch callbacks

class MyPromise {
  #thenCb = [];
  #catchCb = [];
  #state = STATE.PENDING;
  #value;

  constructor(cb) {
    try {
      cb(this.#onSuccess.bind(this), this.#onReject.bind(this));
    } catch (e) {
      this.param2(e);
    }
  }

  #runCallbacks() {
    if (this.#state === STATE.FULFILLED) {
      this.#thenCb.forEach((cb) => {
        cb(this.#value);
      });

      this.#thenCb = [];
    }
    if (this.#state === STATE.REJECTED) {
      this.#catchCb.forEach((cb) => {
        cb(this.#value);
      });

      this.#catchCb = [];
    }
  }

  #onSuccess(value) {
    queueMicrotask(() => {
      if (this.#state === STATE.PENDING) {
        if (value instanceof MyPromise) {
          value.then(this.#onSuccess.bind(this), this.#onReject.bind(this));
          return;
        }
        this.#value = value;
        this.#state = STATE.FULFILLED;
        this.#runCallbacks();
      }
    });
  }

  #onReject(value) {
    queueMicrotask(() => {
      if (this.#state === STATE.PENDING) {
        if (value instanceof MyPromise) {
          value.then(this.#onSuccess.bind(this), this.#onReject.bind(this));
          return;
        }

        if (this.#catchCb.length === 0) {
          throw new UncaughtPromiseError(value);
        }
        this.#value = value;
        this.#state = STATE.REJECTED;
        this.#runCallbacks();
      }
    });
  }

  then(thenCb, catchCb) {
    return new MyPromise((resolve, reject) => {
      this.#thenCbs.push((result) => {
        if (thenCb === null) {
          resolve(result);
          return;
        }
        try {
          resolve(thenCb(result)); // if a then returns a value then pass that on
        } catch (err) {
          reject(err);
        }
      });

      this.#catchCb.push((result) => {
        if (catchCb === null) {
          reject(result);
          return;
        }
        try {
          resolve(catchCb(result)); // if a catch returns a value then pass that on
        } catch (err) {
          reject(catchCb(result));
        }
      });
      if (thenCb) this.#thenCbs.push(cb);
      if (catchCb) this.#catchCb.push(catchCb);
      this.#runCallbacks();
    });
  }

  catch(cb) {
    this.then(undefined, cb);
  }

  finally(cb) {
    return this.then(
      (result) => {
        cb();
        return result;
      },
      (result) => {
        cb();
        throw result;
      }
    );
  }
}

class UncaughtPromiseError extends Error {
  constructor(error) {
    super(error);

    this.stack = `(in promise) ${error.stack}`;
  }
}
new MyPromise(cb);
