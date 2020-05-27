import React from "react"
import Header from "../components/Header"
import Layout from "../components/Layout"
import styled from "@emotion/styled"
import Img from "gatsby-image"
import { graphql, Link } from "gatsby"

const Body = styled.div`
  width: 80vw;
  max-width: 50rem;
  margin: 0 auto;
  padding-top: 6rem;
  padding-bottom: 4rem;
  display: flex;
  @media (max-width: 600px) {
    flex-direction: column-reverse;
    width: auto;
    padding-left: 1em;
    padding-right: 1em;
  }
`
const BodyImage = styled(Img)`
  width: 50%;
  @media (max-width: 600px) {
    width: 100%;
  }
`
const BodyRight = styled.div`
  width: 50%;
  padding-left: 2em;
  box-sizing: border-box;
  @media (max-width: 600px) {
    padding-left: 0;
    width: 100%;
  }
`
const Paragraph = styled.p`
  font-family: var(--font-serif);
`

export default function Home({ data }: { data: any }) {
  return (
    <Layout>
      <Header />
      <Body>
        <BodyImage fluid={data.file.childImageSharp.fluid} />
        <BodyRight>
          <Paragraph>Hi! I'm Paul.</Paragraph>
          <Paragraph>
            I'm trying to <Link to="/posts">write</Link> more about product
            engineering, developer tools, React, and other random things that
            pop in my head.
          </Paragraph>
          <Paragraph>
            I also <Link to="/scribbles">draw</Link> squiggly lines.
          </Paragraph>
        </BodyRight>
      </Body>
    </Layout>
  )
}

export const query = graphql`
  query {
    file(
      relativePath: { eq: "35999786_217229322446458_3470015180652412928_n.jpg" }
    ) {
      childImageSharp {
        fluid(maxWidth: 800) {
          ...GatsbyImageSharpFluid
        }
      }
    }
  }
`
