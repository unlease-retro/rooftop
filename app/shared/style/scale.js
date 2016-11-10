/**
  * @desc Modular CSS Scale
  * @see http://jxnblk.com/modular/
*/

export const UNIT = 'px'

export const SCALE = [
  0,
  8,
  9,
  12,
  16,
  18,
  24,
  32,
  36,
  48,
  64,
  72,
  96,
  128,
  144,
]

const createScaledValueGetter = (scale, x, unit) => typeof x === 'number' && typeof scale[x] === 'number' ? `${ scale[x] }${ unit }` : null

export const getScaledValue = (x, unit=UNIT) => createScaledValueGetter(SCALE, x, unit)
