import { css } from "@emotion/core"
import styled from "@emotion/styled"
import { graphql } from "gatsby"
import Img from "gatsby-image"
import React from "react"
import Header from "../components/Header"
import Layout from "../components/Layout"
import PageTitle from "../components/PageTitle"

const Body = styled.div`
  width: 70vw;
  max-width: 60rem;
  margin: 0 auto;
  margin-top: 6rem;
  padding-bottom: 4rem;
  @media (max-width: 600px) {
    width: auto;
    padding-left: 1rem;
    padding-right: 1rem;
  }
`
const Images = styled.div`
  display: flex;
  flex-wrap: wrap;
`
const BodyImage = styled(Img)`
  width: 33.3333%;
  @media (max-width: 800px) {
    width: 50%;
  }
`
export default function Home({ data }: { data: any }) {
  return (
    <Layout>
      <Header />
      <Body>
        <PageTitle
          css={css`
            text-align: center;
          `}
        >
          Scribbles
        </PageTitle>
        <Images>
          {data.allFile.nodes.map((node: any) => {
            return (
              <BodyImage
                fluid={node.childImageSharp.fluid}
                key={node.relativePath}
              />
            )
          })}
        </Images>
      </Body>
    </Layout>
  )
}

export const query = graphql`
  query {
    allFile(filter: { relativeDirectory: { eq: "draw" } }) {
      nodes {
        relativePath
        relativeDirectory
        childImageSharp {
          fluid(maxWidth: 800) {
            ...GatsbyImageSharpFluid
          }
        }
      }
    }
  }
`
