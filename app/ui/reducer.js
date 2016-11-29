import Immutable from 'immutable'
import { createReducer } from 'redux-immutablejs'

import * as actions from './actionTypes'

export const initialState = Immutable.fromJS({
  error: null,
  snackbar: null,
  isNavOpen: false,
  requesting: false,
  adverts: {
    tab: false,
    generic: false,
    message: '',
    chosen: []
  },
})

export default createReducer(initialState, {

  [actions.UPDATE]: (state, action) => state.mergeDeep({ ...action.payload }),
  [actions.RESET]: state => state.merge({ ...initialState.toJS() }),

  [actions.TOGGLE_ADVERT]: (state, action) => {

    const { id } = action.payload

    const chosen = state.getIn(['adverts', 'chosen'])

    if (chosen.indexOf(id) !== -1) return state.merge({ adverts: { chosen: chosen.filter(item => item !== id) } })

    return state.merge({ adverts: { chosen: chosen.concat([id]) } })

  }

})
