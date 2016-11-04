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

  getOptimisticResponse() {

    return {
      listing: {
        id: this.props.id,
        leakage: this.props.leakage,
        nonResponsive: this.props.nonResponsive,
      },
    }

  }

  // static fragments = {
  //
  //   listing: () => Relay.QL`
  //     fragment on Listing {
  //       id,
  //     }
  //   `
  //
  // }

}
