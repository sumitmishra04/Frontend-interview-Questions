


Array.prototype.chopByLimit = function (size) {
    const tempArray = [...this]
    let i = 0;
    const result = []
    while(i<tempArray.length) {
        result.push(tempArray.slice(i, i+size))
        i=i+size
    }
    return result
}


function getNameById(id, callback) {
  // simulating async request
  const randomRequestTime = Math.floor(Math.random() * 100) + 200;

  setTimeout(() => {
    callback("User" + id);
  }, randomRequestTime);
}

function mapLimit(inputs, limit, iterateeFn, callback) {
   const choppedArray = inputs.chopByLimit(limit)
   
  const output = choppedArray.reduce((acc, curr) => {
      return acc.then(val => {
          return new Promise((resolve, reject) => {
              const temp = []
              curr.forEach(item => {
                  iterateeFn(item, (val) => {
                      temp.push(val)
                      if(temp.length === curr.length) {
                          resolve([...val, ...temp])
                      }
                  })
              })
          })
      })
  }, Promise.resolve([]))
  
  output.then(res => callback(res))
}
//example: 
mapLimit([1, 2, 3, 4, 5], 2, getNameById, (allResults) => {
  console.log("output", allResults); // ["User1", "User2", "User3", "User4", "User5"]
});