import Relay from 'react-relay'

export const query = () => Relay.QL`
  fragment on Query {
    advert(_id: $_id) {
      _id
      id
      url
      title
      listingId
      description
      price
      deposit
      homeType
      hostName
      numOfFemale
      numOfMale
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
        ages
        interests
        housemates
        nationality
      }
      extraCosts {
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
        minAge
        maxAge
        vegetarian
      }
      disabled
      submitted
    },
  }
`
