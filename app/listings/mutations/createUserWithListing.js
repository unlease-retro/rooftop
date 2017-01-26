import Relay from 'react-relay'

export default class CreateUserWithListingMutation extends Relay.Mutation {

  getMutation() {

    return Relay.QL`mutation{ createUserWithListing }`

  }

  getVariables() {

    return {
      id: this.props.id,
      payload: this.props.payload,
    }

  }

  getFatQuery() {

    return Relay.QL`
      fragment on CreateUserWithListingPayload {
        listing {
          id,
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
