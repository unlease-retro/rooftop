import React from 'react'
import { render } from 'react-dom'
import Relay from 'react-relay'
import { Router, Route, browserHistory, applyRouterMiddleware } from 'react-router'
import useRelay from 'react-router-relay'

import Root from './containers/Root'

Relay.injectNetworkLayer(
  new Relay.DefaultNetworkLayer('https://api.graph.cool/relay/v1/ciue3pqxi05d30174jx0hl8x3')
)

const ViewerQueries = { viewer: () => Relay.QL`query { viewer }` }

render(
  <Router
    forceFetch
    environment={Relay.Store}
    render={applyRouterMiddleware(useRelay)}
    history={browserHistory}
  >
    <Route path='/' component={Root} queries={ViewerQueries} />
  </Router>
  , document.getElementById('root')
)
