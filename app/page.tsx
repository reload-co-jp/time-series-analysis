import { FC } from "react"
import Link from "next/link"
import { accentColors, serifFont } from "@/components/elements/layout"
import { JsonLd, websiteJsonLd } from "@/lib/jsonld"

const sections = [
  {
    href: "/lectures/",
    label: "LECTURES",
    title: "講義",
    description: "時系列分析の基礎から応用までを体系的な章立てで学ぶ。",
  },
  {
    href: "/methods/",
    label: "METHODS",
    title: "手法",
    description:
      "自己相関からARIMA、状態空間モデルまでの個別手法リファレンス。",
  },
  {
    href: "/examples/",
    label: "EXAMPLES",
    title: "可視化例",
    description: "実データ・合成データに手法を適用した可視化結果を例示する。",
  },
  {
    href: "/topics/",
    label: "TOPICS",
    title: "最新動向",
    description: "最新手法の紹介と、その示唆をまとめた記事。",
  },
]

const Page: FC = () => {
  return (
    <>
      <JsonLd data={websiteJsonLd()} />
      <p style={{ color: "#555", fontSize: "1rem", marginBottom: "2.5rem" }}>
        時系列分析を体系的に学べる講義と手法の解説、可視化結果の例示、最新手法の紹介と示唆を行うサイト。
      </p>
      <ul
        className="section-grid"
        style={{ listStyle: "none", margin: 0, padding: 0 }}
      >
        {sections.map((section, index) => (
          <li key={section.href} style={{ height: "100%" }}>
            <Link
              className="link-row"
              href={section.href}
              style={{
                alignItems: "center",
                border: "solid #e0e0e0",
                borderWidth: "0 0 0.0625rem 0.0625rem",
                borderRadius: ".25rem",
                display: "flex",
                gap: "2rem",
                height: "100%",
                padding: "3rem 1.5rem",
                textDecoration: "none",
              }}
            >
              <span
                style={{
                  color: accentColors[index % accentColors.length],
                  fontSize: "1.75rem",
                  fontWeight: 700,
                  width: "3rem",
                }}
              >
                {String(index + 1).padStart(2, "0")}
              </span>
              <div style={{ flex: 1 }}>
                <div
                  style={{
                    color: "#888",
                    fontSize: ".8125rem",
                    letterSpacing: ".05em",
                  }}
                >
                  {section.label}
                </div>
                <h2
                  style={{
                    color: "#1a1a1a",
                    fontFamily: serifFont,
                    fontSize: "3rem",
                    fontWeight: 700,
                    margin: ".25rem 0 .5rem",
                  }}
                >
                  {section.title}
                </h2>
                <p style={{ color: "#555", fontSize: "1rem", margin: 0 }}>
                  {section.description}
                </p>
              </div>
              <span
                className="link-row-arrow"
                aria-hidden
                style={{ color: "#1a1a1a", fontSize: "1.75rem" }}
              >
                →
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </>
  )
}

export default Page
