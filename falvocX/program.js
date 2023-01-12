// Consider two objects:

const catBro = {
    name: "hopper",
    color: "white",
    body: {
      legs: 3,
      eyes: 2,
    },
    food: "fish",
  };
  
  const doggo = {
    name: "pirate",
    color: "gray",
    body: {
      limbs: {
        hands: 2,
        legs: 1,
      },
      eyes: 1,
    },
  };
  
  // The goal is to write a deep merge function:
  // check dest, src for undefind/null
  
  const isObject = function (obj) {
    if (obj && obj.constructor === Object) {
      return true;
    }
  };
  
  const merge = (dest, src) => {
    if (!dest || !src) {
      throw new Error("arguments cannot be undfined or null");
    }
    if (!isObject(dest) || !isObject(src)) {
      throw new Error("arguments should be of type object");
    }
    for (let key in src) {
      // hasOwnProperty check
      // circular ref of the object value
      if (!isObject(src[key])) {
        // ensure the object type points to Object
        dest = {...dest, [key]: src[key]} // immutably change
      } else {
        if (dest[key] !== undefined) {
          dest = {...dest, [key]: src[key]};
        } else {
          dest[key] = merge(dest[key], src[key]);
        }
      }
    }
    return dest;
  };
  
  const res = merge(catBro, doggo);
  console.log(res)
  
  // which would return the following result
  
  // const a = {
  //   name: "pirate",
  //   color: "gray",
  //   body: {
  //     legs: 3,
  //     eyes: 1,
  //     limbs: {
  //       hands: 2,
  //       legs: 1,
  //     },
  //   },
  //   food: "fish",
  // };
  