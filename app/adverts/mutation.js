import Relay from 'react-relay'


export default class AdvertsMutation extends Relay.Mutation {

  getMutation() {

    return Relay.QL`mutation{ sendAdvertsMessages }`

  }

  getVariables() {

    return {
      adverts: this.props.adverts,
      message: this.props.message
    }

  }

  getFatQuery() {

    return Relay.QL`
      fragments on SendAdvertsMessagesPayload {
        advert {
          submitted,
          submittedBy
        }
      }
    `

  }

  getConfigs() {

    return [{
      type: 'FIELDS_CHANGE',
      fieldIDs: {
        advert: this.props.adverts,
      },
    }]

  }

}