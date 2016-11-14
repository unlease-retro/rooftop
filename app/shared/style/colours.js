/**
  * @desc Colour palette and utilities
*/

import Color from 'color'

// -----
// PALETTE
// -----

export const white = '#FFFFFF'
export const dark = '#25253E'
export const light = '#EBE9DF'
export const primary = '#1BD4AE'
export const secondary = '#27A5F9'
export const accent = '#FDDC88'
export const error = '#FF60A2'

// -----
// UTILS
// -----

export const rgb = colour => colour.rgbString()
export const alpha = (colour, value) => rgb( Color(colour).alpha(value) )
export const lighten = (colour, value) => rgb( Color(colour).lighten(value) )
