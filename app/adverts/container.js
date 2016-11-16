import React, { Component } from 'react'
import Relay from 'react-relay'

import uuid from 'node-uuid'

import * as fragments from './fragments'
import variables from './variables'
// import mutation from './mutation'

import { Anchor } from 'components/anchor'
import { Button } from 'components/button'
import { View, Section } from 'components/layout'
import { Text } from 'components/text'

class Adverts extends Component {

  constructor(props) {

    super(props)

    this.renderAdvert = this.renderAdvert.bind(this)

  }

  renderAdvert(a) {

    const { _id, title, postcode, price } = a

    return (
      <Section border atomic={{ mt:1, mb:1, p:1 }} key={ uuid.v4() }>

        <Text>{ title }</Text>

        <Text>{ postcode }</Text>

        <Text>£{ price }</Text>

        <Button atomic={{ w:'a', m:0 }}>
          <Anchor href={`/advert/${_id}`}>Go to advert</Anchor>
        </Button>

      </Section>
    )

  }

  render() {

    const { query: { adverts } } = this.props

    return (
      <View>

        <Text atomic={{ fs:6, fw:'b', ta:'c' }} color='primary'>Crawled adverts</Text>

        { adverts.map( a => this.renderAdvert(a) ) }

      </View>
    )

  }

}

export default Relay.createContainer(Adverts, {
  ...variables,
  fragments,
})
