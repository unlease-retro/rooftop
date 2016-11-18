import styled from 'styled-components'
import Atomic from 'style/atomic'

import { colours, typography } from 'style'

export const Text = styled.p`
  ${ typography.ff() }
  border-radius: ${ props => props.borderRadius || Text.default.borderRadius };
  color: ${ props => props.color && colours[props.color] || Text.default.color };
  background-color: ${ props => props.backgroundColor && colours.alpha(colours[props.backgroundColor], 0.5) || Text.default.backgroundColor };

  ${ ({ atomic }) => Atomic({ ...Text.default.atomic, ...atomic }) }
`

Text.default = {
  backgroundSize: '100% auto',
  color: colours.dark,
  backgroundColor: 'transparent',
  atomic: {
    d: 'b',
    fs: 4,
    mt: 4,
    mb: 4,
    ta: 'l',
  },
}
