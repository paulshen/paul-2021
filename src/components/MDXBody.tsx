import styled from "@emotion/styled"
import { MDXProvider } from "@mdx-js/react"
import { MDXRenderer } from "gatsby-plugin-mdx"
import Highlight, { defaultProps } from "prism-react-renderer"
import theme from "prism-react-renderer/themes/palenight"
import * as React from "react"

export const Pre = styled.pre`
  font-family: var(--font-mono);
  font-size: 0.85em;
  margin-top: 2em;
  margin-bottom: 3em;
  padding: 1em;
  border-radius: 8px;
  overflow-x: auto;
`

function CodeBlock({
  children,
  className,
}: {
  children: string
  className: string
}) {
  return (
    <Highlight
      {...defaultProps}
      code={children.trim()}
      theme={theme}
      // @ts-ignore
      language={className.replace("language-", "")}
    >
      {({ className, style, tokens, getLineProps, getTokenProps }) => (
        <Pre className={className} style={style}>
          {tokens.map((line, i) => (
            <div key={i} {...getLineProps({ line, key: i })}>
              {line.map((token, key) => (
                <span key={key} {...getTokenProps({ token, key })} />
              ))}
            </div>
          ))}
        </Pre>
      )}
    </Highlight>
  )
}

export default function MDXBody({ children }: { children: string }) {
  const components = React.useMemo(
    () => ({
      pre: ({ children }: { children: any }) => children,
      code: CodeBlock,
    }),
    []
  )
  return (
    <MDXProvider components={components}>
      <MDXRenderer>{children}</MDXRenderer>
    </MDXProvider>
  )
}
