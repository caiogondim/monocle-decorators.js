function wasCalledAsFunction (args) {
  return (
    typeof args[1] === 'string'
  )
}

function getDefaultMsg (target, key) {
  return `\`${target.constructor.name}.${key}\` is deprecated.`
}

function functionApi (target, key, msg, { logger } = {}) {
  msg = msg || getDefaultMsg(target, key)
  logger = logger || console.warn.bind(console)

  const descriptor = Object.getOwnPropertyDescriptor(target, key)

  const value = descriptor.value
  const getter = descriptor.get

  descriptor.get = function () {
    logger(msg)
    return (
      (getter && getter.call(this)) ||
      value
    )
  }

  // Can't have accessors (get/set) and value/writable on descriptor at same time.
  delete descriptor.value
  delete descriptor.writable

  return Object.defineProperty(target, key, descriptor)
}

function decoratorApi (msg, { logger } = {}) {
  logger = logger || console.warn.bind(console)

  return function (target, key, descriptor) {
    msg = msg || getDefaultMsg(target, key)

    // Properties have an `initializer` function on descriptor. Methods don't.
    const value = (
      (descriptor.initializer && descriptor.initializer()) ||
      descriptor.value
    )

    const getter = descriptor.get

    descriptor.get = function () {
      logger(msg)
      return (
        (getter && getter.call(this)) ||
        value
      )
    }

    // Can't have accessors (get/set) and value/writable on descriptor at same time.
    delete descriptor.initializer
    delete descriptor.value
    delete descriptor.writable

    return descriptor
  }
}

function entry (...args) {
  if (wasCalledAsFunction(args)) {
    return functionApi(...args)
  }

  return decoratorApi(...args)
}

module.exports = entry
