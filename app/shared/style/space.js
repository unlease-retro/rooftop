/**
  * @desc Utility functions for composing scaled CSS space properties
*/

import { getScaledProperty } from './scale'

// TODO - extend to include margin-top etc mt0{}

const getWidth = (x, unit) => getScaledProperty('width', x, unit)
const getHeight = (x, unit) => getScaledProperty('height', x, unit)
const getMargin = (x, unit) => getScaledProperty('margin', x, unit)
// const getBorder = (x, unit) => getScaledProperty('border', x, unit)
const getPadding = (x, unit) => getScaledProperty('padding', x, unit)
const getFontSize = (x, unit) => getScaledProperty('font-size', x, unit)

export default {
  w: getWidth,
  h: getHeight,
  m: getMargin,
  // b: getBorder,
  p: getPadding,
  fs: getFontSize,
}
