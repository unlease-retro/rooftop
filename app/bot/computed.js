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
export const getFilteredBotAdverts = R.memoize( (adverts, { contacted }) => {

  if (!contacted) return adverts

  return adverts.filter( a => a.replies.length )

})

const getFormattedTimestamp = advert => {

  advert.updatedAt = new Date(advert.updatedAt) 

  return advert

}

export const getFormattedDateBotAdverts = R.memoize( adverts => R.map(getFormattedTimestamp, adverts) )