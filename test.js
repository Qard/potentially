const tap = require('tap')

const { Maybe, None, Some } = require('./')

function isMaybe (t, maybe) {
  t.ok(maybe instanceof Maybe, 'is a maybe')
}

function isNone (t, maybe) {
  const message = 'some test error'
  isMaybe(t, maybe)
  t.ok(maybe instanceof None, 'is instanceof None')
  t.ok(maybe.isNone, 'isNone is true')
  t.notOk(maybe.isSome, 'isSome is false')
  t.throws(() => maybe.value, 'Maybe is empty', 'value throws error')
  t.throws(() => maybe.expect(message), message, 'expect throws error')
}

function isSome (t, maybe, value) {
  const message = 'some test error'
  isMaybe(t, maybe)
  t.ok(maybe instanceof Some, 'is instanceof Some')
  t.notOk(maybe.isNone, 'isNone is false')
  t.ok(maybe.isSome, 'isSome is true')
  t.equal(maybe.value, value, 'has expected value')
  t.equal(maybe.expect(message), value, 'expect returns value')
}

function shouldNotCall (t, message) {
  return function () {
    t.fail(message)
  }
}

function square (value) {
  return value * value
}

tap.test('maybe', t => {
  t.test('of', t => {
    t.test('none', t => {
      isNone(t, Maybe.of())
      t.end()
    })

    t.test('some', t => {
      const value = 1
      isSome(t, Maybe.of(value), value)
      t.end()
    })

    t.end()
  })

  t.test('none', t => {
    isNone(t, Maybe.none())
    t.end()
  })

  t.test('some', t => {
    const value = 1
    isSome(t, Maybe.some(value), value)
    t.end()
  })

  t.end()
})

tap.test('none', t => {
  const fallback = 1
  const maybe = None.of()

  t.test('of', t => {
    isNone(t, maybe)
    t.end()
  })

  t.test('map bypasses function', t => {
    isNone(t, maybe.map(shouldNotCall(t, 'should not have called function')))
    t.end()
  })

  t.test('filter bypasses function', t => {
    isNone(t, maybe.filter(shouldNotCall(t, 'should not have called function')))
    t.end()
  })

  t.test('and returns None', t => {
    t.test('maybe', t => {
      isNone(t, maybe.and(Some.of(fallback)))
      t.end()
    })

    t.test('value', t => {
      isNone(t, maybe.and(fallback))
      t.end()
    })

    t.end()
  })

  t.test('or returns input', t => {
    t.test('maybe', t => {
      isSome(t, maybe.or(Some.of(fallback)), fallback)
      t.end()
    })

    t.test('value', t => {
      isSome(t, maybe.or(fallback), fallback)
      t.end()
    })

    t.end()
  })

  t.end()
})

tap.test('some', t => {
  const value = 1
  const fallback = 2
  const maybe = Some.of(value)

  t.test('of', t => {
    isSome(t, maybe, value)
    t.end()
  })

  t.test('map', t => {
    t.test('to value', t => {
      isSome(t, maybe.map(square), square(value))
      t.end()
    })

    t.test('to maybe', t => {
      isSome(t, maybe.map(value => Some.of(square(value))), square(value))
      t.end()
    })

    t.end()
  })

  t.test('filter', t => {
    t.test('true', t => {
      isSome(t, maybe.filter(v => v === value), value)
      t.end()
    })

    t.test('false', t => {
      isNone(t, maybe.filter(v => v !== value))
      t.end()
    })

    t.end()
  })

  t.test('and returns input', t => {
    t.test('maybe', t => {
      isSome(t, maybe.and(Some.of(fallback)), fallback)
      t.end()
    })

    t.test('value', t => {
      isSome(t, maybe.and(fallback), fallback)
      t.end()
    })

    t.end()
  })

  t.test('or returns base', t => {
    t.test('maybe', t => {
      isSome(t, maybe.or(Some.of(fallback)), value)
      t.end()
    })

    t.test('value', t => {
      isSome(t, maybe.or(fallback), value)
      t.end()
    })

    t.end()
  })

  t.end()
})
