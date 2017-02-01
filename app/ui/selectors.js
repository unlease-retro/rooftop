import { createSelector } from 'reselect'

import { name } from './constants'

const getAll = state => state.get(name)
const getError = createSelector( getAll, state => state.get('error') )
const getIsNavOpen = createSelector( getAll, state => state.get('isNavOpen') )
const getRequesting = createSelector( getAll, state => state.get('requesting') )
const getSnackbar = createSelector( getAll, state => state.get('snackbar') )

export default {
  error: getError,
  isNavOpen: getIsNavOpen,
  requesting: getRequesting,
  snackbar: getSnackbar,
}
