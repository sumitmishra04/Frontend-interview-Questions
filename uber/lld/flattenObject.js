const input = {
    a: 1,
    b: {
      c: 2,
      d: {
        e: [2,3,4, {
            r: 1
        }],
        f: 4
      }
    },
    g: {
      h: 5
    }
  };
  
  function flattenObject(obj, prefix = "") {
    let result = {};
  
    for (let key in obj) {
      if (!obj.hasOwnProperty(key)) continue; // Skip inherited properties
  
      let newKey = prefix ? `${prefix}.${key}` : key; // Form the new key
  
      if (typeof obj[key] === "object" && obj[key] !== null) {
        if (Array.isArray(obj[key])) {
          // Handle arrays with bracket notation
          obj[key].forEach((item, index) => {
            let arrayKey = `${newKey}[${index}]`;
            if (typeof item === "object" && item !== null) {
              result = {...result, ...flattenObject(item, arrayKey)};
            } else {
              result[arrayKey] = item;
            }
          });
        } else {
          // Recursively flatten objects
          result = {...result, ...flattenObject(obj[key], newKey)};
        }
      } else {
        result[newKey] = obj[key];
      }
    }
  
    return result;
  }
  
  
  console.log(flattenObject(input))