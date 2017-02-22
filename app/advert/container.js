import React, { Component } from 'react'
import Relay from 'react-relay'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { Field } from 'redux-form/immutable'

//import * as API from '../shared/services/api'
import * as Bot from '../bot'
import { getStatus } from './computed'
import * as selectors from './selectors'
import UISelectors from '../ui/selectors'
import * as fragments from './fragments'
import mutations from './mutations'
import { updateUI } from '../ui/actions'
import { mutations as ListingMutations } from '../listings'
import variables from './variables'
import { getAddressFromGeocode, getListingPreviewUrl, getListingUrl, getUserPassword, getMapUrl, compileSmsBody, getSmsBody, getStatusTextColour, required, normalize, transformAdvertToListing, transformAdvertToListingPreview, formatReplyDate } from './util'
import { promisifyMutation } from '../shared/util'
import { TABS, INITIAL_TAB } from './constants'

import { Image } from 'components/image'
import { Anchor } from 'components/anchor'
import { Button } from 'components/button'
import { View, Grid, Section } from 'components/layout'
import { Textarea } from 'components/textarea'
import { Text } from 'components/text'
import { Label } from 'components/label'

import Form, { Select, Input } from './components'

class Advert extends Component {

  constructor() {

    super()

    this.onCreateUserWithListingRequest = this.onCreateUserWithListingRequest.bind(this)
    this.onListingPreviewRequest = this.onListingPreviewRequest.bind(this)
    this.onDeleteListingRequest = this.onDeleteListingRequest.bind(this)
    this.onListingViewRequest = this.onListingViewRequest.bind(this)
    this.onSendMessageRequest = this.onSendMessageRequest.bind(this)
    this.renderReply = this.renderReply.bind(this)

    this.generatedSmsContent = getSmsBody()

  }

  componentWillUnmount() {

    const { actions: { updateUI } } = this.props

    return updateUI({ snackbar: null })

  }

  onDeleteListingRequest() {

    const { onUpdateAdvertRequest } = this
    const { query: { advert } } = this.props
    const { listingId, _id, phoneNumber } = advert

    return promisifyMutation( new mutations.removeListing({ id: listingId }) )
      .then( () => onUpdateAdvertRequest(_id, { disabled: true, submitted: false, listingId: 'listingDeleted' }) )
      .then( () => promisifyMutation( new mutations.addBlacklist({ phoneNumber, _id }) ) )
    
  }

  onCreateUserWithListingRequest() {

    const { onUpdateAdvertRequest } = this
    const { relay, editForm, query: { advert } } = this.props
    const { _id, geocode } = advert

    // I have given up! 😫
    const user = {}
    const listing = {}

    relay.setVariables({ createListingRequesting: true })

    return onUpdateAdvertRequest(_id, editForm)
      .then( () => getAddressFromGeocode(geocode) )
      .then( address => transformAdvertToListing({ ...this.props.query.advert, ...address }) )
      .then( payload => promisifyMutation( new ListingMutations.createUserWithListing(payload) ) )
      .then( ({ createUserWithListing: { listingId, email } }) => {

        user.emailAddress = email
        user.password = getUserPassword(email)
        listing.listingUrl = getListingUrl(listingId)

        return onUpdateAdvertRequest(_id, { listingId, submitted: true, disabled: false })

      } )
      .then( () => {

        const { generatedSmsContent } = this
        const { query: { advert } } = this.props

        return compileSmsBody(generatedSmsContent, advert, listing, user)

      } )
      .then( message => promisifyMutation( new mutations.sendAdvertMessage({ _id, phoneNumber : this.props.query.advert.phoneNumber, message }) ) )
      .then( () => relay.setVariables({ createListingRequesting: false }) )

  }

