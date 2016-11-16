import React, { Component } from 'react'
import Relay from 'react-relay'

import * as fragments from './fragments'
import variables from './variables'
// import mutation from './mutation'

import { View } from 'components/layout'
import { Text } from 'components/text'

class Advert extends Component {

  render() {

    return (
      <View>

        <Text atomic={{ fs:6, fw:'b', ta:'c' }} color='primary'>Advert page</Text>

      </View>
    )

  }

}

export default Relay.createContainer(Advert, {
  ...variables,
  fragments,
})
