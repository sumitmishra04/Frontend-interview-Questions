// JS
// 1. Debounce

let timer
function debounce(cb, delay) {
  clearTimeout(timer)
  timer = setTimeout(cb, delay)
}

function debounce(cb, delay) {
  let timer
  return function (...args) {
    const self = this
    clearTimeout(timer)
    timer = setTimeout(() => cb.apply(self, args), delay)
  }
}

// 2. Throttling
function throttle(cb, delay) {
  let throttlePause

  return function (...args) {
    const self = this

    if (throttlePause) return

    throttlePause = true
    cb(self, args)

    setTimeout(() => {
      throttlePause = false
    }, delay)
  }
}

// let throttlePause;
// const throttle = (callback, time) => {
//   if (throttlePause) return;
//   throttlePause = true;
//   setTimeout(() => {
//     callback();
//     throttlePause = false;
//   }, time);
// };
// window.addEventListener("scroll", () => {
//     throttle(handleScrollAnimation, 250);
// });

function throt(cb, delay) {
  let pause
  return (...args) => {
    const self = this
    if (pause) return

    cb.apply(self, args)
    pause = true

    setTimeout(() => {
      pause = false
    }, delay)
  }
}

function db(cb, delay) {
  let timer
  return (...args) => {
    const self = this
    clearTimeout(timer)
    timer = setTimeout(() => {
      cb.apply(self, args)
    }, delay)
  }
}
