const isEven = val => !(val % 2)

export const last = arr => arr[arr.length - 1]
export const withoutLast = arr => arr.slice(0, -1)

export const round = (val, numDecimalPoints = 2) =>
  Math.round(val * 10 ** numDecimalPoints) / 10 ** numDecimalPoints

export const range = arr =>
  arr.reduce(([min, max], next) => [Math.min(min, next), Math.max(max, next)], [
    Infinity,
    -Infinity,
  ])

export const mean = arr => arr.reduce((x, y) => x + y) / arr.length

export const median = arr =>
  isEven(arr.length)
    ? mean(arr.slice(arr.length / 2 - 1, arr.length / 2 + 1))
    : arr[Math.floor(arr.length / 2)]
