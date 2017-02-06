import React, { Component } from 'react'
import Relay from 'react-relay'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { Field } from 'redux-form/immutable'

import * as Bot from '../bot'
import { getStatus } from './computed'
import * as selectors from './selectors'
import * as fragments from './fragments'
import mutations from './mutations'
import { mutations as ListingMutations } from '../listings'
import variables from './variables'
import { getAddressFromGeocode, getListingPreviewUrl, getListingUrl, transformAdvertToListing, transformAdvertToListingPreview } from './util'
import { promisifyMutation } from '../shared/util'
import { required } from './util'

import { Image } from 'components/image'
import { Anchor } from 'components/anchor'
import { Button } from 'components/button'
import { View, Grid, Section } from 'components/layout'
import { Text } from 'components/text'
import { Form, Input } from './components'

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
    const { photos, amenities, preferences, household, extraCosts } = advert

    // set computed values
    advert.status = getStatus(advert)

    return (
      <View>

        <Text atomic={{ fs:6, fw:'b', ta:'c' }} color='primary'>{ advert.title }</Text>

        <Text atomic={{ fs:3, mt:4, ta:'r' }}>Status: { advert.status }</Text>

        <Section>

          <Text atomic={{ fs:3, mt:4, mb:0, ta:'r' }}>Advert: { advert.url }</Text>

          <Text atomic={{ fs:3, mt:0, ta:'r' }} color='error'>Caution: only open in private-mode 🕵️</Text>

        </Section>

        <Anchor atomic={{ d:'b', mb:4, td:'n' }} to={Bot.route}>&larr; Back</Anchor>

        <Grid>

          <Section>

            <View>

              <Grid>

                { photos.map( (source, index) => <Image key={ index } width='auto' height='200px' source={ decodeURI(source) } /> ) }

              </Grid>

            </View>

            <View>

              <Text>Amenities</Text>

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

              <Text>Household</Text>

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

                <Text atomic={{ m:0 }}>Age:</Text>

                <Text atomic={{ ml:1, mb:0, mr:0, mt:0 }}>{ household.age }</Text>

              </View>

              <View atomic={{ d:'f', p:0 }}>

                <Text atomic={{ m:0 }}>Interests:</Text>

                <Text atomic={{ ml:1, mb:0, mr:0, mt:0 }}>{ household.interests }</Text>

              </View>

            </View>

            <View>

              <Text>Extra Costs</Text>

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

              <Text>Preferences</Text>

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

          </Section>

          <Section>

            <Form>

              <Field name='title' type='text' label='Title' defaultValue={ advert.title } component={ Input } validate={ required }/>

              <Field name='description' label='Description' defaultValue={ advert.description } component={ Input } validate={ required }/>

              <Field name='price' type='number' label='Price' defaultValue={ advert.price } component={ Input } validate={ required }/>

              <Field name='hostName' type='text' label='Host name' defaultValue={ advert.hostName } component={ Input } validate={ required }/>

              <Field name='phoneNumber' type='text' label='Phone number' defaultValue={ advert.phoneNumber } component={ Input } validate={ required }/>

              <Field name='homeType' type='text' label='Home type' defaultValue={ advert.homeType } component={ Input } validate={ required }/>

              <Field name='location' type='text' label='Location' defaultValue={ advert.postcode } component={ Input } validate={ required }/>

              <Field name='availabilityFrom' type='date' label='Availability from' defaultValue={ advert.availabilityFrom } component={ Input } validate={ required }/>

              <Field name='availabilityTo' type='date' label='Availability to' defaultValue={ advert.availabilityTo } component={ Input } validate={ required }/>

            </Form>

          </Section>

        </Grid>

        { advert.status !== 'active' && (
          <Section atomic={{ ta:'c' }}>

            { advert.status !== 'declined' && (
              <Button atomic={{ d:'ib', w:'a', mr:4 }} backgroundColor='error' onClick={ () => this.onUpdateAdvertRequest(advert._id, { disabled: true }) }>Decline Advert</Button>
            ) }

            <Button atomic={{ d:'ib', w:'a', mr:4 }} backgroundColor='dark' onClick={ this.onListingPreviewRequest }>Preview Listing</Button>

            <Button atomic={{ d:'ib', w:'a' }} onClick={ this.onCreateUserWithListingRequest }>Create Listing</Button>

          </Section>
        ) }

        { advert.status === 'active' && (
          <Section atomic={{ ta:'c' }}>

            <Button atomic={{ d:'ib', w:'a' }} onClick={ this.onListingViewRequest }>View Listing</Button>

          </Section>
        ) }

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
