# format-duration

[![npm][1]][2]
[![travis][3]][4]
[![standard][5]][6]
[![downloads][7]][2]

[1]: https://img.shields.io/npm/v/format-duration.svg?style=flat-square
[2]: https://www.npmjs.com/package/format-duration
[3]: https://img.shields.io/travis/hypermodules/format-duration/master.svg?style=flat-square
[4]: https://travis-ci.org/hypermodules/format-duration
[5]: https://img.shields.io/badge/code%20style-standard-brightgreen.svg?style=flat-square
[6]: http://standardjs.com/
[7]: https://img.shields.io/npm/dm/format-duration.svg?style=flat-square

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
format(1000 * 60) // '1:00'

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

// anything under a second is rounded down to zero
format(-999) // '0:00'

// 1000 milliseconds is a second
format(-1000) // '-0:01'

// 365 days looks like this (not bothering with years)
format(-1000 * 60 * 60 * 24 * 365) // '-365:00:00:00'

// with `leading` option, formatting looks like this
format(1000 * 60, { leading: true }) // '01:00'
format(1000 * 60 - 1, { leading: true }) // '00:59'
format(1000 * 60 * 60, { leading: true }) // '01:00:00'
```

## Contributing

Contributions welcome! Please read the [contributing guidelines](CONTRIBUTING.md) first.

## License

[ISC](LICENSE.md)
