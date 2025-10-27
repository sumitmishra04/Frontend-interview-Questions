const people = [
  {
    id: 1,
    name: "Alice",
    age: 28,
    city: "New York",
    tags: ["developer", "javascript", "react"]
  },
  {
    id: 2,
    name: "Bob",
    age: 35,
    city: "London",
    tags: ["designer", "ui", "javascript"]
  },
  {
    id: 3,
    name: "Charlie",
    age: 30,
    city: "Berlin",
    tags: ["developer", "nodejs"]
  },
  {
    id: 4,
    name: "Diana",
    age: 24,
    city: "Mumbai",
    tags: ["react", "ui"]
  }
];

const groupBy = {}
people.forEach(user => {
    user.tags.forEach(tag => {
        groupBy[tag] = [...(groupBy[tag] || []), user]
    })
})

//==================================================================================================================================

const deepClone = function (obj) {
    let result = Array.isArray(obj) ? [] : {}; 

    for (let key in obj) {
        if (Array.isArray(obj[key])) {
            result[key] = obj[key].map(el =>
                typeof el === 'object' && el !== null ? deepClone(el) : el
            );
        } else if (typeof obj[key] === 'object' && obj[key] !== null) {
            result[key] = deepClone(obj[key]); // ✅ also directly assign
        } else {
            result[key] = obj[key];
        }
    }
    return result;
}

//==================================================================================================================================

const deepCloneCircular = function (obj, visited = new WeakMap()) {
    if (obj === null || typeof obj !== 'object') return obj;
    if (visited.has(obj)) return visited.get(obj); 
    let result = Array.isArray(obj) ? [] : {}; 
    visited.set(obj, result);

    for (let key in obj) {
        if (Array.isArray(obj[key])) {
            result[key] = obj[key].map(el =>
                typeof el === 'object' && el !== null ? deepCloneCircular(el, visited) : el
            ); 
        } else if (typeof obj[key] === 'object' && obj[key] !== null) {
            result[key] = deepCloneCircular(obj[key], visited); 
        } else {
            result[key] = obj[key];
        }
    }
    return result;
}


const a = { name: "A", data: [1,3] };
const b = { name: "B", ref: a };
a.ref = b;

const clone = deepCloneCircular(a);
console.log(clone);
console.log(clone.ref.ref === clone)


//==================================================================================================================================


    const input = {
        a: {
            b: {
                c: 1,
                d: 2
            },
            f: {
                w: 2
            }
        },
        d: 2
    }


    function flattenObject(input) {
        let result = {}
        function helper(obj, prefix) {
            for (let key in obj) {
                const newKey = prefix ? `${prefix}.${key}` : key
                if (typeof obj[key] === 'object' && obj[key] !== null) {
                    helper(obj[key], newKey)
                } else {
                    result[newKey] = obj[key]
                }
            }
        }
        helper(input, '')
        return result
    }

    console.log(flattenObject(input))

//==================================================================================================================================

const obj1 = { a: 1, b: { x: 10, y: 20 } };
const obj2 = { b: { y: 50, z: 100 }, c: 3 };

function deepMerge(target, source) {
  const result = Array.isArray(target) ? [...target] : { ...target };

  for (let key in source) {
    if (typeof source[key] === 'object' && source[key] !== null) {
      result[key] = deepMerge(result[key] || {}, source[key]);
    } else {
      result[key] = source[key];
    }
  }

  return result;
}

const merged = deepMerge(obj1, obj2);
console.log(merged); // { a: 1, b: { x: 10, y: 50, z: 100 }, c: 3 }
