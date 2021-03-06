const wasCalledAsFunction = require('./util/was-called-as-function')

function bind (...args) {
  if (wasCalledAsFunction(args)) {
    const [fn, context] = args
    return fn.bind(context)
  } else {
    const descriptor = args[2]
    return {
      get () {
        return descriptor.value.bind(this)
      }
    }
  }
}

module.exports = bind
