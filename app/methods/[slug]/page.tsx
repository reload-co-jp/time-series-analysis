import { notFound } from "next/navigation"
import { getExample, getMethod, getMethods } from "@/lib/data"
import { Blocks } from "@/components/content/blocks"
import { PageTitle } from "@/components/elements/layout"
import { Tag } from "@/components/elements/tag"
import { RelatedLinks } from "@/components/elements/related-links"

export const generateStaticParams = () =>
  getMethods().map((method) => ({ slug: method.slug }))

export const generateMetadata = async ({
  params,
}: {
  params: Promise<{ slug: string }>
}) => {
  const { slug } = await params
  const method = getMethod(slug)
  if (!method) return {}
  return {
    title: `${method.title} | 時系列分析のすすめ`,
    description: method.description,
  }
}

const Page = async ({ params }: { params: Promise<{ slug: string }> }) => {
  const { slug } = await params
  const method = getMethod(slug)
  if (!method) notFound()

  const relatedMethods = method.relatedMethods
    .map((slug) => getMethod(slug))
    .filter((m) => m !== undefined)
  const relatedExamples = method.relatedExamples
    .map((slug) => getExample(slug))
    .filter((e) => e !== undefined)

  return (
    <article>
      <Tag>{method.category}</Tag>
      <PageTitle style={{ marginTop: ".5rem" }}>{method.title}</PageTitle>
      <Blocks blocks={method.blocks} />
      <RelatedLinks
        title="関連する手法"
        items={relatedMethods.map((m) => ({
          href: `/methods/${m.slug}/`,
          label: m.title,
        }))}
      />
      <RelatedLinks
        title="関連する可視化例"
        items={relatedExamples.map((e) => ({
          href: `/examples/${e.slug}/`,
          label: e.title,
        }))}
      />
    </article>
  )
}

export default Page
