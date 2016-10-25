import React from 'react'
import Relay from 'react-relay'
import { Route, IndexRoute } from 'react-router'

// containers
import App from './shared/containers/App'
import NotFound from './shared/containers/NotFound'
import Protected from './shared/containers/Protected'
import { Container as Auth } from './auth'
import { Container as Listings } from './listings'

// access root query exposed by GraphQL server for Relay -> https://github.com/lucasbento/graphql-pokemon/issues/1
const RootQuery = { query: () => Relay.QL`query { query }` }

module.exports = (
  <Route path='/' component={App}>
    <Route path='login' component={Auth} />
    <Route path='*' component={NotFound} />
    <Route component={Protected}>
      <IndexRoute component={Listings} queries={RootQuery} />
      {/* <Route path='listings' component={Listings} queries={RootQuery} /> */}
    </Route>
  </Route>
)
