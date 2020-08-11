import { css } from "@emotion/core"
import styled from "@emotion/styled"
import { graphql, Link } from "gatsby"
import React from "react"
import { Helmet } from "react-helmet"
import Body from "./Body"
import Header from "./Header"
import Layout from "./Layout"
import MDXBody, { Pre } from "./MDXBody"
import PageTitle from "./PageTitle"

const Article = styled.article`
  font-family: var(--font-sans);
  line-height: var(--line-height);
  h2 {
    font-size: 1.4em;
    margin-top: 2em;
  }
  h3 {
    font-size: 1em;
  }
  h2,
  h3 {
    font-family: var(--font-sans);
  }
  code {
    background-color: #f0f0f0;
    font-family: var(--font-mono);
  }
  & > *:not(.full) {
    max-width: 35rem;
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

const ArticleFooter = styled.div`
  border-top: 1px solid var(--light);
  color: var(--mid);
  font-family: var(--font-sans);
  font-size: var(--font-size-smaller);
  margin-top: 4rem;
  padding-top: 1rem;
  & > a {
    color: var(--mid);
  }
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
      <Helmet title={`${mdx.frontmatter.title} | Paul Shen`} />
      <Header />
      <Body
        css={css`
          max-width: none;
        `}
      >
        <Article>
          <PageTitle>{mdx.frontmatter.title}</PageTitle>
          <MDXBody>{mdx.body}</MDXBody>
          <ArticleDate>{mdx.frontmatter.date}</ArticleDate>
          <ArticleFooter>
            Browse more <Link to="/posts">posts</Link> or follow on{" "}
            <a href="https://twitter.com/_paulshen" target="_blank">
              Twitter
            </a>
            .
          </ArticleFooter>
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
