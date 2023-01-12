/**
 * Given an array [“123f”, “1dsa12”, “1212ds”, “65fd”, “sadfa”, “asdasd”]
 * Each item can contain 0-9, a-z, A-Z where a-z, A-Z characters are unwanted
 * Sum of all the numbers after removing all the unwanted characters 123+112+1212+65
 **/

const parseNum = (num) => {
    const validNumChars = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"];
    const remainingChars = num
      .split("")
      .filter((char) => validNumChars.includes(char));
    return +remainingChars.join("");
  };
  
  const sumArr = (arr) => {
    return arr.reduce((acc, curr) => {
      return acc + parseNum(curr);
    }, 0);
  };
  
  console.log(sumArr(["123f", "1dsa12", "1212ds", "65fd", "sadfa", "asdasd"])); // 1512
  console.log(sumArr(["asdasd"])); // 0
  console.log(sumArr(["asdasd12"])); // 12
  console.log(sumArr(["12"])); // 12

  
  /*
- Write method findPath
- Should take two params:
    - object
    - keys separated by dots as string
- Return value if it exists at that path inside the object, else return undefined
*/

var obj = {
    a: {
      b: {
        c: 12,
        j: false
      },
      k: null
    }
  };
  
  const findPath = (object, path) => {
    if (!path) {
      return undefined;
    }
    const keys = path.split(".");
    const currentKey = keys.shift();
    if (object[currentKey] === undefined) {
      return undefined;
    } else if (keys.length === 0) {
      return object[currentKey];
    }
    return findPath(object[currentKey], keys.join("."));
  };
  
  console.log(findPath(obj, "a.b.c")); // 12
  console.log(findPath(obj, "a.b")); // {c: 12, j: false}
  console.log(findPath(obj, "a.b.d")); // undefined
  console.log(findPath(obj, "a.c")); // undefined
  console.log(findPath(obj, "a.b.c.d")); // undefined
  console.log(findPath(obj, "a.b.c.d.e")); // undefined
  console.log(findPath(obj, "a.b.j")); //false
  console.log(findPath(obj, "a.b.j.k")); //undefined
  console.log(findPath(obj, "a.k")); //null
  