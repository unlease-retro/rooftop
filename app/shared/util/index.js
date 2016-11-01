/**
  * @desc Utils - general utility functions
*/

import jwt_decode from 'jwt-decode'

export const isDevelopment = process.env.NODE_ENV === 'development'

export const decodeToken = token => jwt_decode(token)

export const formatTimestamp = ts => {

  let date = new Date(ts)
  let day = date.getDate().toString()

  let DD = Array(3 - day.length).join('0') + day
  let MM = date.getMonth() + 1
  let YY = date.getFullYear()

  return `${DD}/${MM}/${YY}`

}
