import React, { Component } from 'react'
import Relay from 'react-relay'

class Listings extends Component {

  render() {

    const { listings } = this.props.query

    console.log(listings)

    return (
      <h1>🏠 Listings</h1>
    )

  }

}

// TODO - abstract initialVariables, fragments
export default Relay.createContainer(Listings, {
  initialVariables: {
    lng: -0.12775829999998223,
    lat: 51.5073509,
    radius: 21,
  },
  fragments: {
    query: () => Relay.QL`
      fragment on Query {
        listings(lng: $lng, lat: $lat, radius: $radius) {
          id
          location
          user {
            id
            firstName
            lastName
            avatar
          }
        },
      }
    `,
  },
})
