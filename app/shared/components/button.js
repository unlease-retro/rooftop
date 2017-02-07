import styled from 'styled-components'
import Atomic from 'style/atomic'

import { colours, typography } from 'style'

export const Button = styled.button`
  ${ typography.ff() }
  margin-left: auto;
  margin-right: auto;
  background-color: ${ props => props.disabled && Button.disabled.backgroundColor || props.backgroundColor && colours[props.backgroundColor] || Button.default.backgroundColor };
  color: ${ props => props.disabled && Button.disabled.color || props.color && colours[props.color] || Button.default.color };
  border: 0;
  border-radius: 2px;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 1px 6px, rgba(0, 0, 0, 0.1) 0px 1px 4px;
  letter-spacing: 1px;
  cursor: ${ props => props.disabled && Button.disabled.cursor || Button.default.cursor };
  outline: 0;

  ${ ({ atomic }) => Atomic({ ...Button.default.atomic, ...atomic }) }
`

Button.default = {
  backgroundColor: colours.primary,
  color: colours.light,
  cursor: 'pointer',
  atomic: {
    d: 'b',
    fs: 4,
    fw: 'b',
    lh: 8,
    mt: 4,
    mb: 4,
    pr: 4,
    pl: 4,
    tt: 'u',
    w: 12,
  },
}

Button.disabled = {
  backgroundColor: colours.white,
  color: colours.light,
  cursor: 'not-allowed',
}
