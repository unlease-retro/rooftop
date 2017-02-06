/**
  * @desc Listing computed values, memoized using ramda-memoize
  * @see http://ramdajs.com/docs/#memoize
*/

import R from 'ramda'

/**
  * @function getFilteredListings
  * @param {Object[]} listings - array of Listing objects
  * @param {Object} filters - filters to apply to `listings` array
*/
export const getFilteredListings = R.memoize( (listings, { bot, hostStatus, listed, popular }) => {

  return listings
    .filter( l => !listed && l[hostStatus] || listed && l )
    .filter( l => listed && popular !== 'unspecified' && (popular && l.popular === popular || !popular && !l.popular) || popular === 'unspecified' && l )
    .filter( l => bot && l.bot || !bot && l )

})
