import Relay from 'react-relay'

export default class SendAdvertMessageMutation extends Relay.Mutation {

  getMutation() {

    return Relay.QL`mutation{ sendAdvertMessage }`

  }

  getVariables() {

    return {
      _id: this.props._id,
      message: this.props.message,
      phoneNumber: this.props.phoneNumber,
    }

  }

  getFatQuery() {

    return Relay.QL`
      fragment on SendAdvertMessagePayload {
        advert {
          replies {
            host
            thread
            message
            createdAt
          }
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
