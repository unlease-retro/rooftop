/**
  * @desc Colour palette and utilities
*/

import Color from 'color'

export const dark = '#25253E'
export const light = '#EBE9DF'
export const primary = '#1BD4AE'
export const secondary = '#27A5F9'
export const accent = '#FDDC88'
export const error = '#FF60A2'

export const alpha = (colour, value) => Color(colour).alpha(value).rgbString()
