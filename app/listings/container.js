import React, { Component } from 'react'
import Relay from 'react-relay'

import * as fragments from './fragments'
import variables from './variables'

import { Button } from 'components/button'
import { View, Grid } from 'components/layout'
import { TitleText } from 'components/text'
import { Select } from 'components/select'
import { Error } from 'components/error'
import { Image } from 'components/image'
import { Badge } from 'components/badge'

class Listings extends Component {

  constructor() {

    super()

    this.onFilterClick = this.onFilterClick.bind(this)

  }

  onFilterClick(variables) {

    const { relay } = this.props

    return relay.setVariables(variables)

  }

  render() {

    const { query, relay } = this.props
    const { listings } = query

    const onFilterClick = this.onFilterClick

    console.log(listings)

    // TODO - will need to observe disenfranchised (nonResponsive) & disintermediated (leakage) variables changes and ensure listings are filtered accordingly
    console.log(relay.variables)

    return (
      <View>

        <Error>Some error</Error>
        <Image source='https://media.giphy.com/media/3o7TKSsU7mNv8xbsHK/giphy.gif' width='150' height='85' />

        <Select>
          <select>
            <option>Test</option>
            <option>Test #2</option>
            <option>Test #3</option>
          </select>
        </Select>

        <Badge text='Badge text here..'>
          <TitleText>Title text inside</TitleText>
        </Badge>

        <TitleText>Listings</TitleText>

        <Grid>

          <Button onClick={ () => onFilterClick({ listed: true }) }>Active</Button>
          <Button onClick={ () => onFilterClick({ listed: false }) }>Inactive</Button>

          <Button onClick={ () => onFilterClick({ lat: null, lng: null }) }>Anywhere</Button>
          <Button onClick={ () => onFilterClick({ lat: 51.5073509, lng: -0.12775829999998223 }) }>London</Button>
          <Button onClick={ () => onFilterClick({ lat: 51.7520209, lng: -1.2577263000000585 }) }>Oxford</Button>

          {/* TODO - only display if variables.inactive */}
          <Button onClick={ () => onFilterClick({ disenfranchised: true, disintermediated: false }) }>Disenfranchised</Button>
          <Button onClick={ () => onFilterClick({ disintermediated: true, disenfranchised: false }) }>Disintermediated</Button>

        </Grid>

      </View>
    )

  }

}

export default Relay.createContainer(Listings, {
  ...variables,
  fragments,
})
