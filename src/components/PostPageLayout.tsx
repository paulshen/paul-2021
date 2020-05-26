import React from "react"
import { graphql } from "gatsby"
import { MDXProvider } from "@mdx-js/react"
import { MDXRenderer } from "gatsby-plugin-mdx"
import styled from "@emotion/styled"
import Layout from "./Layout"
import Header from "./Header"

const Pre = styled.pre`
  font-size: 0.85em;
  margin-top: 1.2em;
  margin-bottom: 1.2em;
`
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
    max-width: 35rem;
    margin-left: auto;
    margin-right: auto;
  }
`
const Title = styled.h1`
  font-family: var(--font-sans);
  margin-top: 2em;
  margin-bottom: 2em;
`

export default function PostPageLayout({ data: { mdx } }: { data: any }) {
  return (
    <Layout>
      <Header />
      <Container>
        <Article>
          <Title>{mdx.frontmatter.title}</Title>
          <MDXProvider components={{ pre: Pre }}>
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
