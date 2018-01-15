/* eslint-env jest */

const _o = require('../src')

beforeEach(() => {
  global.console.log = jest.fn()
})

describe('decorator API', () => {
  it('works with literals', () => {
    let dummyObj = {
      a: 1,
      @_o.deprecate()
      b: 2
    }

    expect(dummyObj.b).toEqual(2)
    expect(console.log).toHaveBeenCalled()
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

    expect(console.log).toHaveBeenCalled()
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
    expect(console.log).toHaveBeenCalled()
  })

  it('accepts custom message', () => {
    const msg = 'lorem ipsum'
    let dummyObj = {
      a: 1,
      @_o.deprecate({ msg })
      b: 2
    }

    expect(dummyObj.b).toEqual(2)
    expect(console.log).toHaveBeenCalledWith(msg)
  })

  it('accepts custom logger', () => {
    const logger = jest.fn()
    let dummyObj = {
      a: 1,
      @_o.deprecate({ logger })
      b: 2
    }

    expect(dummyObj.b).toEqual(2)
    expect(logger).toHaveBeenCalled()
  })

  it('doesnt work if no Proxy API', () => {
    const proxyRef = global.Proxy
    global.Proxy = undefined

    const dummyObj = {
      a: 1,
      @_o.deprecate()
      b: 2
    }

    expect(dummyObj.b).toEqual(2)
    expect(console.log).toHaveBeenCalledWith('Current env doesn\'t support Proxy API.')

    global.Proxy = proxyRef
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
    expect(console.log).toHaveBeenCalled()
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

    expect(console.log).toHaveBeenCalled()
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
    expect(console.log).toHaveBeenCalled()
  })

  it('accepts custom message', () => {
    const msg = 'lorem ipsum'
    const dummyObj = _o.deprecate({
      a: 1,
      b: 2
    }, 'b', { msg })

    expect(dummyObj.b).toEqual(2)
    expect(console.log).toHaveBeenCalledWith(msg)
  })

  it('accepts custom logger', () => {
    const logger = jest.fn()
    const dummyObj = _o.deprecate({
      a: 1,
      b: 2
    }, 'b', { logger })

    expect(dummyObj.b).toEqual(2)
    expect(logger).toHaveBeenCalled()
  })

  it('doesnt work if no Proxy API', () => {
    const proxyRef = global.Proxy
    global.Proxy = undefined

    const dummyObj = _o.deprecate({
      a: 1,
      b: 2
    }, 'b')

    expect(dummyObj.b).toEqual(2)
    expect(console.log).toHaveBeenCalledWith('Current env doesn\'t support Proxy API.')

    global.Proxy = proxyRef
  })
})
