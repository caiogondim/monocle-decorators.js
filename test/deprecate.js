/* eslint-env jest */

const _o = require('../src')

beforeEach(() => {
  global.console.warn = jest.fn()
})

describe('decorator API', () => {
  it('works with literals', () => {
    let dummyObj = {
      a: 1,
      @_o.deprecate()
      b: 2
    }

    expect(dummyObj.b).toEqual(2)
    expect(console.warn).toHaveBeenCalled()
  })

  it('works with functions', () => {
    const dummyObj = {
      a: 1,
      @_o.deprecate()
      b () {
        this.a += 1
      }
    }

    dummyObj.b()

    expect(console.warn).toHaveBeenCalled()
    expect(dummyObj.a).toEqual(2)
  })

  it('works with nested objects', () => {
    let dummyObj = {
      a: 1,
      @_o.deprecate()
      b: {
        c: 2
      }
    }

    expect(dummyObj.b.c).toEqual(2)
    expect(console.warn).toHaveBeenCalled()
  })

  it('works with get/set', () => {
    let b = 2
    let dummyObj = {
      a: 1,
      @_o.deprecate()
      get b () {
        return b
      },
      set b (val) {
        b = val
      }
    }

    expect(dummyObj.b).toEqual(2)
    expect(console.warn).toHaveBeenCalled()
    dummyObj.b = 3
    expect(dummyObj.b).toEqual(3)
  })

  it('accepts custom message', () => {
    const msg = 'lorem ipsum'
    let dummyObj = {
      a: 1,
      @_o.deprecate(msg)
      b: 2
    }

    expect(dummyObj.b).toEqual(2)
    expect(console.warn).toHaveBeenCalledWith(msg)
  })

  it('accepts custom logger', () => {
    const logger = jest.fn()
    let dummyObj = {
      a: 1,
      @_o.deprecate(undefined, { logger })
      b: 2
    }

    expect(dummyObj.b).toEqual(2)
    expect(logger).toHaveBeenCalled()
  })
})

describe('function API', () => {
  it('works with literals', () => {
    let dummyObj = {
      a: 1,
      b: 2
    }
    dummyObj = _o.deprecate(dummyObj, 'b')

    expect(dummyObj.b).toEqual(2)
    expect(console.warn).toHaveBeenCalled()
  })

  it('works with functions', () => {
    let dummyObj = {
      a: 1,
      b () {
        this.a += 1
      }
    }
    dummyObj = _o.deprecate(dummyObj, 'b')

    dummyObj.b()

    expect(console.warn).toHaveBeenCalled()
    expect(dummyObj.a).toEqual(2)
  })

  it('works with nested objects', () => {
    let dummyObj = {
      a: 1,
      b: {
        c: 2
      }
    }
    dummyObj = _o.deprecate(dummyObj, 'b')

    expect(dummyObj.b.c).toEqual(2)
    expect(console.warn).toHaveBeenCalled()
  })

  it('works with get/set', () => {
    let b = 2
    let dummyObj = _o.deprecate({
      a: 1,
      get b () {
        return b
      },
      set b (val) {
        b = val
      }
    }, 'b')

    expect(dummyObj.b).toEqual(2)
    expect(console.warn).toHaveBeenCalled()
    dummyObj.b = 3
    expect(dummyObj.b).toEqual(3)
  })

  it('accepts custom message', () => {
    const msg = 'lorem ipsum'
    const dummyObj = _o.deprecate({
      a: 1,
      b: 2
    }, 'b', msg)

    expect(dummyObj.b).toEqual(2)
    expect(console.warn).toHaveBeenCalledWith(msg)
  })

  it('accepts custom logger', () => {
    const logger = jest.fn()
    const dummyObj = _o.deprecate({
      a: 1,
      b: 2
    }, 'b', undefined, { logger })

    expect(dummyObj.b).toEqual(2)
    expect(logger).toHaveBeenCalled()
  })
})
