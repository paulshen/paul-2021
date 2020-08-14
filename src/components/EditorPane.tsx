import { css } from "@emotion/core"
import * as React from "react"
import Editor from "./Editor"
import Pane from "./Pane"

const CODE: Record<string, string> = {
  "with-log-monad": `type WithLog<T> = [T, string];

// Put a value into the context
function wrap<T>(value: T): WithLog<T> {
  return [value, ''];
}

// Apply a given function to a context value
function bind<T>(
  valueWithLog: WithLog<T>,
  f: (x: T) => WithLog<T>
): WithLog<T> {
  const [value, existingLog] = valueWithLog;
  const [newValue, newLog] = f(value);
  return [newValue, existingLog + newLog];
}

function incrementWithLog(x: number): [number, string] {
  return [x + 1, 'incrementing\\n'];
}

export function runWithLog() {
  // Starting with 0, call incrementWithLog 3 times
  // Be sure to use wrap and bind

}`,
  "monad-maybe": `type Maybe<T> = { value: T } | undefined;

function wrap<T>(v: T): Maybe<T> {
  // Implement this
}

function bind<T, U>(v: Maybe<T>, f: (x: T) => Maybe<U>): Maybe<U> {
  // Implement this
}`,
}

export function EditorPaneLink({
  codeId,
  children,
}: {
  codeId: string
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
        <EditorPane codeId={codeId} onClose={() => setShowPane(false)} />
      ) : null}
    </>
  )
}

export default function EditorPane({
  codeId,
  onClose,
}: {
  codeId: string
  onClose: () => void
}) {
  return (
    <Pane title={codeId} onClose={onClose}>
      <Editor modelId={codeId} initialCode={CODE[codeId]}></Editor>
    </Pane>
  )
}
