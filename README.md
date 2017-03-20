<img src="./docs/icon/banner.png">

<h1 align="center">monocle-decorators.js</h1>

<br>

## `bind`

```js
import _o from 'monocle-decorators'

class Dummy {
  constructor() {
    this.count = 1
  }

  @_o.bind
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
