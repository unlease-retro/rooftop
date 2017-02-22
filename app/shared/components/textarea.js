import styled from 'styled-components'
import Atomic from 'style/atomic'

import { colours, typography } from 'style'

export const Textarea = styled.textarea`
  ${ typography.ff() }
  width: ${ props => props.width || Textarea.default.width };
  height: ${ props => props.height || Textarea.default.height };
  resize: none;
  outline: none;
  margin-left: auto;
  margin-right: auto;
  border: 1px solid ${ colours.dark };
  color: ${ colours.dark };
  transition: 0.1s;

  ${ ({ atomic }) => Atomic({ ...Textarea.default.atomic, ...atomic }) }
`

Textarea.default = {
  width: '100%',
  height: '150px',
  atomic: {
    d: 'b',
    fs: 5,
    mt: 4,
    mb: 4,
    p: 4,
  },
}
