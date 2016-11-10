import styled from 'styled-components'
import Atomic from 'style/atomic'

export const Image = styled.div`
  background: url( ${ props => props.source } ) no-repeat center;
  background-size: ${ ({ backgroundSize }) => backgroundSize || Image.default.backgroundSize };
  width: ${ props => props.width };
  height: ${ props => props.height };
  margin: ${ props => props.center ? '0 auto' : '0' };
  border-radius: ${ props => props.circle ? '50%' : 0 };

  ${ ({ atomic }) => Atomic({ ...Image.default.atomic, ...atomic }) }
`

Image.default = {
  backgroundSize: '100% auto',
  atomic: {
    d: 'b',
  },
}
