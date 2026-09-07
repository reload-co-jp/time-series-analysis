import lecturesData from "@/data/lectures.json"
import methodsData from "@/data/methods.json"
import examplesData from "@/data/examples.json"
import topicsData from "@/data/topics.json"
import type { Example, Lecture, Method, SeriesFile, Topic } from "@/lib/types"

const lectures = lecturesData as Lecture[]
const methods = methodsData as Method[]
const examples = examplesData as Example[]
const topics = topicsData as Topic[]

export const getLectures = (): Lecture[] =>
  [...lectures].sort((a, b) => a.order - b.order)

export const getLecture = (slug: string): Lecture | undefined =>
  lectures.find((lecture) => lecture.slug === slug)

export const getMethods = (): Method[] => methods

export const getMethodsByCategory = (): [string, Method[]][] => {
  const grouped = new Map<string, Method[]>()
  for (const method of methods) {
    const list = grouped.get(method.category) ?? []
    list.push(method)
    grouped.set(method.category, list)
  }
  return Array.from(grouped.entries())
}

export const getMethod = (slug: string): Method | undefined =>
  methods.find((method) => method.slug === slug)

export const getExamples = (): Example[] => examples

export const getExample = (slug: string): Example | undefined =>
  examples.find((example) => example.slug === slug)

export const getTopics = (): Topic[] =>
  [...topics].sort(
    (a, b) =>
      new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime(),
  )

export const getTopic = (slug: string): Topic | undefined =>
  topics.find((topic) => topic.slug === slug)

export const getSeries = async (ref: string): Promise<SeriesFile> => {
  const mod = (await import(`../data/series/${ref}.json`)) as {
    default: SeriesFile
  }
  return mod.default
}
