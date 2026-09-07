import { notFound } from "next/navigation"
import { getMethod, getTopic, getTopics } from "@/lib/data"
import { Blocks } from "@/components/content/blocks"
import { PageTitle } from "@/components/elements/layout"
import { Tag } from "@/components/elements/tag"
import { RelatedLinks } from "@/components/elements/related-links"

export const generateStaticParams = () =>
  getTopics().map((topic) => ({ slug: topic.slug }))

export const generateMetadata = async ({
  params,
}: {
  params: Promise<{ slug: string }>
}) => {
  const { slug } = await params
  const topic = getTopic(slug)
  if (!topic) return {}
  return {
    title: `${topic.title} | 時系列分析のすすめ`,
    description: topic.description,
  }
}

const Page = async ({ params }: { params: Promise<{ slug: string }> }) => {
  const { slug } = await params
  const topic = getTopic(slug)
  if (!topic) notFound()

  const relatedMethods = topic.relatedMethods
    .map((slug) => getMethod(slug))
    .filter((method) => method !== undefined)

  return (
    <article>
      <Tag>{topic.publishedAt}</Tag>
      <PageTitle style={{ marginTop: ".5rem" }}>{topic.title}</PageTitle>
      <Blocks blocks={topic.blocks} />
      <RelatedLinks
        title="関連する手法"
        items={relatedMethods.map((method) => ({
          href: `/methods/${method.slug}/`,
          label: method.title,
        }))}
      />
    </article>
  )
}

export default Page
