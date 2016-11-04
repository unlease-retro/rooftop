import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { withRouter } from 'react-router'

import { selectors, actions } from '../../auth'

import { Button } from 'components/button'
import { Icon } from 'components/icon'

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

        <Button onClick={ () => logout() }>
          <Icon>lock</Icon>
        </Button>

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
