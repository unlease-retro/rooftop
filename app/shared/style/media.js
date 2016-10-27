/**
  * @desc Media queries breakpoint utility
  * @prop studio - small screens
  * @prop flat - above small screens
  * @prop house - huge screens
*/

import { css } from 'styled-components'

import * as bp from './breakpoints'

const media = (breakpoint, args) => css`
  @media (${ breakpoint }) {
    ${ css(...args) }
  }
`

export const studio = (...args) => media(bp.STUDIO, args)

export const flat = (...args) => media(bp.FLAT, args)

export const house = (...args) => media(bp.HOUSE, args)
