import React, { Component } from 'react'
import { createStructuredSelector } from 'reselect'
import { connect } from 'react-redux'

import { selectors } from '../../ui'

import { Image } from 'components/image'
import { Loader } from 'components/loader'

class App extends Component {

  render() {

    const { children, requesting } = this.props

    const renderLoader = requesting ? <Loader /> : null

    return (
      <div id='App'>

        <Image source='logo.png' width='102' height='74' center />

        { renderLoader }

        { children }

      </div>
    )

  }

}


export default connect(
  createStructuredSelector({ ...selectors })
)(App)
