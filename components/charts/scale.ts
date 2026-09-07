export type LinearScale = (value: number) => number

/**
 * Maps a value from [domainMin, domainMax] to [rangeMin, rangeMax] linearly.
 * A degenerate domain (min === max) maps every value to the range midpoint.
 */
export const createLinearScale = (
  domain: [number, number],
  range: [number, number],
): LinearScale => {
  const [domainMin, domainMax] = domain
  const [rangeMin, rangeMax] = range
  const domainSpan = domainMax - domainMin

  if (domainSpan === 0) {
    const mid = (rangeMin + rangeMax) / 2
    return () => mid
  }

  return (value: number) =>
    rangeMin + ((value - domainMin) / domainSpan) * (rangeMax - rangeMin)
}

export const getDomain = (values: number[]): [number, number] => {
  if (values.length === 0) return [0, 1]
  let min = values[0]
  let max = values[0]
  for (const value of values) {
    if (value < min) min = value
    if (value > max) max = value
  }
  return min === max ? [min - 1, max + 1] : [min, max]
}

/**
 * Produces `count` evenly spaced tick values spanning the domain, inclusive of both ends.
 */
export const getTicks = (
  domain: [number, number],
  count: number,
): number[] => {
  const [min, max] = domain
  if (count <= 1) return [min]
  const step = (max - min) / (count - 1)
  return Array.from({ length: count }, (_, i) => min + step * i)
}
