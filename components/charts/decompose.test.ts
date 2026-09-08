import { describe, expect, it } from "vitest"
import { decompose } from "./decompose"

const makePoints = (values: number[]) =>
  values.map((v, i) => ({ t: `2020-${String(i + 1).padStart(2, "0")}-01`, v }))

describe("decompose", () => {
  it("recovers a flat series (trend = value, seasonal = 0, residual = 0)", () => {
    const points = makePoints(new Array(12).fill(10))
    const { trend, seasonal, residual } = decompose(points, 4)
    for (let i = 2; i < 10; i++) {
      expect(trend[i].v).toBeCloseTo(10)
      expect(residual[i].v).toBeCloseTo(0)
    }
    for (const s of seasonal) {
      expect(s.v).toBeCloseTo(0)
    }
  })

  it("reconstructs the original value as trend + seasonal + residual at interior points", () => {
    const points = makePoints([5, 8, 5, 2, 6, 9, 6, 3, 7, 10, 7, 4])
    const { trend, seasonal, residual } = decompose(points, 4)
    for (let i = 2; i < 10; i++) {
      expect(trend[i].v + seasonal[i].v + residual[i].v).toBeCloseTo(
        points[i].v
      )
    }
  })

  it("preserves timestamps and array length", () => {
    const points = makePoints([1, 2, 3, 4, 5, 6])
    const { trend, seasonal, residual } = decompose(points, 4)
    for (const series of [trend, seasonal, residual]) {
      expect(series).toHaveLength(points.length)
      series.forEach((p, i) => expect(p.t).toBe(points[i].t))
    }
  })
})
