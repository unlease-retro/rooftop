import styled from 'styled-components'
import Atomic from 'style/atomic'

import { colours } from 'style'

export const Nav = styled.nav`
  width: ${ props => props.width || Nav.default.width };
  height: ${ props => props.height || Nav.default.height };
  background-color: ${ props => props.backgroundColor && colours[props.backgroundColor] || Nav.default.backgroundColor };
  box-shadow: -4px 0 20px 0 rgba(0, 0, 0, 0.2);

  ${ ({ atomic }) => Atomic({ ...Nav.default.atomic, ...atomic }) }
`

Nav.default = {
  width: '300px',
  height: '100%',
  backgroundColor: colours.white,
  atomic: {
    pt:12,
    pr:4,
    pb:4,
    pl:4,
    po:'f',
    t:0,
    l:0,
    z:1,
  },
}
