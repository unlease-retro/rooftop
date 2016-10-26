import { takeLatest } from 'redux-saga'
import { call, put, fork, select } from 'redux-saga/effects'

import * as API from '../shared/services/api'

import * as actions from './actions'
import * as actionType from './actionTypes'
import selectors from './selectors'

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

    yield put(actions.loginSuccess({ user }))

  } catch (error) {

    yield put(actions.loginFailure({ error }))

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

    yield put(actions.refreshTokenSuccess({ user }))

  } catch (error) {

    yield put(actions.refreshTokenFailure({ error }))

  }

}

export default function* root() {

  yield fork(login)
  yield fork(refreshToken)

}
