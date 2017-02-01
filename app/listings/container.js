import React, { Component } from 'react'
import Relay from 'react-relay'
import uuid from 'node-uuid'

import { FILTERS } from './constants'
import { getFormattedTimestamp, getListingUrl, getProfileUrl } from '../shared/util'

import * as fragments from './fragments'
import variables from './variables'
import mutations from './mutations'

import { Anchor } from 'components/anchor'
import { Checkbox } from 'components/checkbox'
import { Label } from 'components/label'
import { Badge } from 'components/badge'
import { Icon } from 'components/icon'
import { Image } from 'components/image'
import { Grid, Section, View } from 'components/layout'
import { Position } from 'components/position'
import { Select } from 'components/select'
import { Text } from 'components/text'
import { Button } from 'components/button'

class Listings extends Component {

  constructor() {

    super()

    this.onFilterClick = this.onFilterClick.bind(this)
    this.deleteListing = this.deleteListing.bind(this)
    this.renderListing = this.renderListing.bind(this)

  }

  onFilterClick(variables) {

    const { relay } = this.props

    return relay.setVariables(variables)

  }

  onUpdateClick(id, data) {

    if (data.unspecified) data = { leakage: false, nonResponsive: false }

    Relay.Store.commitUpdate(
      new mutations.listingMutation({
        id,
        ...data,
      }), {
        onSuccess: res => console.log(res),
        onFailure: transaction => console.error(transaction),
      }
    )

  }

  onPopularClick(id, popular) {

    if (!popular) {

      Relay.Store.commitUpdate(
        new mutations.addListingToPopular({
          id
        }), {
          onSuccess: res => console.log(res),
          onFailure: transaction => console.error(transaction),
        }
      )

    } else {

      Relay.Store.commitUpdate(
        new mutations.removeListingFromPopular({
          id
        }), {
          onSuccess: res => console.log(res),
          onFailure: transaction => console.error(transaction),
        }
      )

    }

  }

  deleteListing(id) {

    Relay.Store.commitUpdate(
      new mutations.removeListing({
        id,
      }), {
        onSuccess: res => console.log(res),
        onFailure: transaction => console.error(transaction),
      }
    )

  }

  onListingImageClick(id) {

    const listingUrl = getListingUrl(id)

    // open listing in new tab
    return window.open(listingUrl)

  }

  onProfileImageClick(id) {

    const profileUrl = getProfileUrl(id)

    // open profile in new tab
    return window.open(profileUrl)

  }

