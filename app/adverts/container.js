import React, { Component } from 'react'
import Relay from 'react-relay'

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { createStructuredSelector } from 'reselect'

import { FILTERS, SNACKBAR } from './constants'
import { getFormattedUnixTimestamp } from '../shared/util'

import * as fragments from './fragments'
import * as actions from '../ui/actions'
import selectors from '../ui/selectors'
import variables from './variables'
import mutation from './mutation'

import { Icon } from 'components/icon'
import { Anchor } from 'components/anchor'
import { Button } from 'components/button'
import { Loader } from 'components/loader'
import { Textarea } from 'components/textarea'
import { Grid, View, Section } from 'components/layout'
import { Checkbox } from 'components/checkbox'
import { Select } from 'components/select'
import { Text } from 'components/text'


class Adverts extends Component {

  constructor(props) {

    super(props)

    this.renderAdvert = this.renderAdvert.bind(this)

    this.onFilterClick = this.onFilterClick.bind(this)

    this.onChangeToggle = this.onChangeToggle.bind(this)

    this.onSendClick = this.onSendClick.bind(this)

  }

  onSendClick(adverts, data) {

    const { actions: { updateUI, resetUI } } = this.props

    Relay.Store.commitUpdate(
      new mutation({
        adverts,
        ...data,
      }), {
        onSuccess: () => {

          // need to do this
          // becase updateUI({ adverts: { chosen: [] } }) dosent work
          resetUI()

          // display success message
          updateUI({ snackbar: SNACKBAR.success })

        },
        onFailure: transation => updateUI({ error: new Error(transation) }),
      }
    )

  }

  onFilterClick(variables) {

    const { relay } = this.props

    return relay.setVariables(variables)

  }

  renderAdvert(a) {

    const { actions: { toggleAdvert }, advertsChosen } = this.props

    const { id, title, phoneNumber, disabled, submitted, updatedAt, price: { value, unit } } = a

    const renderButton = submitted ? <Button color='white' atomic={{ w:'a', m:0 }}>View replies</Button> : <Button backgroundColor='error' color='white' atomic={{ w:'a', m:0 }}>Send message</Button>

    const isAdvertChosen = advertsChosen.indexOf(id) !== -1

    const borderWidth = isAdvertChosen ? 4 : 1

    return (
      <Section border atomic={{ mt:1, mb:1, p:1, bw: borderWidth }} key={ id }>

        <View atomic={{ w:'f', p:0 }}>

          <Text atomic={{ m:0, fw:'b' }}>

            { title }

            { disabled && ' (Disabled)' }

          </Text>

        </View>

        <View atomic={{ w:'f', pl:0, pr:0 }}>

          <View atomic={{ p:0, mb:1, d:'f' }}>

            <Icon>done_all</Icon>

            <Text atomic={{ m:0, ml:1 }}>{ submitted ? `Sent at ${getFormattedUnixTimestamp(updatedAt)}` : 'Not sent' }</Text>

          </View>

          <View atomic={{ p:0, mb:1, d:'f' }}>

            <Icon>attach_money</Icon>

            <Text atomic={{ m:0, ml:1 }}>£{ value } { unit }</Text>

          </View>

          <View atomic={{ p:0, d:'f' }}>

            <Icon>settings_phone</Icon>

            <Text atomic={{ m:0, ml:1 }}>{ phoneNumber }</Text>

          </View>

        </View>

        <View atomic={{ d:'f', fd:'c', td:'n', p:0, mb:1 }}>

          <Button backgroundColor='accent' color='white' atomic={{ w:'a', m:0 }} onClick={ () => toggleAdvert(id) }>Toggle</Button>

        </View>

        <Anchor atomic={{ d:'f', fd:'c', td:'n' }} href={`/adverts/${id}`}>

          {renderButton}

        </Anchor>

      </Section>
    )

  }

  onChangeToggle() {

    const { query: { adverts }, actions: { toggleAdvert } } = this.props

    adverts.map( ({ id }) => toggleAdvert(id) )

  }

  render() {

    const { message, requesting, advertsGeneric, advertsChosen, relay: { variables }, query: { adverts }, actions: { updateUI } } = this.props

    const { submitted, disabled } = variables

    const onSendClick = this.onSendClick

    const onFilterClick = this.onFilterClick

    const onChangeToggle = this.onChangeToggle

    const renderLoader = requesting ? <Loader atomic={{ m:2, po:'s', l:0, r:0 }}/> : null

    return (
      <View>

        <Text atomic={{ fs:6, fw:'b', ta:'c' }} color='primary'>Adverts</Text>

        <Section atomic={{ mt:8, mb:8, ta:'c' }}>

          <Text atomic={{ d:'ib', mr:1 }}>

            <Icon>tune</Icon> Show

          </Text>

          <Select
            width='150px'
            name='submitted'
            value={ submitted }
            options={ FILTERS.submitted }
            autoBlur={ true }
            clearable={ false }
            searchable={ false }
            atomic={{ d:'ib', ta:'c' }}
            onChange={ ({ value }) => onFilterClick({ submitted: value }) }
          />

          <Text atomic={{ d:'ib', ml:1, mr:1 }}>

            and

          </Text>

          <Select
            name='disabled'
            value={ disabled }
            options={ FILTERS.disabled }
            autoBlur={ true }
            clearable={ false }
            searchable={ false }
            atomic={{ d:'ib', ta:'c' }}
            onChange={ ({ value }) => onFilterClick({ disabled: value }) }
          />

        </Section>

        <Grid cell={3/0.12}>

          { adverts.map( a => this.renderAdvert(a) ) }

        </Grid>

        <Section atomic={{ mt:8 }}>

          { renderLoader }

          { !advertsGeneric ? (<Textarea disabled={ requesting } maxWidth='initial' placeholder='Your message here..' value={ message } onChange={ e => updateUI({ adverts: { message: e.target.value } })} atomic={{ p:1, mb:1 }}></Textarea>) : null }

          <Button disabled={ requesting } backgroundColor='error' atomic={{ w:'a' }} color='white' onClick={ () => onSendClick(advertsChosen, { message }) }>Send message to selected</Button>

          <View atomic={{ ta: 'c', p:0 }}>

            <View atomic={{ p:0, d:'ib', w:'a' }}>

              <Checkbox atomic={{ d:'ib', mr:1, mt:0, mb:0, w:'a' }} onChange={ onChangeToggle } type='checkbox'></Checkbox>

              <Text atomic={{ d:'ib', m:0 }}>Toggle all</Text>

            </View>

            <View atomic={{ p:0, d:'ib', w:'a' }}>

              <Checkbox atomic={{ d:'ib', mr:1, mt:0, mb:0, w:'a' }} onChange={ () => updateUI({ adverts: { generic: !advertsGeneric } }) } type='checkbox'></Checkbox>

              <Text atomic={{ d:'ib', m:0 }}>Send generic message</Text>

            </View>

          </View>

        </Section>

      </View>
    )

  }

}


export default connect(
  createStructuredSelector({ ...selectors }),
  dispatch => ({
    actions: bindActionCreators(actions, dispatch)
  })
)(Relay.createContainer(Adverts, { ...variables, fragments }))
