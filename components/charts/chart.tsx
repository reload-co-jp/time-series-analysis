import type { ChartType } from "@/lib/types"
import { getSeries } from "@/lib/data"
import { LineChart } from "./line-chart"
import { BarChart } from "./bar-chart"
import { ScatterChart } from "./scatter-chart"
import { Decomposition } from "./decomposition"

export const Chart = async ({
  seriesRef,
  chartType,
  caption,
}: {
  seriesRef: string
  chartType: ChartType
  caption?: string
}) => {
  const data = await getSeries(seriesRef)

  switch (chartType) {
    case "line":
    case "multi-line":
      return <LineChart data={data} caption={caption} />
    case "bar":
      return <BarChart data={data} caption={caption} />
    case "scatter":
      return <ScatterChart data={data} caption={caption} />
    case "decomposition":
      return <Decomposition data={data} caption={caption} />
  }
}
