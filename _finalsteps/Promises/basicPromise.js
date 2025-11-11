const STATE = {
  FULFILLED: "fullfiled",
  REJECTED: "rejected",
  PENDING: "pending",
};

class MyPromise {
  #thenCbs = [];
  #catchCbs = [];
  #state = STATE.PENDING;
  #value;

  constructor(cb) {
    try {
      cb(this.#resolve.bind(this), this.#reject.bind(this));
    } catch (e) {
      this.#reject(e);
    }
  }

  #runCallbacks(cbs) {
    if (this.#state === STATE.FULFILLED) {
      this.#thenCbs.forEach((cb) => cb(this.#value));
      this.#thenCbs = [];
    }
    if (this.#state === STATE.REJECTED) {
      this.#catchCbs.forEach((cb) => cb(this.#value));
      this.#catchCbs = [];
    }
  }

  #resolve(value) {
    if (this.#state === STATE.PENDING) {
      this.#state = STATE.FULFILLED;
      this.#value = value;
      this.#runCallbacks();
    }
  }

  #reject(value) {
    if (this.#state === STATE.PENDING) {
      this.#state = STATE.REJECTED;
      this.#value = value;
      this.#runCallbacks();
    }
  }

  then(thenCb, catchCb) {
    if (thenCb) this.#thenCbs.push(thenCb);
    if (catchCb) this.#catchCbs.push(catchCb);
    this.#runCallbacks();
    return this;
  }

  catch(cb) {
    this.then(undefined, cb);
    return this;
  }

  finally(cb) {
    cb();
    return this;
  }
}

const prom = new MyPromise((res, rej) => {
  rej(11);
});

prom.then(console.log).catch(console.log);
