import React, { Component } from 'react'
import Relay from 'react-relay'
import uuid from 'node-uuid'

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { createStructuredSelector } from 'reselect'

import { getFormattedUnixTimestamp } from '../shared/util'

import variables from './variables'

import selectors from '../ui/selectors'
import * as fragments from './fragments'
import * as actions from '../ui/actions'
import { SNACKBAR } from './constants'
import mutation from './mutation/index'

import { Grid, View, Section } from 'components/layout'
import { Button } from 'components/button'
import { Loader } from 'components/loader'
import { Anchor } from 'components/anchor'
import { Icon } from 'components/icon'
import { Textarea } from 'components/textarea'
import { Text } from 'components/text'


class Advert extends Component {

  constructor(props) {

    super(props)

    this.renderReply = this.renderReply.bind(this)

    this.onDisableClick = this.onDisableClick.bind(this)

    this.onMarkClick = this.onMarkClick.bind(this)

    this.onSendClick = this.onSendClick.bind(this)

  }

  onDisableClick(id) {

    const { actions: { updateUI } } = this.props

    Relay.Store.commitUpdate(
      new mutation.disable({
        id,
      }), {
        onSuccess: () => updateUI({ snackbar: SNACKBAR.update }),
        onFailure: transaction => console.error(transaction),
      }
    )

  }

  onMarkClick(id) {

    const { actions: { updateUI } } = this.props

    Relay.Store.commitUpdate(
      new mutation.mark({
        id,
      }), {
        onSuccess: () => updateUI({ snackbar: SNACKBAR.update }),
        onFailure: transaction => console.error(transaction),
      }
    )

  }

  onSendClick(id, data) {

    const { actions: { updateUI } } = this.props

    Relay.Store.commitUpdate(
      new mutation.send({
        id,
        ...data,
      }), {
        onSuccess: () => updateUI({ snackbar: SNACKBAR.sent, adverts: { message: '' } }),
        onFailure: transation => updateUI({ error: new Error(transation) }),
      }
    )

  }

  renderReply(r) {

    const { message, host, createdAt } = r

    return (
      <Section border key={ uuid.v4() } atomic={{ m:0, mb:1 }}>

        <View backgroundColor={ host ? 'dark' : 'white' } atomic={{ p:1 }}>

          <Text color={ host ? 'white' : 'dark' } atomic={{ m:0 }}>{ message }</Text>

          <Text color={ host ? 'white' : 'dark' } atomic={{ mt:1, mb:0, fs:3 }}>{ host ? 'Recived at:' : 'Sent at:' } { getFormattedUnixTimestamp(createdAt) }</Text>

        </View>

      </Section>
    )

  }

