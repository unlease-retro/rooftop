import Relay from 'react-relay'

export const query = () => Relay.QL`
  fragment on Query {
    adverts(submitted: $submitted, disabled: $disabled) {
      id,
      url,
      title,
      submitted,
      disabled,
      phoneNumber,
      updatedAt,
      createdAt,
      submittedBy,
      price {
        unit,
        value
      },
      location {
        postcode,
        area
      }
    }
  }
`
