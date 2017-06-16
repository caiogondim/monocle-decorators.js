const wasCalledAsFunction = (args) => {
  return (typeof args[0] === 'function')
}

module.exports = wasCalledAsFunction
