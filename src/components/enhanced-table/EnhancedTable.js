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
import SearchInput from '../search-input/SearchInput'

import { styles } from './EnhancedTable.styles'

const EnhancedTable = ({
  rowActions,
  bulkActions,
  fetchService,
  initialSort,
  initialFilters,
  tabs,
  externalFilter,
  isSelection,
  columns
}) => {
  const { t } = useTranslation()
  const [sort, setSort] = useState(initialSort)
  const [filters, setFilters] = useState(initialFilters)
  const [selected, setSelected] = useState([])

  const [items, setItems] = useState([])
  const [itemsCount, setItemsCount] = useState(0)

  const [search, setSearch] = useState('')

  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(5)

  const serviceFunction = useCallback(
    () =>
      fetchService({
        skip: page * rowsPerPage,
        limit: rowsPerPage,
        sort,
        search,
        ...filters,
        ...externalFilter
      }),
    [sort, search, filters, page, rowsPerPage, fetchService, externalFilter]
  )

  const { loading, fetchData } = useAxios({ service: serviceFunction, fetchOnMount: false })

  const getData = useCallback(async () => {
    const res = await fetchData()
    setItems(res.data.items)
    setItemsCount(res.data.count)
  }, [fetchData])

  useEffect(() => {
    getData()
  }, [getData])

  const getSetFilterByKey = (filterKey) => (filterValue) => {
    setSelected([])
    setPage(0)
    setFilters((prev) => ({ ...prev, [filterKey]: filterValue }))
  }

  const setCurrentSearch = (value) => {
    setSelected([])
    setSearch(value)
  }

  const handleSelectAllClick = (e) => {
    if (e.target.checked) {
      const newSelected = items.map((item) => item._id)
      return setSelected(newSelected)
    }
    setSelected([])
  }

  const handleSelectClick = (_e, id) => {
    const selectedIndex = selected.indexOf(id)
    let newSelected = []

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id)
    } else {
      newSelected = selected.filter((selectedId) => selectedId !== id)
    }

    setSelected(newSelected)
  }

  const refetchData = () => {
    getData()
    setSelected([])
  }

  const isSelected = (id) => selected.includes(id)

  const rows = items.map((item) => {
    const isItemSelected = isSelected(item._id)

    return (
      <EnhancedTableRow
        columns={ columns }
        handleSelectClick={ handleSelectClick }
        isItemSelected={ isItemSelected }
        isSelection={ isSelection }
        item={ item }
        key={ item._id }
        refetchData={ refetchData }
        rowActions={ rowActions }
      />
    )
  })

  const setCurrentPage = (page) => {
    setSelected([])
    setPage(page)
  }

  const handleRequestSort = (_e, property) => {
    const isAsc = sort.orderBy === property && sort.order === 'asc'
    setSort({ order: isAsc ? 'desc' : 'asc', orderBy: property })
    setSelected([])
  }

  const tableBody = (
    <TableContainer>
      <Table>
        <EnhancedTableHead
          columns={ columns }
          filters={ filters }
          getSetFilterByKey={ getSetFilterByKey }
          isSelection={ isSelection }
          itemsCount={ itemsCount }
          numSelected={ selected.length }
          onRequestSort={ handleRequestSort }
          onSelectAllClick={ handleSelectAllClick }
          rowsPerPage={ rowsPerPage }
          sort={ sort }
        />
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
      <Box className={ selected.length > 0 ? 'visible' : 'hidden' }>
        <EnhancedTableToolbar
          bulkActions={ bulkActions }
          itemIds={ selected }
          numSelected={ selected.length }
          refetchData={ refetchData }
        />
      </Box>
      <Paper sx={ styles.paper }>
        <Box sx={ styles.tools }>
          <Box sx={ styles.tabs }>
            { tabs }
          </Box>
          <SearchInput search={ search } setCurrentSearch={ setCurrentSearch } />
        </Box>
        { tableContent }
      </Paper>
      { loading || items.length === 0 ? null : (
        <EnhancedTablePagination
          itemsCount={ itemsCount }
          page={ page }
          rowsPerPage={ rowsPerPage }
          setCurrentPage={ setCurrentPage }
          setRowsPerPage={ setRowsPerPage }
        />
      ) }
    </Box>
  )
}

export default EnhancedTable
