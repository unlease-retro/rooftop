import React, { Component } from 'react'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { withRouter } from 'react-router'

import { selectors } from '../../auth'

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

    const { children } = this.props

    return (
      <div id='Protected'>

        { children }

      </div>
    )

  }

}

export default withRouter(connect(
  createStructuredSelector({ ...selectors })
)(Protected))
