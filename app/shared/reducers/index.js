import { combineReducers } from 'redux-immutablejs'
import routerReducer from './router'
// import * as UI from '../../ui'

export default combineReducers({
  routing: routerReducer,
  // [UI.name]: UI.reducer,
})
