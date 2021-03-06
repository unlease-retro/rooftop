/**
  * @desc Utils - general utility functions
*/

import jwt_decode from 'jwt-decode'
import Relay from 'react-relay'

import { UI } from '../constants'

const padLeft = str => Array(3 - str.length).join('0') + str

export const isDevelopment = process.env.NODE_ENV === 'development'

export const promisifyMutation = mutation => new Promise( (onSuccess, onFailure) => Relay.Store.commitUpdate( mutation, { onSuccess, onFailure } ) )

export const getDecodedToken = token => jwt_decode(token)

export const getCapitalised = str => str.replace( /\b\w/g, l => l.toUpperCase() )

export const getFormattedTimestamp = ts => {

  const date = new Date(ts)
  const day = date.getDate().toString()
  const month = (date.getMonth() + 1).toString()
  const hour = date.getHours().toString()
  const minutes = date.getMinutes().toString()

  const DD = padLeft(day)
  const MM = padLeft(month)
  const YYYY = date.getFullYear()
  const HH = padLeft(hour)
  const MMMM = padLeft(minutes)

  return `${DD}/${MM}/${YYYY} ${HH}:${MMMM}`

}

export const getListingUrl = id => `${UI}/room/${id}`

export const getProfileUrl = id => `${UI}/unleaser/${id}`