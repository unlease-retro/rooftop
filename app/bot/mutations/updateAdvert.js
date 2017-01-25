import Relay from 'react-relay'

export default class UpdateAdvertMutation extends Relay.Mutation {

  getMutation() {

    return Relay.QL`mutation{ updateAdvert }`

  }

  getVariables() {

    return {
      id: this.props.id,
      payload: this.props.payload,
    }

  }

  getFatQuery() {

    return Relay.QL`
      fragment on UpdateAdvertPayload {
        advert {
          id,
        },
      }
    `

  }

  getConfigs() {

    return [{
      type: 'FIELDS_CHANGE',
      fieldIDs: {
        advert: this.props.id,
      },
    }]

  }

}
