import styled from 'styled-components'

import { colours, scale, space, typography } from 'style'

export const Input = styled.input`
  ${ space.p(3) }
  ${ space.fs(4) }
  ${ typography.ff() }
  width: 200px;
  margin: ${ () => scale.getScaledValue(3) } auto;
  display: block;
  outline: none;
  color: ${ colours.dark };
  background: linear-gradient(transparent 4px, ${ colours.accent } 4px) no-repeat bottom;
  background-size: 100% 8px;
  transition: 0.1s;

  &:focus {
    background-size: 100% 12px;
  }
`
