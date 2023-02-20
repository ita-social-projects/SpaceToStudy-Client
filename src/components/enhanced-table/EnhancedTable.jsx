import { useCallback, useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'

import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableContainer from '@mui/material/TableContainer'
import ReportIcon from '@mui/icons-material/Report'

import Loader from '~/components/loader/Loader'
import useAxios from '~/hooks/use-axios'
import EnhancedTableRow from './enhanced-table-row/EnhancedTableRow'
import EnhancedTableToolbar from './enhanced-table-toolbar/EnhancedTableToolbar'
import EnhancedTableHead from './enhanced-table-head/EnhancedTableHead'
import EnhancedTablePagination from './enhanced-table-pagination/EnhancedTablePagination'
import FilterRow from './filter-row/FilterRow'
import { useTableContext } from '~/context/table-context'
import useSelect from '~/hooks/table/use-select'
import usePagination from '~/hooks/table/use-pagination'

import { styles } from './EnhancedTable.styles'

const EnhancedTable = ({ fetchService, externalFilter }) => {
  const { t } = useTranslation()
  const { sort, filters, numSelected, page, rowsPerPage } = useTableContext()
  const { clearPage } = usePagination()
  const { clearSelected, isSelected, createSelectAllHandler } = useSelect()

  const [items, setItems] = useState([])
  const [itemsCount, setItemsCount] = useState(0)

  const { loading, fetchData } = useAxios({ service: fetchService, fetchOnMount: false })

  const getData = useCallback(async () => {
    let status = null

    if (externalFilter.status !== null) {
      status = externalFilter.status === true ? ['active'] : ['blocked']
    }

    clearSelected()
    const res = await fetchData({
      skip: page * rowsPerPage,
      limit: rowsPerPage,
      sort,
      ...filters,
      ...externalFilter,
      status
    })
    setItems(res.data.items)
    setItemsCount(res.data.count)
  }, [fetchData, externalFilter, page, sort, rowsPerPage, filters, clearSelected])

  useEffect(() => {
    getData()
  }, [getData])

  useEffect(() => {
    clearPage()
  }, [filters, rowsPerPage, clearPage, externalFilter])

  const rows = items.map((item) => {
    const isItemSelected = isSelected(item._id)

    return (
      <EnhancedTableRow
        isItemSelected={ isItemSelected } item={ item } key={ item._id }
        refetchData={ getData }
      />
    )
  })

  const tableBody = (
    <TableContainer>
      <Table>
        <EnhancedTableHead itemsCount={ itemsCount } onSelectAllClick={ createSelectAllHandler(items) } />
        <TableBody>
          <FilterRow />
          { rows }
        </TableBody>
      </Table>
    </TableContainer>
  )

  const noMatchesBox = (
    <Box sx={ styles.noMatches }>
      <ReportIcon color='secondary' />
      { t('table.noExactMatches') }
    </Box>
  )

  const tableContent =
    (loading && <Loader size={ 70 } sx={ { py: '170px' } } />) || (!items.length && noMatchesBox) || tableBody

  return (
    <Box sx={ styles.root }>
      <Box className={ numSelected > 0 ? 'visible' : 'hidden' }>
        <EnhancedTableToolbar refetchData={ getData } />
      </Box>
      <Paper sx={ styles.paper }>
        { tableContent }
      </Paper>
      { loading || !items.length ? null : <EnhancedTablePagination itemsCount={ itemsCount } /> }
    </Box>
  )
}

export default EnhancedTable
