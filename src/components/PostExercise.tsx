import * as React from "react"
import { css } from "@emotion/core"
import { Pre } from "./MDXBody"
import { EditorPaneButton } from "./EditorPane"

export function PostExerciseInlineCode({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <code
      css={css`
        background-color: transparent !important;
      `}
    >
      {children}
    </code>
  )
}

export default function PostExercise({
  codeId,
  children,
}: {
  codeId: string
  children: React.ReactNode[]
}) {
  const body = children.slice(0, children.length - 1)
  const solutionCode = children[children.length - 1]
  const [showSolution, setShowSolution] = React.useState(false)

  return (
    <div
      css={css`
        background-color: var(--tan);
        border-radius: 8px;
        padding: 1em;

        ${Pre} {
          margin-bottom: 0;
        }
      `}
    >
      <div
        css={css`
          font-size: var(--font-size-smaller);
          font-weight: 600;
        `}
      >
        Exercise
      </div>
      <div
        css={css`
          margin-bottom: 1em;
        `}
      >
        {body}
      </div>
      <div>
        <EditorPaneButton codeId={codeId} />
        <button
          onClick={() => {
            setShowSolution(show => !show)
          }}
          css={css`
            background-color: transparent;
            border-radius: 4px;
            border: 1px solid var(--dark);
            color: var(--dark);
            font-size: var(--font-size-smaller);
            padding: 0.5em 0.9em;
            margin-left: 1em;
          `}
        >
          {!showSolution ? "Show" : "Hide"} Solution
        </button>
      </div>
      {showSolution ? solutionCode : null}
    </div>
  )
}
