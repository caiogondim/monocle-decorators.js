/* eslint-env jest */

const _o = require('../src')

it('works as a decorator', (done) => {
  const delay = 10
  class Dummy {
    constructor () {
      this.count = 0
    }

    @_o.debounce(delay)
    incrementCount () {
      this.count += 1
    }
  }
  const foo = new Dummy()

  foo.incrementCount()
  foo.incrementCount()
  foo.incrementCount()
  foo.incrementCount()

  setTimeout(() => {
    try {
      expect(foo.count).toBe(1)
      done()
    } catch (error) {
      console.log(error)
      done()
      throw error
    }
  }, delay)
})

it('works as a function', (done) => {
  const delay = 10
  let count = 0
  const incrementCount = () => {
    count += 1
  }
  const incrementCountDebounced = _o.debounce(incrementCount, delay)

  incrementCountDebounced()
  incrementCountDebounced()
  incrementCountDebounced()
  incrementCountDebounced()

  setTimeout(() => {
    try {
      expect(count).toBe(1)
      done()
    } catch (error) {
      console.log(error)
      done()
      throw error
    }
  }, delay)
})
