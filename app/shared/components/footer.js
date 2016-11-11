import styled from 'styled-components'
import Atomic from 'style/atomic'

export const Footer = styled.footer`
  text-align: center;
  flex: none;

  ${ ({ atomic }) => Atomic({ ...Footer.default.atomic, ...atomic }) }
`

Footer.default = {
  atomic: {
    fs: 3,
    p: 4,
  },
}
