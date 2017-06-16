/* eslint-env jest */

const _o = require('../src')

class Crawlable {
  crawl () {
    const speed = 1
    this.distanceFromOrigin += speed
    return this
  }
}

class Walkable {
  walk () {
    const speed = 5
    this.distanceFromOrigin += speed
    return this
  }
}

class Runnable {
  run () {
    const speed = 10
    this.distanceFromOrigin += speed
    return this
  }
}

it('works as decorator', () => {
  @_o.mixin([Crawlable, Walkable, Runnable])
  class Thing {
    constructor () {
      this.distanceFromOrigin = 0
    }
  }

  const thing = new Thing()

  thing
    .crawl()
    .walk()
    .run()

  expect(thing.distanceFromOrigin).toBe(16)
})

it('works as function', () => {
  class Thing {
    constructor () {
      this.distanceFromOrigin = 0
    }
  }

  const ThingMixed = _o.mixin(Thing, [Crawlable, Walkable, Runnable])

  const thing = new ThingMixed()

  thing
    .crawl()
    .walk()
    .run()

  expect(thing.distanceFromOrigin).toBe(16)
})
