import React, { Component } from 'react'
import Relay from 'react-relay'

class Root extends Component {

  componentWillMount() {

    console.log('🏠 R O O F T O P 🏠')

  }

  render() {

    console.log(this.props.viewer.allRooms.edges)

    return (
      <h1>Room</h1>
    )

  }

}


export default Relay.createContainer(Root, {
  fragments: {
    viewer: () => Relay.QL`
      fragment on Viewer {
        allRooms(first: 100) {
          edges {
            node {
              id
              title
            }
          }
        }
        id
      }
    `,
  },
})
