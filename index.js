var parseMs = require('parse-ms')
var addZero = require('add-zero')

module.exports = function (ms) {
  var unsignedMs = ms < 0 ? -ms : ms
  var sign = ms <= -1000 ? '-' : ''
  var t = parseMs(unsignedMs)
  var seconds = addZero(t.seconds)
  if (t.days) return sign + t.days + ':' + addZero(t.hours) + ':' + addZero(t.minutes) + ':' + seconds
  if (t.hours) return sign + t.hours + ':' + addZero(t.minutes) + ':' + seconds
  return sign + t.minutes + ':' + seconds
}
