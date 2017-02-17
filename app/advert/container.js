import React, { Component } from 'react'
import Relay from 'react-relay'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { Field } from 'redux-form/immutable'

import * as API from '../shared/services/api'
import * as Bot from '../bot'
import { getStatus } from './computed'
import * as selectors from './selectors'
import * as fragments from './fragments'
import mutations from './mutations'
import { mutations as ListingMutations } from '../listings'
import variables from './variables'
import { getAddressFromGeocode, getListingPreviewUrl, getListingUrl, getMapUrl, getSmsBody, getStatusTextColour, required, normalize, transformAdvertToListing, transformAdvertToListingPreview } from './util'
import { promisifyMutation } from '../shared/util'

import { Image } from 'components/image'
import { Anchor } from 'components/anchor'
import { Button } from 'components/button'
// import { Textarea } from 'components/textarea'
import { View, Grid, Section } from 'components/layout'
import { Text } from 'components/text'

import Form, { Select, Input } from './components'

class Advert extends Component {

  constructor() {

    super()

    this.onCreateUserWithListingRequest = this.onCreateUserWithListingRequest.bind(this)
    this.onListingPreviewRequest = this.onListingPreviewRequest.bind(this)
    this.onDeleteListingRequest = this.onDeleteListingRequest.bind(this)
    this.onListingViewRequest = this.onListingViewRequest.bind(this)

  }

  onDeleteListingRequest() {

    const { query: { advert } } = this.props
    const { listingId } = advert

    return promisifyMutation( new mutations.removeListing({ id: listingId }) )

  }

  onCreateUserWithListingRequest() {

    const { onUpdateAdvertRequest } = this
    const { editForm, query: { advert } } = this.props

    // I have given up! 😫
    let emailAddress

    return onUpdateAdvertRequest(advert._id, editForm)
      .then( () => getAddressFromGeocode(advert.geocode) )
      .then( address => transformAdvertToListing({ ...this.props.query.advert, ...address }) )
      .then( payload => promisifyMutation( new ListingMutations.createUserWithListing(payload) ) )
      .then( ({ createUserWithListing: { listingId, email } }) => {

        emailAddress = email

        return onUpdateAdvertRequest(advert._id, { listingId: listingId, submitted: true })

      } )
      .then( () => API.post( 'webhooks/sendSms', { body: getSmsBody({ ...this.props.query.advert, emailAddress }), to: this.props.query.advert.phoneNumber }) )

  }

  onListingPreviewRequest() {

    const { editForm, query: { advert } } = this.props

    return getAddressFromGeocode(advert.geocode)
      .then( address => getListingPreviewUrl( transformAdvertToListingPreview({ ...advert, ...editForm, ...address }) ) )
      .then( url => window.open(url) )

  }

  onListingViewRequest() {

    const { query: { advert } } = this.props

    return window.open( getListingUrl(advert.listingId) )

  }

  onUpdateAdvertRequest(_id, payload) {

    return promisifyMutation( new mutations.updateAdvert({ _id, payload }) )

  }

