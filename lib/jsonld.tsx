const siteUrl = "https://tsa.reload.co.jp"
const siteName = "時系列分析のすすめ"

export type BreadcrumbItem = { name: string; path: string }

export const JsonLd = ({ data }: { data: object }) => (
  <script
    type="application/ld+json"
    dangerouslySetInnerHTML={{
      __html: JSON.stringify(data).replace(/</g, "\\u003c"),
    }}
  />
)

export const websiteJsonLd = () => ({
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: siteName,
  url: siteUrl,
  description:
    "時系列分析を体系的に学べる講義と手法の解説、可視化結果の例示、最新手法の紹介と示唆を行うサイト。",
  inLanguage: "ja",
})

export const breadcrumbJsonLd = (items: BreadcrumbItem[]) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [{ name: "ホーム", path: "/" }, ...items].map(
    (item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `${siteUrl}${item.path}`,
    })
  ),
})

export const articleJsonLd = ({
  headline,
  description,
  path,
  datePublished,
}: {
  headline: string
  description: string
  path: string
  datePublished?: string
}) => ({
  "@context": "https://schema.org",
  "@type": "Article",
  headline,
  description,
  url: `${siteUrl}${path}`,
  inLanguage: "ja",
  ...(datePublished ? { datePublished } : {}),
  publisher: {
    "@type": "Organization",
    name: "Reload, Inc.",
  },
})
