import { Footer, Header, Main, Title } from "@/components/elements/layout"
import { Nav } from "@/components/elements/nav"
import "katex/dist/katex.min.css"
import "./reset.css"

export const metadata = {
  metadataBase: new URL("https://tsa.reload.co.jp"),
  title: "時系列分析のすすめ",
  description:
    "時系列分析を体系的に学べる講義と手法の解説、可視化結果の例示、最新手法の紹介と示唆を行うサイト。",
  openGraph: {
    siteName: "時系列分析のすすめ",
    title: "時系列分析のすすめ",
    description:
      "時系列分析を体系的に学べる講義と手法の解説、可視化結果の例示、最新手法の紹介と示唆を行うサイト。",
    url: "https://tsa.reload.co.jp",
    locale: "ja_JP",
    type: "website",
    images: [{ url: "/og-image.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "時系列分析のすすめ",
    description:
      "時系列分析を体系的に学べる講義と手法の解説、可視化結果の例示、最新手法の紹介と示唆を行うサイト。",
    images: ["/og-image.png"],
  },
}

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="ja">
      <body>
        <Header>
          <Title>時系列分析のすすめ</Title>
          <Nav />
        </Header>
        <Main>{children}</Main>
        <Footer>
          <p>&copy; Reload, Inc.</p>
        </Footer>
      </body>
    </html>
  )
}
export default RootLayout
