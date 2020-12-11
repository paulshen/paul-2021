import dynamic from "next/dynamic";

const Editor = dynamic(() => import("./Editor"), { ssr: false });

export function renderEditor(
  modelId: string,
  initialCode: string
): React.ReactNode {
  return <Editor modelId={modelId} initialCode={initialCode} />;
}
