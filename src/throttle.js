function wasCalledAsFunction (args) {
  return (typeof args[0] === 'function')
}

function throttle (fn, wait) {
  let lastCall

  return function throttled (...args) {
    if (!lastCall || (lastCall + wait) <= Date.now()) {
      lastCall = Date.now()
      return fn.apply(this, args)
    }
  }
};

function entry (...args) {
  if (wasCalledAsFunction(args)) {
    return throttle(...args)
  } else {
    const [wait] = args
    return function (...args) {
      const descriptor = args[2]
      const value = throttle(descriptor.value, wait)

      return Object.assign({}, descriptor, { value })
    }
  }
}

module.exports = entry
