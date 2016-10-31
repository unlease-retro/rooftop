import Relay from 'react-relay'

export const query = () => Relay.QL`
  fragment on Query {
    listings(lng: $lng, lat: $lat, radius: $radius, startDateInNextDays: $startDateInNextDays, listed: $listed) {
      id
      location
      leakage
      nonResponsive
      user {
        id
        firstName
        lastName
        avatar
        notifications {
          numberOfUnread
        }
      }
    },
  }
`
