import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { withRouter } from 'react-router'

import * as actions from './actions'
import selectors from './selectors'

import { ButtonPrimary } from 'components/button'
import { Icon } from 'components/icon'
import { Input } from 'components/input'
import { View, Grid } from 'components/layout'
import { Text, TitleText } from 'components/text'

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

        <TitleText><Icon className='material-icons'>lock</Icon> Auth</TitleText>
        <Text>Please login</Text>

        <Grid>

          <Input type='email' placeholder='Email' innerRef={ r => this.email = r } />
          <Input type='password' placeholder='Password' innerRef={ r => this.password = r } />

          <ButtonPrimary onClick={ () => login({ username: this.email.value, password: this.password.value }) }>Login</ButtonPrimary>

        </Grid>

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
