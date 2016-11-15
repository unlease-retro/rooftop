import React, { Component } from 'react'
import Relay from 'react-relay'

import * as fragments from './fragments'
import variables from './variables'
// import mutation from './mutation'

import { View } from 'components/layout'
import { Text } from 'components/text'

class Bot extends Component {

  render() {

    const { query: { adverts } } = this.props

    const renderAdverts = adverts.map((advert, index) => (
      <View key={index}>
        <Text>{advert.title}</Text>
        <Text>{advert.name}</Text>
        <Text>{advert.price}</Text>
      </View>
    ))

    console.log(adverts)

    return (
      <View>
        {renderAdverts}
      </View>
    )

  }

}

export default Relay.createContainer(Bot, {
  ...variables,
  fragments,
})
