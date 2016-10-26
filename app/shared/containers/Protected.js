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

    const { actions, children } = this.props
    const { logout } = actions

    return (
      <div id='Protected'>

        <a onClick={ () => logout() }>Logout</a>

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
