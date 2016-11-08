import styled from 'styled-components'

import { colours, scale, space, typography } from 'style'

export const Button = styled.button`
  ${ space.fs(3) }
  ${ typography.ff() }
  ${ () => scale.getScaledProperty('padding-left', 3) }
  ${ () => scale.getScaledProperty('padding-right', 3) }
  width: 100px;
  margin: ${ () => scale.getScaledValue(3) } auto;
  display: block;
  background-color: ${ colours.primary };
  color: ${ colours.light };
  border: 0;
  border-radius: 2px;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 1px 6px, rgba(0, 0, 0, 0.1) 0px 1px 4px;
  line-height: 36px;
  font-weight: 700;
  letter-spacing: 1px;
  text-transform: uppercase;
  cursor: pointer;
  outline: 0;
`

Button.defaultProps = {
  color: 'hotpink',
}
