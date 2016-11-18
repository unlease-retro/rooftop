import React, { Component } from 'react'
import Relay from 'react-relay'

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { createStructuredSelector } from 'reselect'

import { getFormattedUnixTimestamp } from '../shared/util'

import variables from './variables'

import selectors from '../ui/selectors'
import * as fragments from './fragments'
import * as actions from '../ui/actions'
// import mutation from './mutation'

import { Grid, View, Section } from 'components/layout'
import { Button } from 'components/button'
import { Anchor } from 'components/anchor'
import { Icon } from 'components/icon'
import { Textarea } from 'components/textarea'
import { Text } from 'components/text'

class Advert extends Component {

  constructor(props) {

    super(props)

    this.renderReply = this.renderReply.bind(this)

  }

  renderReply(r) {

    const { _id, from, thread, message, createdAt } = r

    const isHost = from === thread

    return (
      <Section border key={ _id } atomic={{ m:0, mb:1 }}>

        <View backgroundColor={ isHost ? 'dark' : 'white' } atomic={{ p:1 }}>

          <Text color={ isHost ? 'white' : 'dark' } atomic={{ m:0 }}>{ message }</Text>

          <Text color={ isHost ? 'white' : 'dark' } atomic={{ mt:1, mb:0, fs:3 }}>{ isHost ? 'Recived at:' : 'Sent at:' } { getFormattedUnixTimestamp(createdAt) }</Text>

        </View>

      </Section>
    )

  }

  render() {

    const { advertTab, actions: { updateUI }, query: { advertById: { replies, title, url, price, submited, submitedBy, phoneNumber, location: { postcode, area }, amenities: { balcony, garden, parking }, avability: { avability, minimumTerm, maximumTerm }, author: { name, type }, preferences: { couples, gender } } } } = this.props

    return (
      <View>

        <Anchor href={url} target='_blank' atomic={{ td:'n' }}>

          <Text atomic={{ fs:6, fw:'b', ta:'c' }} color='primary'>

            { title }

          </Text>

        </Anchor>


        <View atomic={{ pl:0, pr:0 }}>

          <Grid cell={6/0.12}>

            <Button onClick={ () => updateUI({ advert: { tab: 0 } }) } color='white'>Info</Button>

            <Button onClick={ () => updateUI({ advert: { tab: 1 } }) } backgroundColor='secondary' color='white'>Messages</Button>

          </Grid>

        </View>


        { advertTab ? (<View atomic={{ p:0 }}>

          { replies.map(r => this.renderReply(r)) }

          <View atomic={{ p:0, mt:1 }}>

            <Textarea maxWidth='initial' placeholder='Type your message here..' atomic={{ p:1, mt:0, mb:1 }}></Textarea>

            <Grid>

              <Button backgroundColor='error' atomic={{ w:'a' }} color='white'>Send message</Button>

              <Button backgroundColor='accent' atomic={{ w:'a' }} color='white'>Generate message</Button>

            </Grid>

          </View>

        </View>) : null }


        { !advertTab ? (<Grid cell={6/0.12}>

          <Section border atomic={{ mt:1, mb:1, p:1 }}>

            <Text atomic={{ m:0, pb:2, fw:'b' }}>General</Text>

            <Grid>

              <View atomic={{ m:0, p:0 }}>

                <View atomic={{ p:0, mb:1, d:'f' }}>

                  <Icon>done_all</Icon>

                  <Text atomic={{ m:0, ml:1 }}>Status: { submited ? 'Submited' : 'Not sent' }</Text>

                </View>

                <View atomic={{ p:0, mb:1, d:'f' }}>

                  <Icon>attach_money</Icon>

                  <Text atomic={{ m:0, ml:1 }}>Price: £{ price }</Text>

                </View>

                { submited && <View atomic={{ p:0, m:0, d:'f' }}>

                  <Icon>accessibility</Icon>

                  <Text atomic={{ m:0, ml:1 }}>Submited by: { submitedBy }</Text>

                </View> }

              </View>

              <View atomic={{ p:0, m:0 }}>

                <View atomic={{ p:0, m:0, d:'f', fc:'r' }}>

                  <Button atomic={{ m:0, w:'a' }} backgroundColor='error' color='white'>Mark as disabled</Button>

                </View>

                { !submited && <View atomic={{ p:0, m:0, mt:1, d:'f', fc:'r' }}>

                  <Button atomic={{ m:0, w:'a' }} backgroundColor='accent' color='white'>Mark as sent</Button>

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

              <Text atomic={{ m:0, ml:1 }}>Avability: { avability }</Text>

            </View>

            <View atomic={{ p:0, mb:1, d:'f' }}>

              <Icon>timer</Icon>

              <Text atomic={{ m:0, ml:1 }}>Minimum term: { minimumTerm }</Text>

            </View>

            <View atomic={{ p:0, m:0, d:'f' }}>

              <Icon>timer_off</Icon>

              <Text atomic={{ m:0, ml:1 }}>Maximum term: { maximumTerm }</Text>

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
