import Immutable from 'immutable'
import { createReducer } from 'redux-immutablejs'

import * as actions from './actionTypes'

export const initialState = Immutable.fromJS({
  error: null,
  isNavOpen: false,
  requesting: false,
  snackbar: null,
})

export default createReducer(initialState, {

  [actions.RESET]: state => state.merge({ ...initialState.toJS() }),

  [actions.UPDATE]: (state, action) => state.mergeDeep({ ...action.payload }),

})
