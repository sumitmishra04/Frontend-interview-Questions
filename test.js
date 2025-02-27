const debounce = function (fn, delay) {
  let timer = null;
  return (...args) => {
    clearTimeout(timer);
    const self = this;
    timer = setTimeout(() => {
      fn.apply(self, args);
    }, delay);
  };
};
