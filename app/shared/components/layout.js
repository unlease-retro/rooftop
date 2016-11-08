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

const GRID_ALIGN = {
  top: 'align-items: flex-start',
  middle: 'align-items: center',
  bottom: 'align-items: flex-end',
  left: 'justify-content: flex-start',
  center: 'justify-content: center',
  right: ' justify-content: flex-end',
}

export const View = styled.div`
  width: ${ props => props.width || View.default.width };
  max-width: ${ props => props.maxWidth || View.default.maxWidth };
  margin: 0 auto;
  ${ space.p(3) }
`

export const Grid = styled.div`
  display: flex;
  flex-wrap: wrap;
  ${ media.flat`
    ${ props => props.align && GRID_ALIGN[props.align] }
    margin: -${ props => scale.getScaledValue(props.gutter) || Grid.default.gutter };
  ` }

  & > * {
    flex: 0 0 100%;
    ${ media.flat`
      flex: ${ props => props.cell ? 'none' : 1 };
      width: ${ props => `calc(${ props.cell || 100 }% - ${ scale.getScaledValue(props.gutter) || Grid.default.gutter } * 2)` };
      margin: ${ props => scale.getScaledValue(props.gutter) || Grid.default.gutter } !important;
    ` }
  }
`

export const Cell = styled.div`
  ${ media.flat`
    width: ${ props => `calc(${ props.cell || 100 }% - ${ scale.getScaledValue(props.gutter) || Grid.default.gutter } * 2)` };
  ` }
`

View.default = {
  width: '100%',
  maxWidth: '1280px',
}

Grid.default = {
  gutter: scale.getScaledValue(0),
}
