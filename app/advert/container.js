import React, { Component } from 'react'
import Relay from 'react-relay'

import * as Bot from '../bot'
import * as fragments from './fragments'
// import mutations from './mutations'
import { mutations as ListingMutations } from '../listings'
import variables from './variables'
import { getAddressFromGeocode, getListingPreviewUrl, transformAdvertToListing, transformAdvertToListingPreview } from './util'

import { Anchor } from 'components/anchor'
import { Button } from 'components/button'
import { View } from 'components/layout'
import { Text } from 'components/text'

class Advert extends Component {

  constructor() {

    super()

    this.onListingPreviewRequest = this.onListingPreviewRequest.bind(this)
    this.onCreateUserWithListingRequest = this.onCreateUserWithListingRequest.bind(this)

  }

  onListingPreviewRequest() {

    const { query: { advert } } = this.props

    return getAddressFromGeocode(advert.geocode)
      .then( address => getListingPreviewUrl( transformAdvertToListingPreview({ ...advert, ...address }) ) )
      .then( url => window.open(url) )

  }

  onCreateUserWithListingRequest() {

    const { query: { advert } } = this.props

    return getAddressFromGeocode(advert.geocode)
      .then( address => transformAdvertToListing({ ...advert, ...address }) )
      .then( payload => Relay.Store.commitUpdate( new ListingMutations.createUserWithListing(payload) ) )

  }

  render() {

    const { query } = this.props
    const { advert } = query

    return (
      <View>

        <Text atomic={{ fs:6, fw:'b', ta:'c' }} color='primary'>{ advert.title }</Text>

        <Anchor atomic={{ d:'b', mb:4, td:'n' }} to={Bot.route}>&larr; Back</Anchor>

        <Button atomic={{ d:'ib', w:'a', mr:4 }} backgroundColor='dark' onClick={ this.onListingPreviewRequest }>Preview Listing</Button>

        <Button atomic={{ d:'ib', w:'a' }} onClick={ this.onCreateUserWithListingRequest }>Create Listing</Button>

      </View>
    )

  }

}

export default Relay.createContainer(Advert, { ...variables, fragments })
