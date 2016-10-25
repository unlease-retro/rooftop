import Immutable from 'immutable'
import { createStore, applyMiddleware, compose } from 'redux'
import { browserHistory } from 'react-router'
import { routerMiddleware } from 'react-router-redux'
import createSagaMiddleware from 'redux-saga'

import * as Storage from '../services/storage'
import { STATE_KEY } from '../constants'
import { isDevelopment } from '../util'
import rootReducer from '../reducers'

// middleware
const router = routerMiddleware(browserHistory)
const saga = createSagaMiddleware()

let middleware = [ router, saga ]

// logger middleware in development
if (isDevelopment) middleware.push( require('redux-logger')({ collapsed: true }) )

const finalCreateStore = compose(
  applyMiddleware(...middleware),
  isDevelopment && window.devToolsExtension ? window.devToolsExtension() : f => f
)(createStore)

// persist stored state if available
const initialState = Storage.getItem(STATE_KEY) || {}

export default function configureStore(state = initialState) {

  const store = finalCreateStore(rootReducer, Immutable.fromJS(state))

  // set start sagas command
  store.runSaga = saga.run

  // store state on change
  store.subscribe( () => {

    // remove routing|ui from state before storing
    let stateTrimmed = store.getState().delete('routing').delete('ui')

    Storage.setItem(STATE_KEY, stateTrimmed)

  })

  return store

}
