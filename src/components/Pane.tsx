import { css } from "@emotion/core"
import { MDXProvider, useMDXComponents } from "@mdx-js/react"
import * as React from "react"
import ReactDOM from "react-dom"
import Article from "./Article"

export default function Pane({
  title,
  children,
  onClose,
}: {
  title: string
  children: React.ReactNode
  onClose: () => void
}) {
  const rootRef = React.useRef<HTMLDivElement>(null)
  const rootOffset = React.useRef([0, 0])
  const cleanupDrag = React.useRef<() => void>()
  const closeButtonRef = React.useRef<HTMLDivElement>(null)
  function onHeaderMouseDown(e: React.MouseEvent) {
    if (closeButtonRef.current!.contains(e.target as Element)) {
      return
    }

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
        border-radius: 4px;
        overflow: hidden;
        width: 640px;
        max-width: 95vw;
        height: 600px;
        max-height: 90vh;
        bottom: 100px;
        right: 100px;
        display: flex;
        flex-direction: column;
        box-shadow: 0 8px 32px #00000040;

        @media (max-height: 760px) {
          bottom: 32px;
        }

        @media (max-width: 840px) {
          bottom: 32px;
          right: 32px;
        }

        @media (max-width: 640px) {
          height: 90vh;
          max-height: 600px;
          bottom: 0;
          right: 0;
        }
      `}
      ref={rootRef}
    >
      <div
        css={css`
          background-color: var(--dark);
          height: 32px;
          flex-shrink: 0;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0 16px;
        `}
        onMouseDown={onHeaderMouseDown}
      >
        <div
          css={css`
            color: var(--light);
            font-family: var(--font-sans);
            font-size: var(--font-size-smaller);
          `}
        >
          {title}
        </div>
        <button onClick={onClose} ref={closeButtonRef}>
          Close
        </button>
      </div>
      {children}
    </div>,
    document.body
  )
}
