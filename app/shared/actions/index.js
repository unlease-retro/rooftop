import * as actions from '../actionTypes'

export const relayRequest = () => ({
  type: actions.RELAY_REQUEST
})

export const relaySuccess = () => ({
  type: actions.RELAY_SUCCESS
})

export const relayFailure = error => ({
  type: actions.RELAY_FAILURE,
  meta: {
    ui: {
      error
    }
  }
})
