import { css } from "@emotion/core"
import * as React from "react"

// @ts-ignore
globalThis.MonacoEnvironment = {
  getWorkerUrl: function (moduleId: any, label: string) {
    if (label === "json") {
      return "./json.worker.js"
    }
    if (label === "css") {
      return "./css.worker.js"
    }
    if (label === "html") {
      return "./html.worker.js"
    }
    if (label === "typescript" || label === "javascript") {
      return "/ts.worker.js"
    }
    return "/editor.worker.js"
  },
}

async function importMonaco(): Promise<typeof import("monaco-editor")> {
  const monaco = await import("monaco-editor")
  monaco.languages.typescript.typescriptDefaults.setCompilerOptions({
    target: monaco.languages.typescript.ScriptTarget.ES5,
    lib: ["es5"],
    module: monaco.languages.typescript.ModuleKind.ES2015,
    allowNonTsExtensions: true,
  })
  monaco.languages.typescript.typescriptDefaults.addExtraLib(
    `interface Console { log(...data: any[]): void; }
declare var console: Console;`,
    "lib.dom.d.ts"
  )
  return monaco
}

export default function Editor({
  modelId,
  initialCode,
}: {
  modelId: string
  initialCode: string
}) {
  const domRef = React.useRef<HTMLDivElement | null>(null)
  React.useEffect(() => {
    async function run() {
      const monaco = await importMonaco()
      const uri = monaco.Uri.parse(`/${modelId}.tsx`)
      let model = monaco.editor.getModel(uri)
      if (model == null) {
        model = monaco.editor.createModel(initialCode, "typescript", uri)
      }
      monaco.editor.create(domRef.current!, {
        model,
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
        flex-grow: 1;
      `}
      ref={domRef}
    ></div>
  )
}
