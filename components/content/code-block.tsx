import { FC } from "react"

export const CodeBlock: FC<{ language: string; code: string }> = ({
  language,
  code,
}) => (
  <pre
    style={{
      background: "#f5f5f3",
      border: "1px solid #e0e0e0",
      borderRadius: ".25rem",
      color: "#1a1a1a",
      fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace",
      fontSize: ".875rem",
      lineHeight: 1.6,
      overflowX: "auto",
      padding: "1.25rem",
    }}
  >
    <code data-language={language}>{code}</code>
  </pre>
)
