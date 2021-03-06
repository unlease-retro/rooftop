import styled from 'styled-components'
import Atomic from 'style/atomic'

import { colours, typography } from 'style'

export const Form = styled.form`
  ${ typography.ff() }
  margin-left: auto;
  margin-right: auto;
  color: ${ colours.dark };
  ${ ({ atomic }) => Atomic({ ...Form.default.atomic, ...atomic }) }
`

Form.default = {
  atomic: {
    d: 'b',
    fs: 5,
    mt: 4,
    mb: 4,
    p: 4,
  },
}