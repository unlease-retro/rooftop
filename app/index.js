import React from 'react'
import { render } from 'react-dom'
import Root from './shared/containers/Root'
import Relay from 'react-relay'

const GraphQLServer = 'http://localhost:5000/graphql'

Relay.injectNetworkLayer(
  new Relay.DefaultNetworkLayer(GraphQLServer, {
    credentials: 'same-origin',
  })
)

const rootEl = document.getElementById('root')

render(<Root />, rootEl)
