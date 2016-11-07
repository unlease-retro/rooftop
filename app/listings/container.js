import React, { Component } from 'react'
import Relay from 'react-relay'
import uuid from 'node-uuid'

import { getFormattedTimestamp } from '../shared/util'

import * as fragments from './fragments'
import variables from './variables'
import mutation from './mutation'
import { FILTERS } from './constants'

import { Badge } from 'components/badge'
import { Icon } from 'components/icon'
import { Image } from 'components/image'
import { View, Grid } from 'components/layout'
import { Select } from 'components/select'
import { Text, SmallText, TitleText } from 'components/text'

class Listings extends Component {

  constructor() {

    super()

    this.onFilterClick = this.onFilterClick.bind(this)

  }

  onFilterClick(variables) {

    const { relay } = this.props

    return relay.setVariables(variables)

  }

  onUpdateClick(id, data) {

    Relay.Store.commitUpdate(
      new mutation({
        id,
        ...data,
      }), {
        onSuccess: res => console.log(res),
        onFailure: transaction => console.error(transaction),
      }
    )

  }

  render() {

    const { query, relay: { variables } } = this.props
    const { listed, area, hostStatus } = variables
    let { listings } = query

    const onFilterClick = this.onFilterClick

    // TODO - could do better but I'm tired!!
    if ( !listed && hostStatus !== 'unspecified' ) listings = listings.filter( l => l[hostStatus] )

    console.log(listings)

    return (
      <View>

        <TitleText>Listings</TitleText>

        <Text display='inline-block'>
          <Icon>tune</Icon> Show me
        </Text>

        <Select
          name='listed'
          value={ listed }
          options={ FILTERS.listed }
          autoBlur={ true }
          clearable={ false }
          searchable={ true }
          onChange={ ({ value }) => onFilterClick({ listed: value }) }
        />

        <Text display='inline-block'>listings in</Text>

        <Select
          name='area'
          value={ area }
          options={ FILTERS.area }
          autoBlur={ true }
          clearable={ false }
          searchable={ true }
          onChange={ ({ value }) => onFilterClick({ area: value }) }
        />

        { !listed ? (
          <Text display='inline-block'>where the host is</Text>
        ) : null }

        { !listed ? (
          <Select
            width='160px'
            name='hostStatus'
            value={ hostStatus }
            options={ FILTERS.hostStatus }
            autoBlur={ true }
            clearable={ false }
            searchable={ true }
            onChange={ ({ value }) => onFilterClick({ hostStatus: value }) }
          />
        ) : null }

        <Badge label={ listings.length } />

        <Grid>

          { listings.map( l => this.renderListing(l) ) }

        </Grid>

      </View>
    )

  }

  renderListing(listing) {

    const { id, availableFrom, availableTo, createdAt, location, postcode, title, weeklyRent, leakage, nonResponsive, photos, user } = listing
    const { email, firstName, lastName, lastLoggedInAt, phoneVerification: { contactNumber }, notifications: { numberOfUnread } } = user

    const onUpdateClick = this.onUpdateClick

    return (
      <Grid key={ uuid.v4() } cell='100%'>

        <Grid>
          <TitleText>{ title }</TitleText>
          <Icon onClick={ () => onUpdateClick(id, { leakage: !leakage, nonResponsive: !nonResponsive }) }>tag_faces</Icon>
        </Grid>

        <Grid>
          { photos.map( ({ s3Link }) => <Image key={ uuid.v4() } source={s3Link} width={400} height={200} backgroundSize='contain' /> ) }
          <Text>User: { firstName } { lastName }</Text>
          <Text>Contact: { email } or { contactNumber }</Text>
          <Text>£{ weeklyRent }</Text>
        </Grid>

        <Grid cell='100%'>
          <Text>{ getFormattedTimestamp(availableFrom) } &rarr; { getFormattedTimestamp(availableTo) }</Text>
          <Text><Icon>location_city</Icon> { location } { postcode }</Text>
          <Text>
            <Icon>mail_outline</Icon>
            <Badge label={ numberOfUnread } margin={1} colour='primary' />
          </Text>
        </Grid>

        <Grid cell='100%' gutter='0'>
          <SmallText>Created at: { getFormattedTimestamp(createdAt) }</SmallText>
          <SmallText>Last seen: { getFormattedTimestamp(lastLoggedInAt) }</SmallText>
        </Grid>

      </Grid>
    )

  }

}

export default Relay.createContainer(Listings, {
  ...variables,
  fragments,
})
