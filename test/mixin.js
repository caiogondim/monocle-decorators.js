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

  _o.mixin(Thing, [Crawlable, Walkable, Runnable])

  const thing = new Thing()

  thing
    .crawl()
    .walk()
    .run()

  expect(thing.distanceFromOrigin).toBe(16)
})

it('accepts objects', () => {
  const crawlable = {
    crawl () {
      const speed = 1
      this.distanceFromOrigin += speed
      return this
    }
  }

  const walkable = {
    walk () {
      const speed = 5
      this.distanceFromOrigin += speed
      return this
    }
  }

  const runnable = {
    run () {
      const speed = 10
      this.distanceFromOrigin += speed
      return this
    }
  }

  @_o.mixin([crawlable, walkable, runnable])
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

// it('accepts objects', () => {

// })
