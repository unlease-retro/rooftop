import Relay from 'react-relay'

export const query = () => Relay.QL`
  fragment on Query {
    advertById(id: $id) {
      id,
      url,
      title,
      phoneNumber,
      disabled,
      submitted,
      price {
        unit,
        value
      },
      location {
        area,
        postcode
      },
      author {
        type,
        name
      },
      preferences {
        couples,
        gender
      },
      avability {
        date,
        maximum,
        minimum
      },
      amenities {
        balcony,
        garden,
        parking
      },
      submittedBy,
      createdAt,
      updatedAt,
      replies {
        id,
        host,
        thread,
        message,
        createdAt
      }
    }
  }
`
