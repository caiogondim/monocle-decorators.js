/* eslint-env jest */

const _o = require('../src')

// AKA it just works™
it('mixes enumerable properties from base classes into derived', () => {
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

  @_o.mixin(Crawlable, Walkable, Runnable)
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
