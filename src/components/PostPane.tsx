import { css } from "@emotion/core"
import { useMDXComponents } from "@mdx-js/react"
import * as React from "react"
import Article from "./Article"
import Pane from "./Pane"

export function PostPaneLink({
  mdxId,
  children,
}: {
  mdxId: string
  children: React.ReactNode
}) {
  const [showPane, setShowPane] = React.useState(false)
  return (
    <>
      <a
        href="#"
        onClick={e => {
          setShowPane(true)
          e.preventDefault()
        }}
        css={css`
          text-decoration: none;
          border-bottom: 1px dashed var(--mid-dark);
        `}
      >
        {children}
      </a>
      {showPane ? (
        <PostPane mdxId={mdxId} onClose={() => setShowPane(false)} />
      ) : null}
    </>
  )
}

export default function PostPane({
  mdxId,
  onClose,
}: {
  mdxId: string
  onClose: () => void
}) {
  const mdxComponents = useMDXComponents()
  const [mdxContent, setMdxContent] = React.useState<string>()
  React.useEffect(() => {
    import(`../posts/panes/${mdxId}.mdx`).then(x => {
      setMdxContent(() => x.default)
    })
  }, [mdxId])

  return (
    <Pane title={mdxId} onClose={onClose}>
      {mdxContent !== undefined ? (
        <Article
          css={css`
            overflow: auto;
            padding: 32px 64px;
            @media (max-width: 640px) {
              padding: 16px;
            }
          `}
        >
          {React.createElement(mdxContent, { components: mdxComponents })}
        </Article>
      ) : null}
    </Pane>
  )
}
