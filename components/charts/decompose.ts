import type { SeriesPoint } from "@/lib/types"

export type Decomposition = {
  trend: SeriesPoint[]
  seasonal: SeriesPoint[]
  residual: SeriesPoint[]
}

/**
 * Naive additive decomposition: trend = centered moving average over `period`,
 * seasonal = average detrended value per period-index, residual = value - trend - seasonal.
 * Points at the series edges (where a centered window doesn't fit) have no trend/residual.
 */
export const decompose = (
  points: SeriesPoint[],
  period: number
): Decomposition => {
  const n = points.length
  const half = Math.floor(period / 2)
  const trend: (number | null)[] = points.map((_, i) => {
    if (i < half || i >= n - half) return null
    let sum = 0
    for (let k = -half; k <= half; k++) sum += points[i + k].v
    return sum / (2 * half + 1)
  })

  const seasonalSums = new Array(period).fill(0)
  const seasonalCounts = new Array(period).fill(0)
  points.forEach((point, i) => {
    const t = trend[i]
    if (t === null) return
    const idx = i % period
    seasonalSums[idx] += point.v - t
    seasonalCounts[idx] += 1
  })
  const seasonalByIndex = seasonalSums.map((sum, i) =>
    seasonalCounts[i] > 0 ? sum / seasonalCounts[i] : 0
  )

  return {
    trend: points.map((p, i) => ({ t: p.t, v: trend[i] ?? p.v })),
    seasonal: points.map((p, i) => ({
      t: p.t,
      v: seasonalByIndex[i % period],
    })),
    residual: points.map((p, i) => {
      const t = trend[i]
      if (t === null) return { t: p.t, v: 0 }
      return { t: p.t, v: p.v - t - seasonalByIndex[i % period] }
    }),
  }
}
