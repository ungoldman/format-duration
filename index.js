const parseMs = require('parse-ms')
const addZero = require('add-zero')

module.exports = (ms) => {
  const unsignedMs = ms < 0 ? -ms : ms
  const sign = ms <= -1000 ? '-' : ''
  let { days, hours, minutes, seconds } = parseMs(unsignedMs)
  seconds = addZero(seconds)
  if (days) return `${sign}${days}:${addZero(hours)}:${addZero(minutes)}:${seconds}`
  if (hours) return `${sign}${hours}:${addZero(minutes)}:${seconds}`
  return `${sign}${minutes}:${seconds}`
}
