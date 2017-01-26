import React, { Component } from 'react'
import Relay from 'react-relay'
import { AutoSizer, Column, Table } from 'react-virtualized'

import { FIELDS } from './constants'
import * as fragments from './fragments'
// import mutations from './mutations'
import variables from './variables'
// import { getAddressFromGeocode, getListingPreviewUrl, transformAdvertToListingPreview } from './util'

import { View } from 'components/layout'
import { Text } from 'components/text'

class Bot extends Component {

  // onListingPreviewRequest(advert) {
  //
  //   return getAddressFromGeocode(advert.geocode)
  //     .then( ({ address: { city, country, postcode, road } }) => ({ city, country, postcode, road }) )
  //     .then( address => getListingPreviewUrl( transformAdvertToListingPreview({ ...advert, ...address }) ) )
  //
  // }

  render() {

    const { allAdverts } = this.props.query

    const headerRenderer = ({ label }) => <div>{ label }</div>

    const renderColumns = FIELDS.map( (f, i) => <Column key={ i } headerRenderer={ headerRenderer } label={ f.label } dataKey={ f.key } width={1} flexGrow={1} flexShrink={0} /> )

    return (
      <View>

        <Text>Bot</Text>

        <AutoSizer>

          { ({ width }) => (

            <Table
              width={width}
              height={500}
              headerHeight={30}
              noRowsRenderer={ () => ( <div>No data</div> ) }
              overscanRowCount={10}
              rowCount={ allAdverts.length }
              rowGetter={ ({ index }) => allAdverts[index] }
              rowHeight={40}
              useDynamicRowHeight={false}
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
