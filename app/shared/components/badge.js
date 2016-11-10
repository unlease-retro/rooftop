import styled from 'styled-components'
import Atomic from 'style/atomic'

import { colours } from 'style'

export const Badge = styled.span`
  border-radius: 50%;
  display: inline-block;
  vertical-align: middle;
  color: ${ colours.light };
  background-color: ${ props => props.backgroundColor ? colours[props.backgroundColor] : colours.secondary };

  ${ ({ atomic }) => Atomic({ ...Badge.default.atomic, ...atomic }) }

  &:after {
    content: '${ props => props.label }';
    height: 100%;
    display: flex;
    flex-flow: row wrap;
    justify-content: center;
    align-content: center;
    align-items: center;
    align-self: center;
  }
`

Badge.default = {
  atomic: {
    h: 6,
    w: 6,
  },
}
