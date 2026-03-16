function myOnce (fn) {
  let called = false
  let result = null
  return function (...args) {
    if(called) return
    result = fn.apply(this,args)
    called = true
    return result
  }
}

function myFlattenDeep(arr) {
  return arr.reduce((acc, curr) => {
     return acc.concat(Array.isArray(curr) ? myFlattenDeep(curr) : curr)
  }, []) 
}

console.log('>>>', myFlattenDeep([1,2,[3,[4,[5]]]]))

function flattenObj(obj, parentKey = null, result = {}) {
  for(let key in obj){
    const value = obj[key]
    key = key.replace("#", "_")
    const newKey = parentKey ? `${parentKey}_${key}` : key
    if(Array.isArray(value)) {
      result[newKey] = JSON.stringify(value)
    }
    if(typeof value === "object" && value !== null) {
      result[newKey] = flattenObj(value, newKey, result)
    }
    if(newKey.includes('phone')) {
      result[newKey] = '+91' + value
    } else {
      result[key] = value
    }
  }
  return result
}