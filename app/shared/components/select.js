import styled from 'styled-components'
import ReactSelect from 'react-select'

import { colours } from 'style'

export const Select = styled(ReactSelect)`
  vertical-align: middle;

  &.Select {
    width: ${ ({ width }) => width || Select.default.width };
    display: inline-block;
    text-align: left;
  }

  & > .Select-control {
    border: 0;
    border-bottom: 2px solid ${ colours.dark };
    border-radius: 0;
    cursor: pointer;
  }

  & .Select-arrow-zone {
    display: none;
  }

  .Select-menu-outer {
    width: ${ ({ width }) => width || Select.default.width };
  }

  & .Select-option.is-selected {
    background-color: transparent;
    text-decoration: underline;
  }

  & .Select-option.is-focused {
    background-color: ${ colours.lighten(colours.primary, 0.75) }
  }
`

Select.default = {
  width: '100px',
}
