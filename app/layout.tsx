import { Footer, Header, Main, Title } from "@/components/elements/layout"
import { Nav } from "@/components/elements/nav"
import "katex/dist/katex.min.css"
import "./reset.css"

export const metadata = {
  title: "時系列分析のすすめ",
  description:
    "時系列分析を体系的に学べる講義と手法の解説、可視化結果の例示、最新手法の紹介と示唆を行うサイト。",
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
