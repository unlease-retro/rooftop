import styled from 'styled-components'
import Atomic from 'style/atomic'

import { colours, typography } from 'style'

export const Input = styled.input`
  ${ typography.ff() }
  width: 200px;
  margin-left: auto;
  margin-right: auto;
  outline: none;
  color: ${ colours.dark };
  background: linear-gradient(transparent 4px, ${ colours.accent } 4px) no-repeat bottom;
  background-size: 100% 8px;
  transition: 0.1s;

  ${ ({ atomic }) => Atomic({ ...Input.default.atomic, ...atomic }) }

  &:focus {
    background-size: 100% 12px;
  }
`

Input.default = {
  atomic: {
    d: 'b',
    fs: 5,
    mt: 4,
    mb: 4,
    p: 4,
  },
}
