import Relay from 'react-relay'


export default class AdvertMutation extends Relay.Mutation {

  getMutation() {

    return Relay.QL`mutation{ markAdvert }`

  }

  getVariables() {

    return {
      id: this.props.id
    }

  }

  getFatQuery() {

    return Relay.QL`
      fragments on MarkAdvertPayload {
        advert {
          id,
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
        advert: this.props.id,
      },
    }]

  }

}