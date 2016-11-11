import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { createStructuredSelector } from 'reselect'
import { connect } from 'react-redux'

import { actions } from '../../auth'
import { selectors } from '../../ui'

import { Anchor } from 'components/anchor'
import { Error } from 'components/error'
import { Footer } from 'components/footer'
import { Image } from 'components/image'
import { Main } from 'components/layout'
import { Loader } from 'components/loader'

class App extends Component {

  render() {

    const { actions, children, error, requesting } = this.props
    const { logout } = actions

    const renderError = error ? <Error>{ error.message }</Error> : null
    const renderLoader = requesting ? <Loader /> : null

    return (
      <div id='App'>

        <Main>

          <Image source='logo.png' width='102px' height='74px' center />

          { renderError }

          { renderLoader }

          { children }

        </Main>

        <Footer>

          <Image source='unlease.png' width='40px' height='40px' center />

          <Anchor onClick={ () => logout() }>
            Logout
          </Anchor>

        </Footer>

      </div>
    )

  }

}


export default connect(
  createStructuredSelector({ ...selectors }),
  dispatch => ({
    actions: bindActionCreators(actions, dispatch)
  })
)(App)
