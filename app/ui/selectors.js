import { createSelector } from 'reselect'

import { name } from './constants'

const getAll = state => state.get(name)
const getError = createSelector( getAll, state => state.get('error') )
const getRequesting = createSelector( getAll, state => state.get('requesting') )
const getIsNavOpen = createSelector( getAll, state => state.get('isNavOpen') )
const getAdvertTab = createSelector( getAll, state => state.getIn(['advert', 'tab']) )

export default {
  error: getError,
  requesting: getRequesting,
  isNavOpen: getIsNavOpen,
  advertTab: getAdvertTab
}
