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

  if (!Proxy) {
    logger('Current env doesn\'t support Proxy API.')
    return target
  }

  const proxy = new Proxy(target, {
    get (target_, key_) {
      if (key_ === key) {
        logger(msg)
      }

      return target_[key_]
    }
  })

  return proxy
}

function decoratorApi (msg, { logger } = {}) {
  return function (target, key, descriptor) {
    msg = msg || getDefaultMsg(target, key)
    logger = logger || console.warn.bind(console)

    if (!Proxy) {
      logger('Current env doesn\'t support Proxy API.')
      return descriptor
    }

    const proxy = new Proxy(target, {
      get (target, key) {
        logger(msg)
        return target[key]
      }
    })

    return proxy
  }
}

function entry (...args) {
  if (wasCalledAsFunction(args)) {
    return functionApi(...args)
  }

  return decoratorApi(...args)
}

module.exports = entry
