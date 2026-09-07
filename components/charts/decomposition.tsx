import { FC } from "react"
import type { SeriesFile } from "@/lib/types"
import { decompose } from "./decompose"
import { LineChart } from "./line-chart"

const FREQUENCY_PERIOD: Record<SeriesFile["frequency"], number> = {
  daily: 7,
  weekly: 52,
  monthly: 12,
  quarterly: 4,
  yearly: 1,
}

export const Decomposition: FC<{ data: SeriesFile; caption?: string }> = ({
  data,
  caption,
}) => {
  const points = data.series[0]?.points ?? []
  const period = FREQUENCY_PERIOD[data.frequency]
  const { trend, seasonal, residual } = decompose(points, period)

  const panel = (label: string, series: typeof points) => ({
    name: `${data.name} — ${label}`,
    unit: data.unit,
    frequency: data.frequency,
    series: [{ label, points: series }],
  })

  return (
    <div style={{ display: "grid", gap: "1rem" }}>
      <LineChart data={panel("原系列", points)} caption={caption} />
      <LineChart data={panel("トレンド", trend)} />
      <LineChart data={panel("季節性", seasonal)} />
      <LineChart data={panel("残差", residual)} />
    </div>
  )
}
