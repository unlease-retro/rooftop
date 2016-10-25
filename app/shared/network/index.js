import { RelayNetworkLayer, urlMiddleware, authMiddleware } from 'react-relay-network-layer'

import { refreshToken } from '../../auth/actions'
import { getAccessToken } from '../../auth/selectors'
import { GRAPHQL_SERVER } from '../constants'

// custom middleware
const corsMiddleware = (opts = {}) => next => req => next({ ...req, ...opts })

// custom Relay network layer
const configureNetwork = store => new RelayNetworkLayer([

  urlMiddleware({ url: () => GRAPHQL_SERVER }),

  authMiddleware({
    token: () => getAccessToken(store.getState()),
    tokenRefreshPromise: () => store.dispatch(refreshToken()),
  }),

  corsMiddleware({ credentials: 'same-origin' }),

], { disableBatchQuery: true })

export default configureNetwork
