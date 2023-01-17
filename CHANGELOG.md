# format-duration change log

All notable changes to this project will be documented in this file.
This project adheres to [Semantic Versioning](http://semver.org/).

## 3.0.2 - 2023-01-17

### Fixes
- Move FormatDurationOptions under namespace formatDuration (#20) - thanks @sebinemeth

## 3.0.1 - 2022-12-18

### Fixes
- Fix typo to load types properly (#18) - thanks @petrbela

### Misc
- Fix repo URL in package.json

## 3.0.0 - 2022-12-12

### Breaking
- Drop support for Node 12

### Features
- New option: `ms` (show milliseconds) (#17)
- TypeScript: Export FormatDurationOptions (#15)

### Misc
- CI: add Node 18 to test matrix

## 2.0.0 - 2022-03-16

### Breaking Changes
- Drop support for node 8 & 10 (now only supporting node LTS: 12, 14, 16).

### Misc
- No dependencies! Code from parse-ms and add-zero has been consolidated for easier maintenance and smaller module footprint.
- Repo ownership transfer (hypermodules -> ungoldman). Same maintainers, new URL.

## 1.4.0 - 2021-08-04

### Features
- add type definitions (#5) - thanks @guytepper

## 1.3.1 - 2018-10-11

### Fixes
- update URLs to reflect ownership transfer to hypermodules

## 1.3.0 - 2018-10-11

### Features
- add option for leading zeros (hours, minutes, seconds) (#3) - thanks @Deseteral

## 1.2.0 - 2018-07-24

### Features
- convert to es5 (#2)

## 1.1.0 - 2018-02-23

### Features
- add support for negative durations (#1) - thanks @lrn2prgrm

## 1.0.1 - 2018-02-23

### Chores
- update license
- update contributing guidelines
- update author field
- add downloads badge to readme

## 1.0.0 - 2016-08-26
- initial release
