import { useTranslation } from 'react-i18next'

import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableContainer from '@mui/material/TableContainer'
import ReportIcon from '@mui/icons-material/Report'

import EnhancedTableRow from '~/components/enhanced-table/enhanced-table-row/EnhancedTableRow'
import EnhancedTableHead from '~/components/enhanced-table/enhanced-table-head/EnhancedTableHead'
import FilterRow from '~/components/enhanced-table/filter-row/FilterRow'
import Loader from '~/components/loader/Loader'

import { styles } from '~/components/enhanced-table/EnhancedTable.styles'

const EnhancedTable = ({
  columns,
  isSelection,
  rowActions,
  select,
  filter,
  sort,
  rowsPerPage,
  data
}) => {
  const { t } = useTranslation()
  const { items, loading, getData } = data

  const rows = items.map((item) => (
    <EnhancedTableRow
      columns={columns}
      isSelection={isSelection}
      item={item}
      key={item._id}
      refetchData={getData}
      rowActions={rowActions}
      select={select}
    />
  ))

  const tableBody = (
    <TableContainer>
      <Table>
        <EnhancedTableHead
          columns={columns}
          data={data}
          isSelection={isSelection}
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
      <Box sx={styles.noMatches}>
        <ReportIcon color='secondary' />
        {t('table.noExactMatches')}
      </Box>
    </>
  )

  const tableContent =
    (loading && <Loader size={70} sx={styles.loader} />) ||
    (!items.length && noMatchesBox) ||
    tableBody

  return (
    <Box sx={styles.root}>
      <Paper sx={styles.paper}>{tableContent}</Paper>
    </Box>
  )
}

export default EnhancedTable
