import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { createStructuredSelector } from 'reselect'
import { connect } from 'react-redux'

import { selectors as AuthSelectors, actions as AuthActions } from '../../auth'
import { selectors as UISelectors } from '../../ui'

import { Anchor } from 'components/anchor'
import { Error } from 'components/error'
import { Footer } from 'components/footer'
import { Image } from 'components/image'
import { Main } from 'components/layout'
import { Loader } from 'components/loader'
import { Snackbar } from 'components/snackbar'

class App extends Component {

  render() {

    const { actions, children, authorised, error, requesting, snackbar } = this.props
    const { logout } = actions

    const renderError = error ? <Error>{ error.message }</Error> : null
    const renderSnackbar = snackbar ? <Snackbar>{ snackbar }</Snackbar> : null
    const renderLoader = requesting ? <Loader /> : null
    const renderLogout = authorised ? <Anchor onClick={ () => logout() }>Logout</Anchor> : null

    return (
      <div id='App'>

        <Main>

          <Image source='/logo.png' width='102px' height='74px' center />

          { renderSnackbar }

          { renderError }

          { renderLoader }

          { children }

        </Main>

        <Footer>

          <Image source='/unlease.png' width='40px' height='40px' center />

          { renderLogout }

        </Footer>

      </div>
    )

  }

}


export default connect(
  createStructuredSelector({ ...AuthSelectors, ...UISelectors }),
  dispatch => ({
    actions: bindActionCreators({ ...AuthActions }, dispatch)
  })
)(App)
