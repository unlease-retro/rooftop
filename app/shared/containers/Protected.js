import React, { Component } from 'react'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { withRouter } from 'react-router'

import { selectors } from '../../auth'

class Protected extends Component {

  componentWillUpdate(nextProps) {

    const { authorised, router } = nextProps

    // redirect users to `/login` if they become unauthorised
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
