import { FC } from "react"
import { getTopics } from "@/lib/data"
import { Card, CardGrid } from "@/components/elements/card"
import { PageTitle } from "@/components/elements/layout"
import { Tag } from "@/components/elements/tag"

export const metadata = {
  title: "最新動向 | 時系列分析のすすめ",
  description: "最新手法の紹介と、その示唆をまとめた記事。",
}

const Page: FC = () => {
  const topics = getTopics()
  return (
    <>
      <PageTitle>最新動向</PageTitle>
      <CardGrid>
        {topics.map((topic) => (
          <Card
            key={topic.slug}
            href={`/topics/${topic.slug}/`}
            title={topic.title}
            description={topic.description}
            meta={<Tag>{topic.publishedAt}</Tag>}
          />
        ))}
      </CardGrid>
    </>
  )
}

export default Page
