import Relay from 'react-relay'

export const query = () => Relay.QL`
  fragment on Query {
    upcomingViewings {
      host {
        firstName
      }
      guest {
        firstName
      }
      viewing {
        confirmedTime
      }
      listing {
        title
      }
    }
  }
`
