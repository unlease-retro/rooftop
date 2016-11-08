import styled from 'styled-components'

export const Position = styled.div`
  position: ${ props => props.position || Position.default.position };
  top: ${ props => props.top || Position.default.top };
  right: ${ props => props.right || Position.default.right };
  bottom: ${ props => props.bottom || Position.default.bottom };
  left: ${ props => props.left || Position.default.left };
  transform: ${ props => props.transform || Position.default.transform };
`

Position.default = {
  position: 'static',
  top: 'auto',
  right: 'auto',
  bottom: 'auto',
  left: 'auto',
  transform: 'none',
}
