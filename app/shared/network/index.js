import { RelayNetworkLayer, urlMiddleware, authMiddleware } from 'react-relay-network-layer'

import { getToken } from '../../auth/selectors'
import { GRAPHQL_SERVER } from '../constants'

// custom middleware
const corsMiddleware = (opts = {}) => next => req => next({ ...req, ...opts })

// custom Relay network layer
const configureNetwork = store => new RelayNetworkLayer([

  urlMiddleware({ url: () => GRAPHQL_SERVER }),

  authMiddleware({ token: () => getToken(store.getState()) }),

  corsMiddleware({ credentials: 'same-origin' }),

], { disableBatchQuery: true })

export default configureNetwork
