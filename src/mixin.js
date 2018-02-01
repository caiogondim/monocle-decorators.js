function mixin (derivedClass, mixins) {
  // Mixes classes
  mixins
    .filter((mixin) => typeof mixin === 'function')
    .forEach(classBase => {
      Object
        .getOwnPropertyNames(classBase.prototype)
        .forEach(propertyName => {
          Object.defineProperty(
            derivedClass.prototype,
            propertyName,
            Object.getOwnPropertyDescriptor(classBase.prototype, propertyName)
          )
        })
    })

  // Mixes objects
  mixins
    .filter((mixin) => typeof mixin === 'object')
    .forEach(objectBase => {
      Object
        .getOwnPropertyNames(objectBase)
        .forEach(propertyName => {
          Object.defineProperty(
            derivedClass.prototype,
            propertyName,
            Object.getOwnPropertyDescriptor(objectBase, propertyName)
          )
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
