import React from 'react'
import { render } from 'react-dom'
import Relay from 'react-relay'
import { Router, Route, browserHistory, applyRouterMiddleware } from 'react-router'
import useRelay from 'react-router-relay'

import Root from './containers/Root'

const GraphQLServer = 'http://localhost:5000/graphql'

Relay.injectNetworkLayer(
  new Relay.DefaultNetworkLayer(GraphQLServer, {
    credentials: 'same-origin',
  })
)

const ListingQueries = { listings: () => Relay.QL`query { listings }` }

render(
  <Router
    forceFetch
    environment={Relay.Store}
    render={applyRouterMiddleware(useRelay)}
    history={browserHistory}
  >
    <Route path='/' component={Root} queries={ListingQueries} />
  </Router>
  , document.getElementById('root')
)
