import { FC } from "react"
import katex from "katex"

export const MathBlock: FC<{ tex: string }> = ({ tex }) => {
  const html = katex.renderToString(tex, {
    displayMode: true,
    throwOnError: false,
  })
  return (
    <div
      style={{
        background: "#f5f5f3",
        border: "1px solid #e0e0e0",
        borderRadius: ".25rem",
        overflowX: "auto",
        padding: "1.25rem",
      }}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  )
}
