import React, { Component } from 'react'
import Relay from 'react-relay'
import useRelay from 'react-router-relay'
import { Provider } from 'react-redux'
import { Router, browserHistory, applyRouterMiddleware } from 'react-router'
import { syncHistoryWithStore } from 'react-router-redux'

import routes from '../routing'
import configureStore from '../store'
import configureNetwork from '../network'
import createSelectLocationState from '../util/createSelectLocationState'
import rootSaga from '../sagas'

// application setup
const store = configureStore()
const network = configureNetwork(store)
const history = syncHistoryWithStore(browserHistory, store, { selectLocationState: createSelectLocationState() })

// start sagas
store.runSaga(rootSaga)

// configure Relay network layer
Relay.injectNetworkLayer( network )

export default class Root extends Component {

  componentWillMount() {

    console.log('🏠 R O O F T O P 🏠')

  }

  render() {

    return (
      <Provider store={store}>
        <Router
          forceFetch
          environment={Relay.Store}
          render={applyRouterMiddleware(useRelay)}
          routes={routes(store)}
          history={history} />
      </Provider>
    )

  }

}
