import Relay from 'react-relay'


export default class AdvertMutation extends Relay.Mutation {

  getMutation() {

    return Relay.QL`mutation{ sendMessage }`

  }

  getVariables() {

    return {
      id: this.props.id,
      message: this.props.message
    }

  }

  getFatQuery() {

    return Relay.QL`
      fragments on SendMessagePayload {
        advert {
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