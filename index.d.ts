interface FormatDurationOptions {
  /**
   * Adds leading zero to the formatted string.
   */
  leading: boolean
}

/**
 * Convert a number in milliseconds to a standard duration string.
 *
 * @param {number} ms The number to format.
 * @param {object} options - Formatting options
 * @returns {string} The formatted duration string.
 */
 declare function formatDuration (ms: number, options?: FormatDurationOptions): string

 export = formatDuration
