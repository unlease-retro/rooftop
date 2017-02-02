import Relay from 'react-relay'

export const query = () => Relay.QL`
  fragment on Query {
    allAdverts(crawled: $crawled, disabled: $disabled, submitted: $submitted) {
      _id
      status
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
