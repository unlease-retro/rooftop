import styled from 'styled-components'

import { colours, space, typography } from 'style'

export const Text = styled.p`
  color: ${ colours.dark };
  ${ space.m(3) }
  ${ space.fs(3) }
  ${ typography.ff() }
`

export const TitleText = styled.h2`
  color: ${ colours.primary };
  text-align: center;
  ${ space.fs(5) }
  ${ typography.ff() }
`
