import { describe, expect, it } from "vitest"
import { createLinearScale, getDomain, getTicks } from "./scale"

describe("createLinearScale", () => {
  it("maps domain endpoints to range endpoints", () => {
    const scale = createLinearScale([0, 10], [0, 100])
    expect(scale(0)).toBe(0)
    expect(scale(10)).toBe(100)
    expect(scale(5)).toBe(50)
  })

  it("supports an inverted range", () => {
    const scale = createLinearScale([0, 10], [100, 0])
    expect(scale(0)).toBe(100)
    expect(scale(10)).toBe(0)
  })

  it("maps a degenerate domain to the range midpoint", () => {
    const scale = createLinearScale([5, 5], [0, 100])
    expect(scale(5)).toBe(50)
  })
})

describe("getDomain", () => {
  it("returns min and max of the values", () => {
    expect(getDomain([3, 1, 4, 1, 5, 9])).toEqual([1, 9])
  })

  it("pads a single repeated value", () => {
    expect(getDomain([7, 7, 7])).toEqual([6, 8])
  })

  it("defaults to [0, 1] for an empty array", () => {
    expect(getDomain([])).toEqual([0, 1])
  })
})

describe("getTicks", () => {
  it("produces evenly spaced ticks including both ends", () => {
    expect(getTicks([0, 10], 5)).toEqual([0, 2.5, 5, 7.5, 10])
  })

  it("returns only the domain minimum for count <= 1", () => {
    expect(getTicks([0, 10], 1)).toEqual([0])
  })
})
