/* eslint-env jest */

const _o = require('../src')

it('works as a decorator', () => {
  class Dummy {
    constructor () {
      this.count = 1
    }

    @_o.bind
    incrementCount () {
      this.count += 1
    }
  }
  const foo = new Dummy()
  const { incrementCount } = foo

  incrementCount()
  expect(foo.count).toBe(2)
  incrementCount()
  expect(foo.count).toBe(3)
})

it('works as a function', () => {
  const dummy = {
    incrementCount () {
      this.count += 1
    },
    count: 1
  }
  dummy.incrementCount = _o.bind(dummy.incrementCount, dummy)
  const { incrementCount } = dummy

  incrementCount()
  expect(dummy.count).toBe(2)
  incrementCount()
  expect(dummy.count).toBe(3)
})
