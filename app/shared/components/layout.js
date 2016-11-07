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

import { media, scale, space } from 'style'

export const View = styled.div`
  width: ${ props => props.width || View.default.width };
  max-width: ${ props => props.maxWidth || View.default.maxWidth };
  margin: 0 auto;
  ${ space.p(3) }
`

// TODO - variable cells `cells={[ 20, 1/0.12, 11/0.12 ]}` rather than just `cell='x'`
// TODO - shameful use of !important to fix elements that are both Grids and Cells. Need better solution

export const Grid = styled.div`
  display: flex;
  flex-wrap: wrap;
  ${ media.flat`
    margin: -${ props => props.gutter || Grid.default.gutter };
  ` }

  & > * {
    flex: 0 0 100%;
    ${ media.flat`
      flex: 1 1 ${ props => props.cell ? props.cell : '0%' };
      margin: ${ props => props.gutter || Grid.default.gutter } !important;
    ` }
  }
`

View.default = {
  width: '100%',
  maxWidth: '1280px',
}

Grid.default = {
  gutter: scale.getScaledValue(0),
}

// NOTE: flex: [ <'flex-grow'> <'flex-shrink'>? || <'flex-basis'> ]
