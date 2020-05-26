import styled from "@emotion/styled"
import { graphql, Link } from "gatsby"
import React from "react"
import Header from "../components/Header"
import Layout from "../components/Layout"
import PageTitle from "../components/PageTitle"

const Body = styled.div`
  width: 80vw;
  max-width: 35rem;
  margin: 0 auto;
`
const PostList = styled.ul`
  list-style: none;
  padding: 0;
`
const PostItem = styled.li`
  border-top: 1px solid #ededed;
  padding: 1em 0;
`
const PostLink = styled(Link)`
  font-family: var(--font-sans);
  font-size: var(--font-size-default);
  font-weight: 500;
  text-decoration: none;
`

export default function PostsIndex({
  data,
}: {
  data: {
    allMdx: {
      edges: Array<{
        node: {
          id: string
          frontmatter: {
            title: string
          }
          fields: {
            slug: string
          }
        }
      }>
    }
  }
}) {
  const { edges: posts } = data.allMdx
  return (
    <Layout>
      <Header />
      <Body>
        <PageTitle>Posts</PageTitle>
        <PostList>
          {posts.map(({ node: post }) => (
            <PostItem key={post.id}>
              <PostLink to={post.fields.slug}>
                {post.frontmatter.title}
              </PostLink>
            </PostItem>
          ))}
        </PostList>
      </Body>
    </Layout>
  )
}

export const pageQuery = graphql`
  query PostsIndex {
    allMdx {
      edges {
        node {
          id
          frontmatter {
            title
          }
          fields {
            slug
          }
        }
      }
    }
  }
`
