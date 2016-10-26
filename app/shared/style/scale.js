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

const createScaledPropertyGetter = scale => prop => x => typeof x === 'number' && typeof scale[x] === 'number' ? { [prop]: `${ scale[x] }${ UNIT }` } : null

export const getScaledProperty = createScaledPropertyGetter(scale)
