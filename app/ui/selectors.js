import { createSelector } from 'reselect'

import { name } from './constants'

const getAll = state => state.get(name)
const getError = createSelector( getAll, state => state.get('error') )
const getSnackbar = createSelector( getAll, state => state.get('snackbar') )
const getIsNavOpen = createSelector( getAll, state => state.get('isNavOpen') )
const getRequesting = createSelector( getAll, state => state.get('requesting') )
const getAdvertTab = createSelector( getAll, state => state.getIn(['adverts', 'tab']) )
const getMessage = createSelector( getAll, state => state.getIn(['adverts', 'message']) )
const getChosenAdverts = createSelector( getAll, state => state.getIn(['adverts', 'chosen']).toArray() )

export default {
  error: getError,
  message: getMessage,
  snackbar: getSnackbar,
  requesting: getRequesting,
  isNavOpen: getIsNavOpen,
  advertsTab: getAdvertTab,
  chosenAdverts: getChosenAdverts,
}
