function flatten  (arr, depth = 0) {
    return arr.reduce((acc, curr) => {
        if(Array.isArray(curr) && depth > 0) {
            return [...acc, ...flatten(curr, depth-1)]
        } else {
            return [...acc, curr]
        }
    }, [])
}

function countOfNumbers (arr) {
    let count = 0
    for(let i = 0; i< arr.length; i++) {
        switch(typeof arr[i]) {
            case 'number': {
                count++
                break;
            }
            case 'object': {
                if(Array.isArray(arr[i])) {
                    const elemets = flatten(arr[i], Infinity)
                    count = count + countOfNumbers(elemets)
                }
            }
        }
    }
    return count
}

console.log(countOfNumbers([1, "2", [3,4,[5]], function(){}, 8, 9]))