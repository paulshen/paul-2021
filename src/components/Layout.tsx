import { css, Global } from "@emotion/core"
import React from "react"
import { Helmet } from "react-helmet"

export default ({ children }: { children: React.ReactNode }) => (
  <>
    <Helmet title="Paul Shen">
      {/* <link rel="stylesheet" href="https://use.typekit.net/lof7pip.css"></link> */}
      <link
        href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap"
        rel="stylesheet"
      ></link>
    </Helmet>
    <Global
      styles={css`
        :root {
          --font-sans: Inter, sans-serif;
          --font-mono: SFMono-Regular, Consolas, Inconsolatas, Liberation Mono,
            Menlo, monospace;
          --font-size-default: 16px;
          --font-size-smaller: 0.8em;
          --font-size-title: 1.8em;
          --line-height: 1.6;
          --dark: #1e1f20;
          --mid-dark: #656a6d;
          --mid: #8c9194;
          --light: #ededed;
          --tan: #f8f3e6;
          --orange: #dcb98f;
          --blue: #d2e1e9;
          --white: #ffffff;
          font-size: var(--font-size-default);
        }
        body {
          margin: 0;
          -webkit-font-smoothing: antialiased;
        }
        button,
        input,
        textarea {
          font-family: var(--font-sans);
        }
        a {
          color: var(--mid-dark);
        }
        p {
          margin: 1.2em 0;
          line-height: var(--line-height);
        }
      `}
    />
    {children}
  </>
)
