function throttle(fn, delay) {
  let timerId
  if (timerId) {
    return
  }

  timerId = setTimeout(() => {
    fn()
    timerId = undefined
  }, delay)
}
