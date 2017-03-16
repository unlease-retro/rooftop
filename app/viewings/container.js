import React, { Component } from 'react'
import Relay from 'react-relay'
// import { bindActionCreators } from 'redux'
// import { connect } from 'react-redux'
// import { createStructuredSelector } from 'reselect'
import { AutoSizer, Column, Table } from 'react-virtualized'

// variables
import * as variables from './variables'
// fragments
import * as fragments from './fragments'

// util
import { getFormattedTimestamp } from '../shared/util'

// constants
import { UI } from '../shared/constants'
import { FIELDS } from './constants'

// components
import { View, Section } from 'components/layout'
import { Text } from 'components/text'
import { Anchor } from 'components/anchor'

class Viewings extends Component {

  constructor() {

    super()

    this.renderUser = this.renderUser.bind(this)
    this.renderListing = this.renderListing.bind(this)
    this.renderViewing = this.renderViewing.bind(this)

  }

  renderUser({ cellData }) {

    const { firstName, lastName, phoneVerification } = cellData    

    return (
      <View atomic={{ m:0, p: 0 }}>

        <Text atomic={{ m:0 }}>{firstName} {lastName}</Text>

        { phoneVerification ? <Text atomic={{ m:0 }}>{phoneVerification.contactNumber}</Text> : null }

        { !phoneVerification ? <Text atomic={{ m:0, fs:'i' }}>❌ Phone not verified</Text> : null }

      </View>
    )

  }

  renderListing({ cellData }) {

    const { id, title } = cellData

    return (
      <View atomic={{ m:0, p:0, ta:'l' }}>

        <Anchor atomic={{ d:'ib', m:0, td:'u' }} to={`${UI}/room/${id}`} target='_blank'>{title}</Anchor>

      </View>
    )

  }

  renderViewing({ cellData }) {

    const { confirmedTime } = cellData

    return (
      <View atomic={{ m:0, p: 0 }}>

        <Text atomic={{ m:0 }}>{getFormattedTimestamp(confirmedTime)}</Text>

      </View>
    )

  }

  render() {

    const { renderUser, renderListing, renderViewing } = this

    const { query } = this.props
    const { upcomingViewings } = query

    // render table header
    const headerRenderer = ({ label }) => ( <Text atomic={{ m:0, p:0, fw:'b' }}>{ label }</Text> )

    // render cell
    const cellRenderer = props => {

      let { dataKey } = props

      if (dataKey === 'listing') return renderListing(props)

      if (dataKey === 'viewing') return renderViewing(props)

      return renderUser(props)

    }

    // render column
    const renderColumns = FIELDS.map( (f, i) => <Column key={i} headerRenderer={headerRenderer} label={f.label} dataKey={f.key} cellRenderer={cellRenderer} width={1} flexGrow={1} flexShrink={0} style={{ marginBottom: 'auto' }} /> )

    return (
      <View>
        
        <Text atomic={{ fs:6, fw:'b', ta:'c' }} color='primary'>Upcoming viewings</Text>

        <Section atomic={{ mt:8, mb:8, ta:'c' }}>

          <AutoSizer>

            { ({ width }) => (

              <Table
                width={width}
                height={500}
                headerHeight={30}
                noRowsRenderer={ () => ( <div>No data</div> ) }
                overscanRowCount={10}
                rowHeight={60}
                rowCount={upcomingViewings.length}
                rowGetter={ ({ index }) => upcomingViewings[index % upcomingViewings.length] }
                useDynamicRowHeight={false}>
                { renderColumns }
              </Table>
            
            ) }

          </AutoSizer>

        </Section>

      </View>
    )

  }

}


export default Relay.createContainer(
  Viewings,
  { ...variables, fragments }
)
