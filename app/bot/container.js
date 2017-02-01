import React, { Component } from 'react'
import Relay from 'react-relay'
import { AutoSizer, Column, SortIndicator, Table } from 'react-virtualized'

import { FIELDS } from './constants'
import * as fragments from './fragments'
// import mutations from './mutations'
import variables from './variables'
import { getAddressFromGeocode, getListingPreviewUrl, transformAdvertToListingPreview } from './util'
import { getSortedList } from '../shared/util/virtualized'

import { View } from 'components/layout'
import { Text } from 'components/text'

class Bot extends Component {

  constructor() {

    super()

    this.onSort = this.onSort.bind(this)

  }

  onSort(variables) {

    const { relay } = this.props

    return relay.setVariables(variables)

  }

  onListingPreviewRequest(advert) {

    return getAddressFromGeocode(advert.geocode)
      .then( ({ address: { city, country, postcode, road } }) => ({ city, country, postcode, road }) )
      .then( address => getListingPreviewUrl( transformAdvertToListingPreview({ ...advert, ...address }) ) )
      .then( url => window.open(url) )

  }

  render() {

    const { query, relay: { variables } } = this.props
    const { allAdverts } = query
    const { sortBy, sortDirection } = variables

    // sort adverts
    const sortedList = getSortedList(allAdverts, sortBy, sortDirection)

    // make column headers sortable
    const headerRenderer = ({ dataKey, label, sortBy, sortDirection }) => ( <div>{ label } { sortBy === dataKey && <SortIndicator sortDirection={ sortDirection } /> } </div> )

    // create `Column` for each required field
    const renderColumns = FIELDS.map( (f, i) => <Column key={ i } headerRenderer={ headerRenderer } label={ f.label } dataKey={ f.key } width={1} flexGrow={1} flexShrink={0} /> )

    return (
      <View>

        <Text atomic={{ fs:6, fw:'b', ta:'c' }} color='primary'>Bot Output</Text>

        <AutoSizer>

          { ({ width }) => (

            <Table
              width={ width }
              height={500}
              headerHeight={30}
              noRowsRenderer={ () => ( <div>No data</div> ) }
              overscanRowCount={10}
              rowCount={ allAdverts.length }
              rowGetter={ ({ index }) => sortedList[index % sortedList.length] }
              rowHeight={40}
              sort={ this.onSort }
              sortBy={ sortBy }
              sortDirection={ sortDirection }
              useDynamicRowHeight={false}
              onRowDoubleClick={ ({ rowData }) => this.onListingPreviewRequest(rowData) }
            >
              { renderColumns }
            </Table>

          ) }

        </AutoSizer>

      </View>
    )

  }

}

export default Relay.createContainer(Bot, { ...variables, fragments })
