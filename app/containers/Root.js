import React, { Component } from 'react'
import Relay from 'react-relay'

class Root extends Component {

  componentWillMount() {

    console.log('🏠 R O O F T O P 🏠')

  }

  render() {

    console.log(this.props)

    return (
      <h1>🏠 Rooftop</h1>
    )

  }

}

export default Relay.createContainer(Root, {
  fragments: {
    listings: () => Relay.QL`
      fragment on Listing {
        id
        location
      }
    `,
  },
})
