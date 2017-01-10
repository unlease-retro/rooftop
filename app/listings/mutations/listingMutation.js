/**
 * Created by Izzy on 10/01/2017.
 */

import Relay from 'react-relay'

export default class ListingsMutation extends Relay.Mutation {

  getMutation() {

    return Relay.QL`mutation{ updateHostStatus }`

  }

  getVariables() {

    return {
      id: this.props.id,
      leakage: this.props.leakage,
      nonResponsive: this.props.nonResponsive,
    }

  }

  getFatQuery() {

    return Relay.QL`
      fragment on UpdateHostStatusPayload {
        listing {
          id,
          leakage,
          nonResponsive,
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
