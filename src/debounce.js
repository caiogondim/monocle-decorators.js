const wasCalledAsFunction = require('./util/was-called-as-function')

function debounce (fn, delay) {
  let timeout

  return function debounced (...args) {
    clearTimeout(timeout)
    timeout = setTimeout(() => {
      fn.apply(this, args)
    }, delay)
  }
};

function entry (...args) {
  if (wasCalledAsFunction(args)) {
    return debounce(...args)
  } else {
    const [delay] = args
    return function (...args) {
      const descriptor = args[2]
      const value = debounce(descriptor.value, delay)

      return Object.assign({}, descriptor, { value })
    }
  }
}

module.exports = entry
