/* eslint-env jest */

const clamped = require('./clamped')

it('works', () => {
  class Foo {
    @clamped(0, 14)
    bar = 15
  }
  const foo = new Foo()

  expect(foo.bar).toEqual(14)
})

it('throws error if used on class', () => {
  let thrownError = null

  try {
    @clamped(1, 3)
    class Foo {}
  } catch (error) {
    thrownError = error
  }
  expect(typeof thrownError).toEqual(typeof new TypeError)
})

it('works with static properties', () => {
  class Foo {
    @clamped(0, 14)
    static bar = 15
  }

  expect(Foo.bar).toEqual(14)
})
