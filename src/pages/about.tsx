import styled from "@emotion/styled"
import React from "react"
import Body from "../components/Body"
import Header from "../components/Header"
import Layout from "../components/Layout"
import PageTitle from "../components/PageTitle"

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
          I'm an engineer with a passion for design and technology. I've
          previously worked at Discord and Facebook.
        </Paragraph>
        <Paragraph>
          I enjoy making tools and working with programming languages. I usually
          work on product infrastructure, thinking about code ergonomics and
          scalable product engineering.
        </Paragraph>
        <Paragraph>
          You can find me occasionally posting on{" "}
          <a href="https://twitter.com/_paulshen" target="_blank">
            Twitter
          </a>
          .
        </Paragraph>
      </Body>
    </Layout>
  )
}
