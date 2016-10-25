import * as actions from './actionTypes'

export const login = ({ username, password }) => ({
  type: actions.LOGIN_REQUEST,
  payload: {
    username,
    password,
  }
})

export const checkToken = () => ({
  type: actions.CHECK_TOKEN_REQUEST
})

export const refreshToken = () => ({
  type: actions.REFRESH_TOKEN_REQUEST
})

export const refreshTokenSuccess = ({ authorised, user }) => ({
  type: actions.REFRESH_TOKEN_SUCCESS,
  payload: {
    authorised,
    user,
  }
})
