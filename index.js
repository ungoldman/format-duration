var parseMs = require('parse-ms')
var addZero = require('add-zero')

/**
 * formatDuration converts a number in milliseconds to a standard duration string.
 * @param  {number}  ms                       ms The number to format.
 * @param  {object}  [options]                Formatting options
 * @param  {boolean} [options.leading=false]  Adds leading zero to the formatted string.
 * @return {string}                           The formatted duration string.
 */
function formatDuration (ms, options) {
  var leading = options && options.leading
  var unsignedMs = ms < 0 ? -ms : ms
  var sign = ms <= -1000 ? '-' : ''
  var t = parseMs(unsignedMs)
  var seconds = addZero(t.seconds)
  if (t.days) return sign + t.days + ':' + addZero(t.hours) + ':' + addZero(t.minutes) + ':' + seconds
  if (t.hours) return sign + (leading ? addZero(t.hours) : t.hours) + ':' + addZero(t.minutes) + ':' + seconds
  return sign + (leading ? addZero(t.minutes) : t.minutes) + ':' + seconds
}

module.exports = formatDuration
