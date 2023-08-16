import { useTranslation } from 'react-i18next'

import ReportIcon from '@mui/icons-material/Report'
import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper'
import Table, { TableProps } from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableContainer from '@mui/material/TableContainer'

import EnhancedTableHead from '~/components/enhanced-table/enhanced-table-head/EnhancedTableHead'
import EnhancedTableRow from '~/components/enhanced-table/enhanced-table-row/EnhancedTableRow'
import FilterRow from '~/components/enhanced-table/filter-row/FilterRow'
import Loader from '~/components/loader/Loader'

import { styles } from '~/components/enhanced-table/EnhancedTable.styles'
import {
  TableColumn,
  TableData,
  TableFilter,
  TableItem,
  TableRowAction,
  TableSelect,
  TableSort
} from '~/types'

interface EnhancedTableProps<I, F> extends TableProps {
  columns: TableColumn<I>[]
  isSelection?: boolean
  rowActions?: TableRowAction[]
  select?: TableSelect<I>
  filter?: TableFilter<F>
  sort: TableSort
  rowsPerPage?: number
  data: TableData<I>
  onRowClick?: (item: I) => void
  emptyTableKey?: string
  selectedRows?: string[]
}

const EnhancedTable = <I extends TableItem, F = undefined>({
  columns,
  isSelection,
  rowActions,
  onRowClick,
  select,
  filter,
  sort,
  rowsPerPage,
  data,
  emptyTableKey = 'table.noExactMatches',
  selectedRows = [],
  ...props
}: EnhancedTableProps<I, F>) => {
  const { t } = useTranslation()
  const { items, loading, getData } = data

  const rows = items.map((item) => (
    <EnhancedTableRow
      columns={columns}
      isSelection={isSelection}
      item={item}
      key={item._id}
      onRowClick={onRowClick}
      refetchData={getData}
      rowActions={rowActions}
      select={select}
      selectedRows={selectedRows}
    />
  ))

  const tableBody = (
    <TableContainer data-testid='enhance-table-container'>
      <Table {...props}>
        <EnhancedTableHead
          columns={columns}
          data={data}
          isSelection={isSelection}
          rowActions={rowActions}
          rowsPerPage={rowsPerPage}
          select={select}
          sort={sort}
        />
        <TableBody>
          <FilterRow
            columns={columns}
            filter={filter}
            isSelection={isSelection}
          />
          {rows}
        </TableBody>
      </Table>
    </TableContainer>
  )

  const noMatchesBox = (
    <>
      {tableBody}
      <Box data-testid='no-matches-box' sx={styles.noMatches}>
        <ReportIcon color='secondary' />
        {t(emptyTableKey)}
      </Box>
    </>
  )

  const tableContent =
    (loading && <Loader sx={styles.loader} />) ||
    (!items.length && noMatchesBox) ||
    tableBody

  return (
    <Box sx={styles.root}>
      <Paper sx={styles.paper}>{tableContent}</Paper>
    </Box>
  )
}

export default EnhancedTable
