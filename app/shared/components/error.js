import styled from 'styled-components'

import { colours, space } from 'style'

export const Error = styled.div`
  ${ space.m(3) }
  ${ space.p(3) }
  ${ space.fs(3) }
  color: ${ colours.error };
  font-style: italic;
  border: 2px dotted ${ colours.error };
  border-radius: 4px;

  &:before {
    content: '😫';
    margin-right: 10px;
    font-style: normal;
  }
`
