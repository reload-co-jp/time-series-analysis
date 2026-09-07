import { FC, Fragment } from "react"
import type { ContentBlock } from "@/lib/types"
import { CodeBlock } from "./code-block"
import { MathBlock } from "./math-block"
import { Chart } from "../charts/chart"

const Block: FC<{ block: ContentBlock }> = ({ block }) => {
  switch (block.type) {
    case "paragraph":
      return (
        <p style={{ lineHeight: 1.8, padding: ".75rem 0" }}>{block.text}</p>
      )
    case "heading": {
      const Heading = block.level === 2 ? "h2" : "h3"
      return (
        <Heading
          style={{
            padding: block.level === 2 ? "1.5rem 0 .5rem" : "1rem 0 .5rem",
          }}
        >
          {block.text}
        </Heading>
      )
    }
    case "list": {
      const List = block.ordered ? "ol" : "ul"
      return (
        <List style={{ lineHeight: 1.8, padding: ".5rem 0 .5rem 1.5rem" }}>
          {block.items.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </List>
      )
    }
    case "math":
      return <MathBlock tex={block.tex} />
    case "code":
      return <CodeBlock language={block.language} code={block.code} />
    case "note":
      return (
        <p
          style={{
            background: "#f0f0ee",
            borderLeft: "3px solid #4a7fc4",
            color: "#333",
            padding: ".75rem 1rem",
          }}
        >
          {block.text}
        </p>
      )
    case "chart":
      return (
        <Chart
          seriesRef={block.seriesRef}
          chartType={block.chartType}
          caption={block.caption}
        />
      )
  }
}

export const Blocks: FC<{ blocks: ContentBlock[] }> = ({ blocks }) => (
  <>
    {blocks.map((block, index) => (
      <Fragment key={index}>
        <Block block={block} />
      </Fragment>
    ))}
  </>
)
