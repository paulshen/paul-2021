import { css } from "@emotion/core"
import styled from "@emotion/styled"
import { graphql, Link } from "gatsby"
import React from "react"
import Article from "./Article"
import Body from "./Body"
import Header from "./Header"
import Layout from "./Layout"
import MDXBody from "./MDXBody"
import PageTitle from "./PageTitle"
import SEO from "./SEO"

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
      excerpt: string
      frontmatter: {
        title: string
        date: string
        image: string | undefined
      }
    }
  }
}) {
  return (
    <Layout>
      <SEO
        title={mdx.frontmatter.title}
        description={mdx.excerpt}
        image={mdx.frontmatter.image}
      />
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
      excerpt
      frontmatter {
        title
        date(formatString: "MMMM DD, YYYY")
        image
      }
    }
  }
`
