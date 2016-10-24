import React, { Component } from 'react'
import Relay from 'react-relay'
import useRelay from 'react-router-relay'
import { Provider } from 'react-redux'
import { Router, browserHistory, applyRouterMiddleware } from 'react-router'
import { syncHistoryWithStore } from 'react-router-redux'

import routes from '../../routes'
import configureStore from '../store'
import createSelectLocationState from '../util/createSelectLocationState'

const store = configureStore()
const history = syncHistoryWithStore(browserHistory, store, { selectLocationState: createSelectLocationState() })

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
          routes={routes}
          history={history} />
      </Provider>
    )

  }

}
