// import React from 'react'
import styled from 'styled-components'

import { colours, space } from 'style'

// TODO - not sure how scalable this is...

export const Text = styled.p`
  color: ${ colours.black };
  ${ space.m(3) }
  ${ space.fs(3) }
`

export const TitleText = styled.h1`
  color: ${ colours.black };
  ${ space.fs(6) }
`
