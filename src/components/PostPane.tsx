import { css } from "@emotion/core"
import { MDXProvider, useMDXComponents } from "@mdx-js/react"
import * as React from "react"
import ReactDOM from "react-dom"

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
      >
        {children}
      </a>
      {showPane ? (
        <Pane mdxId={mdxId} onClose={() => setShowPane(false)} />
      ) : null}
    </>
  )
}

export default function Pane({
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

  const rootRef = React.useRef<HTMLDivElement>(null)
  const rootOffset = React.useRef([0, 0])
  const cleanupDrag = React.useRef<() => void>()
  function onHeaderMouseDown(e: React.MouseEvent) {
    const startPageX = e.pageX
    const startPageY = e.pageY
    const [offsetX, offsetY] = rootOffset.current
    const rootElement = rootRef.current!
    function onMouseMove(e: MouseEvent) {
      const newOffsetX = offsetX + e.pageX - startPageX
      const newOffsetY = offsetY + e.pageY - startPageY
      rootElement.style.transform = `translate3d(${newOffsetX}px, ${newOffsetY}px, 0)`
      rootOffset.current = [newOffsetX, newOffsetY]
    }
    function cleanup() {
      window.removeEventListener("mousemove", onMouseMove)
      window.removeEventListener("mouseup", cleanup)
      cleanupDrag.current = undefined
    }
    window.addEventListener("mousemove", onMouseMove)
    window.addEventListener("mouseup", cleanup)
    cleanupDrag.current = cleanup
  }
  React.useEffect(() => {
    if (cleanupDrag.current !== undefined) {
      cleanupDrag.current()
    }
  }, [])

  return ReactDOM.createPortal(
    <div
      css={css`
        position: fixed;
        background-color: #ffffff;
        border-radius: 8px;
        width: 640px;
        height: 600px;
        bottom: 100px;
        right: 100px;
        display: flex;
        flex-direction: column;
        border: 1px solid #e8e8e8;
        box-shadow: 0 8px 32px #00000040;
      `}
      ref={rootRef}
    >
      <div
        css={css`
          height: 40px;
          border-bottom: 1px solid #e8e8e8;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0 16px;
        `}
        onMouseDown={onHeaderMouseDown}
      >
        <button onClick={onClose}>Close</button>
      </div>
      {mdxContent !== undefined ? (
        <MDXProvider
          components={{
            pre: ({ children }) => children,
          }}
        >
          {React.createElement(mdxContent, { components: mdxComponents })}
        </MDXProvider>
      ) : null}
    </div>,
    document.body
  )
}
