import styled from 'styled-components'
import Color from 'color'
import Atomic from 'style/atomic'

import { colours, typography } from 'style'

export const Text = styled.p`
  ${ typography.ff() }
  color: ${ props => props.color && colours[props.color] || Text.default.color };
  background-color: ${ props => props.backgroundColor && Color(colours[props.backgroundColor]).alpha(0.5) || Text.default.backgroundColor };

  ${ ({ atomic }) => Atomic({ ...Text.default.atomic, ...atomic }) }
`

Text.default = {
  backgroundSize: '100% auto',
  color: colours.dark,
  backgroundColor: 'transparent',
  atomic: {
    d: 'b',
    fs: 3,
    mt: 3,
    mb: 3,
    ta: 'l',
  },
}
