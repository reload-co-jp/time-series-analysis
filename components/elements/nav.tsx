import { FC } from "react"
import Link from "next/link"

const links = [
  { href: "/lectures/", label: "講義" },
  { href: "/methods/", label: "手法" },
  { href: "/examples/", label: "可視化例" },
  { href: "/topics/", label: "最新動向" },
]

export const Nav: FC = () => (
  <nav aria-label="サイト内ナビゲーション">
    <ul
      style={{
        display: "flex",
        gap: "1.5rem",
        listStyle: "none",
        margin: 0,
        padding: 0,
      }}
    >
      {links.map((link) => (
        <li key={link.href}>
          <Link
            className="nav-link"
            href={link.href}
            style={{ color: "#1a1a1a", fontSize: ".875rem" }}
          >
            {link.label}
          </Link>
        </li>
      ))}
    </ul>
  </nav>
)
