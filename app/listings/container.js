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
import { Position } from 'components/position'
import { Select } from 'components/select'
import { Text, BoxedText, SmallText, SubtitleText, TitleText } from 'components/text'

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
      <Grid key={ uuid.v4() } direction='column' flush>

        <SubtitleText>
          { title }
        </SubtitleText>

        <Position position='relative'>
          <Image source={ photos[0].s3Link } width='100%' height='200px' backgroundSize='cover' center />
          <Position position='absolute' bottom='0px' right='0px'>
            <BoxedText>
              £{ weeklyRent }
            </BoxedText>
          </Position>
        </Position>

        <Text>
          { firstName } { lastName }
        </Text>

        {/* <Select
          width='160px'
          name='hostStatus'
          value={ hostStatus }
          options={ FILTERS.hostStatus }
          autoBlur={ true }
          clearable={ false }
          searchable={ false }
          onChange={ ({ value }) => onUpdateClick({ [`${value}`]: true }) }
        /> */}

        <Text>
          { email }
        </Text>

        <Text>
          { contactNumber }
        </Text>

        <Text>{ getFormattedTimestamp(availableFrom) } &rarr; { getFormattedTimestamp(availableTo) }</Text>

        <Text><Icon>location_city</Icon> { location } { postcode }</Text>

        <Text>
          <Icon>mail_outline</Icon>
          <Badge label={ numberOfUnread } margin={1} colour='primary' />
        </Text>

        <SmallText>Created at: { getFormattedTimestamp(createdAt) }</SmallText>

        <SmallText>Last seen: { getFormattedTimestamp(lastLoggedInAt) }</SmallText>

      </Grid>
    )

  }

}

export default Relay.createContainer(Listings, {
  ...variables,
  fragments,
})
