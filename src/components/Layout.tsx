import { css, Global } from "@emotion/core"
import React from "react"
import { Helmet } from "react-helmet"

export default ({ children }: { children: React.ReactNode }) => (
  <>
    <Helmet>
      <link rel="stylesheet" href="https://use.typekit.net/lof7pip.css"></link>
    </Helmet>
    <Global
      styles={css`
        :root {
          --font-sans: aktiv-grotesk, sans-serif;
          --font-size-default: 18px;
          --font-line-height: 1.5;
          --dark: #1e1f20;
          --mid: #8c9194;
          --tan: #f8f3e6;
        }
        body {
          margin: 0;
        }
      `}
    />
    {children}
  </>
)
