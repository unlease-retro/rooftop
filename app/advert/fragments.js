import Relay from 'react-relay'

export const query = () => Relay.QL`
  fragment on Query {
    advert(_id: $_id) {
      _id
      title
      description
      price
      homeType
      hostName
      phoneNumber
      photos
      availabilityFrom
      availabilityTo
      city
      postcode
      geocode {
        lat
        lng
      }
      disabled
      submitted
    },
  }
`
