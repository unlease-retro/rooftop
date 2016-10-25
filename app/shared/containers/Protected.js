import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { withRouter } from 'react-router'

import { selectors, actions } from '../../auth'

class Protected extends React.Component {

  componentWillMount() {

    // const { checkToken } = this.props.actions

    // check if user's access token is valid
    // checkToken()

  }

  componentWillReceiveProps() {

    // TODO - this won't work, as we'll start checking the token then user will be redirected straight away

    // const { authorised, router } = nextProps

    // redirect unauthorised scoundrels to `/login`
    // if ( !authorised ) return router.push('login')

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
