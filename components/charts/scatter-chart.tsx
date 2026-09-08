import { FC } from "react"
import type { SeriesFile } from "@/lib/types"
import { createLinearScale, getDomain, getTicks } from "./scale"
import { XAxis, YAxis } from "./axis"
import { accentColors } from "@/components/elements/layout"

const WIDTH = 640
const HEIGHT = 320
const PADDING = { top: 16, right: 16, bottom: 32, left: 48 }

const formatDate = (iso: string) => {
  const date = new Date(iso)
  return `${date.getFullYear()}/${date.getMonth() + 1}`
}

export const ScatterChart: FC<{ data: SeriesFile; caption?: string }> = ({
  data,
  caption,
}) => {
  const points = data.series[0]?.points ?? []
  const xDomain = getDomain(points.map((p) => new Date(p.t).getTime()))
  const yDomain = getDomain(points.map((p) => p.v))

  const xScale = createLinearScale(xDomain, [
    PADDING.left,
    WIDTH - PADDING.right,
  ])
  const yScale = createLinearScale(yDomain, [
    HEIGHT - PADDING.bottom,
    PADDING.top,
  ])

  const xTicks = getTicks(xDomain, 4).map((t) => ({
    pos: xScale(t),
    label: formatDate(new Date(t).toISOString()),
  }))
  const yTicks = getTicks(yDomain, 4).map((v) => ({
    pos: yScale(v),
    label: v.toFixed(0),
  }))

  return (
    <figure style={{ margin: 0 }} role="img" aria-label={caption ?? data.name}>
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
        <XAxis ticks={xTicks} y={HEIGHT - PADDING.bottom} />
        {points.map((point) => (
          <circle
            key={point.t}
            cx={xScale(new Date(point.t).getTime())}
            cy={yScale(point.v)}
            r={3}
            fill={accentColors[0]}
          />
        ))}
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
