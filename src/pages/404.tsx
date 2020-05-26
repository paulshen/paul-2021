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
        <PageTitle>404</PageTitle>
        <Paragraph>Hrm.</Paragraph>
      </Body>
    </Layout>
  )
}
