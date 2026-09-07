import { FC } from "react"
import { getExamples } from "@/lib/data"
import { Card, CardGrid } from "@/components/elements/card"
import { PageTitle } from "@/components/elements/layout"

export const metadata = {
  title: "可視化例 | 時系列分析のすすめ",
  description: "実データ・合成データに手法を適用した可視化結果を例示する。",
}

const Page: FC = () => {
  const examples = getExamples()
  return (
    <>
      <PageTitle>可視化例</PageTitle>
      <CardGrid>
        {examples.map((example) => (
          <Card
            key={example.slug}
            href={`/examples/${example.slug}/`}
            title={example.title}
            description={example.description}
          />
        ))}
      </CardGrid>
    </>
  )
}

export default Page
