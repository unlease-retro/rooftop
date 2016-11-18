import Relay from 'react-relay'

export const query = () => Relay.QL`
  fragment on Query {
    advertById(id: $id) {
      _id,
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
        _id,
        from,
        thread,
        message,
        createdAt
      }
    }
  }
`
