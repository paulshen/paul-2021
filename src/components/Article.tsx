import styled from "@emotion/styled"
import { Pre } from "./MDXBody"

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
  blockquote {
    background-color: var(--tan);
    border-radius: 8px;
    padding: 0.5em 2em;
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
export default Article
