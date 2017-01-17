/**
 * Created by Izzy on 10/01/2017.
 */


import Relay from 'react-relay'

export default class removeListingFromPopular extends Relay.Mutation {

  getMutation() {

    return Relay.QL`mutation{ removeListingFromPopular }`

  }

  getVariables() {

    return {
      id: this.props.id
    }

  }

  getFatQuery() {

    return Relay.QL`
      fragment on RemoveListingFromPopularPayload {
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
