<img src="./docs/icon/banner.png">

<h1 align="center">monocle-decorators.js</h1>

<br>

## Table of contents
- **For classes**
  - [freeze](#freeze)
  - [mixin](#mixin)
  - [seal](#seal)
- **For instance methods**
  - [bind](#bind)
  - [debounce](#debounce)
  - [throttle](#throttle)

## For classes

### `mixin`

```js
import _o from 'monocle-decorators'

//
// As a decorator
//

class Walkable {
  walk() {
    const speed = 5
    this.distanceFromOrigin += speed
  }
}

class Runnable {
  run() {
    const speed = 10
    this.distanceFromOrigin += speed
  }
}

@_o.mixin([Walkable, Runnable])
class Thing {
  constructor() {
    this.distanceFromOrigin = 0
  }
}

const foo = new Thing()
foo.walk() // method from Walkable class
foo.run() // method from Runnable class

//
// As a function
//

const ThingMixed = _o.mixin(Thing, [Walkable, Runnable])

const foo = new ThingMixed()
foo.walk() // method from Walkable class
foo.run() // method from Runnable class
```

### `freeze`

```js
import _o from 'monocle-decorators'

//
// As a decorator
//

@_o.freeze
class Dummy {
  constructor() {
    this.a = 1
    this.b = 2
  }
}

const foo = new Dummy()
foo.c = 3 // throws Error

//
// As a function
//

const foo = _o.freeze({
  a: 1,
  b: 2
})
foo.c = 3 // throws Error
```

### `seal`

```js
import _o from 'monocle-decorators'

//
// As a decorator
//

@_o.seal
class Dummy {
  constructor() {
    this.a = 1
    this.b = 2
  }
}

const foo = new Dummy()
foo.c = 3 // throws Error

//
// As a function
//

const foo = _o.seal({
  a: 1,
  b: 2
})
foo.c = 3 // throws Error
```

## For instance methods

### `bind`

```js
import _o from 'monocle-decorators'

//
// As a decorator
//

class Dummy {
  @_o.bind
  handleClick() {
    // ...
  }
}

//
// As a function
//

const handleClick = _o.bind(function () {
  // ...
}, element)
```

### `debounce`

```js
import _o from 'monocle-decorators'

//
// As a decorator
//

class Dummy {
  @_o.debounce(150)
  onScroll() {
    // ...
  }
}

//
// As a function
//

const onScroll = _o.debounce(() => {
  // ...
}, 150)
```

### `throttle`

```js
import _o from 'monocle-decorators'

//
// As a decorator
//

class Dummy {
  @_o.throttle(150)
  onScroll() {
    // ...
  }
}

//
// As a function
//

const onScroll = _o.throttle(() => {
  // ...
})
```

To have the same behavior as a hypothetical `@_o.once`, use `@_o.throttle(Infinity)`.

### Why monocle?

Because you import it as `_o` and use it as `@_o`.
Classy decorators.

## Reference
- Icon by Ben Iconator from The Noun Prokect
