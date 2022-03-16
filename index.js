const parseMs = require('parse-ms')
const addZero = require('add-zero')

module.exports = function (ms, options) {
  const leading = options && options.leading
  const unsignedMs = ms < 0 ? -ms : ms
  const sign = ms <= -1000 ? '-' : ''
  const t = parseMs(unsignedMs)
  const seconds = addZero(t.seconds)
  if (t.days) return sign + t.days + ':' + addZero(t.hours) + ':' + addZero(t.minutes) + ':' + seconds
  if (t.hours) return sign + (leading ? addZero(t.hours) : t.hours) + ':' + addZero(t.minutes) + ':' + seconds
  return sign + (leading ? addZero(t.minutes) : t.minutes) + ':' + seconds
}