  render() {

    const { message, requesting, advertsTab, actions: { updateUI }, query: { advertById } } = this.props

    const { id, replies, title, url, submitted, submittedBy, phoneNumber, disabled, price: { unit, value }, location: { postcode, area }, amenities: { balcony, garden, parking }, avability: { date, maximum, minimum }, author: { name, type }, preferences: { couples, gender } } = advertById

    const onSendClick = this.onSendClick

    const onMarkClick = this.onMarkClick

    const onDisableClick = this.onDisableClick

    const renderLoader = requesting ? <Loader atomic={{ m:2, po:'s', l:0, r:0 }}/> : null

    return (
      <View>

        <Anchor href={url} target='_blank' atomic={{ td:'n' }}>

          <Text atomic={{ fs:6, fw:'b', ta:'c' }} color='primary'>

            { title }

          </Text>

        </Anchor>


        <View atomic={{ pl:0, pr:0 }}>

          <Grid cell={6/0.12}>

            <Button onClick={ () => updateUI({ adverts: { tab: false } }) } color='white'>Info</Button>

            <Button onClick={ () => updateUI({ adverts: { tab: true } }) } backgroundColor='secondary' color='white'>Messages</Button>

          </Grid>

        </View>


        { advertsTab ? (<View atomic={{ p:0 }}>

          { replies.map(r => this.renderReply(r)) }

          <View atomic={{ p:0, mt:1 }}>

            { renderLoader }

            <Textarea disabled={ requesting } maxWidth='initial' placeholder='Your message here..' value={ message } onChange={ e => updateUI({ adverts: { message: e.target.value } }) } atomic={{ p:1, mt:0, mb:1 }}></Textarea>

            <Button disabled={ requesting } backgroundColor='error' atomic={{ w:'a' }} color='white' onClick={ () => onSendClick(id, { message }) }>Send message</Button>

          </View>

        </View>) : null }


        { !advertsTab ? (<Grid cell={6/0.12}>

          <Section border atomic={{ mt:1, mb:1, p:1 }}>

            <Text atomic={{ m:0, pb:2, fw:'b' }}>General</Text>

            <Grid>

              <View atomic={{ m:0, p:0 }}>

                <View atomic={{ p:0, mb:1, d:'f' }}>

                  <Icon>done_all</Icon>

                  <Text atomic={{ m:0, ml:1 }}>Status: { submitted ? 'Submitted' : 'Not sent' }</Text>

                </View>

                <View atomic={{ p:0, mb:1, d:'f' }}>

                  <Icon>attach_money</Icon>

                  <Text atomic={{ m:0, ml:1 }}>Price: £{ value } { unit }</Text>

                </View>

                { submitted && <View atomic={{ p:0, m:0, d:'f' }}>

                  <Icon>accessibility</Icon>

                  <Text atomic={{ m:0, ml:1 }}>Submitted by: { submittedBy }</Text>

                </View> }

              </View>

              <View atomic={{ p:0, m:0 }}>

                { !disabled && <View atomic={{ p:0, m:0, d:'f', fc:'r' }}>

                  <Button atomic={{ m:0, w:'a' }} backgroundColor='error' onClick={ () => onDisableClick(id) } color='white'>Mark as disabled</Button>

                </View> }

                { !submitted && <View atomic={{ p:0, m:0, mt:1, d:'f', fc:'r' }}>

                  <Button atomic={{ m:0, w:'a' }} backgroundColor='accent' onClick={ () => onMarkClick(id) } color='white'>Mark as sent</Button>

                </View> }

              </View>

            </Grid>

          </Section>


          <Section border atomic={{ mt:1, mb:1, p:1 }}>

            <Text atomic={{ m:0, pb:2, fw:'b' }}>Host</Text>

            <View atomic={{ p:0, mb:1, d:'f' }}>

              <Icon>person</Icon>

              <Text atomic={{ m:0, ml:1 }}>Name: { name }</Text>

            </View>

            <View atomic={{ p:0, mb:1, d:'f' }}>

              <Icon>settings_phone</Icon>

              <Text atomic={{ m:0, ml:1 }}>Phone: { phoneNumber }</Text>

            </View>

            <View atomic={{ p:0, m:0, d:'f' }}>

              <Icon>account_balance_wallet</Icon>

              <Text atomic={{ m:0, ml:1 }}>Type: { type }</Text>

            </View>

          </Section>


          <Section border atomic={{ mt:1, mb:1, p:1 }}>

            <Text atomic={{ m:0, pb:2, fw:'b' }}>Location</Text>

            <View atomic={{ p:0, mb:1, d:'f' }}>

              <Icon>location_on</Icon>

              <Text atomic={{ m:0, ml:1 }}>Postcode: { postcode }</Text>

            </View>

            <View atomic={{ p:0, m:0, d:'f' }}>

              <Icon>location_city</Icon>

              <Text atomic={{ m:0, ml:1 }}>Area: { area }</Text>

            </View>

          </Section>


          <Section border atomic={{ mt:1, mb:1, p:1 }}>

            <Text atomic={{ m:0, pb:2, fw:'b' }}>Preferences</Text>

            <View atomic={{ p:0, mb:1, d:'f' }}>

              <Icon>person_add</Icon>

              <Text atomic={{ m:0, ml:1 }}>Couples: { couples }</Text>

            </View>

            <View atomic={{ p:0, m:0, d:'f' }}>

              <Icon>face</Icon>

              <Text atomic={{ m:0, ml:1 }}>Gender: { gender }</Text>

            </View>

          </Section>


          <Section border atomic={{ mt:1, mb:1, p:1 }}>

            <Text atomic={{ m:0, pb:2, fw:'b' }}>Avability</Text>

            <View atomic={{ p:0, mb:1, d:'f' }}>

              <Icon>access_time</Icon>

              <Text atomic={{ m:0, ml:1 }}>Avability: { date }</Text>

            </View>

            <View atomic={{ p:0, mb:1, d:'f' }}>

              <Icon>timer</Icon>

              <Text atomic={{ m:0, ml:1 }}>Minimum term: { minimum }</Text>

            </View>

            <View atomic={{ p:0, m:0, d:'f' }}>

              <Icon>timer_off</Icon>

              <Text atomic={{ m:0, ml:1 }}>Maximum term: { maximum }</Text>

            </View>

          </Section>


          <Section border atomic={{ mt:1, mb:1, p:1 }}>

            <Text atomic={{ m:0, pb:2, fw:'b' }}>Amenities</Text>

            <View atomic={{ p:0, mb:1, d:'f' }}>

              <Icon>account_balance</Icon>

              <Text atomic={{ m:0, ml:1 }}>Balcony: { balcony }</Text>

            </View>

            <View atomic={{ p:0, mb:1, d:'f' }}>

              <Icon>local_florist</Icon>

              <Text atomic={{ m:0, ml:1 }}>Garden: { garden }</Text>

            </View>

            <View atomic={{ p:0, m:0, d:'f' }}>

              <Icon>local_parking</Icon>

              <Text atomic={{ m:0, ml:1 }}>Parking: { parking }</Text>

            </View>

          </Section>


        </Grid>) : null }

      </View>
    )

  }

}


export default connect(
  createStructuredSelector({ ...selectors }),
  dispatch => ({
    actions: bindActionCreators(actions, dispatch)
  })
)(Relay.createContainer(Advert, { ...variables, fragments }))
