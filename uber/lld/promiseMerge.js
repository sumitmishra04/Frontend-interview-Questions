async function promiseMerge(...args) {
    return new Promise((resolve, reject) => {
        Promise.all(args).then(val => {
            let result = 0
            val.forEach(v => {
                result += v
            })
            resolve(result)
        })
    })
}

promiseMerge(Promise.resolve(1), Promise.resolve(2), Promise.resolve(3)).then(console.log).catch(console.log)

