import React, { Component } from 'react'
import Relay from 'react-relay'

import * as fragments from './fragments'

import { View } from 'components/layout'
import { TitleText } from 'components/text'

class User extends Component {

  render() {

    return (
      <View>

        <TitleText>Users</TitleText>

      </View>
    )

  }

}

export default Relay.createContainer(User, { fragments })
