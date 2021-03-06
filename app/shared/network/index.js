import { RelayNetworkLayer, urlMiddleware } from 'react-relay-network-layer'

import * as API from '../services/api'
import { refreshTokenSuccess } from '../../auth/actions'
import { relayRequest, relaySuccess, relayFailure } from '../actions'
import { getAccessToken, getRefreshToken } from '../../auth/selectors'
import { GRAPHQL_SERVER } from '../constants'
import { authMiddleware, corsMiddleware, loaderMiddleware } from './middleware'

// custom Relay network layer
const configureNetwork = store => new RelayNetworkLayer([

  urlMiddleware({ url: () => GRAPHQL_SERVER }),

  loaderMiddleware({
    request: () => store.dispatch(relayRequest()),
    success: () => store.dispatch(relaySuccess()),
    failure: error => store.dispatch(relayFailure(error))
  }),

  authMiddleware({
    token: () => getAccessToken(store.getState()),
    tokenRefreshPromise: () => new Promise( (resolve, reject) => {

      const refresh_token = getRefreshToken(store.getState())

      if (!refresh_token) return reject(Error('Invalid refresh_token'))

      return API.post('auth/refresh', { refresh_token })
        .then( json => {

          if (json.errMsg) return reject(Error(json.errMsg))

          store.dispatch(refreshTokenSuccess({ authorised: true, user: json }))

          return resolve(json.access_token)

        })

    }),
  }),

  corsMiddleware({ credentials: 'same-origin' }),

], { disableBatchQuery: true })

export default configureNetwork
