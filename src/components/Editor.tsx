import { css } from "@emotion/core"
import * as React from "react"

async function importMonaco(): Promise<typeof import("monaco-editor")> {
  const monaco = await import("monaco-editor")
  monaco.languages.typescript.typescriptDefaults.setCompilerOptions({
    noLib: true,
    target: monaco.languages.typescript.ScriptTarget.ES2016,
    allowNonTsExtensions: true,
  })
  monaco.languages.typescript.typescriptDefaults.addExtraLib(
    `interface Console { log(...data: any[]): void; }
declare var console: Console;`,
    "lib.dom.d.ts"
  )
  return monaco
}

export default function Editor() {
  const domRef = React.useRef<HTMLDivElement | null>(null)
  React.useEffect(() => {
    async function run() {
      const monaco = await importMonaco()
      monaco.editor.create(domRef.current!, {
        value: ["function f() {", '\tconsole.log("Hello world!");', "}"].join(
          "\n"
        ),
        language: "typescript",
        minimap: {
          enabled: false,
        },
      })
    }
    run()
  }, [])
  return (
    <div
      css={css`
        height: 400px;
      `}
      ref={domRef}
    ></div>
  )
}
