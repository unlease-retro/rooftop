import React, { Component } from 'react'
import Relay from 'react-relay'

import * as fragments from './fragments'
import variables from './variables'
// import mutation from './mutation'

import { View } from 'components/layout'
import { Text } from 'components/text'

class Bot extends Component {

  render() {

    // const { query, relay: { variables } } = this.props

    return (
      <View>

        <Text>
          Bot
        </Text>

      </View>
    )

  }

}

export default Relay.createContainer(Bot, {
  ...variables,
  fragments,
})
