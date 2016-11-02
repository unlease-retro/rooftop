/**
  * @desc Utils - general utility functions
*/

import jwt_decode from 'jwt-decode'

export const isDevelopment = process.env.NODE_ENV === 'development'

export const decodeToken = token => jwt_decode(token)

export const getCapitalised = str => str.replace( /\b\w/g, l => l.toUpperCase() )

const padLeft = str => Array(3 - str.length).join('0') + str

export const getFormattedTimestamp = ts => {

  const date = new Date(ts)
  const day = date.getDate().toString()
  const month = (date.getMonth() + 1).toString()

  const DD = padLeft(day)
  const MM = padLeft(month)
  const YYYY = date.getFullYear()

  return `${DD}/${MM}/${YYYY}`

}
