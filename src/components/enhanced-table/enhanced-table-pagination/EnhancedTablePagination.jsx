import { useTranslation } from 'react-i18next'

import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Pagination from '@mui/material/Pagination'
import TablePagination from '@mui/material/TablePagination'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'

import { useTableContext } from '~/context/table-context'

import { styles } from './EnhancedTablePagination.styles'

const EnhancedTablePagination = ({ itemsCount }) => {
  const { t } = useTranslation()
  const { pagination } = useTableContext()

  const {
    page,
    pageInput,
    rowsPerPage,
    pageCount,
    handleChangePage,
    handleChangeRowsPerPage,
    handleChangePageInput,
    handlePageSubmit,
    handleChangePaginationController
  } = pagination

  const PaginationController = (currentPage, pageCount) => {
    return (
      <Box
        sx={{
          flexShrink: 0
        }}
      >
        <Pagination
          count={pageCount}
          onChange={handleChangePaginationController}
          page={currentPage}
        />
      </Box>
    )
  }

  const getDisplayedRowsLabel = (from, to, count) =>
    `${from}-${to} ${t('table.of')} ${count}`

  return (
    <Box sx={styles.root}>
      <TablePagination
        ActionsComponent={() => PaginationController(page, pageCount)}
        component='div'
        count={itemsCount}
        labelDisplayedRows={({ from, to, count }) =>
          getDisplayedRowsLabel(from, to, count)
        }
        labelRowsPerPage={t('table.numberOfRows')}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        page={page - 1}
        rowsPerPage={rowsPerPage}
        rowsPerPageOptions={[5, 10, 25, 50]}
        sx={styles.tablePagination}
      />
      <Box sx={styles.pageInputBox}>
        <Typography variant='subtitle2'>{t('table.goToPage')}</Typography>
        <TextField
          inputProps={{ 'data-testid': 'testid-page-input' }}
          onChange={handleChangePageInput}
          size='small'
          sx={styles.pageInput}
          type='number'
          value={pageInput}
        />
        <Button
          onClick={() => handlePageSubmit(pageCount)}
          sx={styles.btn}
          variant='outlined'
        >
          {t('table.go')}
        </Button>
      </Box>
    </Box>
  )
}

export default EnhancedTablePagination
