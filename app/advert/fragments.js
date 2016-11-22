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
      submited,
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
        avability,
        maximumTerm,
        minimumTerm
      },
      amenities {
        balcony,
        garden,
        parking
      },
      submitedBy,
      createdAt,
      updatedAt,
      replies {
        id,
        from,
        thread,
        message,
        createdAt
      }
    }
  }
`
