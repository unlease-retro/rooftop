import styled from 'styled-components'

import { colours, scale, space, typography } from 'style'

export const Text = styled.p`
  ${ space.fs(3) }
  ${ typography.ff() }
  margin-top: ${ scale.getScaledValue(3) }
  margin-bottom: ${ scale.getScaledValue(3) }
  display: ${ ({ display }) => display || Text.default.display };
  color: ${ colours.dark };
`

export const BoxedText = styled(Text)`
  ${ space.p(0) }
  margin: 0;
  background-color: rgba(0, 0, 0, 0.5);
  color: ${ colours.light };
`

export const SmallText = styled(Text)`
  ${ space.fs(2) }
`

export const TitleText = styled.h2`
  ${ space.fs(5) }
  ${ typography.ff() }
  color: ${ colours.primary };
  text-align: center;
`

export const SubtitleText = styled(TitleText)`
  ${ space.fs(3) }
  margin: 0;
  color: ${ colours.dark };
  text-align: left;
`

Text.default = {
  backgroundSize: '100% auto',
  display: 'block',
}
