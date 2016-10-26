import { takeLatest } from 'redux-saga'
import { fork, put } from 'redux-saga/effects'

import * as actions from './actionTypes'
import { REQUEST_PATTERN, SUCCESS_PATTERN, FAILURE_PATTERN } from './constants'

// -----
// REQUEST
// -----

export function* watchRequest() {

  yield* takeLatest( action => REQUEST_PATTERN.test(action.type), handleRequest)

}

function* handleRequest() {

  yield put({ type: actions.UPDATE, payload: { error: null, requesting: true } })

}

// -----
// SUCCESS
// -----

export function* watchSuccess() {

  yield* takeLatest( action => SUCCESS_PATTERN.test(action.type), handleSuccess)

}

function* handleSuccess() {

  yield put({ type: actions.UPDATE, payload: { requesting: false } })

}

// -----
// FAILURE
// -----

export function* watchFailure() {

  yield* takeLatest( action => FAILURE_PATTERN.test(action.type), handleFailure)

}

function* handleFailure(action) {

  const { error } = action.payload

  yield put({ type: actions.UPDATE, payload: { error, requesting: false } })

}

export default function* root() {

  yield fork(watchRequest)
  yield fork(watchSuccess)
  yield fork(watchFailure)

}
