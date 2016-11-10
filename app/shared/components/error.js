import styled from 'styled-components'
import Atomic from 'style/atomic'

import { colours } from 'style'

export const Error = styled.div`
  color: ${ colours.error };
  font-style: italic;
  border: 2px dotted ${ colours.error };
  border-radius: 4px;

  ${ ({ atomic }) => Atomic({ ...Error.default.atomic, ...atomic }) }

  &:before {
    content: '😫';
    margin-right: 10px;
    font-style: normal;
  }
`

Error.default = {
  atomic: {
    fs: 4,
    m: 4,
    p: 4,
  },
}
