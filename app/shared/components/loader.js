import styled from 'styled-components'

import { animation, colours } from 'style'

export const Loader = styled.div`
  width: 0;
  height: 0;
  border-width: 0 10px 17.3px 10px;
  border-style: solid;
  border-color: transparent transparent ${ colours.accent } transparent;
  position: absolute;
  top: 20px;
  left: 20px;
  transform-origin: center center;
  animation: ${ animation.rotate360 } 0.5s linear infinite;
`
