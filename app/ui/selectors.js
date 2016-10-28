import { createSelector } from 'reselect'

import { name } from './constants'

const getAll = state => state.get(name)
const getError = createSelector( getAll, state => state.get('error') )
const getRequesting = createSelector( getAll, state => state.get('requesting') )

export default {
  all: getAll,
  error: getError,
  requesting: getRequesting,
}
