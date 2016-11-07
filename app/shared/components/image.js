import styled from 'styled-components'

export const Image = styled.div`
  background: url( ${ props => props.source } ) no-repeat center;
  background-size: ${ ({ backgroundSize }) => backgroundSize || Image.default.backgroundSize };
  width: ${ props => props.width }px;
  height: ${ props => props.height }px;
  margin: ${ props => props.center ? '0 auto' : '0' };
  display: ${ ({ display }) => display || Image.default.display };
`

Image.default = {
  backgroundSize: '100% auto',
  display: 'block',
}
