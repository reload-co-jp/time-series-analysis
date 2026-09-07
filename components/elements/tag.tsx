import { FC, ReactNode } from "react"

export const Tag: FC<{ children: ReactNode }> = ({ children }) => (
  <span
    style={{
      background: "#f0f0ee",
      border: "1px solid #ddd",
      borderRadius: "1rem",
      color: "#555",
      display: "inline-block",
      fontSize: ".75rem",
      padding: ".125rem .625rem",
    }}
  >
    {children}
  </span>
)
