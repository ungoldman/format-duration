// adapted from https://github.com/sindresorhus/parse-ms.
// moved to internal function because parse-ms is now pure ESM.
function parseMs (milliseconds) {
  if (typeof milliseconds !== 'number') {
    throw new TypeError('Expected a number')
  }

  return {
    days: Math.trunc(milliseconds / 86400000),
    hours: Math.trunc(milliseconds / 3600000) % 24,
    minutes: Math.trunc(milliseconds / 60000) % 60,
    seconds: Math.trunc(milliseconds / 1000) % 60,
    milliseconds: Math.trunc(milliseconds) % 1000
  }
}

// adapted from https://github.com/rafaelrinaldi/add-zero.
// moved to internal function b/c addZero is unmaintained (7+ years).
// stripped out negative sign logic since we're already doing it elsewhere.
function addZero (value, digits) {
  digits = digits || 2

  let str = value.toString()
  let size = 0

  size = digits - str.length + 1
  str = new Array(size).join('0').concat(str)

  return str
}

/**
 * Convert a number in milliseconds to a standard duration string.
 * @param {number} ms - duration in milliseconds
 * @param {object} options - formatDuration options object
 * @param {boolean} [options.leading=false] - add leading zero
 * @returns string - formatted duration string
 */
function formatDuration (ms, options) {
  const leading = options && options.leading
  const unsignedMs = ms < 0 ? -ms : ms
  const sign = ms <= -1000 ? '-' : ''
  const t = parseMs(unsignedMs)
  const seconds = addZero(t.seconds)
  if (t.days) return sign + t.days + ':' + addZero(t.hours) + ':' + addZero(t.minutes) + ':' + seconds
  if (t.hours) return sign + (leading ? addZero(t.hours) : t.hours) + ':' + addZero(t.minutes) + ':' + seconds
  return sign + (leading ? addZero(t.minutes) : t.minutes) + ':' + seconds
}

module.exports = formatDuration
