import { FC } from "react"
import { getLectures } from "@/lib/data"
import { Card, CardGrid } from "@/components/elements/card"
import { PageTitle } from "@/components/elements/layout"
import { Tag } from "@/components/elements/tag"

export const metadata = {
  title: "講義 | 時系列分析のすすめ",
  description: "時系列分析の基礎から応用までを体系的な章立てで学ぶ。",
}

const Page: FC = () => {
  const lectures = getLectures()
  return (
    <>
      <PageTitle>講義</PageTitle>
      <CardGrid>
        {lectures.map((lecture) => (
          <Card
            key={lecture.slug}
            href={`/lectures/${lecture.slug}/`}
            title={lecture.title}
            description={lecture.description}
            meta={<Tag>{lecture.chapter}</Tag>}
          />
        ))}
      </CardGrid>
    </>
  )
}

export default Page
