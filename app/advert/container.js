import React, { Component } from 'react'
import Relay from 'react-relay'
import { connect } from 'react-redux'
import { Field, reduxForm, getFormValues } from 'redux-form/immutable'

import * as Bot from '../bot'
import { getStatus } from './computed'
import * as fragments from './fragments'
import mutations from './mutations'
import { mutations as ListingMutations } from '../listings'
import variables from './variables'
import { name } from './constants'
import { getAddressFromGeocode, getListingPreviewUrl, transformAdvertToListing, transformAdvertToListingPreview } from './util'

import { Anchor } from 'components/anchor'
import { Button } from 'components/button'
import { View } from 'components/layout'
import { Text } from 'components/text'
import { Form } from 'components/form'
import { Label } from 'components/label'
import { Input } from 'components/input'
import { Textarea } from 'components/textarea'

class Advert extends Component {

  constructor() {

    super()

    this.onCreateUserWithListingRequest = this.onCreateUserWithListingRequest.bind(this)
    this.onListingPreviewRequest = this.onListingPreviewRequest.bind(this)

  }

  onCreateUserWithListingRequest() {

    const { query: { advert } } = this.props

    return getAddressFromGeocode(advert.geocode)
      .then( address => transformAdvertToListing({ ...advert, ...address }) )
      .then( payload => Relay.Store.commitUpdate( new ListingMutations.createUserWithListing(payload) ) )

  }

  onListingPreviewRequest() {

    const { query: { advert } } = this.props

    return getAddressFromGeocode(advert.geocode)
      .then( address => getListingPreviewUrl( transformAdvertToListingPreview({ ...advert, ...address }) ) )
      .then( url => window.open(url) )

  }

  onUpdateAdvertRequest(_id, payload) {

    return Relay.Store.commitUpdate( new mutations.updateAdvert({ _id, payload }) )

  }

  render() {

    const { query } = this.props
    const { advert } = query

    console.log(this.props)

    const onCreateUserWithListingRequest = this.onCreateUserWithListingRequest
    const onListingPreviewRequest = this.onListingPreviewRequest
    const onUpdateAdvertRequest = this.onUpdateAdvertRequest

    const Edit = reduxForm({ form: name })( () => (
      <Form>

        <Label>Title</Label>

        <Field name='title' type='text' defaultValue={ advert.title } component={ Input } />

        <Label>Description</Label>

        <Field name='description' type='text' defaultValue={ advert.description } component={ Textarea }/>

        <Label>Price</Label>

        <Field name='price' type='number' defaultValue={ advert.price } component={ Input }/>

        <Label>Host name</Label>

        <Field name='hostName' type='text' defaultValue={ advert.hostName } component={ Input }/>

        <Label>Phone number</Label>

        <Field name='phoneNumber' type='text' defaultValue={ advert.phoneNumber } component={ Input }/>

        <Label>Home type</Label>

        <Field name='homeType' type='text' defaultValue={ advert.homeType } component={ Input }/>

        <Label>Location</Label>

        <Field name='location' type='text' defaultValue={ advert.postcode } component={ Input }/>

        <Label>Availability from</Label>

        <Field name='availabilityFrom' type='date' defaultValue={ advert.availabilityFrom } component={ Input }/>

        <Label>Availability to</Label>

        <Field name='availabilityTo' type='date' defaultValue={ advert.availabilityTo } component={ Input }/>

      </Form>)
    )

    // set computed values
    advert.status = getStatus(advert)

    return (
      <View>

        <Text atomic={{ fs:6, fw:'b', ta:'c' }} color='primary'>{ advert.title }</Text>

        <Text atomic={{ fs:3, mt:4, ta:'r' }}>Status: { advert.status }</Text>

        <Anchor atomic={{ d:'b', mb:4, td:'n' }} to={Bot.route}>&larr; Back</Anchor>

        <Edit/>

        <View atomic={{ ta: 'c' }}>

          <Button atomic={{ d:'ib', w:'a', mr:4 }} backgroundColor='error' onClick={ () => onUpdateAdvertRequest(advert._id, { disabled: true }) }>Decline Advert</Button>

          <Button atomic={{ d:'ib', w:'a', mr:4 }} backgroundColor='dark' onClick={ onListingPreviewRequest }>Preview Listing</Button>

          <Button atomic={{ d:'ib', w:'a' }} onClick={ onCreateUserWithListingRequest  }>Create Listing</Button>

        </View>

      </View>
    )

  }

}

export default Relay.createContainer(
  connect(
  )(Advert),
  { ...variables, fragments }
)
