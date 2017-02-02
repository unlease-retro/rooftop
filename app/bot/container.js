import React, { Component } from 'react'
import Relay from 'react-relay'
import { withRouter } from 'react-router'
import { AutoSizer, Column, SortIndicator, Table } from 'react-virtualized'

import { FIELDS, FILTERS } from './constants'
import * as fragments from './fragments'
import variables from './variables'
import { getSortedList } from '../shared/util/virtualized'

import { View } from 'components/layout'
import { Select } from 'components/select'
import { Text } from 'components/text'

class Bot extends Component {

  constructor() {

    super()

    this.onAdvertClick = this.onAdvertClick.bind(this)
    this.onSort = this.onSort.bind(this)
    this.onStatusFilterChange = this.onStatusFilterChange.bind(this)

  }

  onAdvertClick(advert) {

    const { router } = this.props

    // navigate to `/bot/:id`
    return router.push(`/bot/${advert._id}`)

  }

  onSort(variables) {

    const { relay } = this.props

    return relay.setVariables(variables)

  }

  onStatusFilterChange(status) {

    const { relay } = this.props

    const variables = {
      disabled: status === 'declined',
      submitted: status === 'active',
      status,
    }

    return relay.setVariables(variables)

  }

  render() {

    const { query, relay: { variables } } = this.props
    const { allAdverts } = query
    const { sortBy, sortDirection, status } = variables

    // sort adverts
    const sortedList = getSortedList(allAdverts, sortBy, sortDirection)

    // make column headers sortable
    const headerRenderer = ({ dataKey, label, sortBy, sortDirection }) => ( <div>{ label } { sortBy === dataKey && <SortIndicator sortDirection={ sortDirection } /> } </div> )

    // create `Column` for each required field
    const renderColumns = FIELDS.map( (f, i) => <Column key={ i } headerRenderer={ headerRenderer } label={ f.label } dataKey={ f.key } width={1} flexGrow={1} flexShrink={0} /> )

    return (
      <View>

        <Text atomic={{ fs:6, fw:'b', ta:'c' }} color='primary'>All Adverts</Text>

        <Select
          atomic={{ d:'b', mt:4, mb:6, ta:'c' }}
          name='status'
          value={ status }
          options={ FILTERS.status }
          autoBlur={ true }
          clearable={ false }
          searchable={ true }
          onChange={ ({ value }) => this.onStatusFilterChange(value) }
        />

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
              onRowClick={ ({ rowData }) => this.onAdvertClick(rowData) }
            >
              { renderColumns }
            </Table>

          ) }

        </AutoSizer>

      </View>
    )

  }

}

export default withRouter(Relay.createContainer(Bot, { ...variables, fragments }))
