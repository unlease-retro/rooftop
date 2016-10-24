import Immutable from 'immutable'
import { createReducer } from 'redux-immutablejs'

import * as actions from './actionTypes'

export const initialState = Immutable.fromJS({
  authorised: false,
  token: null,
})

export default createReducer(initialState, {

  [actions.SET_AUTHORISED]: (state, action) => state.merge({ ...action.payload }),
  [actions.SET_AUTHORISED]: (state, action) => state.merge({ ...action.payload }),

})
