import React, { Component } from 'react'
// import Relay from 'react-relay'

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

export default Root

// export default Relay.createContainer(Root, {
//   fragments: {
//     viewer: () => Relay.QL`
//       fragment on Listing {
//         listings(lng: -0.12775829999998223, lat: 51.5073509, radius: 21) {
//           edges {
//             node {
//               id
//               location
//             }
//           }
//         }
//         id
//       }
//     `,
//   },
// })
