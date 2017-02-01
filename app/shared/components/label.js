import styled from 'styled-components'
import Atomic from 'style/atomic'

import { typography } from 'style'

export const Label = styled.label`
  ${ typography.ff() }
  margin-left: auto;
  margin-right: auto;
  outline: none;
  ${ ({ atomic }) => Atomic({ ...Label.default.atomic, ...atomic }) }
`

Label.default = {
  atomic: {
  },
}
