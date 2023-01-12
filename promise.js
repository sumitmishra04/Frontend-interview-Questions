myAll = (promises) => {
  let fulfilledPromises = [],
    result = [];
  return new Promise((resolve, reject) => {
    promises.forEach((promise, index) => {
      if (typeof promise.then !== "function") {
        result[index] = promise;
        fulfilledPromises.push(true);
        if (fulfilledPromises.length === promises.length) {
          return resolve(result);
        }
      } else {
        promise
          .then((val) => {
            result[index] = val;
            fulfilledPromises.push(true);
            if (fulfilledPromises.length === promises.length) {
              return resolve(result);
            }
          })
          .catch((val) => {
            return reject(val);
          });
      }
    });
  });
};
const promise1 = Promise.resolve(1);
const promise2 = new Promise((resolve) => {
  setTimeout(resolve, 0, "foo");
});
const promise3 = 42;

Promise.all([promise1, promise2, promise3])
.then(console.log)
.catch(console.log);

myAll([promise1, promise2, promise3]).then(console.log).catch(console.log);

// function MyPromise(executor) {
//   let thenCallback,
//     catchCallback,
//     isFulfilled = false,
//     isThenCalled = false,
//     value;

//   function resolve(val) {
//     isFulfilled = true;
//     value = val;

//     console.log("function resolve is called");
//     if (typeof thenCallback === "function") {
//       thenCallback(val);
//       isThenCalled = true;
//       console.log(
//         "if of function resolve is called: isFulfilled- ",
//         isFulfilled,
//         " isThenCalled -",
//         isThenCalled
//       );
//     }
//   }

//   //   function reject(val) {
//   //     isFulfilled = true;
//   //     value = val;
//   //     catchCallback(val);
//   //   }

//   this.then = function (cb) {
//     console.log("then is called");
//     thenCallback = cb;
//     if (isFulfilled && !isThenCalled) {
//       isThenCalled = true;
//       console.log("thenCallback", thenCallback.toString());
//       thenCallback(value);
//     }
//     return this;
//   };

//   this.catch = function (cb) {
//     catchCallback = cb;
//     return this;
//   };

//   this.finally = function () {};
//   executor(resolve);
// }

// const promise = new MyPromise(function (resolve, reject) {
//   console.log("executor initiated");
//   resolve("resolved immediately");
//   setTimeout(() => {
//     resolve("resolved after 200ms");
//   }, 200);
// });
// promise.then((res) => console.log("Final output-", res));
// //.catch((err) => console.log(err));
