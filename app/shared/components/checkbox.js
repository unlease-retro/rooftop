import styled from 'styled-components'
import Atomic from 'style/atomic'

import { typography } from 'style'

export const Checkbox = styled.input`
  ${ typography.ff() }
  margin-left: auto;
  margin-right: auto;
  outline: none;
  ${ ({ atomic }) => Atomic({ ...Checkbox.default.atomic, ...atomic }) }
`

Checkbox.default = {
  atomic: {
  },
}
