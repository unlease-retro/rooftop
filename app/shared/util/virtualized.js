/**
  * @desc Virtualized - utilities for working with react-virtualized
*/

import R from 'ramda'
import { SortDirection } from 'react-virtualized'

const sortByAnyProp = (prop, list) => R.sort(prop, list)

const getSortPropDirection = (prop, direction) => direction === SortDirection.DESC ? R.descend(R.prop(prop)) : R.ascend(R.prop(prop))

export const getSortedList = (list, sortBy, sortDirection) => sortByAnyProp(getSortPropDirection(sortBy, sortDirection), list)
