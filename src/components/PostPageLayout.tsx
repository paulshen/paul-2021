import styled from "@emotion/styled"
import { MDXProvider } from "@mdx-js/react"
import { graphql } from "gatsby"
import { MDXRenderer } from "gatsby-plugin-mdx"
import React from "react"
import Header from "./Header"
import Layout from "./Layout"
import PageTitle from "./PageTitle"
import Highlight, { defaultProps } from "prism-react-renderer"
import theme from "prism-react-renderer/themes/nightOwlLight"

const Pre = styled.pre`
  font-family: var(--font-mono);
  font-size: 0.75em;
  margin-top: 2em;
  margin-bottom: 3em;
  padding: 1em;
  border-radius: 4px;
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

const Container = styled.div`
  width: 80vw;
  max-width: 45rem;
  margin: 0 auto;
  padding-bottom: 4em;
`
const Article = styled.article`
  font-family: var(--font-serif);
  line-height: var(--line-height);
  p {
    margin-top: 1em;
    margin-bottom: 1em;
    code {
      font-size: 0.85em;
    }
  }
  h2 {
    font-size: 1em;
  }
  h2,
  h3 {
    font-family: var(--font-sans);
  }
  code {
    font-family: var(--font-mono);
  }
  & > *:not(.full) {
    max-width: 33rem;
    margin-left: auto;
    margin-right: auto;
  }
`

export default function PostPageLayout({ data: { mdx } }: { data: any }) {
  return (
    <Layout>
      <Header />
      <Container>
        <Article>
          <PageTitle>{mdx.frontmatter.title}</PageTitle>
          <MDXProvider
            components={{
              pre: ({ children }) => children,
              code: CodeBlock,
            }}
          >
            <MDXRenderer>{mdx.body}</MDXRenderer>
          </MDXProvider>
        </Article>
      </Container>
    </Layout>
  )
}

export const pageQuery = graphql`
  query PostPageQuery($id: String) {
    mdx(id: { eq: $id }) {
      id
      body
      frontmatter {
        title
      }
    }
  }
`
