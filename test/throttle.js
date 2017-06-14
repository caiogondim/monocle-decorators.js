/* eslint-env jest */

const _o = require('../src')

it('works as a decorator', (done) => {
  const wait = 150
  class Dummy {
    constructor () {
      this.count = 0
    }

    @_o.throttle(wait)
    incrementCount () {
      this.count += 1
    }
  }
  const foo = new Dummy()

  foo.incrementCount()
  foo.incrementCount()
  foo.incrementCount()
  foo.incrementCount()
  expect(foo.count).toBe(1)

  setTimeout(() => {
    foo.incrementCount()
    expect(foo.count).toBe(2)
    done()
  }, wait)
})

it('works as a function', () => {
  let count = 0
  const incrementCount = () => {
    count += 1
  }
  const incrementCountThrottled = _o.throttle(incrementCount, 150)

  incrementCountThrottled()
  incrementCountThrottled()
  incrementCountThrottled()
  incrementCountThrottled()
  expect(count).toBe(1)

  count = 0
  incrementCount()
  incrementCount()
  incrementCount()
  incrementCount()
  expect(count).toBe(4)
})
