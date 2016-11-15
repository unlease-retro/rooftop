import Relay from 'react-relay'

export const query = () => Relay.QL`
  fragment on Query {
    adverts(crawled: $crawled) {
      _id,
      title,
      price
    }
  }
`
