import { useCallback, useState, useEffect, useContext } from 'react'
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
import SearchInput from '../search-input/SearchInput'
import { TableContext } from '~/context/table-context'

import { styles } from './EnhancedTable.styles'

const EnhancedTable = ({ fetchService, externalFilter }) => {
  const { t } = useTranslation()
  const { sort, filters, setSelected, isSelected, numSelected, createSelectAllHandler, page, setPage, rowsPerPage } =
    useContext(TableContext)

  const [items, setItems] = useState([])
  const [itemsCount, setItemsCount] = useState(0)

  const [search, setSearch] = useState('')

  const { loading, fetchData } = useAxios({ service: fetchService, fetchOnMount: false })

  const getData = useCallback(async () => {
    setSelected([])
    const res = await fetchData({
      skip: page * rowsPerPage,
      limit: rowsPerPage,
      sort,
      search,
      ...filters,
      ...externalFilter
    })
    setItems(res.data.items)
    setItemsCount(res.data.count)
  }, [fetchData, externalFilter, page, search, sort, rowsPerPage, filters, setSelected])

  useEffect(() => {
    getData()
  }, [getData])

  useEffect(() => {
    setPage(0)
  }, [search, filters, rowsPerPage, setPage, externalFilter])

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
        <SearchInput search={ search } setSearch={ setSearch } />
        { tableContent }
      </Paper>
      { loading || items.length === 0 ? null : <EnhancedTablePagination itemsCount={ itemsCount } /> }
    </Box>
  )
}

export default EnhancedTable
