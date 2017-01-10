/**
 * Created by Izzy on 10/01/2017.
 */


import Relay from 'react-relay'

export default class AddListingToPopular extends Relay.Mutation {

  getMutation() {

    return Relay.QL`mutation{ addListingToPopular }`

  }

  getVariables() {

    return {
      id: this.props.id
    }

  }

  getFatQuery() {

    return Relay.QL`
      fragment on AddListingToPopularPayload {
        listing {
          id,
          popular,
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
