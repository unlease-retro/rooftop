// import React from 'react'
import styled from 'styled-components'

// TODO - not sure how scalable this is...

export const Image = styled.div`
  backgroundImage: url( ${ props => props.source } );
  backgroundSize: ${ props => props.backgroundSize };
  width: ${ props => props.width }px;
  height: ${ props => props.height }px;
`


Image.defaultProps = {
  backgroundSize: '100% auto',
}
