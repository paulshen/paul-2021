import styled from "@emotion/styled"
import { MDXProvider } from "@mdx-js/react"
import { MDXRenderer } from "gatsby-plugin-mdx"
import Highlight, { defaultProps } from "prism-react-renderer"
import theme from "prism-react-renderer/themes/nightOwlLight"

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
  return (
    <MDXProvider
      components={{
        pre: ({ children }) => children,
        code: CodeBlock,
      }}
    >
      <MDXRenderer>{children}</MDXRenderer>
    </MDXProvider>
  )
}
