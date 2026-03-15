// <!DOCTYPE html>
// <html>
//   <head>
//     <title>JavaScript Devbox</title>
//     <meta charset="UTF-8" />
//   </head>

//   <body>
//     <div id="app">
//       <input type="text" />
//       <div><b>Default:</b><span id="default"></span></div>
//       <div><b>Debounce:</b><span id="debounce"></span></div>
//       <div><b>Throttle:</b><span id="throttle"></span></div>
//     </div>

//     <script src="./try.mjs" type="module"></script>
//   </body>
// </html>

import "./styles.css";

const input = document.querySelector("input");
const defaultText = document.getElementById("default")
const debounceText = document.getElementById("debounce")
const throttleText = document.getElementById("throttle")

const debounced = debounce((e) => {
  debounceText.textContent = e.target.value
}, 1000)

const throttled = throttle((e) => {
  throttleText.textContent = e.target.value
}, 1000)

input.addEventListener("input", (e) => {
  defaultText.textContent = e.target.value
  debounced(e)
  throttled(e)
})

function debounce (fn, delay) {
  let timer
  return function(...args) {
    clearTimeout(timer)
    timer = setTimeout(() => {
      fn.apply(this, args)
    }, delay);
  }
}

function throttle (fn, delay) {
  let shouldWait = false
  return function (...args) {
    if(shouldWait) return
    fn.apply(this, args)
    shouldWait = true
    setTimeout(() => {
      shouldWait = false
    }, delay)
  }
}




// function debounce (cb, delay = 1000, options = {
//   leading: false, trailing: true
// }) {
//   let timer = null
//   return function(...args) {
//     const context = this
//     let shouldCallNow = options.leading && !timer
//     clearTimeout(timer)
//     timer = setTimeout(() => {
//       timer = null
//       if(options.trailing && !shouldCallNow) {
//         cb.apply(context, args)
//       }
//     })
//     if(shouldCallNow) {
//       cb.apply(context, args)
//     }
//   }

// }