/**
  * @name View - top-level wrapper component
  * @param {string} [width=100%] - base width
  * @param {string} [maxWidth=1280px] - maximum width
  *
  * @name Grid
  * @param {string} [cell] - fixed width of grid cells
  * @param {string} [gutter=0.5em] - margin between grid cells
*/

import styled from 'styled-components'

import { media, space } from 'style'

export const View = styled.div`
  width: ${ props => props.width || View.default.width };
  max-width: ${ props => props.maxWidth || View.default.maxWidth };
  margin: 0 auto;
  ${ space.p(3) }
`

// TODO - use `space` utility for defaults - work out ems if necessary
// TODO - variable cell widths => `& > *:nth-child(n) { flex-basis: 10em; }`
// TODO - percentage cell widths => `> *:nth-child(n) { flex-basis: calc(100% - gutter); }` || columns: `calc(100% * 1 / 12)`

export const Grid = styled.div`
  display: flex;
  flex-wrap: wrap;
  ${ media.flat`
    margin: -${ props => props.gutter || Grid.default.gutter };
  ` }

  & > * {
    flex: 0 0 100%;
    ${ media.flat`
      flex: ${ props => props.cell ? `1 0 ${props.cell}` : 1 };
      margin: ${ props => props.gutter || Grid.default.gutter };
    ` }
  }
`

View.default = {
  width: '100%',
  maxWidth: '1280px',
}

Grid.default = {
  gutter: '0.5em',
}

// NOTE: flex: [ <'flex-grow'> <'flex-shrink'>? || <'flex-basis'> ]
