import { combineReducers } from 'redux-immutablejs'
import { reducer as formReducer } from 'redux-form/immutable'
import routerReducer from './router'
import * as Auth from '../../auth'
import * as UI from '../../ui'

export default combineReducers({
  routing: routerReducer,
  form: formReducer,
  [Auth.name]: Auth.reducer,
  [UI.name]: UI.reducer,
})
