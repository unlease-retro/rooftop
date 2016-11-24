import Relay from 'react-relay'


export default class AdvertMutation extends Relay.Mutation {

  getMutation() {

    return Relay.QL`mutation{ disableAdvert }`

  }

  getVariables() {

    return {
      id: this.props.id,
      disabled: this.props.disabled,
      submitted: this.props.submitted
    }

  }

  getFatQuery() {

    return Relay.QL`
      fragments on DisableAdvertPayload {
        advert {
          id,
          disabled
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