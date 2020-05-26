import { css, Global } from "@emotion/core"
import styled from "@emotion/styled"
import React from "react"

export default ({ children }: { children: React.ReactElement }) => (
  <>
    <Global
      styles={css`
        body {
          margin: 0;
        }
      `}
    />
    {children}
  </>
)
