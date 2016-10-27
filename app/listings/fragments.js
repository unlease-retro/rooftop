import Relay from 'react-relay'

// TODO - compose `user` from User.getFragment('user')

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
