import Relay from 'react-relay'

export const query = () => Relay.QL`
  fragment on Query {
    advert(_id: $_id) {
      _id
      url
      title
      description
      price
      homeType
      hostName
      phoneNumber
      photos
      availabilityFrom
      availabilityTo
      city
      postcode
      geocode {
        lat
        lng
      }
      amenities {
        parking
        garage
        furnishing
        garden
        balcony
        disabledAccess
        sharedLivingRoom
        broadband
      }
      household {
        pets
        rooms
        gender
        smoker
        language
        flatmates
        occupation
      }
      extraCosts {
        deposit
        feesApply
        billsIncluded
      }
      preferences {
        dss
        pets
        gender
        couples
        smoking
        occupation
        references
      }
      disabled
      submitted
    },
  }
`