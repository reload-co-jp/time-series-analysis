import { describe, expect, it } from "vitest"
import {
  getExample,
  getExamples,
  getLecture,
  getLectures,
  getMethod,
  getMethods,
  getSeries,
  getTopic,
  getTopics,
} from "./data"

const isUniqueBy = <T, K>(items: T[], key: (item: T) => K) => {
  const seen = new Set<K>()
  for (const item of items) {
    const k = key(item)
    if (seen.has(k)) return false
    seen.add(k)
  }
  return true
}

const isIsoDate = (value: string) => !Number.isNaN(Date.parse(value))

describe("lectures", () => {
  it("has unique slugs", () => {
    expect(isUniqueBy(getLectures(), (l) => l.slug)).toBe(true)
  })

  it("resolves each lecture by slug", () => {
    for (const lecture of getLectures()) {
      expect(getLecture(lecture.slug)).toBe(lecture)
    }
  })

  it("is sorted by order ascending", () => {
    const orders = getLectures().map((l) => l.order)
    expect(orders).toEqual([...orders].sort((a, b) => a - b))
  })

  it("references only existing methods", () => {
    const methodSlugs = new Set(getMethods().map((m) => m.slug))
    for (const lecture of getLectures()) {
      for (const ref of lecture.relatedMethods) {
        expect(methodSlugs.has(ref)).toBe(true)
      }
    }
  })
})

describe("methods", () => {
  it("has unique slugs", () => {
    expect(isUniqueBy(getMethods(), (m) => m.slug)).toBe(true)
  })

  it("resolves each method by slug", () => {
    for (const method of getMethods()) {
      expect(getMethod(method.slug)).toBe(method)
    }
  })

  it("references only existing methods and examples", () => {
    const methodSlugs = new Set(getMethods().map((m) => m.slug))
    const exampleSlugs = new Set(getExamples().map((e) => e.slug))
    for (const method of getMethods()) {
      for (const ref of method.relatedMethods) {
        expect(methodSlugs.has(ref)).toBe(true)
      }
      for (const ref of method.relatedExamples) {
        expect(exampleSlugs.has(ref)).toBe(true)
      }
    }
  })
})

describe("examples", () => {
  it("has unique slugs", () => {
    expect(isUniqueBy(getExamples(), (e) => e.slug)).toBe(true)
  })

  it("resolves each example by slug", () => {
    for (const example of getExamples()) {
      expect(getExample(example.slug)).toBe(example)
    }
  })

  it("references an existing method", () => {
    const methodSlugs = new Set(getMethods().map((m) => m.slug))
    for (const example of getExamples()) {
      expect(methodSlugs.has(example.methodSlug)).toBe(true)
    }
  })

  it("references a resolvable series file", async () => {
    for (const example of getExamples()) {
      const series = await getSeries(example.seriesRef)
      expect(series.series.length).toBeGreaterThan(0)
    }
  })
})

describe("topics", () => {
  it("has unique slugs", () => {
    expect(isUniqueBy(getTopics(), (t) => t.slug)).toBe(true)
  })

  it("resolves each topic by slug", () => {
    for (const topic of getTopics()) {
      expect(getTopic(topic.slug)).toBe(topic)
    }
  })

  it("has valid ISO publishedAt dates, sorted descending", () => {
    const topics = getTopics()
    for (const topic of topics) {
      expect(isIsoDate(topic.publishedAt)).toBe(true)
    }
    const times = topics.map((t) => new Date(t.publishedAt).getTime())
    expect(times).toEqual([...times].sort((a, b) => b - a))
  })

  it("references only existing methods", () => {
    const methodSlugs = new Set(getMethods().map((m) => m.slug))
    for (const topic of getTopics()) {
      for (const ref of topic.relatedMethods) {
        expect(methodSlugs.has(ref)).toBe(true)
      }
    }
  })
})
