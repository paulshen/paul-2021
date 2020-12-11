import * as React from "react";
import MonacoEditor, { monaco } from "@monaco-editor/react";

monaco.init().then((monaco) => {
  monaco.languages.typescript.typescriptDefaults.setCompilerOptions({
    target: monaco.languages.typescript.ScriptTarget.ES5,
    lib: ["es5"],
    module: monaco.languages.typescript.ModuleKind.ES2015,
    allowNonTsExtensions: true,
  });
  monaco.languages.typescript.typescriptDefaults.addExtraLib(
    `interface Console { log(...data: any[]): void; }
declare var console: Console;`,
    "lib.dom.d.ts"
  );
});

const codeValueCache: Record<string, string> = {};

function Editor({
  modelId,
  initialCode,
}: {
  modelId: string;
  initialCode: string;
}) {
  let value = initialCode;
  if (codeValueCache[modelId] !== undefined) {
    value = codeValueCache[modelId];
  }
  function handleEditorDidMount(_, editor) {
    editor.onDidChangeModelContent(() => {
      codeValueCache[modelId] = editor.getValue();
    });
  }

  return (
    <MonacoEditor
      value={value}
      editorDidMount={handleEditorDidMount}
      language="typescript"
      options={{
        minimap: { enabled: false },
      }}
    />
  );
}

export default React.memo(Editor);
