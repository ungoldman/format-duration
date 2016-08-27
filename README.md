# format-duration

[![npm][npm-image]][npm-url]
[![travis][travis-image]][travis-url]
[![standard][standard-image]][standard-url]

[npm-image]: https://img.shields.io/npm/v/format-duration.svg?style=flat-square
[npm-url]: https://www.npmjs.com/package/format-duration
[travis-image]: https://img.shields.io/travis/ungoldman/format-duration.svg?style=flat-square
[travis-url]: https://travis-ci.org/ungoldman/format-duration
[standard-image]: https://img.shields.io/badge/code%20style-standard-brightgreen.svg?style=flat-square
[standard-url]: http://npm.im/standard

Convert a number in milliseconds to a standard duration string.

## Install

```
npm install format-duration
```

## Usage

```js
var format = require('format-duration')

// anything under a second is rounded down to zero
format(999) // '0:00'

// 1000 milliseconds is a second
format(1000) // '0:01'

// 1999 rounds down to 0:01
format(1000 * 2 - 1) // '0:01'

// 60 seconds is a minute
format(1000 * 60) // 1:00'

// 59 seconds looks like this
format(1000 * 60 - 1) // '0:59'

// 60 minutes is an hour
format(1000 * 60 * 60) // '1:00:00'

// 59 minutes and 59 seconds looks like this
format(1000 * 60 * 60 - 1) // '59:59'

// 24 hours is a day
format(1000 * 60 * 60 * 24) // '1:00:00:00'

// 23 hours, 59 minutes, and 59 seconds looks like this
format(1000 * 60 * 60 * 24 - 1) // '23:59:59'

// 365 days looks like this (not bothering with years)
format(1000 * 60 * 60 * 24 * 365) // '365:00:00:00'
```

## Contributing

Contributions welcome! Please read the [contributing guidelines](CONTRIBUTING.md) first.

## License

[ISC](LICENSE.md)
