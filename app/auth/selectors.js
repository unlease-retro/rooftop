import { createSelector } from 'reselect'

import { name } from './constants'

// static
const getAll = state => state.get(name)
const getAuthorised = createSelector( getAll, state => state.get('authorised') )
export const getToken = createSelector( getAll, state => state.get('token') )

export default {
  all: getAll,
  authorised: getAuthorised,
  token: getToken,
}
