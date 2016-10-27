import Relay from 'react-relay'

export const user = () => Relay.QL`
  fragment on Query {
    userById(id: $id) {
      id
      firstName
      lastName
      avatar
    },
  }
`
