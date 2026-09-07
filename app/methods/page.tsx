import { FC } from "react"
import { getMethodsByCategory } from "@/lib/data"
import { Card, CardGrid } from "@/components/elements/card"
import { PageTitle } from "@/components/elements/layout"

export const metadata = {
  title: "手法 | 時系列分析のすすめ",
  description: "自己相関からARIMA、状態空間モデルまでの個別手法リファレンス。",
}

const Page: FC = () => {
  const grouped = getMethodsByCategory()
  return (
    <>
      <PageTitle>手法</PageTitle>
      {grouped.map(([category, methods]) => (
        <section key={category} style={{ marginBottom: "2rem" }}>
          <h2 style={{ fontSize: "1rem" }}>{category}</h2>
          <CardGrid>
            {methods.map((method) => (
              <Card
                key={method.slug}
                href={`/methods/${method.slug}/`}
                title={method.title}
                description={method.description}
              />
            ))}
          </CardGrid>
        </section>
      ))}
    </>
  )
}

export default Page
