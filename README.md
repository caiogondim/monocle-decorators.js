<img src="./docs/icon/banner.png">

<h1 align="center">monocle-decorators.js</h1>

<br>

## `bind`

```js
import _o from 'monocle-decorators'

class Dummy {
  constructor() {
    this.count = 0
  }

  @_o.bind
  onTimeout() {
    this.count += 1
  }
}
```

## `throttle`

```js
import _o from 'monocle-decorators'

class Dummy {
  constructor() {
    this.count = 0
  }

  @_o.throttle(150)
  onTimeout() {
    this.count += 1
  }
}
```

### Why monocle?

Because you import it as `_o` and use it as `@_o`.
Classy decorators.

## Reference
- Icon by Ben Iconator from The Noun Prokect
