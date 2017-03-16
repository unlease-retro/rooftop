import Relay from 'react-relay'

export const query = () => Relay.QL`
  fragment on Query {
    upcomingViewings {
      host {
        firstName
        lastName
        phoneVerification {
          contactNumber
        }
      }
      guest {
        firstName
        lastName
        phoneVerification {
          contactNumber
        }
      }
      viewing {
        confirmedTime
      }
      listing {
        title
        id
      }
    }
  }
`
