const wasCalledAsFunction = require('./util/was-called-as-function')

function debounce (fn, wait) {
  let timeout

  return function debounced (...args) {
    clearTimeout(timeout)
    timeout = setTimeout(() => {
      fn.apply(this, args)
    }, wait)
  }
};

function entry (...args) {
  if (wasCalledAsFunction(args)) {
    return debounce(...args)
  } else {
    const [wait] = args
    return function (...args) {
      const descriptor = args[2]
      const value = debounce(descriptor.value, wait)

      return Object.assign({}, descriptor, { value })
    }
  }
}

module.exports = entry
