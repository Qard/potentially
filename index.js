const someValue = Symbol('some-value')

class Maybe {
  static of (value) {
    if (value instanceof Maybe) {
      return value
    }

    if (value !== undefined && value !== null) {
      return Some.of(value)
    } else {
      return None.of()
    }
  }

  static some (value) {
    return new Some(value)
  }

  static none () {
    return new None()
  }

  get value () {
    return this.expect('Maybe is empty')
  }
}

Object.defineProperties(Maybe.prototype, {
  isNone: {
    value: false
  },
  isSome: {
    value: false
  }
})

class None extends Maybe {
  static of () {
    return new None()
  }

  expect (message) {
    throw new Error(message)
  }

  map () {
    return this
  }

  filter () {
    return this
  }

  and () {
    return this
  }

  or (b) {
    return Maybe.of(b)
  }
}

Object.defineProperty(None.prototype, 'isNone', {
  value: true
})

class Some extends Maybe {
  constructor (value) {
    super()
    this[someValue] = value
  }

  static of (value) {
    return new Some(value)
  }

  expect () {
    return this[someValue]
  }

  map (fn) {
    return Maybe.of(fn(this[someValue]))
  }

  filter (fn) {
    return fn(this[someValue]) ? this : None.of()
  }

  and (b) {
    return Maybe.of(b)
  }

  or (b) {
    return this
  }
}

Object.defineProperty(Some.prototype, 'isSome', {
  value: true
})

module.exports = {
  Maybe,
  None,
  Some
}
