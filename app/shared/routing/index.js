import React from 'react'
import Relay from 'react-relay'
import { Route, IndexRoute } from 'react-router'

// containers
import App from '../containers/App'
import NotFound from '../containers/NotFound'
import Protected from '../containers/Protected'
import * as Auth from '../../auth'
import * as Adverts from '../../adverts'
import * as Advert from '../../advert'
import * as Listings from '../../listings'

// hooks
import { protectedOnEnter } from './hooks'

// access root query exposed by GraphQL server for Relay -> https://github.com/lucasbento/graphql-pokemon/issues/1
const RootQuery = { query: () => Relay.QL`query { query }` }

const routes = store => (
  <Route path='/' component={App}>
    <Route path={Auth.route} component={Auth.Container} />
    <Route component={Protected} onEnter={ ( ...args ) => protectedOnEnter(store, ...args) }>
      <IndexRoute component={Listings.Container} queries={RootQuery} />
      <Route path={Adverts.route} component={Adverts.Container} queries={RootQuery} />
      <Route path={Advert.route} component={Advert.Container} queries={RootQuery} />
    </Route>
    <Route path='*' component={NotFound} />
  </Route>
)

export default routes
