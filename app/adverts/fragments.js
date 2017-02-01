import Relay from 'react-relay'

export const query = () => Relay.QL`
  fragment on Query {
    allAdverts(submitted: $submitted, disabled: $disabled, limit: $limit, crawled: $crawled) {
      _id,
      url,
      title,
      disabled,
      submitted,
      phoneNumber,
      price
    }
  }
`
