import { takeLatest } from 'redux-saga'
import { call, put, fork, select } from 'redux-saga/effects'

import * as API from '../shared/services/api'
import { getDecodedToken } from '../shared/util'

import * as actions from './actions'
import * as actionType from './actionTypes'
import selectors from './selectors'
import { ADMIN_AUTH, AUTH_ERROR } from './constants'

// -----
// LOGIN
// -----

export function* login() {

  yield* takeLatest(actionType.LOGIN_REQUEST, fetchLogin)

}

function* fetchLogin({ payload }) {

  try {

    const { username, password } = payload

    const res = yield call(API.post, 'auth/login', { username, password })
    const user = res

    // check for ADMIN permissions
    const { authorities } = getDecodedToken(user.access_token)
    const hasAdminAuth = authorities.includes(ADMIN_AUTH)

    if (user.error || !hasAdminAuth) {

      throw new Error(user.error_description || AUTH_ERROR)

    } else {

      yield put(actions.loginSuccess({ user }))

    }

  } catch (error) {

    yield put(actions.loginFailure({}, { ui: { error } }))

  }

}

// -----
// REFRESH TOKEN
// -----

export function* refreshToken() {

  yield* takeLatest(actionType.REFRESH_TOKEN_REQUEST, fetchRefreshToken)

}

function* fetchRefreshToken() {

  try {

    const refresh_token = yield select(selectors.refresh_token)

    const res = yield call(API.post, 'auth/refresh', { refresh_token })
    const user = res

    if (user.error) {

      throw new Error(user.error_description)

    } else {

      yield put(actions.refreshTokenSuccess({ user }))

    }

  } catch (error) {

    yield put(actions.refreshTokenFailure({}, { ui: { error } }))

  }

}

export default function* root() {

  yield fork(login)
  yield fork(refreshToken)

}
