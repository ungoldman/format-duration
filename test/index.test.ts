import assert from 'node:assert/strict'
import { test } from 'node:test'
import fc from 'fast-check'
import fdDefault, { formatDuration as f } from '../src/index.ts'

const SECOND = 1000
const MINUTE = SECOND * 60
const HOUR = MINUTE * 60
const DAY = HOUR * 24

test('it works', () => {
  assert.equal(f(999), '0:00', 'anything under a second is 0:00')
  assert.equal(f(SECOND), '0:01', '1000 milliseconds is a second')
  assert.equal(f(SECOND * 2 - 1), '0:01', 'rounds 1999 down to 0:01')
  assert.equal(f(MINUTE), '1:00', '60 seconds is a minute')
  assert.equal(f(MINUTE - 1), '0:59', '59 seconds looks ok')
  assert.equal(f(HOUR), '1:00:00', '60 minutes is an hour')
  assert.equal(f(HOUR - 1), '59:59', '59 minutes looks ok')
  assert.equal(f(DAY), '1:00:00:00', '24 hours is a day')
  assert.equal(f(DAY - 1), '23:59:59', '23 hours looks ok')
  assert.equal(f(DAY * 365), '365:00:00:00', '365 days is too long to care')
})

test('it works with negative durations', () => {
  assert.equal(f(-999), '0:00', 'anything under a second is 0:00')
  assert.equal(f(-SECOND), '-0:01', '-1000 milliseconds is a second')
  assert.equal(f(-SECOND * 2 + 1), '-0:01', 'rounds -1999 up to -0:01')
  assert.equal(f(-MINUTE), '-1:00', '-60 seconds is a minute')
  assert.equal(f(-MINUTE + 1), '-0:59', '-59 seconds looks ok')
  assert.equal(f(-HOUR), '-1:00:00', '-60 minutes is an hour')
  assert.equal(f(-HOUR + 1), '-59:59', '-59 minutes looks ok')
  assert.equal(f(-DAY), '-1:00:00:00', '-24 hours is a day')
  assert.equal(f(-DAY + 1), '-23:59:59', '-23 hours looks ok')
  assert.equal(f(-DAY * 365), '-365:00:00:00', '-365 days is too long to care')
})

test('it works with leading zeros', () => {
  assert.equal(f(999, { leading: true }), '00:00', 'anything under a second is 00:00')
  assert.equal(f(SECOND, { leading: true }), '00:01', '1000 milliseconds is a second')
  assert.equal(f(SECOND * 2 - 1, { leading: true }), '00:01', 'rounds 1999 down to 00:01')
  assert.equal(f(MINUTE, { leading: true }), '01:00', '60 seconds is a minute')
  assert.equal(f(MINUTE - 1, { leading: true }), '00:59', '59 seconds looks ok')
  assert.equal(f(HOUR, { leading: true }), '01:00:00', '60 minutes is an hour')
  assert.equal(f(HOUR - 1, { leading: true }), '59:59', '59 minutes looks ok')
  assert.equal(f(DAY, { leading: true }), '1:00:00:00', '24 hours is a day (days unit not padded)')
  assert.equal(f(DAY - 1, { leading: true }), '23:59:59', '23 hours looks ok')
  assert.equal(f(DAY * 365, { leading: true }), '365:00:00:00', '365 days is too long to care')
})

test('it works with leading zeros and milliseconds', () => {
  assert.equal(f(999, { leading: true, ms: true }), '00:00.999', 'under a second displayed')
  assert.equal(f(SECOND, { leading: true, ms: true }), '00:01.000', '1000 milliseconds is a second')
  assert.equal(f(SECOND * 2 - 1, { leading: true, ms: true }), '00:01.999', '1999 as 00:01.999')
  assert.equal(f(MINUTE, { leading: true, ms: true }), '01:00.000', '60 seconds is a minute')
  assert.equal(f(MINUTE - 1, { leading: true, ms: true }), '00:59.999', '59.999 seconds looks ok')
  assert.equal(f(HOUR, { leading: true, ms: true }), '01:00:00.000', '60 minutes is an hour')
  assert.equal(f(HOUR - 1, { leading: true, ms: true }), '59:59.999', '59 min 999 ms looks ok')
  assert.equal(
    f(DAY, { leading: true, ms: true }),
    '1:00:00:00.000',
    '24 hours is a day (days unit not padded)'
  )
  assert.equal(f(DAY - 1, { leading: true, ms: true }), '23:59:59.999', '23 hours 999 ms looks ok')
  assert.equal(f(DAY * 365, { leading: true, ms: true }), '365:00:00:00.000', 'too long to care')
})

test('it works with negative durations and milliseconds', () => {
  assert.equal(f(-999, { ms: true }), '-0:00.999', 'under a second with negative sign')
  assert.equal(f(-SECOND, { ms: true }), '-0:01.000', '-1000 milliseconds is a second')
  assert.equal(f(-SECOND * 2 + 1, { ms: true }), '-0:01.999', '-1999 as -0:01.999')
  assert.equal(f(-MINUTE, { ms: true }), '-1:00.000', '-60 seconds is a minute')
  assert.equal(f(-MINUTE + 1, { ms: true }), '-0:59.999', '-59.999 seconds looks ok')
  assert.equal(f(-HOUR, { ms: true }), '-1:00:00.000', '-60 minutes is an hour')
  assert.equal(f(-HOUR + 1, { ms: true }), '-59:59.999', '-59 min 999 ms looks ok')
  assert.equal(f(-DAY, { ms: true }), '-1:00:00:00.000', '-24 hours is a day')
  assert.equal(f(-DAY + 1, { ms: true }), '-23:59:59.999', '-23 hours 999 ms looks ok')
  assert.equal(f(-DAY * 365, { ms: true }), '-365:00:00:00.000', 'too long to care')
})

test('it throws on non-number input', () => {
  // @ts-expect-error: deliberately passing a non-number
  assert.throws(() => f('100'), TypeError, 'string throws')
  // @ts-expect-error: deliberately passing undefined
  assert.throws(() => f(undefined), TypeError, 'undefined throws')
})

test('default export is the named export', () => {
  assert.equal(fdDefault, f, 'default and named exports are the same function')
  assert.equal(fdDefault(SECOND), '0:01', 'default export is callable')
})

// Property tests: assert structural invariants across the whole input space,
// not just the hand-picked values above. fc.assert throws on a counterexample,
// which fails the surrounding test.
const anyMs = fc.integer({ min: -(DAY * 1000), max: DAY * 1000 })

test('property: output always matches the duration grammar', () => {
  fc.assert(
    fc.property(anyMs, fc.boolean(), fc.boolean(), (ms, leading, withMs) => {
      const out = f(ms, { leading, ms: withMs })
      return /^-?\d+(:\d{2})*(\.\d{3})?$/.test(out)
    })
  )
})

test('property: sub-second magnitudes are never sign-prefixed without ms', () => {
  fc.assert(fc.property(fc.integer({ min: -999, max: 999 }), (ms) => !f(ms).startsWith('-')))
})

test('property: milliseconds output always ends in .SSS', () => {
  fc.assert(
    fc.property(anyMs, fc.boolean(), (ms, leading) => /\.\d{3}$/.test(f(ms, { leading, ms: true })))
  )
})
