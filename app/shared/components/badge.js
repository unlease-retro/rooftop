import styled from 'styled-components'

export const Badge = styled.div`
  position: relative;

  &:hover {
    &:after {
      display: block;
    }
  }

  &:after {
    top: 0;
    left: 0;
    display: none;
    position: absolute;
    content: '${ props => props.text }';
  }
`
