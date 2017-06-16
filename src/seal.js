function seal (ClassOriginal) {
  function classSealing (...args) {
    const obj = new ClassOriginal(...args)
    return Object.seal(obj)
  }

  classSealing.prototype = ClassOriginal.prototype

  return classSealing
}

module.exports = seal
