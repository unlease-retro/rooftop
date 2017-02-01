import Relay, { Mutation } from 'react-relay'

export default class RemoveListing extends Mutation {

  getMutation() {

    return Relay.QL`mutation{ removeListing }`

  }

  getVariables() {

    return {
      id: this.props.id
    }

  }

  getFatQuery() {

    return Relay.QL`
      fragment on RemoveListingPayload {
        listing {
          id
        },
      }
    `

  }

  getConfigs() {

    return [{
      type: 'FIELDS_CHANGE',
      fieldIDs: {
        listing: this.props.id,
      },
    }]

  }
  
}
