import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { withRouter } from 'react-router'

import * as actions from './actions'
import selectors from './selectors'

import { ButtonPrimary } from 'components/button'
import { Input } from 'components/input'
import { Text, TitleText } from 'components/text'

export class Auth extends Component {

  componentWillReceiveProps(nextProps) {

    const { authorised, router } = nextProps

    // redirect authorised users to `/`
    if ( authorised ) return router.push('/')

  }

  render() {

    const { login } = this.props.actions

    return (
      <div id='Auth'>

        <TitleText>Auth</TitleText>
        <Text>Please login</Text>

        <Input type='email' placeholder='Email' innerRef={ r => this.email = r } />
        <Input type='password' placeholder='Password' innerRef={ r => this.password = r } />

        <ButtonPrimary onClick={ () => login({ username: this.email.value, password: this.password.value }) }>Login</ButtonPrimary>

      </div>
    )

  }

}

export default withRouter(connect(
  createStructuredSelector({ ...selectors }),
  dispatch => ({
    actions: bindActionCreators(actions, dispatch)
  })
)(Auth))
