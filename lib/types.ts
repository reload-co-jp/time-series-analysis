export type ContentBlock =
  | { type: "paragraph"; text: string }
  | { type: "heading"; level: 2 | 3; text: string }
  | { type: "list"; ordered?: boolean; items: string[] }
  | { type: "math"; tex: string }
  | { type: "code"; language: string; code: string }
  | { type: "chart"; seriesRef: string; chartType: ChartType; caption?: string }
  | { type: "note"; text: string }

export type ChartType = "line" | "multi-line" | "bar" | "scatter" | "decomposition"

export type MethodCategory =
  | "理論的基盤"
  | "基礎統計"
  | "古典的モデル"
  | "状態空間"
  | "機械学習"
  | "深層学習"

export type Lecture = {
  slug: string
  order: number
  chapter: string
  title: string
  description: string
  blocks: ContentBlock[]
  relatedMethods: string[]
}

export type Method = {
  slug: string
  category: MethodCategory
  title: string
  description: string
  blocks: ContentBlock[]
  relatedMethods: string[]
  relatedExamples: string[]
}

export type Example = {
  slug: string
  title: string
  description: string
  methodSlug: string
  seriesRef: string
  chartType: ChartType
  blocks: ContentBlock[]
}

export type Topic = {
  slug: string
  publishedAt: string
  title: string
  description: string
  blocks: ContentBlock[]
  relatedMethods: string[]
}

export type SeriesPoint = { t: string; v: number }

export type SeriesFile = {
  name: string
  unit?: string
  frequency: "daily" | "weekly" | "monthly" | "quarterly" | "yearly"
  series: {
    label: string
    points: SeriesPoint[]
  }[]
}
