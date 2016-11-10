import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { withRouter } from 'react-router'

import * as actions from './actions'
import selectors from './selectors'

import { Button } from 'components/button'
import { Footer } from 'components/footer'
import { Image } from 'components/image'
import { Input } from 'components/input'
import { View } from 'components/layout'
import { Text } from 'components/text'

export class Auth extends Component {

  componentWillMount() {

    const { authorised } = this.props

    this.redirectToIndex(authorised)

  }

  componentWillUpdate(nextProps) {

    const { authorised } = nextProps

    this.redirectToIndex(authorised)

  }

  redirectToIndex(authorised) {

    const { router } = this.props

    // redirect authorised users to `/`
    if ( authorised ) return router.push('/')

  }

  render() {

    const { login } = this.props.actions

    return (
      <View>

        <Text atomic={{ fs:6, fw:'b', ta:'c' }} color='primary'>
          Rooftop
        </Text>

        <Text atomic={{ ta:'c' }}>
          a good place for an overview
        </Text>

        <Input type='email' placeholder='Email' innerRef={ r => this.email = r } />

        <Input type='password' placeholder='Password' innerRef={ r => this.password = r } />

        <Button atomic={{ mt:7 }} onClick={ () => login({ username: this.email.value, password: this.password.value }) }>
          Login
        </Button>

        <Footer>

          <Image source='unlease.png' width='40px' height='40px' center />

        </Footer>

      </View>
    )

  }

}

export default withRouter(connect(
  createStructuredSelector({ ...selectors }),
  dispatch => ({
    actions: bindActionCreators(actions, dispatch)
  })
)(Auth))
