import React from "react"
import Header from "../components/Header"
import Layout from "../components/Layout"
import styled from "@emotion/styled"
import PageTitle from "../components/PageTitle"

const Body = styled.div`
  width: 80vw;
  max-width: 33rem;
  margin: 0 auto;
  padding-bottom: 4rem;
  @media (max-width: 600px) {
    width: auto;
    padding-left: 1em;
    padding-right: 1em;
  }
`
const Paragraph = styled.p`
  font-family: var(--font-serif);
`

export default function Home() {
  return (
    <Layout>
      <Header />
      <Body>
        <PageTitle>Hi!</PageTitle>
        <Paragraph>My name is Paul.</Paragraph>
        <Paragraph>
          I'm an engineer in San Francisco with a passion for design and
          technology. I've previously worked at Discord and Facebook.
        </Paragraph>
        <Paragraph>
          I enjoy making tools and working with programming languages. I usually
          work on product infrastructure, thinking about code ergonomics and
          scalable product engineering.
        </Paragraph>
      </Body>
    </Layout>
  )
}
