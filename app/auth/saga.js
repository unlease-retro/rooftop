import { takeLatest } from 'redux-saga'
import { call, put, fork, select } from 'redux-saga/effects'

import * as API from '../shared/services/api'

import * as actions from './actionTypes'
import selectors from './selectors'

// -----
// LOGIN
// -----

export function* login() {

  yield* takeLatest(actions.LOGIN_REQUEST, fetchLogin)

}

function* fetchLogin({ payload }) {

  try {

    const { username, password } = payload

    const res = yield call(API.post, 'auth/login', { username, password })
    const user = res

    yield put({ type: actions.LOGIN_SUCCESS, payload: { authorised: true, user } })

  } catch (error) {

    yield put({ type: actions.LOGIN_FAILURE, payload: { authorised: false, error } })

  }

}

// -----
// REFRESH TOKEN
// -----

export function* refreshToken() {

  yield* takeLatest(actions.REFRESH_TOKEN_REQUEST, fetchRefreshToken)

}

function* fetchRefreshToken() {

  try {

    const refresh_token = yield select(selectors.refresh_token)

    const res = yield call(API.post, 'auth/refresh', { refresh_token })
    const user = res

    yield put({ type: actions.REFRESH_TOKEN_SUCCESS, payload: { authorised: true, user } })

  } catch (error) {

    yield put({ type: actions.REFRESH_TOKEN_FAILURE, payload: { authorised: false, error } })

  }

}

// -----
// CHECK TOKEN
// -----

export function* checkToken() {

  yield* takeLatest(actions.CHECK_TOKEN_REQUEST, fetchCheckToken)

}

function* fetchCheckToken() {

  try {

    // const token = yield select(selectors.token)
    //
    // console.log('fetchCheckToken', token)

    // TODO - use utils from unl/ui here!! -> maybe not try/catch, unless can return Promise

    // yield put({ type: actions.CHECK_TOKEN_SUCCESS, payload: {  } })

  } catch (error) {

    yield put({ type: actions.CHECK_TOKEN_FAILURE, payload: { authorised: false, error } })

  }

}

export default function* root() {

  yield fork(login)
  yield fork(refreshToken)
  yield fork(checkToken)

}
