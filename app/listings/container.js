import React, { Component } from 'react'
import Relay from 'react-relay'
import uuid from 'node-uuid'

import { formatTimestamp } from '../shared/util'

import * as fragments from './fragments'
import variables from './variables'
import { FILTERS } from './constants'

import Select from 'react-select'
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

    // TODO - will need to observe hostStatus [disenfranchised (nonResponsive) & disintermediated (leakage)] and filter listings accordingly
    const { listed, area, hostStatus } = relay.variables

    return (
      <View>

        <TitleText>Listings</TitleText>

        <Grid>

          <Select
            name='listed'
            value={listed}
            options={FILTERS.listed}
            autoBlur={true}
            clearable={false}
            searchable={true}
            onChange={ ({ value }) => onFilterClick({ listed: value }) }
          />

          <Select
            name='area'
            value={area}
            options={FILTERS.area}
            autoBlur={true}
            clearable={false}
            searchable={true}
            onChange={ ({ value }) => onFilterClick({ area: value }) }
          />

          {/* TODO - only display if !listed */}
          <Select
            name='hostStatus'
            value={hostStatus}
            options={FILTERS.hostStatus}
            autoBlur={true}
            clearable={false}
            searchable={true}
            onChange={ ({ value }) => onFilterClick({ hostStatus: value }) }
          />

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
        <Text>{ formatTimestamp(availableFrom) } &rarr; { formatTimestamp(availableTo) }</Text>
        <Text>Created at: { formatTimestamp(createdAt) }</Text>

        <Text>User: { firstName } { lastName }</Text>
        <Text>Contact: { email } or { contactNumber }</Text>
        <Text>Last seen: { formatTimestamp(lastLoggedInAt) }</Text>
        <Text>Messages: { numberOfUnread }</Text>

        <Text>£{ weeklyRent }</Text>
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
