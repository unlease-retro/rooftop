/**
  * @desc Relay Network Layer middleware
*/

// -----
// LOADER
// -----

export const loaderMiddleware = ({ request, success, failure }) => next => req => {

  // fire request action
  request()

  return next(req).then(res => {

    if ( res.json.error ) {

      // fire failure action
      failure(res.json.error)

    } else {

      // fire success action
      success()

    }

    return res

  })

}
