import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { withRouter } from 'react-router'

import * as actions from './actions'
import selectors from './selectors'

import { ButtonPrimary } from 'components/button'

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

        <h1>Auth</h1>

        <input type='email' placeholder='Email' />
        <input type='password' placeholder='Password' />

        <ButtonPrimary onClick={ () => login({ username: 't@t.co', password: 'test11' }) }>Login</ButtonPrimary>

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
