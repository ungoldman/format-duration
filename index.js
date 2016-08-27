const parseMs = require('parse-ms')
const addZero = require('add-zero')

module.exports = (ms) => {
  let { days, hours, minutes, seconds } = parseMs(ms)
  seconds = addZero(seconds)
  if (days) return `${days}:${addZero(hours)}:${addZero(minutes)}:${seconds}`
  if (hours) return `${hours}:${addZero(minutes)}:${seconds}`
  return `${minutes}:${seconds}`
}
