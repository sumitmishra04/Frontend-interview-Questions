// to be done

function get(obj, path) {
    const pathItems = Array.isArray(path) ? path.join('') : path.split('.').join('')
    let result
    let currentObj = obj;
    console.log(pathItems)


    while(pathItems.length > 0 && currentObj) {
        let key = pathItems.shift()
        console.log(currentObj[key])
        result = currentObj[key]
        currentObj = result
    }
    return result
}

const obj  = {
    a: {
        b: {
            c: [1,2,3]
        }
    }
}

const obj2  = {
    a: [1,2,3]
}


console.log(get(obj, 'a.b.c'))
// console.log(get(obj, 'a.b.c.0'))
// console.log(get(obj, ['a', 'b', 'c', '2']))
// console.log(get(obj, 'a.c'))
// console.log(get(obj2, 'a[1]'))
// console.log(get(obj, 'a.b.c[3]'))