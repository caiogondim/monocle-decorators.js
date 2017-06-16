<img src="./docs/icon/banner.png">

<h1 align="center">monocle-decorators.js</h1>

<br>

Tiny library with most common/useful decorators. Think of it as underscore.js,
but with class.

## Table of contents
- **Decorators for classes**
  - [freeze](#freeze)
  - [mixin](#mixin)
  - [seal](#seal)
- **Decorators for instance methods**
  - [bind](#bind)
  - [debounce](#debounce)
  - [throttle](#throttle)

## Decorators for classes

### `@_o.mixin`

Extends decorated class with all enumerable properties from `ArrayOfClasses`
passed as argument.

> 💡 **Tip**
>
> Prefer composability over inheritance.

#### As decorator `@_o.mixin(ArrayOfClasses)`

```js
import _o from 'monocle-decorators'

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
foo.distanceFromOrigin // => 15
```

#### As function `_o.mixin(TargetClass, ArrayOfClasses)`

```js
const ThingMixed = _o.mixin(Thing, [Walkable, Runnable])

const foo = new ThingMixed()
foo.walk() // method from Walkable class
foo.run() // method from Runnable class
foo.distanceFromOrigin // => 15
```

### `@_o.freeze`

Freezes every new instance of decorated class.

A frozen object prevents:
- new properties from being added to it
- existing properties from being removed
- existing properties, or their enumerability, configurability, or
  writability, from being changed

#### As decorator `@_o.freeze`

```js
import _o from 'monocle-decorators'

@_o.freeze
class Dummy {
  constructor() {
    this.a = 1
    this.b = 2
  }
}

const foo = new Dummy()
foo.c = 3 // throws Error
```

#### As function `_o.freeze(TargetClass)`

```js
import _o from 'monocle-decorators'

const DummyFrozen = _o.freeze(Dummy)
const foo = new DummyFrozen()
foo.c = 3 // throws Error
```

### `@_o.seal`

Seals every new instance of decorated class.

A sealed object prevents:
- new properties from being added to it
- marking all existing properties as non-configurable

Values of present properties can still be changed as long as they are writable.

> 💡 **Tip**
>
> `@_o.seal` and `@_o.freeze` makes it easier to work with objects, since you have
> to declare beforehand all properties and methods an object has and will have
> in it's lifecycle, concentrating in one single place the definition of the
> object structure.

#### As decorator `@_o.seal`

```js
import _o from 'monocle-decorators'

@_o.seal
class Dummy {
  constructor() {
    this.a = 1
    this.b = 2
  }
}

const foo = new Dummy()
foo.c = 3 // throws Error
```

#### As function `_o.freeze(TargetClass)`

```js
import _o from 'monocle-decorators'

const DummySealed = _o.seal(Dummy)
foo.c = 3 // throws Error
```

## Decorators for instance methods

### `@_o.bind`

Autobind the decorated method to it's owner, so `this` will always refer to the
object that owns the method.

> 💡 **Tip**
>
> This decorator avoids the verbose `<button onClick={this.handleClick.bind(this)}></button>` idiom,
> using only `<button onClick={this.handleClick}></button>`.

#### As decorator `@_o.bind`

```js
import _o from 'monocle-decorators'

class Dummy {
  @_o.bind
  handleClick() {
    // ...
  }

  render() {
    return (
      <div onClick={this.handleClick}>Lorem ipsum</div>
    )
  }
}
```

#### As function `_o.bind(targetMethod, context)`

```js
import _o from 'monocle-decorators'

const obj = {
  handleClick() {
    // ...
  }
}

_o.bind(obj.handleClick, obj)

element.addEventListener('click', obj.handleClick)
```

### `@_o.debounce`

<!-- Text originally from underscore.js -->

Debounces decorated method, which will postpone its execution until after
`delay` milliseconds have elapsed since the last time it was invoked.

> 💡 **Tip**
>
> Useful for implementing behavior that should only happen after the input has
> stopped arriving. For example: rendering a preview of a Markdown comment,
> recalculating a layout after the window has stopped being resized, and so on.

#### As decorator `@_o.debounce(delay)`

```js
import _o from 'monocle-decorators'

class Dummy {
  @_o.debounce(150)
  onScroll() {
    // ...
  }
}
```

#### As function `_o.debounce(targetMethod, delay)`

```js
import _o from 'monocle-decorators'

const onScroll = _o.debounce(() => {
  // ...
}, 150)
```

### `@_o.throttle`

<!-- Text originally from underscore.js -->

Throttles decorated method, that, when invoked repeatedly, will only actually call the original function at most once per every `delay` milliseconds.

> 💡 **Tip**
>
> Useful for rate-limiting events that occur faster than you can keep up with.

#### As decorator `@_o.throttle(delay)`

```js
import _o from 'monocle-decorators'

class Dummy {
  @_o.throttle(150)
  onScroll() {
    // ...
  }
}
```

> 💡 **Tip**
>
> To have the same behavior as a hypothetical `@_o.once`, use `@_o.throttle(Infinity)`.

#### As function `_o.throttle(targetMethod, delay)`

```js
import _o from 'monocle-decorators'

const onScroll = _o.throttle(() => {
  // ...
}, 150)
```

### Why monocle?

Because you import it as `_o` and use it as `@_o`.
Classy decorators.

## Reference
- Icon by Ben Iconator from The Noun Prokect

## Sponsor

If you found this library useful and are willing to donate, consider transfering
some bitcoins to `1BqqKiZA8Tq43CdukdBEwCdDD42jxuX9UY`.

---

[caiogondim.com](https://caiogondim.com) &nbsp;&middot;&nbsp;
GitHub [@caiogondim](https://github.com/caiogondim) &nbsp;&middot;&nbsp;
Twitter [@caio_gondim](https://twitter.com/caio_gondim)
