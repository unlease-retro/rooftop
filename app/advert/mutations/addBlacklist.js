import Relay from 'react-relay'

export default class AddBlacklistMutation extends Relay.Mutation {

  getMutation() {

    return Relay.QL`mutation{ addBlacklist }`

  }

  getVariables() {

    return {
      phoneNumber: this.props.phoneNumber
    }

  }

  getFatQuery() {

    return Relay.QL`
      fragment on AddBlacklistPayload {
        advert {
          phoneNumber
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
