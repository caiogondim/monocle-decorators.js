function mixin (...classesBase) {
  return function (classDerived) {
    classesBase.forEach(classBase => {
      Object
        .getOwnPropertyNames(classBase.prototype)
        .forEach(propertyName => {
          classDerived.prototype[propertyName] = classBase.prototype[propertyName]
        })
    })

    return classDerived
  }
}

module.exports = mixin
