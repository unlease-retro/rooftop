import Relay from 'react-relay'

export const query = () => Relay.QL`
  fragment on Query {
    advert(_id: $_id) {
      _id
      availabilityFrom
      availabilityTo
      city
      description
      disabled
      geocode {
        lat
        lng
      }
      listingId
      homeType
      hostName
      photos
      postcode
      price
      submitted
      title
      url
    },
  }
`
