import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { withRouter } from 'react-router'

import { selectors, actions } from '../../auth'

class Protected extends Component {

  componentWillReceiveProps(nextProps) {

    const { authorised, router } = nextProps

    // redirect unauthorised scoundrels to `/login`
    if ( !authorised ) return router.push('login')

  }

  render() {

    const { children } = this.props

    return (
      <div>

        { children }

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
