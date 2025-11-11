// Promise.all

MyPromise.all = function (promises) {
  return new MyPromise((resolve, rej) => {
    const result = []
    let count = 0
    promises.forEach((prom, i) => {
      prom
        .then((res) => {
          result[i] = res
          count++
          if (count === result.length) {
            resolve(result)
          }
        })
        .catch(rej)
    })
  })
}
