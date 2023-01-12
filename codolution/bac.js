const myBind = function(context, ...args) {
    if(typeof context !== 'object') {
        throw new Error('Pass context')
    }
    context.fn = this
    return function(...newArgs) {
        context.fn([...args, ...newArgs])
    }
}

const person = {
    name: 'sumit',
    city: 'kolkata'
}

function details(num, hb) {
    console.log(this.name, this.city, num, hb)
}

const newObjFn = details.bind(person, 134)
newObjFn('crick')