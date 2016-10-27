import Relay from 'react-relay'

export const query = () => Relay.QL`
  fragment on Query {
    listings(lng: $lng, lat: $lat, radius: $radius) {
      id
      location
      user {
        id
        firstName
        lastName
        avatar
      }
    },
  }
`
