import Relay from 'react-relay'

export const query = () => Relay.QL`
  fragment on Query {
    allAdverts(crawled: $crawled, disabled: $disabled, submitted: $submitted) {
      _id
      availabilityFrom
      availabilityTo
      city
      description
      geocode {
        lat
        lng
      }
      homeType
      hostName
      photos
      postcode
      price
      title
      replies {
        _id,
        message
      }
      updatedAt
    },
  }
`
