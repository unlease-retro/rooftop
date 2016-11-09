/**
  * @desc Atomic styled-components
*/

import { SCALE, UNIT } from 'style/scale'

// TODO - map all supported props here
const properties = {
  bw: 'border-width',
  fs: 'font-size',
  pr: 'padding-right',
  pl: 'padding-left',
  ta: 'text-align',
}

// TODO - static (non-scaled, non-computed) props only
const values = {
  ta: {
    c: 'center',
    l: 'left',
    r: 'right',
    j: 'justify',
  },
}

// TODO - add getters for all supported props
const getters = {
  bw: value => getComputedProperty('bw', value),
  fs: value => getScaledProperty('fs', value),
  pr: value => getScaledProperty('pr', value),
  pl: value => getScaledProperty('pl', value),
  ta: value => getStaticProperty('ta', value),
}

const createScaledPropertyGetter = (property, value, unit, scale=SCALE) => typeof value === 'number' && typeof scale[value] === 'number' && typeof properties[property] === 'string' ? { [`${ properties[property] }`]: `${ scale[value] }${ unit }` } : null

const createComputedPropertyGetter = (property, value, unit) => typeof value === 'number' && typeof properties[property] === 'string' ? { [`${ properties[property] }`]: `${ value }${ unit }` } : null

const createStaticPropertyGetter = (property, value) =>  typeof properties[property] === 'string' && typeof values[property] === 'object' && typeof values[property][value] !== 'undefined' ? { [`${ properties[property] }`]: `${ values[property][value] }` } : null

const getScaledProperty = (property, value, unit=UNIT) => createScaledPropertyGetter(property, value, unit)

const getComputedProperty = (property, value, unit=UNIT) => createComputedPropertyGetter(property, value, unit)

const getStaticProperty = (property, value) => createStaticPropertyGetter(property, value)

const Atomic = atomic => {

  if (typeof atomic !== 'object') return

  // TODO - improve this -> has to be quick as it is a runtime op

  let atoms = {}

  for (var atom in atomic) {

    if (atomic.hasOwnProperty(atom)) {

      atoms = Object.assign({}, { ...atoms, ...( getters[atom] && getters[atom](atomic[atom]) ) })

    }

  }

  return atoms

}

export default Atomic
