import Relay from 'react-relay'

export const query = () => Relay.QL`
  fragment on Query {
    users {
      id
    }
  }
`
