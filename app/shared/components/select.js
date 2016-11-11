import ReactSelect from 'react-select'
import styled from 'styled-components'
import Atomic from 'style/atomic'

import { colours } from 'style'

export const Select = styled(ReactSelect)`
  vertical-align: middle;

  &.Select {
    width: ${ ({ width }) => width || Select.default.width };
    margin: 0 auto;
    display: inline-block;
    text-align: left;

    ${ ({ atomic }) => Atomic(atomic) }
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
