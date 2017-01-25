import React, { Component } from 'react'
import Relay from 'react-relay'

import * as fragments from './fragments'
// import mutations from './mutations'
import variables from './variables'

import { View } from 'components/layout'
import { Text } from 'components/text'

class Bot extends Component {

  render() {

    return (
      <View>

        <Text>Bot</Text>

      </View>
    )

  }

}

export default Relay.createContainer(Bot, { ...variables, fragments })
