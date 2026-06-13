export interface FormatDurationOptions {
  /** Zero-pad the leading (largest) unit to two digits. */
  leading?: boolean
  /** Append milliseconds as `.SSS`. */
  ms?: boolean
}

interface ParsedMs {
  days: number
  hours: number
  minutes: number
  seconds: number
  ms: number
}

// adapted from https://github.com/sindresorhus/parse-ms (now pure ESM).
function parseMs(ms: number): ParsedMs {
  return {
    days: Math.trunc(ms / 86400000),
    hours: Math.trunc(ms / 3600000) % 24,
    minutes: Math.trunc(ms / 60000) % 60,
    seconds: Math.trunc(ms / 1000) % 60,
    ms: Math.trunc(ms) % 1000
  }
}

const pad = (value: number, digits = 2): string => String(value).padStart(digits, '0')

function getSign(duration: number, showMs: boolean): string {
  if (showMs) return duration < 0 ? '-' : ''
  return duration <= -1000 ? '-' : ''
}

/**
 * Convert a number in milliseconds to a standard duration string.
 *
 * @param ms - duration in milliseconds
 * @param options - formatting options
 * @returns the formatted duration string
 */
export function formatDuration(ms: number, options: FormatDurationOptions = {}): string {
  if (typeof ms !== 'number') {
    throw new TypeError('Expected a number')
  }

  const { leading = false, ms: showMs = false } = options
  const sign = getSign(ms, showMs)
  const t = parseMs(Math.abs(ms))
  const seconds = pad(t.seconds)
  let output: string

  if (t.days) {
    output = `${sign}${t.days}:${pad(t.hours)}:${pad(t.minutes)}:${seconds}`
  } else if (t.hours) {
    output = `${sign}${leading ? pad(t.hours) : t.hours}:${pad(t.minutes)}:${seconds}`
  } else {
    output = `${sign}${leading ? pad(t.minutes) : t.minutes}:${seconds}`
  }

  if (showMs) output += `.${pad(t.ms, 3)}`
  return output
}

export default formatDuration
