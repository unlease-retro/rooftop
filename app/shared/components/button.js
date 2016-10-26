import styled from 'styled-components'

import { colours, space } from 'style'

export const Button = styled.button`
  color: ${ props => props.color };
  ${ space.fs(3) }
`

export const ButtonPrimary = styled(Button)`
  color: ${ colours.blue };
`

Button.defaultProps = {
  color: 'hotpink',
}
