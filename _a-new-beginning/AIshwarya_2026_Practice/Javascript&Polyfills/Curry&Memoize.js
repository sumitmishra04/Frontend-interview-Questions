function curry(fn) {
  return function curried (...args) {
    if(args.length >= fn.length) {
      return fn(...args)
    } 
    return (...nextArgs) => curried(...args, ...nextArgs)
  }
}

function add(a, b, c) {
  return a + b + c;
}

const curriedAdd = curry(add)

const abc = curriedAdd(1)(2)(3)
//console.log('>>>>', abc)

//basic memoize

function memoize(fn) {
  const cache = new Map()
  return function (...args) {
    const key = JSON.stringify(args)
    if(cache.has(key)) {
      return cache.get(key)
    } else {
      const result = fn(...args)
      cache.set(key, result)
      return result
    }
  }
}

//advanced momoize write memoize function that handles object arguments with deep object check
//Primitives (number, string, boolean, null, undefined)
// ✅ Arrays
// ✅ Plain objects
// ✅ Nested combinations of the above

function memoizeAdvanced(fn) {
  const cache = []
  function deepEqual(a,b, visited = new Map()) {
    if(Object.is(a,b)) return true
    if(typeof a !== "object" || typeof b !== "object" || a === null || b === null) return false
    if(visited.get(a) === b) return true
    visited.set(a,b)
    if(a instanceof Date && b instanceof Date) {
      return a.getTime() === b.getTime()
    }
    if(Array.isArray(a) !== Array.isArray(b)) return false
    const keysA = Reflect.ownKeys(a)
    const keysB = Reflect.ownKeys(b)
    if(keysA.length !== keysB.length) return false
    for(let key of keysA) {
      if(!keysB.includes(key)) return false
      if(!deepEqual(a[key], b[key])) return false
    }
    return true
  }
  function isArgsEqual(prevArgs,nextArgs) {
    if(prevArgs.length !== nextArgs.length) return false
    for(let i = 0; i < prevArgs.length; i++) {
      if(!deepEqual(prevArgs[i], nextArgs[i])) return false
    }
    return true
  }
  return function (...args) {
    for(let entry of cache) {
      if(isArgsEqual(entry.args, args)) {
        return 'from cache ' + entry.result
      }
    }
    const result = fn.apply(this,args)
    cache.push({
      args: structuredClone(args),
      result
    })
    return 'computed fresh ' + result
  }
}

const sum = memoizeAdvanced(function addObj(obj) {
  return obj.a + obj.b
})

console.log(sum({a: 1, b: 2}))
console.log(sum({b: 2, a: 1}))