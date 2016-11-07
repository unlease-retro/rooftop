import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { withRouter } from 'react-router'

import { selectors, actions } from '../../auth'

import { Anchor } from 'components/anchor'
import { Footer } from 'components/footer'
import { Image } from 'components/image'

class Protected extends Component {

  componentWillMount() {

    const { authorised } = this.props

    this.redirectToLogin(authorised)

  }

  componentWillUpdate(nextProps) {

    const { authorised } = nextProps

    this.redirectToLogin(authorised)

  }

  redirectToLogin(authorised) {

    const { router } = this.props

    // redirect unauthorised scoundrels to `/login`
    if ( !authorised ) return router.push('login')

  }

  render() {

    const { actions, children } = this.props
    const { logout } = actions

    return (
      <div id='Protected'>

        { children }

        <Footer>

          <Image source='unlease.png' width='40' height='40' center />

          <Anchor onClick={ () => logout() }>
            Logout
          </Anchor>

        </Footer>

      </div>
    )

  }

}

export default withRouter(connect(
  createStructuredSelector({ ...selectors }),
  dispatch => ({
    actions: bindActionCreators(actions, dispatch)
  })
)(Protected))
