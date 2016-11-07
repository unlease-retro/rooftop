import styled from 'styled-components'

import { colours, scale, space, typography } from 'style'

export const Text = styled.p`
  ${ space.fs(3) }
  ${ typography.ff() }
  margin-top: ${ scale.getScaledValue(3) }
  margin-bottom: ${ scale.getScaledValue(3) }
  display: ${ ({ display }) => display || Text.default.display };
  color: ${ colours.dark };
`

export const TitleText = styled.h2`
  ${ space.fs(5) }
  ${ typography.ff() }
  color: ${ colours.primary };
  text-align: center;
`

Text.default = {
  backgroundSize: '100% auto',
  display: 'block',
}
