import { combineReducers } from 'redux-immutablejs'
import routerReducer from './router'
import * as Auth from '../../auth'
import * as UI from '../../ui'

export default combineReducers({
  routing: routerReducer,
  [Auth.name]: Auth.reducer,
  [UI.name]: UI.reducer,
})
