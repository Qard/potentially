# potentially

A maybe/option type implementation with separate derived
types to reduce branching.

## Install

```sh
npm install potentially
```

## Usage

```js
const { Maybe, None, Some } = require('potentially')

Some.of(1) // Some(1)
  .and(None.of()) // None
  .or(Maybe.of(2)) // Some(2)
  .map(v => v * 2) // Some(4)
  .filter(v => v === 2) // None
  .expect("Oh no! It's a None! :(") // throws because there is no value
```

### API

#### `Maybe.of([ value ])`

If `value` is `undefined` this function will return a `None` instance, otherwise it will return a `Some` instance containing the value. If value is already a `Maybe` it will just return the value. It is recommended to use `None.of(...)` and `Some.of(...)` instead if you already know which type it should be.

#### `Maybe.some(value)`

Returns a `Some` instance containing the value.

#### `Maybe.none()`

Returns a `None` instance.

#### `None.of()`

Returns a `None` instance, ignoring any input value if provided.

#### `Some.of(value)`

Returns a `Some` instance containing the value.

#### `maybe.isSome`

`None`: Returns false.
`Some`: Returns true.

#### `maybe.isNone`

`None`: Returns true.
`Some`: Returns false.

#### `maybe.value`

`None`: Throws an error with a `'Maybe is empty'` message.
`Some`: Returns the contained value.

#### `maybe.expect(message)`

`None`: Throws an error with the given `message`.
`Some`: Returns the contained value.

#### `maybe.map(func)`

`None`: Returns `this` and skips the `func` as `None` types should remain `None` types.
`Some`: Returns a `Maybe` of the result of calling `func` with the contained value. Can also return `Maybe` types from `func` to determine type explicitly rather than relying on internal type checking of `Maybe`, this allows a `Some` to contain `undefined`. 

#### `maybe.filter(func)`

`None`: Returns `this` and skips the `func` as `None` types should remain `None` types.
`Some`: Calls `func` on the contained value and return `None` if `false` or `this` if `true`.

#### `maybe.and(other)`

`None`: Returns `this` because it fails the left-hand condition of the `and` check and should remain `None`.
`Some`: Returns `other` because it passes the left-hand condition.

#### `None.or(other)`

`None`: Returns `other` because it fails the left-hand condition of the `or` check.
`Some`: Returns `this` because it passes the left-hand condition.

---

### Copyright (c) 2019 Stephen Belanger

#### Licensed under MIT License

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
