const x = {}
x['foo'] = 'bar'
x.bar = {
    'first': 100,
    'second': 200
}
console.log(x.bar['first'] + x['bar'].second)






const prom = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve('prom')
    }, 1000)
      setTimeout(() => {
        reject(new Error('!prom'))
    }, 1000)})

prom.then(function(arg){
    console.log(arg)
    return new Promise((resolve, reject) => {
        reject(new Error('!arg'))
    }).catch((err)=> {
        console.log(err.message)
    })
}).catch((err)=> {
     console.log(err.message)
    })







 function foo(x) {
    let returnValue = ""
    try{
        if(a === 'bar') {
            throw new Error('qux')
        }
        returnValue = 'try'
    }catch(err) {
        returnValue = 'catch'
    }finally {
        returnValue = 'finally'
    }
    return returnValue
}

console.log(foo('bar'))

