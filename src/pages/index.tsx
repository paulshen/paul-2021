import { css } from "@emotion/core"
import styled from "@emotion/styled"
import React from "react"
import Layout from "../components/Layout"

const Container = styled.div`
  font-family: var(--font-sans);
  margin: 3rem auto;
  max-width: 600px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`

const underline = css`
  text-decoration: underline;
`

export default function Home() {
  return (
    <Layout>
      <Container>
        <h1 css={underline}>Underline</h1>
        <div>Hello world!</div>
      </Container>
    </Layout>
  )
}
