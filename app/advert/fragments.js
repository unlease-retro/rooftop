import Relay from 'react-relay'

export const query = () => Relay.QL`
  fragment on Query {
    advert(_id: $_id) {
      _id
      homeType
      availabilityFrom
      availabilityTo
      city
      description
      geocode {
        lat
        lng
      }
      hostName
      photos
      postcode
      price
      title
    },
  }
`
