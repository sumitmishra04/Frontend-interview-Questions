// Q) Print numbers from 10 to 1 with delay of 1 second between each value being printed using setTimeout using pre ES6 features only
// var num1 = 10,
//   num2 = 1;
// for (var i = num1; i >= num2; i--) {
//   setTimeout(console.log, (num1 - i) * 1000, i);
// }

/**--------------------------------------- */

// Q) Write a utility which prints numbers starting from an initial value and increment in steps which can be started and stopped by the user, any number of times
// function increment() {
//   this.num = 0;
//   this.timer;
//   this.start = function (step) {
//     if (!this.timer) {
//       this.timer = setInterval(() => {
//         console.log(this.num);
//         this.num += step;
//       }, 1000);
//     }
//   };
//   this.stop = function () {
//     clearInterval(this.timer);
//   };
// }

// const timer = new increment();
// timer.start(1);
// setTimeout(() => {
//     timer.stop();
// }, 5000);

// Q) Execute the given list of asynchronous functions in parallel and return the results as an array to the callback
function asyncFunc1(callback) {
  setTimeout(() => {
    callback(1);
  }, 3000);
}

function asyncFunc2(callback) {
  setTimeout(() => {
    callback(2);
  }, 2000);
}

function asyncFunc3(callback) {
  setTimeout(() => {
    callback(3);
  }, 1000);
}

function printNum(num) {
  console.log(num);
}

function asyncParallel(asyncFnList, cb) {
  let res = [];
  function repeat(asyncFnList) {
    if (asyncFnList.length === 0) {
      cb(res);
      return;
    }
    const fn = asyncFnList.shift();
    fn((val, index) => {
      console.log(val);
      res[index] = val;
    });
    repeat(asyncFnList);
  }
  repeat(asyncFnList);
}
// function asyncParallel(asyncFuncArr, callback) {
//   const resultArr = new Array(asyncFuncArr.length);
//   let resultCounter = 0;

//   asyncFuncArr.forEach((async, index) => {
//     async((value) => {
//       console.log("value", value, index);
//       resultArr[index] = value;
//       resultCounter++;
//       if (resultCounter >= asyncFuncArr.length) {
//         callback(resultArr);
//       }
//     });
//   });
// }
asyncParallel([asyncFunc1, asyncFunc2, asyncFunc3], printNum);
