import styled from 'styled-components'

import { colours, space, typography } from 'style'

export const Text = styled.p`
  ${ space.m(3) }
  ${ space.fs(3) }
  ${ typography.ff() }
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
