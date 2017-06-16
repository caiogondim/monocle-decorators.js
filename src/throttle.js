const wasCalledAsFunction = require('./util/was-called-as-function')

function throttle (fn, ms) {
  let lastCall

  return function throttled (...args) {
    if (!lastCall || (lastCall + ms) <= Date.now()) {
      lastCall = Date.now()
      return fn.apply(this, args)
    }
  }
};

function entry (...args) {
  if (wasCalledAsFunction(args)) {
    return throttle(...args)
  } else {
    const [ms] = args
    return function (...args) {
      const descriptor = args[2]
      const value = throttle(descriptor.value, ms)

      return Object.assign({}, descriptor, { value })
    }
  }
}

module.exports = entry
