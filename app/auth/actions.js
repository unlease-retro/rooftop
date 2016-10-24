import * as actions from './actionTypes'

export const setAuthorised = (authorised=false) => ({
  type: actions.SET_AUTHORISED,
  payload: {
    authorised
  }
})
