/**
  * @desc Modular CSS Scale
  * @see http://jxnblk.com/modular/
*/

const UNIT = 'px'

const scale = [
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

const createScaledPropertyGetter = (scale, prop, x, unit) => typeof x === 'number' && typeof scale[x] === 'number' ? { [prop]: `${ scale[x] }${ unit }` } : null

export const getScaledProperty = (prop, x, unit=UNIT) => createScaledPropertyGetter(scale, prop, x, unit)
