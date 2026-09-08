import { notFound } from "next/navigation"
import { getExample, getExamples, getMethod } from "@/lib/data"
import { Blocks } from "@/components/content/blocks"
import { PageTitle } from "@/components/elements/layout"
import { RelatedLinks } from "@/components/elements/related-links"
import { JsonLd, articleJsonLd, breadcrumbJsonLd } from "@/lib/jsonld"

export const generateStaticParams = () =>
  getExamples().map((example) => ({ slug: example.slug }))

export const generateMetadata = async ({
  params,
}: {
  params: Promise<{ slug: string }>
}) => {
  const { slug } = await params
  const example = getExample(slug)
  if (!example) return {}
  return {
    title: `${example.title} | 時系列分析のすすめ`,
    description: example.description,
  }
}

const Page = async ({ params }: { params: Promise<{ slug: string }> }) => {
  const { slug } = await params
  const example = getExample(slug)
  if (!example) notFound()

  const method = getMethod(example.methodSlug)

  return (
    <article>
      <JsonLd
        data={articleJsonLd({
          headline: example.title,
          description: example.description,
          path: `/examples/${example.slug}/`,
        })}
      />
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "可視化例", path: "/examples/" },
          { name: example.title, path: `/examples/${example.slug}/` },
        ])}
      />
      <PageTitle>{example.title}</PageTitle>
      <Blocks blocks={example.blocks} />
      <RelatedLinks
        title="適用した手法"
        items={
          method
            ? [{ href: `/methods/${method.slug}/`, label: method.title }]
            : []
        }
      />
    </article>
  )
}

export default Page
