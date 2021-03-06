import React from 'react'
import Relay from 'react-relay'
import { Route, IndexRoute } from 'react-router'

// containers
import App from '../containers/App'
import NotFound from '../containers/NotFound'
import Protected from '../containers/Protected'
import * as Advert from '../../advert'
import * as Auth from '../../auth'
import * as Bot from '../../bot'
import * as Listings from '../../listings'
import * as Viewings from '../../viewings'

// hooks
import { protectedOnEnter } from './hooks'

// access root query exposed by GraphQL server for Relay -> https://github.com/lucasbento/graphql-pokemon/issues/1
const RootQuery = { query: () => Relay.QL`query { query }` }

const routes = store => (
  <Route path='/' component={App}>
    <Route path={Auth.route} component={Auth.Container} />
    <Route component={Protected} onEnter={ ( ...args ) => protectedOnEnter(store, ...args) }>
      <IndexRoute component={Listings.Container} queries={RootQuery} />
      <Route path={Advert.route} component={Advert.Container} queries={RootQuery} prepareParams={ params => params } />
      <Route path={Bot.route} component={Bot.Container} queries={RootQuery} />
      <Route path={Viewings.route} component={Viewings.Container} queries={RootQuery} />
    </Route>
    <Route path='*' component={NotFound} />
  </Route>
)

export default routes
