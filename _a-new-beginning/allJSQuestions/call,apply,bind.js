/*================================================================================================
Function.prototype.myCall = function(context, ...args) {
    if(typeof this !== 'function') {
        throw new TypeError('Call must be called on a function')
    }
    const finalContext = context ?? window
    const sym = new Symbol()
    finalContext[sym] = this
    // obj.show(val0, val1) here obj is finalContext, show is dynamic funtion here hence [sym]
    const result = finalContext[sym](...args)
    delete finalContext[sym]
    return result
}


function showname(age, city) {
    return this.firstname + ' ' + this.lastname + ' ' + age + ' ' + city
}

const obj  = {
    firstname: 'him',
    lastname: 'her',
    vdd73dhdg: fn
}

showname.call(obj, 23, 'cial')
================================================================================================*/



/*================================================================================================
Function.prototype.myApply = function(context, args) {
    if(typeof this !== 'function' || typeof args !== Array) {
        throw new TypeError('Call must be called on a function')
    }
    if(!Array.isArray(args)) {
      throw new TypeError('args must be of type array')
    }
    
    const finalContext = context ?? window
    const sym = new Symbol()
    finalContext[sym] = this
    const result = finalContext[sym](...args)
    delete finalContext[sym]
    return result
}

================================================================================================*/



/*================================================================================================
Function.prototype.myBind = function(context, ...args) {
    if (typeof this !== 'function') {
        throw new TypeError('Bind must be called on a function');
    }
    const originalFunc = this;
    return function(...newArgs) {
        // Handle null/undefined context
        const actualContext = context ?? window;
        return originalFunc.apply(actualContext, [...args, ...newArgs]);
    }
}
================================================================================================*/

