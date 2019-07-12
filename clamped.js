function clamp(val, floor, ceil) {
  if (val < floor) {
    return floor
  }

  if (val > ceil) {
    return ceil
  }

  return val
}

function clamped(floor, ceil) {
  let val;

  return (elementDescriptor, a, b, c) => {
    const { kind, key, initializer, descriptor, placement } = elementDescriptor

    if (kind !== 'field') {
      throw new TypeError('clamped decorator can only be used with properties')
    }

    val = clamp(initializer(), floor, ceil)

    return {
      kind: 'method',
      key,
      placement,
      descriptor: {
        enumerable: descriptor.enumarable,
        configurable: descriptor.configurable,
        get () {
          return val
        },
        set (newVal) {
          val = newVal
        },
      }
    }
  }
}

module.exports = clamped
