import { useTranslation } from 'react-i18next'

import Box from '@mui/material/Box'
import Pagination from '@mui/material/Pagination'
import TablePagination from '@mui/material/TablePagination'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'

import AppButton from '~/components/app-button/AppButton'
import { styles } from '~/components/enhanced-table/enhanced-table-pagination/EnhancedTablePagination.styles'

import { ButtonVariantEnum, TablePaginationProps } from '~/types'

interface EnhancedTablePaginationProps {
  pagination: TablePaginationProps
}

const EnhancedTablePagination = ({
  pagination
}: EnhancedTablePaginationProps) => {
  const { t } = useTranslation()

  const {
    page,
    pageInput,
    rowsPerPage,
    pageCount,
    itemsCount,
    handleChangePage,
    handleChangeRowsPerPage,
    handleChangePageInput,
    handlePageSubmit
  } = pagination

  const PaginationController = (currentPage: number, pageCount: number) => {
    return (
      <Box
        sx={{
          flexShrink: 0
        }}
      >
        <Pagination
          count={pageCount}
          onChange={handleChangePage}
          page={currentPage}
        />
      </Box>
    )
  }

  const getDisplayedRowsLabel = (from: number, to: number, count: number) =>
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
          inputProps={{ 'data-testid': 'pagination-page-input' }}
          onChange={handleChangePageInput}
          size='small'
          sx={styles.pageInput}
          type='number'
          value={pageInput}
        />
        <AppButton
          onClick={() => handlePageSubmit(pageCount)}
          sx={styles.btn}
          variant={ButtonVariantEnum.Contained}
        >
          {t('table.go')}
        </AppButton>
      </Box>
    </Box>
  )
}

export default EnhancedTablePagination
