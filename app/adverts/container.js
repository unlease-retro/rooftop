import React, { Component } from 'react'
import Relay from 'react-relay'

import uuid from 'node-uuid'

import { FILTERS } from './constants'
import { getFormattedUnixTimestamp } from '../shared/util'

import * as fragments from './fragments'
import variables from './variables'
// import mutation from './mutation'

import { Icon } from 'components/icon'
import { Anchor } from 'components/anchor'
import { Button } from 'components/button'
import { Grid, View, Section } from 'components/layout'
import { Select } from 'components/select'
import { Text } from 'components/text'


class Adverts extends Component {

  constructor(props) {

    super(props)

    this.renderAdvert = this.renderAdvert.bind(this)
    this.onFilterClick = this.onFilterClick.bind(this)

  }

  onFilterClick(variables) {

    const { relay } = this.props

    return relay.setVariables(variables)

  }

  renderAdvert(a) {

    const { _id, url, title, price, phoneNumber, submited, updatedAt } = a

    const renderButton = submited ? <Button color='white' atomic={{ w:'a', m:0 }}>View replies</Button> : <Button backgroundColor='error' color='white' atomic={{ w:'a', m:0 }}>Send message</Button>

    return (
      <Section border atomic={{ mt:1, mb:1, p:1 }} key={ uuid.v4() }>

        <View atomic={{ w:'f', p:0 }}>

          <Text atomic={{ m:0, fw:'b' }}>
            { title }
          </Text>

          <Anchor atomic={{ d:'f', fd:'r', td:'n', ai:'c' }} target='_blank' href={url}>

            <Icon>link</Icon>

            <Text atomic={{ m:0, ml:1, fs:3 }}>Advert url</Text>

          </Anchor>

        </View>

        <View atomic={{ w:'f', pl:0, pr:0 }}>

          <View atomic={{ p:0, mb:1, d:'f' }}>

            <Icon>done_all</Icon>

            <Text atomic={{ m:0, ml:1 }}>{ submited ? `Sent at ${getFormattedUnixTimestamp(updatedAt)}` : 'Not sent' }</Text>

          </View>

          <View atomic={{ p:0, mb:1, d:'f' }}>

            <Icon>attach_money</Icon>

            <Text atomic={{ m:0, ml:1 }}>£{ price }</Text>

          </View>

          <View atomic={{ p:0, d:'f' }}>

            <Icon>settings_phone</Icon>

            <Text atomic={{ m:0, ml:1 }}>{ phoneNumber }</Text>

          </View>

        </View>

        <Anchor atomic={{ d:'f', fd:'c', td:'n' }} href={`/adverts/${_id}`}>

          {renderButton}

        </Anchor>

      </Section>
    )

  }

  render() {

    const { relay: { variables }, query: { adverts } } = this.props

    const onFilterClick = this.onFilterClick

    const { submited } = variables

    return (
      <View>

        <Text atomic={{ fs:6, fw:'b', ta:'c' }} color='primary'>Crawled adverts</Text>

        <Select
          name='submited'
          value={ submited }
          options={ FILTERS.listed }
          autoBlur={ true }
          clearable={ false }
          searchable={ false }
          atomic={{ d:'f', mt:5, mb:7, ta:'c' }}
          onChange={ ({ value }) => onFilterClick({ submited: value }) }
        />

        <Grid cell={3/0.12}>

          { adverts.map( a => this.renderAdvert(a) ) }

        </Grid>

      </View>
    )

  }

}

export default Relay.createContainer(Adverts, {
  ...variables,
  fragments,
})
