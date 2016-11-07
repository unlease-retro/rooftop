import styled from 'styled-components'

import { colours, scale } from 'style'

export const Badge = styled.span`
  width: ${ scale.getScaledValue(5) };
  height: ${ scale.getScaledValue(5) };
  margin-left: ${ props => props.margin ? scale.getScaledValue(props.margin) : Badge.default.marginLeft };
  border-radius: 50%;
  display: inline-block;
  vertical-align: middle;
  color: ${ colours.light };
  background-color: ${ props => props.colour ? colours[props.colour] : colours.secondary };

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
  marginLeft: scale.getScaledValue(4),
}
