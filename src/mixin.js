function mixin (derivedClass, baseClasses) {
  baseClasses.forEach(classBase => {
    Object
      .getOwnPropertyNames(classBase.prototype)
      .forEach(propertyName => {
        derivedClass.prototype[propertyName] = classBase.prototype[propertyName]
      })
  })

  return derivedClass
}

function entry (...args) {
  // Called as decorator
  if (args.length === 1 && Array.isArray(args[0])) {
    const [baseClasses] = args
    return function (derivedClass) {
      return mixin(derivedClass, baseClasses)
    }
  }

  // Called as function
  const [derivedClass, baseClasses] = args
  return mixin(derivedClass, baseClasses)
}

module.exports = entry
