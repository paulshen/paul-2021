import * as React from "react"
import { css } from "@emotion/core"

export default function CodeSideBySide({
  children,
}: {
  children: [React.ReactNode, React.ReactNode]
}) {
  const [firstChild, secondChild] = children
  return (
    <div
      css={css`
        @media (min-width: 1300px) {
          max-width: none !important;
          display: flex;
          justify-content: center;
        }
      `}
    >
      {firstChild}
      <div
        css={css`
          @media (min-width: 1300px) {
            width: 2rem;
          }
        `}
      />
      {secondChild}
    </div>
  )
}
