function message (m) {
    console.log(m)
}

function sampler (fn, count) {
    let counter = count;
    return function(...args) {
        const context = this;
        counter--;
        if(counter === 0) {
            fn.apply(context, args)
            counter = count
        }
    }
}

const sample = sampler(message, 4)
sample('bla')
sample()
sample()
sample('Hey')
sample()
sample('bla')
sample()
sample('There')
