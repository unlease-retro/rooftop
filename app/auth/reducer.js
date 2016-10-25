import Immutable from 'immutable'
import { createReducer } from 'redux-immutablejs'

import * as actions from './actionTypes'

export const initialState = Immutable.fromJS({
  authorised: false,
  user: {},
  error: null,
})

export default createReducer(initialState, {

  [actions.LOGIN_SUCCESS]: (state, { payload }) => state.merge({ ...payload }),
  [actions.LOGIN_FAILURE]: (state, { payload }) => state.merge({ ...payload }),

  [actions.CHECK_TOKEN_SUCCESS]: (state, { payload }) => state.merge({ ...payload }),
  [actions.CHECK_TOKEN_FAILURE]: (state, { payload }) => state.merge({ ...payload }),

  [actions.REFRESH_TOKEN_SUCCESS]: (state, { payload }) => state.merge({ ...payload }),
  [actions.REFRESH_TOKEN_FAILURE]: (state, { payload }) => state.merge({ ...payload }),

})
