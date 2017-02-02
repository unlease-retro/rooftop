/**
  * @desc Advert computed values, memoized using ramda-memoize
  * @see http://ramdajs.com/docs/#memoize
*/

import R from 'ramda'

export const getStatus = R.memoize( ({ disabled, submitted }) => submitted ? 'active' : !disabled ? 'pending' : 'declined' )
