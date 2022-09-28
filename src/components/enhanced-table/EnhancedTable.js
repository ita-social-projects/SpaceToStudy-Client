import { useCallback, useState } from 'react'
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
  actionsArr,
  groupActionsArr,
  fetchService,
  initialOrder,
  initialOrderBy,
  filters,
  setActiveTab,
  activeTab,
  setFiltersObj,
  filtersObj,
  tabLabels,
  isSelection,
  headCells,
  rowPropsArr
}) => {
  const { t } = useTranslation()
  const [order, setOrder] = useState(initialOrder)
  const [orderBy, setOrderBy] = useState(initialOrderBy)
  const [selected, setSelected] = useState([])

  const [search, setSearch] = useState('')

  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(5)

  const serviceFunction = useCallback(
    () =>
      fetchService({
        skip: page * rowsPerPage,
        limit: rowsPerPage,
        order,
        orderBy,
        search,
        ...filters
      }),
    [order, orderBy, search, filters, page, rowsPerPage, fetchService]
  )

  const { response, loading, fetchData: fetchUsers } = useAxios({ service: serviceFunction })

  const itemsCount = response?.data.count

  const handleSelectAllClick = (e) => {
    if (e.target.checked) {
      const newSelected = response.data.items.map((item) => item._id)
      return setSelected((prev) => [...new Set(prev.concat(newSelected))])
    }
    setSelected([])
  }

  const handleSelectClick = (_e, id) => {
    const selectedIndex = selected.indexOf(id)
    let newSelected = []

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id)
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1))
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1))
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(selected.slice(0, selectedIndex), selected.slice(selectedIndex + 1))
    }

    setSelected(newSelected)
  }

  const refetchData = () => {
    fetchUsers()
    setSelected([])
  }

  const isSelected = (id) => selected.includes(id)

  const rows = response?.data.items.map((item) => {
    const isItemSelected = isSelected(item._id)

    return (
      <EnhancedTableRow
        actionsArr={ actionsArr }
        handleSelectClick={ handleSelectClick }
        isItemSelected={ isItemSelected }
        isSelection={ isSelection }
        item={ item }
        key={ item._id }
        refetchData={ refetchData }
        rowPropsArr={ rowPropsArr }
      />
    )
  })

  const handleRequestSort = (_e, property) => {
    const isAsc = orderBy === property && order === 'asc'
    setOrder(isAsc ? 'desc' : 'asc')
    setOrderBy(property)
  }

  const setTab = (tab) => {
    setSelected([])
    setPage(0)
    setActiveTab(tab.value)
  }

  const tabs = tabLabels?.map((tab) => (
    <Box
      key={ tab.value }
      onClick={ () => setTab(tab) }
      sx={ [styles.defaultTab, tab.value === activeTab && styles.activeTab] }
      typography='subtitle2'
    >
      { tab.label }
    </Box>
  ))

  const tableBody = loading ? (
    <Loader size={ 70 } sx={ { py: '170px' } } />
  ) : response?.data.items.length === 0 ? (
    <Box sx={ styles.noMatches }>
      <ReportIcon color='secondary' />
      { t('table.noExactMatches') }
    </Box>
  ) : (
    <TableContainer>
      <Table>
        <EnhancedTableHead
          filtersObj={ filtersObj }
          headCells={ headCells }
          isSelection={ isSelection }
          itemsCount={ itemsCount }
          numSelected={ selected.length }
          onRequestSort={ handleRequestSort }
          onSelectAllClick={ handleSelectAllClick }
          order={ order }
          orderBy={ orderBy }
          setFiltersObj={ setFiltersObj }
        />
        <TableBody>
          { rows }
        </TableBody>
      </Table>
    </TableContainer>
  )

  return (
    <Box sx={ styles.root }>
      <Box className={ selected.length > 0 ? 'visible' : 'hidden' }>
        <EnhancedTableToolbar
          groupActionsArr={ groupActionsArr }
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
          <SearchInput search={ search } setSearch={ setSearch } />
        </Box>
        { tableBody }
      </Paper>
      { loading || response?.data.items.length === 0 ? null : (
        <EnhancedTablePagination
          itemsCount={ itemsCount }
          page={ page }
          rowsPerPage={ rowsPerPage }
          setPage={ setPage }
          setRowsPerPage={ setRowsPerPage }
        />
      ) }
    </Box>
  )
}

export default EnhancedTable
