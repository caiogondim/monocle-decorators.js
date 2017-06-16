function freeze (ClassOriginal) {
  function classSealing (...args) {
    const obj = new ClassOriginal(...args)
    return Object.freeze(obj)
  }

  classSealing.prototype = ClassOriginal.prototype

  return classSealing
}

module.exports = freeze
