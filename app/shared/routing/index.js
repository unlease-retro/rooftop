import React from 'react'
import Relay from 'react-relay'
import { Route, IndexRoute } from 'react-router'

// containers
import App from '../containers/App'
import NotFound from '../containers/NotFound'
import { Container as Auth } from '../../auth'
import { Container as Bot } from '../../bot'
import { Container as Listings } from '../../listings'

// hooks
import { protectedOnEnter } from './hooks'

// access root query exposed by GraphQL server for Relay -> https://github.com/lucasbento/graphql-pokemon/issues/1
const RootQuery = { query: () => Relay.QL`query { query }` }

const routes = store => (
  <Route path='/' component={App}>
    <Route path='login' component={Auth} />
    <Route onEnter={ ( ...args ) => protectedOnEnter(store, ...args) }>
      <IndexRoute component={Listings} queries={RootQuery} />
      <Route path='bot' component={Bot} queries={RootQuery} />
    </Route>
    <Route path='*' component={NotFound} />
  </Route>
)

export default routes
