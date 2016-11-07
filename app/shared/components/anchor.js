import styled from 'styled-components'
import { Link } from 'react-router'

import { colours } from 'style'

export const Anchor = styled(Link)`
  color: ${colours.dark};
  text-decoration: underline;
  cursor: pointer;
  transition: 0.2s;

  &:hover {
    color: ${colours.accent};
  }
`
