import { createSelector } from 'reselect'

import { name } from './constants'

// static
const getAll = state => state.get(name)
const getAuthorised = createSelector( getAll, state => state.get('authorised') )
const getUser = createSelector( getAll, state => state.get('user') )
export const getAccessToken = createSelector( getUser, state => state.get('access_token') )
const getRefreshToken = createSelector( getUser, state => state.get('refresh_token') )

export default {
  authorised: getAuthorised,
  access_token: getAccessToken,
  refresh_token: getRefreshToken,
}
