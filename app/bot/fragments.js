import Relay from 'react-relay'

export const query = () => Relay.QL`
  fragment on Query {
    allAdverts(submitted: $submitted, disabled: $disabled) {
      id
    },
  }
`
