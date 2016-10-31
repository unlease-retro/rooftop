// import React from 'react'
import styled from 'styled-components'

import { colours, space } from 'style'

// TODO - not sure how scalable this is...

export const Error = styled.p`
  color: ${ colours.light };
  background: ${ colours.error };
  ${ space.m(3) }
  ${ space.fs(3) }
`