import type { MetadataRoute } from "next"
import { getExamples, getLectures, getMethods, getTopics } from "@/lib/data"

export const dynamic = "force-static"

const baseUrl = "https://tsa.reload.co.jp"

const sitemap = (): MetadataRoute.Sitemap => {
  const staticPages: MetadataRoute.Sitemap = [
    { url: `${baseUrl}/`, changeFrequency: "monthly", priority: 1 },
    { url: `${baseUrl}/lectures/`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${baseUrl}/methods/`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${baseUrl}/examples/`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${baseUrl}/topics/`, changeFrequency: "weekly", priority: 0.8 },
  ]

  const lecturePages: MetadataRoute.Sitemap = getLectures().map((lecture) => ({
    url: `${baseUrl}/lectures/${lecture.slug}/`,
    changeFrequency: "monthly",
    priority: 0.6,
  }))

  const methodPages: MetadataRoute.Sitemap = getMethods().map((method) => ({
    url: `${baseUrl}/methods/${method.slug}/`,
    changeFrequency: "monthly",
    priority: 0.6,
  }))

  const examplePages: MetadataRoute.Sitemap = getExamples().map((example) => ({
    url: `${baseUrl}/examples/${example.slug}/`,
    changeFrequency: "monthly",
    priority: 0.6,
  }))

  const topicPages: MetadataRoute.Sitemap = getTopics().map((topic) => ({
    url: `${baseUrl}/topics/${topic.slug}/`,
    lastModified: new Date(topic.publishedAt),
    changeFrequency: "monthly",
    priority: 0.6,
  }))

  return [
    ...staticPages,
    ...lecturePages,
    ...methodPages,
    ...examplePages,
    ...topicPages,
  ]
}

export default sitemap
