import { Link } from "gatsby"
import styled from "@emotion/styled"

const Container = styled.div`
  font-family: var(--font-sans);
  padding: 16px 0 0 32px;
  position: fixed;
  left: 0;
  top: 0;
`

const RootLink = styled(Link)`
  text-decoration: none;
  display: inline-block;
  margin-bottom: 16px;
`
const Menu = styled.div``
const MenuItem = styled.div``
const MenuItemLink = styled(Link)`
  text-decoration: none;
  font-size: 14px;
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
