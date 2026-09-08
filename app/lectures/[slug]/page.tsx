import { notFound } from "next/navigation"
import { getLecture, getLectures, getMethod } from "@/lib/data"
import { Blocks } from "@/components/content/blocks"
import { PageTitle } from "@/components/elements/layout"
import { Tag } from "@/components/elements/tag"
import { RelatedLinks } from "@/components/elements/related-links"
import { JsonLd, articleJsonLd, breadcrumbJsonLd } from "@/lib/jsonld"

export const generateStaticParams = () =>
  getLectures().map((lecture) => ({ slug: lecture.slug }))

export const generateMetadata = async ({
  params,
}: {
  params: Promise<{ slug: string }>
}) => {
  const { slug } = await params
  const lecture = getLecture(slug)
  if (!lecture) return {}
  return {
    title: `${lecture.title} | 時系列分析のすすめ`,
    description: lecture.description,
  }
}

const Page = async ({ params }: { params: Promise<{ slug: string }> }) => {
  const { slug } = await params
  const lecture = getLecture(slug)
  if (!lecture) notFound()

  const relatedMethods = lecture.relatedMethods
    .map((slug) => getMethod(slug))
    .filter((method) => method !== undefined)

  return (
    <article>
      <JsonLd
        data={articleJsonLd({
          headline: lecture.title,
          description: lecture.description,
          path: `/lectures/${lecture.slug}/`,
        })}
      />
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "講義", path: "/lectures/" },
          { name: lecture.title, path: `/lectures/${lecture.slug}/` },
        ])}
      />
      <Tag>{lecture.chapter}</Tag>
      <PageTitle style={{ marginTop: ".5rem" }}>{lecture.title}</PageTitle>
      <Blocks blocks={lecture.blocks} />
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
