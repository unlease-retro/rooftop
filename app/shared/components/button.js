import styled from 'styled-components'
import Atomic from 'style/atomic'

import { colours, typography } from 'style'

export const Button = styled.button`
  ${ typography.ff() }
  margin-left: auto;
  margin-right: auto;
  background-color: ${ colours.primary };
  color: ${ colours.light };
  border: 0;
  border-radius: 2px;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 1px 6px, rgba(0, 0, 0, 0.1) 0px 1px 4px;
  letter-spacing: 1px;
  cursor: pointer;
  outline: 0;

  ${ ({ atomic }) => Atomic({ ...Button.default.atomic, ...atomic }) }
`

Button.default = {
  atomic: {
    d: 'b',
    fs: 3,
    fw: 'b',
    lh: 7,
    mt: 3,
    mb: 3,
    pr: 3,
    pl: 3,
    tt: 'u',
    w: 11,
  },
}
