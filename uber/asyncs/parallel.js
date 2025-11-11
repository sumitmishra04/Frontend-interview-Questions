function executeInParallelWithoutAll(promises) {
    return new Promise((res, rej) => {
        const result = []
        let completed = 0
        promises.forEach((task, i) => {
            task().then(val => {
                console.log('val', val)
                result.push(val)
                completed++
                if(completed === promises.length) {
                    res(result)
                }
            }).catch(rej)
        });
    })

}

const task = (id, delay) => () => 
    new Promise(res => setTimeout(() => res(`Task ${id} done after ${delay} sec`), delay*1000));

executeInParallelWithoutAll([
    task(1, 1), 
    task(2, 5), 
    task(3, 2)
]).then(console.log);