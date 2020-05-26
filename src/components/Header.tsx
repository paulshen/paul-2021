import { Link } from "gatsby"
import styled from "@emotion/styled"

const Container = styled.div`
  font-family: var(--font-sans);
  padding: 1.2em 0 0 2em;
  position: fixed;
  left: 0;
  top: 0;
  @media (max-width: 940px) {
    position: absolute;
    right: 0;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-right: 2em;
  }
`

const RootLink = styled(Link)`
  text-decoration: none;
  display: inline-block;
  margin-bottom: 2em;
  @media (max-width: 940px) {
    margin-bottom: 0;
  }
`
const Menu = styled.div`
  @media (max-width: 940px) {
    display: flex;
  }
`
const MenuItem = styled.div`
  @media (max-width: 940px) {
    margin-left: 1em;
  }
`
const MenuItemLink = styled(Link)`
  text-decoration: none;
  font-size: var(--font-size-smaller);
`

export default function Header() {
  return (
    <Container>
      <RootLink to="/">paul shen</RootLink>
      <Menu>
        <MenuItem>
          <MenuItemLink to="/posts">Posts</MenuItemLink>
        </MenuItem>
        <MenuItem>
          <MenuItemLink to="/">About</MenuItemLink>
        </MenuItem>
      </Menu>
    </Container>
  )
}
