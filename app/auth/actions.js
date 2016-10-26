import * as actions from './actionTypes'

// -----
// LOGOUT
// -----

export const logout = () => ({
  type: actions.LOGOUT
})

// -----
// LOGIN
// -----

export const login = ({ username, password }) => ({
  type: actions.LOGIN_REQUEST,
  payload: {
    username,
    password,
  }
})

export const loginSuccess = ({ authorised=true, user }) => ({
  type: actions.LOGIN_SUCCESS,
  payload: {
    authorised,
    user,
  }
})

export const loginFailure = ({ authorised=false, error }) => ({
  type: actions.LOGIN_FAILURE,
  payload: {
    authorised,
    error,
  }
})

// -----
// REFRESH TOKEN
// -----

export const refreshToken = () => ({
  type: actions.REFRESH_TOKEN_REQUEST
})

export const refreshTokenSuccess = ({ authorised=true, user }) => ({
  type: actions.REFRESH_TOKEN_SUCCESS,
  payload: {
    authorised,
    user,
  }
})

export const refreshTokenFailure = ({ authorised=false, error }) => ({
  type: actions.REFRESH_TOKEN_FAILURE,
  payload: {
    authorised,
    error,
  }
})