  onSendMessageRequest() {

    const message = this.smsContent
    const { query: { advert }, actions: { updateUI } } = this.props
    const { _id, phoneNumber } = advert

    return promisifyMutation( new mutations.sendAdvertMessage({ _id, phoneNumber, message }) )
      .then( () => updateUI({ snackbar: 'Message sent!' }) )

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

  onChangeTab(visibleTab) {

    const { relay } = this.props

    return relay.setVariables({ visibleTab })

  }

  renderReply(reply, index) {

    const { message, host, createdAt } = reply

    const dateTextColor = host ? 'error' : 'primary'
    const date = formatReplyDate(createdAt)

    return (
      <View atomic={{ m:0, p:0 }} key={ index }>

        <View atomic={{ pl:0, pr:0, pt:0, pb:4 }}>

          <Text>{ message }</Text>

          <Text color={ dateTextColor } atomic={{ mb: 0 }}>{ date }</Text>

        </View>

        <View height='1px' backgroundColor='dark' atomic={{ m:0, p:0 }} />

      </View>
    )

  }

  render() {


    const { doesFormHaveErrors, query, requesting, relay: { variables } } = this.props
    const { advert } = query
    const { createListingRequesting, visibleTab } = variables
    const { photos, amenities, preferences, household, extraCosts, replies } = advert

    const initialValues = {
      title: advert.title,
      description: advert.description,
      price: advert.price,
      deposit: advert.deposit,
      hostName: advert.hostName,
      phoneNumber: advert.phoneNumber,
      homeType: advert.homeType,
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

        <View atomic={{ p:0, ta:'c', mb:4 }}>

          { TABS.map( ({ label, icon }) => <Button key={ label } backgroundColor={ label === visibleTab ? 'secondary' : 'primary' } atomic={{ d:'ib', w:'a', ml:2, mr:2 }} onClick={ () => this.onChangeTab(label) }>{ icon } { label }</Button> ) }

        </View>

        <Anchor atomic={{ d:'ib', mb:4, td:'n' }} to={Bot.route}>&larr; Back</Anchor>

        { visibleTab !== INITIAL_TAB ? (<Section>

          <View atomic={{ pb:0 }}>

            { replies.map( (reply, index) => this.renderReply(reply, index) ) }

          </View>

          <View>

            <Text atomic={{ mt: 0 }}>Your message:</Text>

            <Textarea placeholder='Write here..' disabled={ requesting } defaultValue={ this.smsContent } onChange={ e => this.smsContent = e.target.value } />

            { !requesting ? (<Button atomic={{ w:'a' }} onClick={ this.onSendMessageRequest }>Send message</Button>) : null }

          </View>

        </Section>) : null }


        { visibleTab === INITIAL_TAB ? (<Grid>

          <Section>

            <View>

              <Grid>

                { photos.map( (source, index) => <Anchor key={ index } href={source} target='_blank'><Image width='auto' height='200px' source={ decodeURI(source) } /></Anchor> ) }

              </Grid>

            </View>

            <View atomic={{ p:0, o:'s' }}>

              <View>

                <Anchor href={ getMapUrl(advert.geocode) } target='_blank'>View on map</Anchor>

                <Text atomic={{ fw:'b', fs:4 }}>Amenities</Text>

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

                <Text atomic={{ fw:'b', fs:4 }}>Household</Text>

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

                <Text atomic={{ fw:'b', fs:4 }}>Extra Costs</Text>

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

                <Text atomic={{ fw:'b', fs:4 }}>Preferences</Text>

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

            <Form initialValues={ initialValues } atomic={{ m:0 }}>

              <Field name='title' type='text' label='Title' component={ Input } validate={ required }/>

              <Field name='description' label='Description' component={ Input } validate={ required }/>

              <Field name='price' type='number' label='Price' normalize={ normalize } component={ Input } validate={ required }/>

              <Field name='deposit' type='number' label='Deposit' normalize={ normalize } component={ Input } validate={ required }/>

              <Field name='hostName' type='text' label='Host name' component={ Input } validate={ required }/>

              <Field name='phoneNumber' type='text' label='Phone number' component={ Input } validate={ required }/>

              <Field name='homeType' label='Home type' component={ Select } validate={ required }/>

              <Field name='availabilityFrom' type='date' label='Availability from' component={ Input } validate={ required }/>

              <Field name='availabilityTo' type='date' label='Availability to' component={ Input } validate={ required }/>

              <Field name='numOfMale' type='number' label='Number of Male Housemates' normalize={ normalize } component={ Input } validate={ required }/>

              <Field name='numOfFemale' type='number' label='Number of Female Housemates' normalize={ normalize } component={ Input } validate={ required }/>

            </Form>

          </Section>

        </Grid>) : null }

        { visibleTab === INITIAL_TAB ? <View>
          
          <Section>

            { advert.status !== 'active' ? (<View>

              <Label atomic={{ ml:0, mr:0 }}>SMS content:</Label>

              <Textarea height='250px' defaultValue={ this.generatedSmsContent } onChange={ e => this.generatedSmsContent = e.target.value } atomic={{ m:0, bs:'s', bw:1, bg:'t' }}></Textarea>

            </View>) : null }

          </Section>

          { advert.status !== 'active' && (
            <Section atomic={{ ta:'c' }}>

              { advert.status !== 'declined' && (
                <Button atomic={{ d:'ib', w:'a', mr:4 }} backgroundColor='error' onClick={ () => this.onUpdateAdvertRequest(advert._id, {disabled: true}) }>Decline Advert</Button>
              ) }

              { advert.status === 'declined' && (
                <Button atomic={{ d:'ib', w:'a', mr:4 }} onClick={ () => this.onUpdateAdvertRequest(advert._id, {disabled: false}) }>Enable Advert</Button>
              ) }

              <Button atomic={{ d:'ib', w:'a', mr:4 }} backgroundColor='dark' disabled={ doesFormHaveErrors } onClick={ this.onListingPreviewRequest }>Preview Listing</Button>

              { advert.status !== 'declined' && !createListingRequesting ? (<Button atomic={{ d:'ib', w:'a' }} disabled={ doesFormHaveErrors } onClick={ this.onCreateUserWithListingRequest }>Create Listing</Button>) : null }

            </Section>
          ) }

          { advert.status === 'active' && (
            <Section atomic={{ ta:'c' }}>

              <Button atomic={{ d:'ib', w:'a' }} onClick={ this.onListingViewRequest }>View Listing</Button>

              <Button atomic={{ ml:4, d:'ib', w:'a' }} onClick={ this.onDeleteListingRequest } backgroundColor='error'>Delete listing</Button>

            </Section>
          ) }
        </View> : null}


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
    createStructuredSelector({ ...selectors, ...UISelectors }),
    dispatch => ({
      actions: bindActionCreators({ updateUI }, dispatch)
    })
  )(Advert),
  { ...variables, fragments }
)
