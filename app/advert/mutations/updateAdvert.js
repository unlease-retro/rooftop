import Relay from 'react-relay'

export default class UpdateAdvertMutation extends Relay.Mutation {

  getMutation() {

    return Relay.QL`mutation{ updateAdvert }`

  }

  getVariables() {

    return {
      _id: this.props._id,
      payload: this.props.payload,
    }

  }

  getFatQuery() {

    return Relay.QL`
      fragment on UpdateAdvertPayload {
        advert {
          availabilityFrom
          availabilityTo
          description
          disabled
          homeType
          hostName
          listingId
          phoneNumber
          postcode
          price
          submitted
          title
        },
      }
    `

  }

  getConfigs() {

    return [{
      type: 'FIELDS_CHANGE',
      fieldIDs: {
        advert: this.props._id,
      },
    }]

  }

}
