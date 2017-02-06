import React, { Component } from 'react'
import Relay from 'react-relay'

import * as Bot from '../bot'
import { getStatus } from './computed'
import * as fragments from './fragments'
import mutations from './mutations'
import { mutations as ListingMutations } from '../listings'
import variables from './variables'
import { getAddressFromGeocode, getListingPreviewUrl, getListingUrl, transformAdvertToListing, transformAdvertToListingPreview } from './util'
import { promisifyMutation } from '../shared/util'

import { Anchor } from 'components/anchor'
import { Button } from 'components/button'
import { Image } from 'components/image'
import { Section, View } from 'components/layout'
import { Text } from 'components/text'

class Advert extends Component {

  constructor() {

    super()

    this.onCreateUserWithListingRequest = this.onCreateUserWithListingRequest.bind(this)
    this.onListingPreviewRequest = this.onListingPreviewRequest.bind(this)
    this.onListingViewRequest = this.onListingViewRequest.bind(this)

  }

  onCreateUserWithListingRequest() {

    const { query: { advert } } = this.props

    return getAddressFromGeocode(advert.geocode)
      .then( address => transformAdvertToListing({ ...advert, ...address }) )
      .then( payload => promisifyMutation( new ListingMutations.createUserWithListing(payload) ) )

  }

  onListingPreviewRequest() {

    const { query: { advert } } = this.props

    return getAddressFromGeocode(advert.geocode)
      .then( address => getListingPreviewUrl( transformAdvertToListingPreview({ ...advert, ...address }) ) )
      .then( url => window.open(url) )

  }

  onListingViewRequest() {

    const { query: { advert } } = this.props

    return window.open( getListingUrl(advert.listingId) )

  }

  onUpdateAdvertRequest(_id, payload) {

    return Relay.Store.commitUpdate( new mutations.updateAdvert({ _id, payload }) )

  }

  render() {

    const { query } = this.props
    const { advert } = query

    // set computed values
    advert.status = getStatus(advert)

    return (
      <View>

        <Text atomic={{ fs:6, fw:'b', ta:'c' }} color='primary'>{ advert.title }</Text>

        <Text atomic={{ fs:3, mt:4, ta:'r' }}>Status: { advert.status }</Text>

        <Anchor atomic={{ d:'b', mb:4, td:'n' }} to={Bot.route}>&larr; Back</Anchor>

        { advert.photos.map( (p, i) => <Image key={i} source={p} width='100px' height='100px' /> )}

        { advert.status !== 'active' && (
          <Section>

            { advert.status !== 'declined' && (
              <Button atomic={{ d:'ib', w:'a', mr:4 }} backgroundColor='error' onClick={ () => this.onUpdateAdvertRequest(advert._id, { disabled: true }) }>Decline Advert</Button>
            ) }

            <Button atomic={{ d:'ib', w:'a', mr:4 }} backgroundColor='dark' onClick={ this.onListingPreviewRequest }>Preview Listing</Button>

            <Button atomic={{ d:'ib', w:'a' }} onClick={ this.onCreateUserWithListingRequest }>Create Listing</Button>

          </Section>
        ) }

        { advert.status === 'active' && (
          <Button atomic={{ d:'ib', w:'a' }} onClick={ this.onListingViewRequest }>View Listing</Button>
        ) }

      </View>
    )

  }

}

export default Relay.createContainer(Advert, { ...variables, fragments })
