/**
  * @desc Media queries breakpoint utility
*/

import { css } from 'styled-components'

// TODO - abstract! obvs
// breakpoints.js => small, aboveSmall, large
// const ms = size => `@media screen and (min-width: ${size})`

const small = (...args) => css`
  @media (max-width: 40em) {
    ${ css(...args) }
  }
`

const aboveSmall = (...args) => css`
  @media (min-width: 40em) {
    ${ css(...args) }
  }
`

const large = (...args) => css`
  @media (min-width: 64em) {
    ${ css(...args) }
  }
`

export {
  small,
  aboveSmall,
  large,
}
