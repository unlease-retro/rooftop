import styled from 'styled-components'

export const Image = styled.div`
  backgroundImage: url( ${ props => props.source } );
  backgroundSize: ${ props => props.backgroundSize };
  width: ${ props => props.width }px;
  height: ${ props => props.height }px;
  margin: ${ props => props.center ? '0 auto' : '0' };
`

Image.defaultProps = {
  backgroundSize: '100% auto',
}
