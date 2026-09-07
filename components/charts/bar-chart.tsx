import { FC } from "react"
import type { SeriesFile } from "@/lib/types"
import { createLinearScale, getDomain } from "./scale"
import { YAxis } from "./axis"
import { getTicks } from "./scale"
import { accentColors } from "@/components/elements/layout"

const WIDTH = 640
const HEIGHT = 320
const PADDING = { top: 16, right: 16, bottom: 32, left: 48 }

export const BarChart: FC<{ data: SeriesFile; caption?: string }> = ({
  data,
  caption,
}) => {
  const points = data.series[0]?.points ?? []
  const yDomain = getDomain(points.map((p) => Math.min(0, p.v)).concat(points.map((p) => p.v)))
  const yScale = createLinearScale(yDomain, [
    HEIGHT - PADDING.bottom,
    PADDING.top,
  ])
  const yTicks = getTicks(yDomain, 4).map((v) => ({
    pos: yScale(v),
    label: v.toFixed(0),
  }))

  const plotWidth = WIDTH - PADDING.left - PADDING.right
  const barSlot = plotWidth / Math.max(points.length, 1)
  const barWidth = barSlot * 0.7
  const zeroY = yScale(0)

  return (
    <figure
      style={{ margin: 0 }}
      role="img"
      aria-label={caption ?? data.name}
    >
      <svg
        viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
        width="100%"
        style={{
          background: "#fff",
          border: "1px solid #e0e0e0",
          borderRadius: ".25rem",
        }}
      >
        <YAxis ticks={yTicks} x={PADDING.left} />
        {points.map((point, i) => {
          const x = PADDING.left + i * barSlot + (barSlot - barWidth) / 2
          const y = yScale(point.v)
          const height = Math.abs(zeroY - y)
          return (
            <rect
              key={point.t}
              x={x}
              y={Math.min(y, zeroY)}
              width={barWidth}
              height={height}
              fill={accentColors[0]}
            />
          )
        })}
      </svg>
      {caption && (
        <figcaption
          style={{ color: "#555", fontSize: ".875rem", marginTop: ".5rem" }}
        >
          {caption}
        </figcaption>
      )}
    </figure>
  )
}
