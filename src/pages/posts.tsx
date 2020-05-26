import styled from "@emotion/styled"
import { graphql, Link } from "gatsby"
import React from "react"
import Body from "../components/Body"
import Header from "../components/Header"
import Layout from "../components/Layout"
import PageTitle from "../components/PageTitle"

const PostList = styled.div``
const PostItem = styled(Link)`
  border-top: 1px solid #ededed;
  font-family: var(--font-sans);
  padding: 1em 0;
  display: flex;
  align-items: center;
  text-decoration: none;
`
const PostDate = styled.div`
  font-size: var(--font-size-smaller);
  color: var(--mid);
  width: 10em;
`
const PostTitle = styled.div`
  font-size: var(--font-size-default);
  font-weight: 500;
  ${PostItem}:hover & {
    text-decoration: underline;
  }
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
            date: string
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
            <PostItem to={post.fields.slug} key={post.id}>
              <PostDate>{post.frontmatter.date}</PostDate>
              <PostTitle>{post.frontmatter.title}</PostTitle>
            </PostItem>
          ))}
        </PostList>
      </Body>
    </Layout>
  )
}

export const pageQuery = graphql`
  query PostsIndex {
    allMdx(sort: { fields: frontmatter___date, order: DESC }) {
      edges {
        node {
          id
          frontmatter {
            title
            date(formatString: "MMMM YYYY")
          }
          fields {
            slug
          }
        }
      }
    }
  }
`
