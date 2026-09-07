import { Children, FC, ReactNode } from "react"
import Link from "next/link"
import { serifFont } from "@/components/elements/layout"

export const Card: FC<{
  href: string
  title: string
  description: string
  meta?: ReactNode
}> = ({ href, title, description, meta }) => (
  <Link
    className="card-link"
    href={href}
    style={{
      background: "#fff",
      border: "1px solid #e0e0e0",
      borderRadius: ".25rem",
      color: "#1a1a1a",
      display: "flex",
      flexDirection: "column",
      height: "100%",
      padding: "1.75rem",
      textDecoration: "none",
    }}
  >
    {meta && <div style={{ marginBottom: ".75rem" }}>{meta}</div>}
    <h3
      style={{
        fontFamily: serifFont,
        fontSize: "1.375rem",
        fontWeight: 700,
        margin: "0 0 .75rem",
      }}
    >
      {title}
    </h3>
    <p style={{ color: "#555", flex: 1, fontSize: "1rem", margin: 0 }}>
      {description}
    </p>
  </Link>
)

export const CardGrid: FC<{ children: ReactNode }> = ({ children }) => (
  <ul
    className="section-grid"
    style={{ listStyle: "none", margin: 0, padding: 0 }}
  >
    {Children.map(children, (child, index) => (
      <li key={index} style={{ height: "100%" }}>
        {child}
      </li>
    ))}
  </ul>
)
