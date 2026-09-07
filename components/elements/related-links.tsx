import { FC } from "react"
import Link from "next/link"

export const RelatedLinks: FC<{
  title: string
  items: { href: string; label: string }[]
}> = ({ title, items }) => {
  if (items.length === 0) return null
  return (
    <section
      style={{ borderTop: "1px solid #e0e0e0", marginTop: "2rem", paddingTop: "1rem" }}
    >
      <h2 style={{ fontSize: ".875rem", fontWeight: 700 }}>{title}</h2>
      <ul style={{ margin: 0, paddingLeft: "1.25rem" }}>
        {items.map((item) => (
          <li key={item.href}>
            <Link
              className="nav-link"
              href={item.href}
              style={{ color: "#4a7fc4" }}
            >
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </section>
  )
}
