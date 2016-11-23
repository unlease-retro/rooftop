import Relay from 'react-relay'

export const query = () => Relay.QL`
  fragment on Query {
    adverts(submitted: $submitted, disabled: $disabled) {
      id,
      url,
      title,
      price,
      submitted,
      disabled,
      phoneNumber,
      updatedAt,
      createdAt,
      submittedBy,
      location {
        postcode,
        area
      }
    }
  }
`
