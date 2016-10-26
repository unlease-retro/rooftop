/**
  * @desc Utility functions for composing scaled CSS space properties
*/

import { getScaledProperty } from './scale'

// TODO - extend to include margin-top etc mt0{}

const getWidth = getScaledProperty('width')
const getHeight = getScaledProperty('height')
const getMargin = getScaledProperty('margin')
// const getBorder = getScaledProperty('border')
const getPadding = getScaledProperty('padding')
const getFontSize = getScaledProperty('font-size')

export default {
  w: getWidth,
  h: getHeight,
  m: getMargin,
  // b: getBorder,
  p: getPadding,
  fs: getFontSize,
}
