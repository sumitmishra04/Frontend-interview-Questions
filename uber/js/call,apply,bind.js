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

Function.prototype.myApply = function(context, args) {
    if (typeof this !== 'function') {
        throw new TypeError('Apply must be called on a function');
    }
    
    const actualContext = context ?? window;
    
    if (args && !Array.isArray(args)) {
        throw new TypeError('CreateListFromArrayLike called on non-object');
    }
    
    const sym = Symbol();
    actualContext[sym] = this;
    
    const result = args ? actualContext[sym](...args) : actualContext[sym]();
    delete actualContext[sym];
    
    return result;
}

Function.prototype.myCall = function(context, ...args) {
    if (typeof this !== 'function') {
        throw new TypeError('Call must be called on a function');
    }
    
    const actualContext = context ?? window;
    const sym = Symbol();
    actualContext[sym] = this;
    
    const result = actualContext[sym](...args);
    delete actualContext[sym];
    
    return result;
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
