// function executeInSerialWithoutAll(promises) {
//     return promises.reduce((acc, curr) => {
//         return acc.then(val => {
//             return new Promise((res, rej) => {
//                const temp = []
//                 curr().then(currVal => {
//                     temp.push(currVal)
//                     if(temp.length === promises.length) {
//                         res([...val, ...temp])
//                     }
//                 }).catch(rej)
//             })
//         })
//     }, Promise.resolve([]));
// }
function executeInSerialWithoutAll(promises) {
    return promises.reduce((acc, curr) => {
        return acc.then(results => 
            curr().then(result => [...results, result]) // Collect results in an array
        );
    }, Promise.resolve([])); // Start with resolved promise containing an empty array
}

const task = (id, delay) => () => 
    new Promise(res => setTimeout(() => res(`Task ${id} done after ${delay} sec`), delay*1000));

executeInSerialWithoutAll([
    task(1, 1), 
    task(2, 5), 
    task(3, 2)
]).then(console.log);
