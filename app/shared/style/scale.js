/**
  * @desc Modular CSS Scale
  * @see http://jxnblk.com/modular/
*/

export const UNIT = 'px'

export const SCALE = [
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

// TODO - this should be replaced/removed by Atomic

const createScaledPropertyGetter = (scale, prop, x, unit) => typeof x === 'number' && typeof scale[x] === 'number' ? { [prop]: `${ scale[x] }${ unit }` } : null

const createScaledValueGetter = (scale, x, unit) => typeof x === 'number' && typeof scale[x] === 'number' ? `${ scale[x] }${ unit }` : null

export const getScaledProperty = (prop, x, unit=UNIT) => createScaledPropertyGetter(SCALE, prop, x, unit)

export const getScaledValue = (x, unit=UNIT) => createScaledValueGetter(SCALE, x, unit)
