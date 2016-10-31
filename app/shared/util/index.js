/**
  * @desc Utils - general utility functions
*/

import jwt_decode from 'jwt-decode'

export const isDevelopment = process.env.NODE_ENV === 'development'

export const decodeToken = token => jwt_decode(token)
