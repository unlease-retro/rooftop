import Relay from 'react-relay'

export const query = () => Relay.QL`
  fragment on Query {
    allAdverts(submitted: $submitted, disabled: $disabled) {
      _id
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
