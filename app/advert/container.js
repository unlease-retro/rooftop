import React, { Component } from 'react'
import Relay from 'react-relay'
import { connect } from 'react-redux'
import { reduxForm, Field } from 'redux-form/immutable'

import * as Bot from '../bot'
import { getStatus } from './computed'
import * as fragments from './fragments'
import mutations from './mutations'
import { mutations as ListingMutations } from '../listings'
import variables from './variables'
import { name as form } from './constants'
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

    const renderInput = ( { input, type, defaultValue } ) => {
      
      // set value to default value
      if (!input.value) input.value = defaultValue
      
      if (!type) return <Textarea { ...input }/>

      return <Input { ...input } type={ type }/>

    }

    const EditForm = reduxForm( { form } )( Form )

    // actions
    const onCreateUserWithListingRequest = this.onCreateUserWithListingRequest
    const onListingPreviewRequest = this.onListingPreviewRequest
    const onUpdateAdvertRequest = this.onUpdateAdvertRequest

    // set computed values
    advert.status = getStatus(advert)

    return (
      <View>

        <Text atomic={{ fs:6, fw:'b', ta:'c' }} color='primary'>{ advert.title }</Text>

        <Text atomic={{ fs:3, mt:4, ta:'r' }}>Status: { advert.status }</Text>

        <Anchor atomic={{ d:'b', mb:4, td:'n' }} to={Bot.route}>&larr; Back</Anchor>
        
        <EditForm>

          <Label>Title</Label>

          <Field name='title' type='text' defaultValue={ advert.title } component={ renderInput } />

          <Label>Description</Label>

          <Field name='description' defaultValue={ advert.description } component={ renderInput }/>

          <Label>Price</Label>

          <Field name='price' type='number' defaultValue={ advert.price } component={ renderInput }/>

          <Label>Host name</Label>

          <Field name='hostName' type='text' defaultValue={ advert.hostName } component={ renderInput }/>

          <Label>Phone number</Label>

          <Field name='phoneNumber' type='text' defaultValue={ advert.phoneNumber } component={ renderInput }/>

          <Label>Home type</Label>

          <Field name='homeType' type='text' defaultValue={ advert.homeType } component={ renderInput }/>

          <Label>Location</Label>

          <Field name='location' type='text' defaultValue={ advert.postcode } component={ renderInput }/>

          <Label>Availability from</Label>

          <Field name='availabilityFrom' type='date' defaultValue={ advert.availabilityFrom } component={ renderInput }/>

          <Label>Availability to</Label>

          <Field name='availabilityTo' type='date' defaultValue={ advert.availabilityTo } component={ renderInput }/>

        </EditForm>

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
