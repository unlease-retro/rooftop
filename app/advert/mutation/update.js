import Relay from 'react-relay'


export default class AdvertMutation extends Relay.Mutation {

  getMutation() {

    return Relay.QL`mutation{ updateAdvertStatus }`

  }

  getVariables() {

    return {
      id: this.props.id,
      disabled: this.props.disabled,
      submited: this.props.submited
    }

  }

  getFatQuery() {

    return Relay.QL`
      fragments on UpdateAdvertStatusPayload {
        advert {
          _id,
          disabled,
          submited
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