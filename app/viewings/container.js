import React, { Component } from 'react'
import Relay from 'react-relay'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'

// variables
import * as variables from './variables'
// fragments
import * as fragments from './fragments'

import { View } from 'components/layout'
import { Text } from 'components/text'

class Viewings extends Component {

  render() {

    const { query } = this.props
    const { upcomingViewings } = query


    return (
      <View>
        
        <Text>Viewings</Text>

      </View>
    )

  }

}


export default Relay.createContainer(
  connect(
    createStructuredSelector({ }),
    dispatch => ({
      actions: bindActionCreators({ }, dispatch)
    })
  )(Viewings),
  { ...variables, fragments }
)
