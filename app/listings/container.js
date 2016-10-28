import React, { Component } from 'react'
import Relay from 'react-relay'

import * as fragments from './fragments'
import variables from './variables'

import { Button } from 'components/button'
import { View, Grid } from 'components/layout'
import { TitleText } from 'components/text'

class Listings extends Component {

  constructor() {

    super()

    this.onFilterClick = this.onFilterClick.bind(this)

  }

  onFilterClick({ lng, lat }) {

    const { relay } = this.props

    return relay.setVariables({ lng, lat })

  }

  render() {

    const { query } = this.props
    const { listings } = query

    const onFilterClick = this.onFilterClick

    console.log(listings)

    return (
      <View>

        <TitleText>Listings</TitleText>

        <Grid>

          <Button onClick={ () => onFilterClick({ lng: -0.12775829999998223, lat: 51.5073509 }) }>London</Button>
          <Button onClick={ () => onFilterClick({ lng: -1.257652, lat: 51.751990 }) }>Oxford</Button>

        </Grid>

      </View>
    )

  }

}

export default Relay.createContainer(Listings, {
  ...variables,
  fragments,
})
