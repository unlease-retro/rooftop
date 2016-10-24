import Immutable from 'immutable'
import { createStore, applyMiddleware, compose } from 'redux'
import { browserHistory } from 'react-router'
import { routerMiddleware } from 'react-router-redux'

import { isDevelopment } from '../util'
import rootReducer from '../reducers'

// middleware
const router = routerMiddleware(browserHistory)

let middleware = [ router ]

// logger middleware in development
if (isDevelopment) middleware.push( require('redux-logger')({ collapsed: true }) )

const finalCreateStore = compose(
  applyMiddleware(...middleware),
  isDevelopment && window.devToolsExtension ? window.devToolsExtension() : f => f
)(createStore)

const initialState = Immutable.fromJS({})

export default function configureStore() {

  const store = finalCreateStore(rootReducer, initialState)

  return store

}
