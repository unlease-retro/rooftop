import Relay from 'react-relay'

export default class CreateUserWithListingMutation extends Relay.Mutation {

  getMutation() {

    return Relay.QL`mutation{ createUserWithListing }`

  }

  getVariables() {

    return {
      id: this.props.id,
      email: this.props.email,
      payload: this.props.payload,
    }

  }

  getFatQuery() {

    return Relay.QL`
      fragment on CreateUserWithListingPayload @relay(pattern: true) {
        listingId
        email
        password
      }
    `

  }

  getConfigs() {

    return [{
      type: 'REQUIRED_CHILDREN',
      children: [
        Relay.QL`
          fragment on CreateUserWithListingPayload {
            listingId
            email
            password
          }
        `,
      ],
    }]

  }

}