  render() {

    const { query, relay: { variables } } = this.props
    const { listed, area, hostStatus, popular, bot } = variables
    
    let { listings } = query

    const onFilterClick = this.onFilterClick
    const renderListing = this.renderListing

    // TODO - could do better but I'm tired!!
    if ( !listed && hostStatus !== 'unspecified' ) listings = listings.filter( l => l[hostStatus] )
    // in the filter, doing || because popular can be undefined
    if ( listed && popular !== 'unspecified' ) listings = listings.filter( l => (popular && l.popular === popular) || (!popular && !l.popular) )
    // filter bot
    if ( bot ) listings = listings.filter( l => l.bot === bot )

    return (
      <View>

        <Text atomic={{ fs:6, fw:'b', ta:'c' }} color='primary'>Listings</Text>

        <Section atomic={{ mt:8, mb:8, ta:'c' }}>

          <Text atomic={{ d:'ib' }}>

            <Icon>tune</Icon> Show

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

          <Text atomic={{ d:'ib' }}>
            listings in
          </Text>

          <Select
            name='area'
            value={ area }
            options={ FILTERS.area }
            autoBlur={ true }
            clearable={ false }
            searchable={ true }
            onChange={ ({ value }) => onFilterClick({ area: value }) }
          />

          { listed ? (
            <Text atomic={{ d:'ib' }}>where the listing is</Text>
          ) : null }

          { listed ? (
            <Select
              width='160px'
              name='popular'
              value={ popular }
              options={ FILTERS.popular }
              autoBlur={ true }
              clearable={ false }
              searchable={ true }
              onChange={ ({ value }) => onFilterClick({ popular: value }) }
            />
          ) : null }

          { !listed ? (
            <Text atomic={{ d:'ib' }}>where the host is</Text>
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

          <Badge label={ listings.length } backgroundColor='primary' atomic={{ ml:5 }} />

          <View atomic={{ p:0, d:'ib', w:'a' }}>

            <Label atomic={{ d:'ib', m:0 }}>
              <Checkbox atomic={{ d:'ib', mr:1, mt:0, mb:0, w:'a' }} onChange={ () => onFilterClick({ bot: !bot }) } type='checkbox' />
              Display only bot listings
            </Label>

          </View>

        </Section>

        <Grid cell={3/0.12}>

          { listings.map( l => renderListing(l) ) }

        </Grid>

      </View>
    )

  }

  renderListing(listing) {

    const { id, bot, availableFrom, availableTo, createdAt, location, postcode, title, weeklyRent, leakage, nonResponsive, photos, user, popular, listed } = listing
    const { id: userId, avatar, email, firstName, lastName, lastLoggedInAt, phoneVerification, notifications: { numberOfUnread } } = user

    const contactNumber = phoneVerification && phoneVerification.contactNumber || listing.contactNumber

    const { onUpdateClick, onListingImageClick, onProfileImageClick, onPopularClick, deleteListing } = this

    return (
      <Section key={ uuid.v4() } border atomic={{ mt:1, mb:1 }}>

        <Text atomic={{ fs:4, fw:'b', m:0, o:'h', p:1, to:'e', ws:'n' }}>
          { title }
        </Text>

        <Position position='relative'>

          <Image atomic={{ c:'p' }} source={ photos[0].s3Link } width='100%' height='200px' backgroundSize='cover' center onClick={ () => onListingImageClick(id) } />

          <Position position='absolute' bottom='0px' right='0px'>

            <Text atomic={{ m:0, p:1 }} color='light' backgroundColor='dark'>
              £{ weeklyRent }
            </Text>

          </Position>

        </Position>

        <Position position='relative' top='-15px'>

          <Position position='absolute' bottom='-5px' left='52%'>

            <Badge label={ numberOfUnread } />

          </Position>

          <Image atomic={{ c:'p' }} source={ avatar } width='50px' height='50px' backgroundSize='cover' center circle onClick={ () => onProfileImageClick(userId) } />

        </Position>

        <Text atomic={{ m:0, pt:1, pr:1, pl:1, ta:'c' }}>
          { firstName } { lastName }
        </Text>

        <Text atomic={{ fs:3, m:0, pl:1, pr:1, ta:'c' }}>

          <Anchor href={`mailto:${email}`}>{ email }</Anchor> | <Anchor href={`tel:${contactNumber}`}>{ contactNumber }</Anchor>

        </Text>

        <Text atomic={{ m:0, pt:3, pr:1, pl:1, ta:'c' }}>
          { getFormattedTimestamp(availableFrom) } &rarr; { getFormattedTimestamp(availableTo) }
        </Text>

        <Text atomic={{ m:0, pr:1, pl:1, ta:'c' }}>
          { location } { postcode }
        </Text>

        <Select
          atomic={{ d:'b', fs:3, ta:'c' }}
          width='130px'
          name='hostStatus'
          value={ leakage && 'leakage' || nonResponsive && 'nonResponsive' || 'unspecified' }
          options={ FILTERS.hostStatus }
          autoBlur={ true }
          clearable={ false }
          searchable={ false }
          onChange={ ({ value }) => onUpdateClick(id, { [`${value}`]: true }) }
        />

        <View>
        { listed ? (
          <Button
            color='white'
            backgroundColor={ popular ? 'secondary' : 'error' }
            atomic={{ w:'a', ml:'auto', mr:'auto', mt:0, mb:2 }}
            onClick={ () => onPopularClick(id, popular) }>
              { popular ? '❌️ Remove popular' : '🌟 Set as popular' }
          </Button>) : null }
        { bot ? (
          <Button
            color='white'
            backgroundColor='error'
            atomic={{ w:'a', ml:'auto', mr:'auto', mt:0, mb:0 }}
            onClick={ () => deleteListing(id) }>
            📛 Delete listing
          </Button>) : null }
        </View>

        <Text atomic={{ m:0, pt:0, pr:1, pl:1, fs:3 }}>
          Created at: { getFormattedTimestamp(createdAt) }
        </Text>

        <Text atomic={{ m:0, pr:3, pb:1, pl:1, fs:3 }}>
          Last seen: { getFormattedTimestamp(lastLoggedInAt) }
        </Text>


      </Section>
    )

  }

}

export default Relay.createContainer(Listings, {
  ...variables,
  fragments,
})
