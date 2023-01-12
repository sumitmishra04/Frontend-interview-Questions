// Number.isNaN = Number.isNaN || function isNaN(input) {
//     return typeof input === 'number' && input !== input;
// }
// ......................................................................
// function isInt(value){
//     return value % 1 === 0;
// }
// ......................................................................
// const str = "JavaScript is awesome"
// let reversedString = "";
// for(let i = 0; i < str.length; i++){
//     reversedString = str.charAt(i) + reversedString;
// }

// reversedString;  
// ......................................................................

// test Object type
// obj.constructor === Object

// // set prototype chain
// const obj1 = { a: 1 };
// const obj2 = { b: 2 };
// obj2.setPrototypeOf(obj1);

// const obj1 = { a: "Object 1 value" };
// const obj2 = { b: "Object 2 value" };
// obj2.__proto__ = obj1;

// iterate over all key value pair of object
// ......................................................................

function keyValuePrinter(obj) {
    for (let key in obj) {
      if (Array.isArray(obj[key]) || typeof obj[key] !== "object") {
        console.log( key + " : " + obj[key] );
      } else {
        keyValuePrinter(obj[key]);
      }
    }
  }

  keyValuePrinter({
      name: {
          first: 'sumit',
          last: 'mishra'
      },
      location: {
          city: 'kolkata',
          phn: 7039292922
      },
      gender: 'male',
      hobbies: ['cricket', 'movie']
  })

  // Write a program which can empty a given object
  const newObj = {};
  Object.setPrototypeOf(newObj, obj);

  for (let key in obj) {
    if (obj.hasOwnProperty(key)) {
      delete obj[key];
    }
  }

  // deep copy
  function deepCopy(obj) {
    if (!obj) return obj;

    const copyObj = {};
    for (const key in obj) {
      if (typeof obj[key] !== "object" || Array.isArray(obj[key]))
        copyObj[key] = obj[key];
      else copyObj[key] = deepCopy(obj[key]);
    }
    return copyObj;
  }
  
  deepCopy(obj);