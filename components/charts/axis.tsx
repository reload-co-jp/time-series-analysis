import { FC } from "react"

export const YAxis: FC<{
  ticks: { pos: number; label: string }[]
  x: number
}> = ({ ticks, x }) => (
  <g>
    {ticks.map((tick) => (
      <g key={tick.label}>
        <text
          x={x - 8}
          y={tick.pos}
          fill="#888"
          fontSize={10}
          textAnchor="end"
          dominantBaseline="middle"
        >
          {tick.label}
        </text>
      </g>
    ))}
  </g>
)

export const XAxis: FC<{
  ticks: { pos: number; label: string }[]
  y: number
}> = ({ ticks, y }) => (
  <g>
    {ticks.map((tick) => (
      <text
        key={tick.label}
        x={tick.pos}
        y={y + 16}
        fill="#888"
        fontSize={10}
        textAnchor="middle"
      >
        {tick.label}
      </text>
    ))}
  </g>
)