  render() {

    const { doesFormHaveErrors, query } = this.props
    const { advert } = query
    const { photos, amenities, preferences, household, extraCosts } = advert

    const initialValues = {
      title: advert.title,
      description: advert.description,
      price: advert.price,
      hostName: advert.hostName,
      phoneNumber: advert.phoneNumber,
      homeType: advert.homeType,
      postcode: advert.postcode,
      availabilityFrom: advert.availabilityFrom,
      availabilityTo: advert.availabilityTo,
      numOfFemale: advert.numOfFemale,
      numOfMale: advert.numOfMale,
    }

    // set computed values
    advert.status = getStatus(advert)

    return (
      <View>

        <Text atomic={{ fs:6, fw:'b', mb:0, ta:'c' }} color='primary'>{ advert.title }</Text>

        <Text atomic={{ fs:4, mt:0, ta:'c', tt:'u' }} color={ getStatusTextColour(advert.status) }>{ advert.status }</Text>

        <Anchor atomic={{ d:'ib', mb:4, td:'n' }} to={Bot.route}>&larr; Back</Anchor>

        <Grid>

          <Section>

            <View>

              <Grid>

                { photos.map( (source, index) => <Anchor key={ index } href={source} target='_blank'><Image width='auto' height='200px' source={ decodeURI(source) } /></Anchor> ) }

              </Grid>

            </View>

            <View atomic={{ p:0, o:'s' }} height='500px'>

              <View>

                <Anchor href={ getMapUrl(advert.geocode) } target='_blank'>View on map</Anchor>

                <Text atomic={{ fw:'b', fs:6 }}>Amenities</Text>

                <View atomic={{ d:'f', p:0 }}>

                  <Text atomic={{ m:0 }}>Parking:</Text>

                  <Text atomic={{ ml:1, mb:0, mr:0, mt:0 }}>{ amenities.parking }</Text>

                </View>

                <View atomic={{ d:'f', p:0 }}>

                  <Text atomic={{ m:0 }}>Garage:</Text>

                  <Text atomic={{ ml:1, mb:0, mr:0, mt:0 }}>{ amenities.garage }</Text>

                </View>

                <View atomic={{ d:'f', p:0 }}>

                  <Text atomic={{ m:0 }}>Furnishing:</Text>

                  <Text atomic={{ ml:1, mb:0, mr:0, mt:0 }}>{ amenities.furnishing }</Text>

                </View>

                <View atomic={{ d:'f', p:0 }}>

                  <Text atomic={{ m:0 }}>Garden:</Text>

                  <Text atomic={{ ml:1, mb:0, mr:0, mt:0 }}>{ amenities.garden }</Text>

                </View>

                <View atomic={{ d:'f', p:0 }}>

                  <Text atomic={{ m:0 }}>Balcony:</Text>

                  <Text atomic={{ ml:1, mb:0, mr:0, mt:0 }}>{ amenities.balcony }</Text>

                </View>

                <View atomic={{ d:'f', p:0 }}>

                  <Text atomic={{ m:0 }}>Disabled Access:</Text>

                  <Text atomic={{ ml:1, mb:0, mr:0, mt:0 }}>{ amenities.disabledAccess }</Text>

                </View>

                <View atomic={{ d:'f', p:0 }}>

                  <Text atomic={{ m:0 }}>Shared Living Room:</Text>

                  <Text atomic={{ ml:1, mb:0, mr:0, mt:0 }}>{ amenities.sharedLivingRoom }</Text>

                </View>

                <View atomic={{ d:'f', p:0 }}>

                  <Text atomic={{ m:0 }}>Broadband:</Text>

                  <Text atomic={{ ml:1, mb:0, mr:0, mt:0 }}>{ amenities.broadband }</Text>

                </View>

              </View>

              <View>

                <Text atomic={{ fw:'b', fs:6 }}>Household</Text>

                <View atomic={{ d:'f', p:0 }}>

                  <Text atomic={{ m:0 }}>Pets:</Text>

                  <Text atomic={{ ml:1, mb:0, mr:0, mt:0 }}>{ household.pets }</Text>

                </View>

                <View atomic={{ d:'f', p:0 }}>

                  <Text atomic={{ m:0 }}>Rooms:</Text>

                  <Text atomic={{ ml:1, mb:0, mr:0, mt:0 }}>{ household.rooms }</Text>

                </View>

                <View atomic={{ d:'f', p:0 }}>

                  <Text atomic={{ m:0 }}>Gender:</Text>

                  <Text atomic={{ ml:1, mb:0, mr:0, mt:0 }}>{ household.gender }</Text>

                </View>

                <View atomic={{ d:'f', p:0 }}>

                  <Text atomic={{ m:0 }}>Smoker:</Text>

                  <Text atomic={{ ml:1, mb:0, mr:0, mt:0 }}>{ household.smoker }</Text>

                </View>

                <View atomic={{ d:'f', p:0 }}>

                  <Text atomic={{ m:0 }}>Language:</Text>

                  <Text atomic={{ ml:1, mb:0, mr:0, mt:0 }}>{ household.language }</Text>

                </View>

                <View atomic={{ d:'f', p:0 }}>

                  <Text atomic={{ m:0 }}>Flatmates:</Text>

                  <Text atomic={{ ml:1, mb:0, mr:0, mt:0 }}>{ household.flatmates }</Text>

                </View>

                <View atomic={{ d:'f', p:0 }}>

                  <Text atomic={{ m:0 }}>Occupation:</Text>

                  <Text atomic={{ ml:1, mb:0, mr:0, mt:0 }}>{ household.occupation }</Text>

                </View>

                <View atomic={{ d:'f', p:0 }}>

                  <Text atomic={{ m:0 }}>Nationality:</Text>

                  <Text atomic={{ ml:1, mb:0, mr:0, mt:0 }}>{ household.nationality }</Text>

                </View>

                <View atomic={{ d:'f', p:0 }}>

                  <Text atomic={{ m:0 }}>Housemates:</Text>

                  <Text atomic={{ ml:1, mb:0, mr:0, mt:0 }}>{ household.housemates }</Text>

                </View>

                <View atomic={{ d:'f', p:0 }}>

                  <Text atomic={{ m:0 }}>Ages:</Text>

                  <Text atomic={{ ml:1, mb:0, mr:0, mt:0 }}>{ household.ages }</Text>

                </View>

                <View atomic={{ d:'f', p:0 }}>

                  <Text atomic={{ m:0 }}>Interests:</Text>

                  <Text atomic={{ ml:1, mb:0, mr:0, mt:0 }}>{ household.interests }</Text>

                </View>

              </View>

              <View>

                <Text atomic={{ fw:'b', fs:6 }}>Extra Costs</Text>

                <View atomic={{ d:'f', p:0 }}>

                  <Text atomic={{ m:0 }}>Deposit:</Text>

                  <Text atomic={{ ml:1, mb:0, mr:0, mt:0 }}>{ extraCosts.deposit }</Text>

                </View>

                <View atomic={{ d:'f', p:0 }}>

                  <Text atomic={{ m:0 }}>Fees Apply:</Text>

                  <Text atomic={{ ml:1, mb:0, mr:0, mt:0 }}>{ extraCosts.feesApply }</Text>

                </View>

                <View atomic={{ d:'f', p:0 }}>

                  <Text atomic={{ m:0 }}>Bills Included:</Text>

                  <Text atomic={{ ml:1, mb:0, mr:0, mt:0 }}>{ extraCosts.billsIncluded }</Text>

                </View>

              </View>

              <View>

                <Text atomic={{ fw:'b', fs:6 }}>Preferences</Text>

                <View atomic={{ d:'f', p:0 }}>

                  <Text atomic={{ m:0 }}>DSS:</Text>

                  <Text atomic={{ ml:1, mb:0, mr:0, mt:0 }}>{ preferences.dss }</Text>

                </View>

                <View atomic={{ d:'f', p:0 }}>

                  <Text atomic={{ m:0 }}>Pets:</Text>

                  <Text atomic={{ ml:1, mb:0, mr:0, mt:0 }}>{ preferences.pets }</Text>

                </View>

                <View atomic={{ d:'f', p:0 }}>

                  <Text atomic={{ m:0 }}>Gender:</Text>

                  <Text atomic={{ ml:1, mb:0, mr:0, mt:0 }}>{ preferences.gender }</Text>

                </View>

                <View atomic={{ d:'f', p:0 }}>

                  <Text atomic={{ m:0 }}>Couples:</Text>

                  <Text atomic={{ ml:1, mb:0, mr:0, mt:0 }}>{ preferences.couples }</Text>

                </View>

                <View atomic={{ d:'f', p:0 }}>

                  <Text atomic={{ m:0 }}>Smoking:</Text>

                  <Text atomic={{ ml:1, mb:0, mr:0, mt:0 }}>{ preferences.smoking }</Text>

                </View>

                <View atomic={{ d:'f', p:0 }}>

                  <Text atomic={{ m:0 }}>Occupation:</Text>

                  <Text atomic={{ ml:1, mb:0, mr:0, mt:0 }}>{ preferences.occupation }</Text>

                </View>

                <View atomic={{ d:'f', p:0 }}>

                  <Text atomic={{ m:0 }}>References:</Text>

                  <Text atomic={{ ml:1, mb:0, mr:0, mt:0 }}>{ preferences.references }</Text>

                </View>

                <View atomic={{ d:'f', p:0 }}>

                  <Text atomic={{ m:0 }}>Minimum age:</Text>

                  <Text atomic={{ ml:1, mb:0, mr:0, mt:0 }}>{ preferences.minAge }</Text>

                </View>

                <View atomic={{ d:'f', p:0 }}>

                  <Text atomic={{ m:0 }}>Maximum age:</Text>

                  <Text atomic={{ ml:1, mb:0, mr:0, mt:0 }}>{ preferences.maxAge }</Text>

                </View>

                <View atomic={{ d:'f', p:0 }}>

                  <Text atomic={{ m:0 }}>Vegetarian:</Text>

                  <Text atomic={{ ml:1, mb:0, mr:0, mt:0 }}>{ preferences.vegetarian }</Text>

                </View>

              </View>

            </View>

          </Section>

          <Section>

            <Form initialValues={ initialValues }>

              <Field name='title' type='text' label='Title' component={ Input } validate={ required }/>

              <Field name='description' label='Description' component={ Input } validate={ required }/>

              <Field name='price' type='number' label='Price' normalize={ normalize } component={ Input } validate={ required }/>

              <Field name='hostName' type='text' label='Host name' component={ Input } validate={ required }/>

              <Field name='phoneNumber' type='text' label='Phone number' component={ Input } validate={ required }/>

              <Field name='homeType' label='Home type' component={ Select } validate={ required }/>

              <Field name='postcode' type='text' label='Postcode' component={ Input } validate={ required }/>

              <Field name='availabilityFrom' type='date' label='Availability from' component={ Input } validate={ required }/>

              <Field name='availabilityTo' type='date' label='Availability to' component={ Input } validate={ required }/>

              <Field name='numOfMale' type='number' label='Number of Male Housemates' normalize={ normalize } component={ Input } validate={ required }/>

              <Field name='numOfFemale' type='number' label='Number of Female Housemates' normalize={ normalize } component={ Input } validate={ required }/>

            </Form>

          </Section>

        </Grid>

        {/* <View>

          <Text>SMS content:</Text>

          <Textarea defaultValue={ this.SMSContent } onChange={ e => this.SMSContent = e.target.value } />

        </View> */}

        { advert.status !== 'active' && (
          <Section atomic={{ ta:'c' }}>

            { advert.status !== 'declined' && (
              <Button atomic={{ d:'ib', w:'a', mr:4 }} backgroundColor='error' onClick={ () => this.onUpdateAdvertRequest(advert._id, { disabled: true }) }>Decline Advert</Button>
            ) }

            <Button atomic={{ d:'ib', w:'a', mr:4 }} backgroundColor='dark' disabled={ doesFormHaveErrors } onClick={ this.onListingPreviewRequest }>Preview Listing</Button>

            <Button atomic={{ d:'ib', w:'a' }} disabled={ doesFormHaveErrors } onClick={ this.onCreateUserWithListingRequest }>Create Listing</Button>

          </Section>
        ) }

        { advert.status === 'active' && (
          <Section atomic={{ ta:'c' }}>

            <Button atomic={{ d:'ib', w:'a' }} onClick={ this.onListingViewRequest }>View Listing</Button>

            <Button atomic={{ ml:4, d:'ib', w:'a' }} onClick={ this.onDeleteListingRequest } backgroundColor='error'>Delete listing</Button>

          </Section>
        ) }

        <Section>

          <Text atomic={{ fs:3, mt:4, mb:0, ta:'c' }}>{ advert.url }</Text>

          <Text atomic={{ fs:3, mt:0, ta:'c' }} color='error'>Caution: only open in private-mode 🕵️</Text>

        </Section>

      </View>
    )

  }

}


export default Relay.createContainer(
  connect(
    createStructuredSelector({ ...selectors })
  )(Advert),
  { ...variables, fragments }
)
