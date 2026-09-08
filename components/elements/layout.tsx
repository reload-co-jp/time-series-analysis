import { ComponentProps, FC, ReactNode } from "react"

export const accentColors = ["#5a9c5a", "#4a7fc4", "#d4703f", "#c86fa0"]

export const serifFont = '"Hiragino Mincho ProN", "Yu Mincho", YuMincho, serif'

export const Title: FC<ComponentProps<"h1">> = ({
  style,
  children,
  ...props
}) => (
  <h1
    style={{ fontSize: "1.125rem", fontWeight: 700, margin: 0, ...style }}
    {...props}
  >
    {children}
  </h1>
)

export const PageTitle: FC<ComponentProps<"h1">> = ({
  style,
  children,
  ...props
}) => (
  <h1
    style={{
      fontFamily: serifFont,
      fontSize: "2.5rem",
      fontWeight: 700,
      margin: 0,
      padding: "0 0 1.5rem",
      ...style,
    }}
    {...props}
  >
    {children}
  </h1>
)

export const Header: FC<{ children: ReactNode }> = ({ children }) => (
  <header
    style={{
      alignItems: "center",
      background: "#f5f5f3",
      borderBottom: "1px solid #e0e0e0",
      display: "flex",
      flexWrap: "wrap",
      gap: "1rem",
      justifyContent: "space-between",
      padding: "1rem 1.5rem",
      position: "relative",
    }}
  >
    {children}
  </header>
)

export const Main: FC<{ children: ReactNode }> = ({ children }) => (
  <main
    style={{
      background: "#f5f5f3",
      margin: "0 auto",
      maxWidth: "64rem",
      minHeight: "calc(100dvh - 5.625rem)",
      padding: "2rem 1.5rem",
    }}
  >
    {children}
  </main>
)

export const Footer: FC<{ children: ReactNode }> = ({ children }) => (
  <footer
    style={{
      borderTop: "1px solid #e0e0e0",
      color: "#888",
      fontSize: ".75rem",
      padding: "1rem 1.5rem",
    }}
  >
    {children}
  </footer>
)
