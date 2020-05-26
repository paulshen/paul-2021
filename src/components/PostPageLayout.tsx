import styled from "@emotion/styled"
import { MDXProvider } from "@mdx-js/react"
import { graphql } from "gatsby"
import { MDXRenderer } from "gatsby-plugin-mdx"
import Highlight, { defaultProps } from "prism-react-renderer"
import theme from "prism-react-renderer/themes/nightOwlLight"
import React from "react"
import Body from "./Body"
import Header from "./Header"
import Layout from "./Layout"
import PageTitle from "./PageTitle"
import { css } from "@emotion/core"

const Pre = styled.pre`
  font-family: var(--font-mono);
  font-size: 0.75em;
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

const Article = styled.article`
  font-family: var(--font-serif);
  line-height: var(--line-height);
  p {
    code {
      font-size: 0.85em;
    }
  }
  h2 {
    font-size: 1em;
    margin-top: 2em;
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
  @media (max-width: 600px) {
    & > ${Pre} {
      margin-left: -1em;
      margin-right: -1em;
    }
  }
`
const ArticleDate = styled.div`
  font-family: var(--font-sans);
  font-size: var(--font-size-smaller);
  color: var(--mid);
`

export default function PostPageLayout({
  data: { mdx },
}: {
  data: {
    mdx: {
      id: string
      body: string
      frontmatter: {
        title: string
        date: string
      }
    }
  }
}) {
  return (
    <Layout>
      <Header />
      <Body
        css={css`
          max-width: 45rem;
        `}
      >
        <Article>
          <PageTitle>{mdx.frontmatter.title}</PageTitle>
          <ArticleDate>{mdx.frontmatter.date}</ArticleDate>
          <MDXProvider
            components={{
              pre: ({ children }) => children,
              code: CodeBlock,
            }}
          >
            <MDXRenderer>{mdx.body}</MDXRenderer>
          </MDXProvider>
        </Article>
      </Body>
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
        date(formatString: "MMMM DD, YYYY")
      }
    }
  }
`
