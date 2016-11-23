import Relay from 'react-relay'

export const query = () => Relay.QL`
  fragment on Query {
    advertById(id: $id) {
      id,
      url,
      title,
      price,
      phoneNumber,
      disabled,
      submitted,
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
