/**
  * @desc Relay Network Layer middleware
*/

// -----
// AUTH
// -----

class InvalidTokenError extends Error {

  constructor(msg, code) {

    super(msg)

    this.code = code
    this.name = 'InvalidTokenError'

  }

}

export const authMiddleware = ({ token: getToken, tokenRefreshPromise, prefix='Bearer', failure }) => next => req => {

  return new Promise( (resolve, reject) => {

    // get access_token from store
    const token = getToken()

    // no token? reject!
    if (!token && tokenRefreshPromise) return reject(new InvalidTokenError('Could not process request. Please try to login again.'))

    // otherwise resolve token
    resolve(token)

  }).then( token => {

    // set Auth header with token
    req.headers['Authorization'] = `${prefix} ${token}`

    // send request
    return next(req)

  }).then( res => {

    // check for errors and throw
    if (res.json.errors && tokenRefreshPromise) throw new InvalidTokenError(res.json.errors[0].message, res.json.errors[0].code)

    // otherwise respond OK
    return res

  }).catch( err => {

    // invalid token error?
    if (err.code === 3000) {

      // catch any errors and try to refresh token
      return tokenRefreshPromise()
        .then( newToken => {

          // set Auth header with new token
          req.headers['Authorization'] = `${prefix} ${newToken}`

          // retry request
          return next(req)

        })

    }

    // otherwise run failure action
    failure(err)

    // and throw the error
    throw err

  })

}

// -----
// CORS
// -----

export const corsMiddleware = (opts = {}) => next => req => next({ ...req, ...opts })

// -----
// LOADER
// -----

export const loaderMiddleware = ({ request, success, failure }) => next => req => {

  // fire request action
  request()

  return next(req).then(res => {

    // check for GraphQL errors
    if ( res.json.errors ) {

      // fire failure action
      failure(res.json.errors[0])

    } else {

      // fire success action
      success()

    }

    return res

  })

}
