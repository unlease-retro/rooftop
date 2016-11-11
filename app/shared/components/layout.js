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
import Atomic from 'style/atomic'

import { colours, media, scale } from 'style'

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

  ${ ({ atomic }) => Atomic({ ...View.default.atomic, ...atomic }) }
`

export const Grid = styled.div`
  display: flex;
  flex-wrap: wrap;
  ${ media.flat`
    ${ props => props.align && GRID_ALIGN[props.align] }
    margin: -${ props => scale.getScaledValue(props.gutter) || Grid.default.gutter };
    flex-direction: ${ props => props.direction || Grid.default.direction };
  ` }

  & > * {
    flex: 0 0 100%;
    ${ media.flat`
      flex: ${ props => props.cell ? 'none' : 1 };
      width: ${ props => `calc(${ props.cell || 100 }% - ${ scale.getScaledValue(props.gutter) || Grid.default.gutter } * 2)` };
      margin: ${ props => props.flush ? 0 : scale.getScaledValue(props.gutter) || Grid.default.gutter } !important;
    ` }
  }
`

export const Cell = styled.div`
  ${ media.flat`
    width: ${ props => `calc(${ props.cell || 100 }% - ${ scale.getScaledValue(props.gutter) || Grid.default.gutter } * 2)` };
  ` }
`

export const Section = styled.section`
  border: ${ props => props.border && Section.default.border || 'none' };

  ${ ({ atomic }) => Atomic({ ...atomic }) }
`

export const Main = styled.main`
  flex: 1 0 auto;
`

View.default = {
  width: '100%',
  maxWidth: '1280px',
  atomic: {
    p: 4,
  }
}

Grid.default = {
  direction: 'row',
  gutter: scale.getScaledValue(1),
}

Section.default = {
  border: `1px solid ${ colours.dark }`,
}
