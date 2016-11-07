import React, { Component } from 'react'
import { createStructuredSelector } from 'reselect'
import { connect } from 'react-redux'

import { selectors } from '../../ui'

import { Error } from 'components/error'
import { Image } from 'components/image'
import { Loader } from 'components/loader'

class App extends Component {

  render() {

    const { children, error, requesting } = this.props

    const renderError = error ? <Error>{ error.message }</Error> : null
    const renderLoader = requesting ? <Loader /> : null

    return (
      <div id='App'>

        <Image source='logo.png' width='102' height='74' center />

        { renderError }

        { renderLoader }

        { children }

      </div>
    )

  }

}


export default connect(
  createStructuredSelector({ ...selectors })
)(App)
