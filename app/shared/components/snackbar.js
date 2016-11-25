import styled from 'styled-components'

import { Error } from 'components/error'
import { colours } from 'style'

export const Snackbar = styled(Error)`
  color: ${ colours.primary };
  border: 2px dotted ${ colours.primary };

  &:before {
    content: '😇';
  }
`