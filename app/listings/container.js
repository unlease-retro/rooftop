import React, { Component } from 'react'
import Relay from 'react-relay'
import uuid from 'node-uuid'

import { formatTimestamp } from '../shared/util'

import * as fragments from './fragments'
import variables from './variables'

import { Button } from 'components/button'
import { View, Grid } from 'components/layout'
import { Text, TitleText } from 'components/text'
import { Image } from 'components/image'

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

        <Grid>

          { listings.map( l => this.renderListing(l) ) }

        </Grid>

      </View>
    )

  }

  renderListing(listing) {

    const { availableFrom, availableTo, createdAt, location, postcode, title, weeklyRent, photos, user } = listing
    const { email, firstName, lastName, lastLoggedInAt, phoneVerification: { contactNumber }, notifications: { numberOfUnread } } = user

    return (
      <Grid key={ uuid.v4() }>

        <TitleText>{ title }</TitleText>
        <Text>{ availableFrom } &rarr; { availableTo }</Text>
        <Text>Created at: { formatTimestamp(createdAt) }</Text>

        <Text>User: { firstName } { lastName }</Text>
        <Text>Contact: { email } or { contactNumber }</Text>
        <Text>Last seen: { formatTimestamp(lastLoggedInAt) }</Text>
        <Text>Messages: { numberOfUnread }</Text>

        <Text>{ weeklyRent }</Text>
        <Text>{ location } { postcode }</Text>

        <Grid>
          { photos.map( ({ s3Link }) => <Image key={ uuid.v4() } source={s3Link} width={400} height={200} backgroundSize='contain' /> ) }
        </Grid>

      </Grid>
    )

  }

}

export default Relay.createContainer(Listings, {
  ...variables,
  fragments,
})
