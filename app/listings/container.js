import React, { Component } from 'react'
import Relay from 'react-relay'

import * as fragments from './fragments'
import variables from './variables'

import { Button } from 'components/button'
import { View, Grid } from 'components/layout'
import { TitleText } from 'components/text'

class Listings extends Component {

  render() {

    const { relay, query } = this.props
    const { listings } = query

    console.log(listings)

    return (
      <View>

        <TitleText>Listings</TitleText>

        <Grid>

          <Button onClick={ () => relay.setVariables({ lng: -0.12775829999998223, lat: 51.5073509 }) }>London</Button>
          <Button onClick={ () => relay.setVariables({ lng: -1.257652, lat: 51.751990 }) }>Oxford</Button>

        </Grid>

      </View>
    )

  }

}

export default Relay.createContainer(Listings, {
  ...variables,
  fragments,
})
