import Relay from 'react-relay'

export const query = () => Relay.QL`
  fragment on Query {
    listings(lng: $lng, lat: $lat, radius: $radius, startDateInNextDays: $startDateInNextDays, listed: $listed) {
      id
      availableFrom
      availableTo
      contactNumber
      createdAt
      location
      leakage
      nonResponsive
      postcode
      title
      weeklyRent
      listed
      popular
      photos {
        s3Link
      }
      user {
        id
        avatar
        email
        firstName
        lastName
        lastLoggedInAt
        phoneVerification {
          contactNumber
        }
        notifications {
          numberOfUnread
        }
      }
    },
  }
`
