import styled from 'styled-components'
import Atomic from 'style/atomic'

// import { colours } from 'style'

export const Nav = styled.nav`
  color: red;

  ${ ({ atomic }) => Atomic({ ...Nav.default.atomic, ...atomic }) }
`

Nav.default = {
  atomic: {
    // l: 6,
  },
}
