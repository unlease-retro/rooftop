import Relay from 'react-relay'

export const query = () => Relay.QL`
  fragment on Query {
    adverts(submited: $submited) {
      _id,
      url,
      title,
      price,
      submited,
      phoneNumber,
      updatedAt,
      createdAt,
      submitedBy,
      location {
        postcode,
        area
      }
    }
  }
`
