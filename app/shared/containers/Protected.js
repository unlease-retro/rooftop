import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { withRouter } from 'react-router'
import Transition from 'react-addons-css-transition-group'

import { selectors as AuthSelectors } from '../../auth'
import { selectors as UISelectors, actions as UIActions } from '../../ui'

import * as Bot from '../../bot'
import * as Listings from '../../listings'
import * as Viewings from '../../viewings'

import { Anchor } from 'components/anchor'
import { Button } from 'components/button'
import { Icon } from 'components/icon'
import { Nav } from 'components/nav'

class Protected extends Component {

  componentWillUpdate(nextProps) {

    const { authorised, router } = nextProps

    // redirect users to `/login` if they become unauthorised
    if ( !authorised ) return router.push('login')

  }

  render() {

    const { actions, children, isNavOpen } = this.props
    const { updateUI } = actions

    const renderNav = isNavOpen ? (
      <Nav onClick={ () => updateUI({ isNavOpen: false }) }>
        <Anchor atomic={{ d:'b', mb:4, td:'n' }} to={Bot.route}>🤖 Bot</Anchor>
        <Anchor atomic={{ d:'b', mb:4, td:'n' }} to={Listings.route}>🏠 Listings</Anchor>
        <Anchor atomic={{ d:'b', mb:4, td:'n' }} to={Viewings.route}>📷 Viewings</Anchor>
      </Nav>
    ) : null

    return (
      <div id='Protected'>

        <Button atomic={{ m:0, po:'a', t:4, l:4, w:10, z:2 }} backgroundColor='white' onClick={ () => updateUI({ isNavOpen: !isNavOpen }) }>
          <Icon>menu</Icon>
        </Button>

        <Transition transitionName='slide-right' transitionEnterTimeout={500} transitionLeaveTimeout={300}>
          { renderNav }
        </Transition>

        { children }

      </div>
    )

  }

}

export default withRouter(connect(
  createStructuredSelector({ ...AuthSelectors, ...UISelectors }),
  dispatch => ({
    actions: bindActionCreators({ ...UIActions }, dispatch)
  })
)(Protected))
